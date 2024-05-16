import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import TextInput from '../components/TextInput';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import ScrollContainer from '../components/ScrollContainer';
import registerStyles from './styles/registerStyles';
import { strings } from '../utils/strings';
import { colors, images } from '../utils/constants';
import { hp, responsiveHeight, responsiveWidth, wp } from '../utils/responsive';
import { ScrollView } from 'react-native';
import GradientButton from '../components/GradientButton';
import authService from '../services/authService';
import { isAddressValid, isEmailValid, isFirstNameValid, isLastNameValid, isPasswordValid, isPhoneNumberValid, validateAddress, validateBranch, validateConfirmPassword, validateEmail, validateFirstName, validateLastName, validateMobile, validatePassword } from '../utils/validations';
import locationService from '../services/locationService';
import { Iconify } from 'react-native-iconify';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setCreateAccount } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';





const RegisterScreen = ({ navigation }) => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [mailId, setMail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [termsChecked, setTermsCondition] = useState(false);
  const [branchData, setBranchData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [branchId, setSelectedBranchId] = useState(null);
  const [showBranchList, setShowBranchList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const dispatch = useDispatch();

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleBranchChange = (branchName, branchId) => {
    setSelectedBranchId(branchId);
    setSelectedBranch(branchName);
    setShowBranchList(false);
  };

  const toggleBranchList = () => {
    setShowBranchList(!showBranchList);
  };
  

  const getAllBranch = async () => {
    try {
      const response = await locationService.getAllBranch();
      setBranchData(response);
      if (response.length > 0) {
        setSelectedBranchId(response[0].id_branch);
        setSelectedBranch(response[0].name);
      }
    } catch (err) {
      console.error('Error fetching branches', err);
    }
  };

  const [fnameError, setfNameError] = useState('');
  const [lnameError, setlNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [additionalError, setAdditionalMobileError] = useState('');
  const [branchError, setBranchError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [passError, setPassError] = useState('');
  const [cpassError, setCPassError] = useState('');






  const validateRegistration = () => {
    let isValid = true;

    const fnameError = validateFirstName(firstname);
    setfNameError(fnameError);
    if (fnameError) {
      isValid = false;
    } else {
      if (!isFirstNameValid(firstname)) {
        setfNameError('Invalid first name');
        isValid = false;
      }
    }

    const lnameError = validateLastName(lastname);
    setlNameError(lnameError);
    if (lnameError) {
      isValid = false;
    } else {
      if (!isLastNameValid(lastname)) {
        setlNameError('Invalid last name');
        isValid = false;
      }
    }

    const emailError = validateEmail(mailId);
    setEmailError(emailError);
    if (emailError) {
      isValid = false;
    } else {
      if (!isEmailValid(mailId)) {
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


    const passError = validatePassword(password);
    setPassError(passError);
    if (passError) {
      isValid = false;
    } else {
      if (!isPasswordValid(password)) {
        setPassError('Password must be strong and at least 5 characters long.');
        isValid = false;
      }
    }

    const minLength = 5;
    const addressError = validateAddress(address);
    setAddressError(addressError);
    if (addressError) {
      isValid = false;
    } else {
      if (!isAddressValid(address, minLength)) {
        setAddressError('Address must be 5 characters');
        isValid = false;
      }
    }

    const cpassError = validateConfirmPassword(confirm_password, password);
    setCPassError(cpassError);
    if (cpassError) isValid = false;

    if (isValid) {
      handleSignUpOtp()
    }
  };


  const registerPayload = {
    firstname: firstname,
    lastname: lastname,
    id_branch: branchId,
    date_of_birth: ' ',
    email: mailId,
    mobile: mobile,
    gender: ' ',
    passwd: password,
    id_country: ' ',
    id_state: ' ',
    id_city:  ' ',
    address: address,
    pincode: ' ',
    added_by: 2
  };


  

  const handleSignUpOtp = async () => {
    try {
      setLoading(true);
      const payload = {
        emailid: mailId,
        mobile: mobile
      };
      const response = await authService.signup_otp(payload);
      console.log('response',response)
      if (response?.status === "success") {
        await AsyncStorage.setItem('email', mailId);
        await AsyncStorage.setItem('mobile', mobile);
        Toast.show("Otp Send Successfully", Toast.BOTTOM);
        dispatch(setCreateAccount(registerPayload))
        navigation.replace('VerifyRegister', { verifyOtpData: response });
      } else {
        Toast.show(response?.message, Toast.BOTTOM);
      }
      setLoading(false);
    } catch (error) {
      console.error('Signup OTP error:', error.response);
      Toast.show('Error', Toast.BOTTOM);
      setLoading(false);
    }
  };




  useEffect(() => {
    getAllBranch()
  }, [])

  return (
    <SafeAreaView style={registerStyles.container}>
      <KeyboardAvoidingWrapper>
        <ScrollContainer>

          <View style={{ alignItems: 'center', marginTop: hp(2) }}>
            <Image source={images.dark_logo} style={registerStyles.logo} />
          </View>

          <View style={{ marginTop: hp(5) }}>
            <Text style={registerStyles.headerText2}>{strings.registerScreen.title}</Text>
          </View>

          <View style={{ paddingLeft: hp(3), paddingRight: hp(3), paddingVertical: hp(2) }}>
            <View style={registerStyles.contentSpace}>
              <Text style={registerStyles.userTitle}>{strings.registerScreen.fullNamePlaceholder}</Text>
              <TextInput
                placeholder={strings.registerScreen.fullNamePlaceholder}
                placeholderTextColor={colors.gray58}
                value={firstname}
                onChangeText={(text) => {
                  setFirstname(text);
                  setfNameError('');
                }}
                style={[registerStyles.input, registerStyles.inputText]}
              />
              <Text style={registerStyles.errorText}>{fnameError}</Text>
            </View>

            <View style={registerStyles.contentSpace}>
              <Text style={registerStyles.userTitle}>{strings.registerScreen.lastNamePlaceholder}</Text>
              <TextInput
                placeholder={strings.registerScreen.lastNamePlaceholder}
                placeholderTextColor={colors.gray58}
                value={lastname}
                onChangeText={(text) => { setLastname(text), setlNameError('') }}
                style={[registerStyles.input, registerStyles.inputText]}
              />
              <Text style={registerStyles.errorText}>{lnameError}</Text>
            </View>

            <View style={registerStyles.contentSpace}>
              <Text style={registerStyles.userTitle}>{strings.registerScreen.emailPlaceholder}</Text>
              <TextInput
                placeholder={strings.registerScreen.emailPlaceholder}
                placeholderTextColor={colors.gray58}
                value={mailId}
                onChangeText={(text) => { setMail(text), setEmailError('') }}
                style={[registerStyles.input, registerStyles.inputText]}
              />
              <Text style={registerStyles.errorText}>{emailError}</Text>
            </View>

            <View style={registerStyles.contentSpace}>
              <Text style={registerStyles.userTitle}>{strings.registerScreen.mobilePlaceholder}</Text>
              <TextInput
                placeholder={strings.registerScreen.mobilePlaceholder}
                placeholderTextColor={colors.gray58}
                value={mobile}
                keyboardType={'numeric'}
                onChangeText={(text) => { setMobile(text), setMobileError('') }}
                style={[registerStyles.input, registerStyles.inputText]}
              />
              <Text style={registerStyles.errorText}>{mobileError}</Text>
            </View>

            {branchData.length > 1 ?
              <View style={registerStyles.contentSpace}>
                <Text style={registerStyles.userTitle}>{strings.registerScreen.branch}</Text>
                <View style={registerStyles.branchCtnr}>
                  <TouchableOpacity style={registerStyles.dropdown} onPress={toggleBranchList}>
                    <Text style={registerStyles.dropdownText}>{selectedBranch || strings.registerScreen.selectBranch}</Text>
                  </TouchableOpacity>
                  {showBranchList && (
                    <ScrollView style={registerStyles.branchList}>
                      {branchData.map((branch) => (
                        <TouchableOpacity
                          key={branch.id_branch}
                          style={registerStyles.branchItem}
                          onPress={() => handleBranchChange(branch.name, branch.id_branch)}
                        >
                          <Text style={registerStyles.branchText}>{branch.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
                </View>
                <Text style={registerStyles.errorText}>{branchError}</Text>
              </View> : null}

            <View style={registerStyles.contentSpace}>
              <Text style={[registerStyles.userTitle, { marginTop: hp(2) }]}>{strings.registerScreen.addressPlaceholder}</Text>
              <TextInput
                placeholder={strings.registerScreen.addressPlaceholder}
                placeholderTextColor={colors.gray58}
                value={address}
                onChangeText={(text) => { setAddress(text), setAddressError('') }}
                style={[registerStyles.input, registerStyles.inputText]}
              />
              <Text style={registerStyles.errorText}>{addressError}</Text>
            </View>


            <View style={registerStyles.contentSpace}>
              <Text style={registerStyles.passTitle}>{strings.registerScreen.passwordPlaceholder}</Text>
              <View style={registerStyles.passwordContainer}>
                <TextInput
                  placeholder={strings.registerScreen.passwordPlaceholder}
                  placeholderTextColor={colors.gray58}
                  value={password}
                  onChangeText={(text) => { setPassword(text), setPassError('') }}
                  secureTextEntry={!isPasswordVisible}
                  style={[registerStyles.input, registerStyles.inputText]}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={registerStyles.eyeIcon}>
                  {isPasswordVisible ? (
                    <Iconify icon="ph:eye-light" size={24} color="#1E282A" />
                  ) : (
                    <Iconify icon="ph:eye-slash" size={24} color="#1E282A" />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={registerStyles.errorText}>{passError}</Text>
            </View>

            <View style={registerStyles.contentSpace}>
              <Text style={registerStyles.passTitle}>{strings.registerScreen.confirmPasswordPlaceholder}</Text>
              <View style={registerStyles.passwordContainer}>
                <TextInput
                  placeholder={strings.registerScreen.confirmPasswordPlaceholder}
                  placeholderTextColor={colors.gray58}
                  value={confirm_password}
                  onChangeText={(text) => { setConfirmPassword(text), setCPassError('') }}
                  secureTextEntry={!isConfirmPasswordVisible}
                  style={[registerStyles.input, registerStyles.inputText]}
                />
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={registerStyles.eyeIcon}>
                  {isConfirmPasswordVisible ? (
                    <Iconify icon="ph:eye-light" size={24} color="#1E282A" />
                  ) : (
                    <Iconify icon="ph:eye-slash" size={24} color="#1E282A" />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={registerStyles.errorText}>{cpassError}</Text>
            </View>

            <View style={registerStyles.checkboxContainer}>
              <TouchableOpacity
                style={registerStyles.checkbox}
                onPress={() => setTermsCondition(!termsChecked)}>
                {termsChecked ? (
                  <Iconify icon="material-symbols:check-circle-outline" size={25} color={colors.gradientBg} />
                ) : (
                  <Iconify icon="mdi:radio-button-unchecked" size={25} color={colors.gradientBg2} />
                )}
              </TouchableOpacity>
              <TouchableOpacity style={{ width: responsiveWidth(80) }} onPress={() => navigation.navigate('TermConditions')}>
                <Text style={registerStyles.checkboxLabel}>
                  {strings.registerScreen.termsCondition}{' '}
                  <Text style={registerStyles.terms}>{strings.registerScreen.termsCondition2}</Text>
                </Text>
              </TouchableOpacity>
            </View>

            <View style={registerStyles.buttonContainer}>
              <GradientButton
                title={strings.registerScreen.registerButton}
                onPress={validateRegistration}
                colors={[colors.gradientBg, colors.gradientBg2]}
                disabled={!termsChecked}
                loading={loading}
              />
            </View>

            <TouchableOpacity
              onPress={() => navigation.replace('Login')}
              style={{ marginTop: responsiveHeight(4), marginBottom: hp(2) }}>
              <Text style={registerStyles.newUser}>{strings.registerScreen.backtologin} <Text style={registerStyles.createAcc}>{strings.registerScreen.clickhere}</Text></Text>
            </TouchableOpacity>
            
          </View>

        </ScrollContainer>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default RegisterScreen;
