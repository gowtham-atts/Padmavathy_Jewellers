import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text, SafeAreaView, StyleSheet, Platform, ImageBackground } from 'react-native';
import TextInput from '../components/TextInput';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import ScrollContainer from '../components/ScrollContainer';
import forgotStyles from './styles/forgotStyles';
import authService from '../services/authService';
import { strings } from '../utils/strings';
import { COLORS, FONTS, colors, images } from '../utils/constants';
import { hp, rfpercentage, wp } from '../utils/responsive';
import GradientButton from '../components/GradientButton';
import loginStyles from './styles/loginStyles';
import Toast from 'react-native-simple-toast';




const smsImg = require('../assets/shanthi_jellewery/sms.png')
const lockImg = require('../assets/shanthi_jellewery/lock.png')



const ResetPassword = ({ navigation, route }) => {

   
    const initialUser = route?.params?.user || '';

    const [user, setUser] = useState(initialUser);

    const [passwd, setPassword] = useState('');
    const [confirmpasswd, setConfirmPassword] = useState('');

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errorText, setErrorText] = useState('');

    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const [loading, setLoading] = useState(false)

    const handleChange = (text) => {
        setUser(text); 
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };


    const handleResetPassword = async () => {
        try {
            setLoading(true)
            setErrorText('');
            const response = await authService.reset_password(user, passwd, confirmpasswd);
            if (response?.status === 'success') {
                Toast.show(response.message, Toast.BOTTOM);
                navigation.replace('Login');
            } else {
                setErrorText(response.message);
            }
            setLoading(false)
        } catch (error) {
            console.log('err', error)
            setLoading(false)
        }
    };

    useEffect(() => {
        // console.log('User updated:', user);
    }, [user]);



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
          <ImageBackground source={images.login_bg} style={forgotStyles.login_bg} resizeMode='cover'>
              <KeyboardAvoidingWrapper>
                 <ScrollContainer>

                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: hp('2%') }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Image source={images.back} style={{ width: wp('8%'), height: hp('4%'), resizeMode: 'contain' }} />
                            </TouchableOpacity>
                            <View style={{ alignItems: 'center', flex: 1 }}>
                                <Image source={images.padtext_logo} style={{ width: wp('60%'), height: hp('10%'), resizeMode: 'contain' }} />
                            </View>
                        </View>

                    <View style={{ padding: hp(2) }}>
                        <View>
                            <Text style={forgotStyles.headerText}>{strings.resetPasswordScreen.title}</Text>
                        </View>
                        <View>
                            <Text style={forgotStyles.contentText}></Text>
                        </View>
                        <View>
                            <Text style={forgotStyles.userTitle}>{strings.forgotScreen.mobileNo}</Text>
                            <TextInput
                                placeholder={strings.forgotScreen.mobilePlaceholder}
                                placeholderTextColor={COLORS.PLACEHOLDER_TEXT}
                                value={user}
                                onChangeText={handleChange}
                                style={[styles.input, styles.inputText]}
                                iconSource={smsImg}
                            />
                        </View>

                        <View>
                            <Text style={loginStyles.passTitle}>{strings.resetPasswordScreen.newPassword}</Text>
                            <View style={loginStyles.passwordContainer}>
                                <TextInput
                                    placeholder={strings.resetPasswordScreen.newPasswordPlaceholder}
                                    placeholderTextColor={COLORS.PLACEHOLDER_TEXT}
                                    value={passwd}
                                    onChangeText={(text) => setPassword(text)}
                                    secureTextEntry={!isPasswordVisible}
                                    style={[styles.input, styles.inputText]}
                                    iconSource={lockImg}
                                />
                                <TouchableOpacity onPress={togglePasswordVisibility} style={loginStyles.eyeIcon}>
                                    {isPasswordVisible ? (
                                        <Image style={{ width: wp('4%'), height: hp('2%'), resizeMode: 'contain' }}
                                            source={images.eye_slash} />
                                    ) : (
                                        <Image style={{ width: wp('4%'), height: hp('2%'), resizeMode: 'contain' }}
                                            source={images.eye_off} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View>
                            <Text style={loginStyles.passTitle}>{strings.resetPasswordScreen.rePassword}</Text>
                            <View style={loginStyles.passwordContainer}>
                                <TextInput
                                    placeholder={strings.resetPasswordScreen.rePasswordPlaceholder}
                                    placeholderTextColor={COLORS.PLACEHOLDER_TEXT}
                                    value={confirmpasswd}
                                    onChangeText={(text) => setConfirmPassword(text)}
                                    secureTextEntry={!isConfirmPasswordVisible}
                                    style={[styles.input, styles.inputText]}
                                    iconSource={lockImg}
                                />
                                <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={loginStyles.eyeIcon}>
                                    {isConfirmPasswordVisible ? (
                                        <Image style={{ width: wp('4%'), height: hp('2%'), resizeMode: 'contain' }}
                                            source={images.eye_slash} />
                                    ) : (
                                        <Image style={{ width: wp('4%'), height: hp('2%'), resizeMode: 'contain' }}
                                            source={images.eye_off} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View>
                            <Text style={forgotStyles.forgotText}>{strings.forgotScreen.forgotPassword}</Text>
                        </View>
                        {errorText !== '' && (
                            <Text style={forgotStyles.errorText}>{errorText}</Text>
                        )}
                        <View style={forgotStyles.buttonContainer}>
                            <GradientButton
                                title={strings.forgotScreen.resetPassword}
                                onPress={handleResetPassword}
                                colors={[colors.gradientBg, colors.gradientBg2]}
                                loading={loading}
                            />
                        </View>

                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: hp(3), alignItems: 'center' }}>
                            <Text style={forgotStyles.back}>Go Back</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollContainer>
              </KeyboardAvoidingWrapper>
          </ImageBackground>
        </SafeAreaView>

    );
};


const styles = StyleSheet.create({
    input: {
        alignSelf: 'center',
        flex: 1,
        padding: Platform.OS === 'ios' ? 8 : 6,
    },
    inputText: {
        color: COLORS.TEXT,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        fontFamily: FONTS.OUTFIT_MEDIUM
    },
})
export default ResetPassword;
