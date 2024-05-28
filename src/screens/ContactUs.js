import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import DetailsHeader from '../components/DetailsHeader';
import { hp, responsiveHeight, responsiveImageSize, rfpercentage, scaleFont, wp } from '../utils/responsive';
import { COLORS, FONTS, colors } from '../utils/constants';
import GradientButton from '../components/GradientButton';
import { getData } from '../utils/storage';
import termsService from '../services/termsService';
import customerService from '../services/customerService';
import { useDispatch } from 'react-redux';
import { setEnquiryDetails } from '../features/terms/termsSlice';
import { isEmailValid, isFirstNameValid, isPhoneNumberValid, validateEmail, validateFirstName, validateMessage, validateMobile, validateSubject } from '../utils/validations';
import Toast from 'react-native-simple-toast';
import ScrollContainer from '../components/ScrollContainer';




const avator = responsiveImageSize(100, 100);


const ContactUs = ({ navigation }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [branch, setBranch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [fnameError, setfNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [subError, setSubjectError] = useState('');
  const [messageError, setMessageError] = useState('');

  const [buttonLoader, setButtonLoader] = useState(false);

  const dispatch = useDispatch();


  const getAllContactUs = async () => {
    const customer_id = await getData('customerId');
    try {
      setLoading(true);
      Keyboard.dismiss();
      const response = await termsService.getAllBranch(customer_id);
      setBranch(response);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const saveContactUs = async () => {
    let custome_id = await getData('customerId');
    if (!custome_id) {
         custome_id = 0;
     }
    try {
      setButtonLoader(true);
      const payload = {
        id_customer: custome_id,
        name: name,
        email: email,
        subject: subject,
        message: message,
        mobile: mobile,
      };
      const response = await customerService.customerEnquiry(payload);
      dispatch(setEnquiryDetails(response));
      Toast.show(response.message, Toast.SHORT);
      setButtonLoader(false);
    } catch (err) {
      setError(err);
      setButtonLoader(false);
    }
  };


  useEffect(() => {
    getAllContactUs();
  }, []);



  const validateSubmit = () => {
    let isValid = true;

    const fnameError = validateFirstName(name);
    setfNameError(fnameError);
    if (fnameError) {
      isValid = false;
    } else {
      if (!isFirstNameValid(name)) {
        setfNameError('Invalid first name');
        isValid = false;
      }
    }

    const emailError = validateEmail(email);
    setEmailError(emailError);
    if (emailError) {
      isValid = false;
    } else {
      if (!isEmailValid(email)) {
        setEmailError('Invalid email format');
        isValid = false;
      }
    }

    const mobileError = validateMobile(mobile);
    setMobileError(mobileError);
    if (mobileError) {
      isValid = false;
    } else {
      if (!isPhoneNumberValid(mobile)) {
        setMobileError('Invalid mobile format');
        isValid = false;
      }
    }

    const subError = validateSubject(subject);
    setSubjectError(subError);
    if (subError) isValid = false;

    const messageError = validateMessage(message);
    setMessageError(messageError);
    if (messageError) isValid = false;

    if (isValid) {
      saveContactUs()
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollContainer>
          <DetailsHeader
            title="Contact Us"
            onBackPress={() => {
              navigation.goBack();
            }}
            onNotifyPress={() => navigation.navigate('Notification')}
            onWishlistPress={() => navigation.navigate('WishList')}
          />
          <View style={styles.msgContainer}>
            <View
              style={{
                marginTop: responsiveHeight(1),
                marginBottom: responsiveHeight(1),
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: FONTS.OUTFIT_MEDIUM,
                  color: COLORS.BLACK,
                  fontSize: scaleFont(16),
                }}
              >
                Write Us!
              </Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Your Name"
                value={name}
                placeholderTextColor={colors.gray58}
                onChangeText={(text) => { setName(text), setfNameError('') }}
              />
              <Text style={styles.errorText}>{fnameError}</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Email ID"
                value={email}
                placeholderTextColor={colors.gray58}
                onChangeText={(text) => { setEmail(text), setEmailError('') }}
              />
              <Text style={styles.errorText}>{emailError}</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Mobile No"
                value={mobile}
                keyboardType="numeric"
                placeholderTextColor={colors.gray58}
                onChangeText={(text) => { setMobile(text), setMobileError('') }}
              />
              <Text style={styles.errorText}>{mobileError}</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Subject"
                value={subject}
                placeholderTextColor={colors.gray58}
                onChangeText={(text) => { setSubject(text), setSubjectError('') }}
              />
              <Text style={styles.errorText}>{subError}</Text>
            </View>
            <View>
              <TextInput
                style={[styles.input, { textAlignVertical: 'top' }]}
                placeholder="Your Message"
                value={message}
                placeholderTextColor={colors.gray58}
                onChangeText={(text) => { setMessage(text), setMessageError('') }}
                multiline
                numberOfLines={4}
              />
              <Text style={styles.errorText}>{messageError}</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <GradientButton
              title="Submit"
              onPress={validateSubmit}
              colors={[colors.gradientBg, colors.gradientBg2]}
              loading={buttonLoader}
            />
          </View>

        </ScrollContainer>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const commonFontFamily = {
  fontFamily: FONTS.OUTFIT_MEDIUM,
  fontSize: rfpercentage(2),
  fontWeight: '500'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.WHITE
  },

  imageStyle: {
    ...avator,
  },
  titleStyle: {
    ...commonFontFamily,
    color: COLORS.DARK_PRIMARY,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  msgContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 12,
  },
  copyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 6,
  },
  copytxt: {
    ...commonFontFamily,
    marginLeft: 6,
    color: COLORS.DARK_PRIMARY,
    width: wp('40%')
  },
  input: {
    borderColor: colors.gray58,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    color: COLORS.TEXT,
    ...commonFontFamily
  },
  buttonContainer: {
    marginTop: hp(2),
    width: wp(85),
    alignSelf: 'center',
    marginBottom: hp(2),
  },
  loadingIndicator: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noWishlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyWishlistImage: {
    width: wp(10),
    height: hp(10),
    marginBottom: hp(2),
    resizeMode: 'contain',
  },
  noWishlistText: {
    fontSize: rfpercentage(2.2),
    fontFamily: FONTS.OUTFIT_BOLD,
    color: COLORS.TEXT_COLOR,
  },
  errorText: {
    color: COLORS.ERROR,
    ...commonFontFamily,
    textAlign: 'left',
    marginLeft: hp(2)
  },
});

export default ContactUs;
