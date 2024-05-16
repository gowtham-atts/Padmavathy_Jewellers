import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import TextInput from '../components/TextInput';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { isPhoneNumberValid } from '../utils/validations';
import forgotStyles from './styles/forgotStyles';
import authService from '../services/authService';
import { strings } from '../utils/strings';
import { COLORS, FONTS, colors, images } from '../utils/constants';
import { hp, rfpercentage, wp } from '../utils/responsive';
import GradientButton from '../components/GradientButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, setLoading } from '../features/auth/authSlice';
import { getData } from '../utils/storage';


const smsImg = require('../assets/shanthi_jellewery/sms.png')


const ForgotScreen = ({ navigation }) => {


  const dispatch = useDispatch()

  const [username, setUsername] = useState('');
  const [errorText, setErrorText] = useState('');

  const loading = useSelector(selectLoading);


  const handleSendOtp = async () => {
    const user = await getData('userToken');
    try {
      if(!user){
        Toast.show('User does not exist.',Toast.BOTTOM);
        navigation.goBack()
        return;
      }
      dispatch(setLoading(true))
      setErrorText('');
      if (!isPhoneNumberValid(username)) {
        setErrorText('Please enter the valid mobile number.');
        return;
      }
      const response = await authService.send_otp(username);
      if (response?.status === 'success') {
        Toast.show(response?.message, Toast.BOTTOM);
        setUsername('')
        navigation.navigate('VerifyForgot', { username: username })
      } else {
        setErrorText(response.message);
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      dispatch(setLoading(false))
    }
  };




  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.WHITE}}>
      <KeyboardAvoidingWrapper>
        <ScrollView>

          <View style={forgotStyles.container}>

            <View style={{ alignItems: 'center', marginTop: hp(2) }}>
                <Image source={images.dark_logo}
                  style={{ width: wp('40%'), height: hp('10%'), resizeMode: 'contain' }} />
              </View>


              <View>
                <Text style={forgotStyles.headerText}>{strings.forgotScreen.title}</Text>
              </View>


            <View style={{flex:1}}>
              <View style={{ marginTop: hp(5),alignSelf:'center' }}>
                <Text style={forgotStyles.userTitle}>{strings.forgotScreen.mobileNo}</Text>
                <TextInput
                  placeholder={strings.forgotScreen.mobilePlaceholder}
                  placeholderTextColor={COLORS.PLACEHOLDER_TEXT}
                  value={username}
                  onChangeText={(text) => { setUsername(text), setErrorText('') }}
                  style={[styles.textinput, styles.text]}
                  keyboardType={'numeric'}
                  iconSource={smsImg}
                />
              </View>
            </View>

            {errorText !== '' && (
                <Text style={forgotStyles.errorText}>{errorText}</Text>
              )}
              

              <View style={forgotStyles.buttonContainer}>
                <GradientButton
                  title={strings.forgotScreen.resetPassword}
                  onPress={handleSendOtp}
                  colors={[colors.gradientBg, colors.gradientBg2]}
                  loading={loading}
                />
              </View>

              <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginTop:hp(3),alignItems:'center'}}>
                 <Text style={styles.back}>Go Back</Text>
              </TouchableOpacity>

          </View>

        </ScrollView>
      </KeyboardAvoidingWrapper>

    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  textinput:{
    width: wp('88%'),
    alignSelf:'center',
    flex:1,
    backgroundColor:'#F1F1F1',
    padding:Platform.OS === 'ios' ? 8 : 6
  },
  text: {
    color: COLORS.TEXT,
    fontSize: rfpercentage(2),
    fontWeight: '500',
    fontFamily:FONTS.OUTFIT_MEDIUM
  },
  back:{
    fontFamily:FONTS.OUTFIT_BOLD,
    fontSize:rfpercentage(2.2),
    fontWeight:'500',
    color:colors.gray58
  }
})

export default ForgotScreen;
