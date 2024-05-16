import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, SafeAreaView, StyleSheet, Platform } from 'react-native';
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

    const user_name = route?.params?.username;

    const [username, setUsername] = useState('');
    const [passwd, setPassword] = useState('');
    const [confirmpasswd, setConfirmPassword] = useState('');

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errorText, setErrorText] = useState('');

    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const [loading, setLoading] = useState(false)



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
            const response = await authService.reset_password(username, passwd, confirmpasswd);
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


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
            <KeyboardAvoidingWrapper>
                <ScrollContainer>

                    <View style={{ alignItems: 'center', marginTop: hp(2) }}>
                        <Image source={images.dark_logo}
                            style={{ width: wp('40%'), height: hp('10%'), resizeMode: 'contain' }} />
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
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                                style={[styles.input, styles.inputText]}
                                iconSource={smsImg}
                            />
                        </View>

                        <View>
                            <Text style={loginStyles.passTitle}>{strings.loginScreen.passwordPlaceholder}</Text>
                            <View style={loginStyles.passwordContainer}>
                                <TextInput
                                    placeholder={strings.loginScreen.passwordPlaceholder}
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
        </SafeAreaView>

    );
};


const styles = StyleSheet.create({
    input: {
        alignSelf: 'center',
        flex: 1,
        padding: Platform.OS === 'ios' ? 8 : 6,
        backgroundColor: '#F1F1F1',
    },
    inputText: {
        color: COLORS.TEXT,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        fontFamily: FONTS.OUTFIT_MEDIUM
    },
})
export default ResetPassword;
