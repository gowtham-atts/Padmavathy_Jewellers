import React, { useState, useRef, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, ImageBackground, TextInput, SafeAreaView } from 'react-native';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import ScrollContainer from '../components/ScrollContainer';
import verifyOtpStyles from './styles/verifyOtpStyles';
import { strings } from '../utils/strings';
import { COLORS, colors, images } from '../utils/constants';
import { responsiveHeight, responsiveImageSize } from '../utils/responsive';
import { ScrollView } from 'react-native';
import GradientButton from '../components/GradientButton';
import authService from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { useSelector } from 'react-redux';
import { selectCreateAccount, setLoading } from '../features/auth/authSlice';
import LinearGradient from 'react-native-linear-gradient';



const dummyLogo = require('../assets/shanthi_jellewery/Aurum_Logo.png');
const wingImg = require('../assets/shanthi_jellewery/pngwing.png');
const aurumLogo = responsiveImageSize(80, 80);
const wingLogo = responsiveImageSize(150, 100);


const OtpInput = React.forwardRef(({ value, onChangeText, onKeyPress }, ref) => {

    const inputRef = useRef(null);

    useEffect(() => {
        if (ref) {
            ref.current = {
                focus: () => {
                    inputRef.current.focus();
                },
            };
        }
    }, [ref]);

    return (
        <TextInput
            ref={inputRef}
            style={verifyOtpStyles.otpInput}
            value={value}
            onChangeText={onChangeText}
            maxLength={1}
            keyboardType="numeric"
            secureTextEntry
            onKeyPress={onKeyPress}
        />
    );
});

const VerifyOtpScreen = ({ navigation }) => {

    const [errorText, setErrorText] = useState('');

    const [otp, setOtp] = useState(['', '', '', '']);
    const refs = Array.from({ length: 6 }, () => useRef(null));
    const [timer, setTimer] = useState(60);

    const [loading, setLoading] = useState(false)


    const register_payload = useSelector(selectCreateAccount);


    const handleCancel = (index) => {
        if (index > 0) {
            refs[index - 1].current.focus();
        }
    };


    const handleOtpChange = (index, value) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);
        // Auto-focus to the next input field
        if (index < 3 && value !== '') {
            refs[index + 1].current.focus();
        }
    };


    const handleResendCode = () => {
        setOtp(['', '', '', '']);
        setTimer(60);
        handleSendOtp()
    };


    const handleSendOtp = async () => {

        try {
            const mail_id = await AsyncStorage.getItem('email');
            const mobile = await AsyncStorage.getItem('mobile');

            const payload = {
                emailid: mail_id,
                mobile: mobile
            };

            const response = await authService.signup_otp(payload);
            if (response?.status === "success") {
                Toast.show(response?.message, Toast.BOTTOM);
            } else {
                Toast.show(response.message, Toast.BOTTOM);
            }
        } catch (error) {
            setErrorText('Unexpected error during OTP process');
        }
    };

    const verifyPin = async () => {
        try {
            setLoading(true);
            const username = await AsyncStorage.getItem('mobile');
            if (!username) {
                setLoading(false);
                return;
            }

            const enteredOtp = otp.join('');
            const response = await authService.verify_otp(username, enteredOtp);
            if (response.status !== "failed") {
                const response = await authService.register(register_payload);
                if (response?.status === "success") {
                    Toast.show(response?.message, Toast.BOTTOM);
                    navigation.replace('Login');
                } else {
                    Toast.show(response?.message, Toast.BOTTOM);
                }
            } else {
                Toast.show(response.message, Toast.BOTTOM);
                setOtp(['', '', '', '']);
            }
        } catch (error) {
            Toast.show("An error occurred", Toast.BOTTOM);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timer]);

    return (
        <SafeAreaView style={verifyOtpStyles.container}>
            <LinearGradient colors={[COLORS.SPLASH_PRIMARY, COLORS.SPLASH_SECONDARY, COLORS.SPLASH_SECONDARY]} style={verifyOtpStyles.gradient}>
                <KeyboardAvoidingWrapper>

                    <ScrollContainer>

                        <View style={{ flex: 1 }}>

                            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Image source={images.dark_logo} style={wingLogo} resizeMode="contain" />
                            </View>

                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                                <View style={verifyOtpStyles.modalContainer}>
                                    <View style={verifyOtpStyles.modalContent}>

                                        <View style={verifyOtpStyles.scrollwidth} />

                                        <View>
                                            <Text style={verifyOtpStyles.headerText}>{strings.verifyOtpScreen.title}</Text>
                                        </View>

                                        <View>
                                            <Text style={verifyOtpStyles.userTitle}>{strings.verifyOtpScreen.enter}</Text>
                                        </View>

                                        <View style={verifyOtpStyles.otpContainer}>
                                            {otp.map((digit, index) => (
                                                <OtpInput
                                                    key={index}
                                                    ref={refs[index]}
                                                    value={digit}
                                                    onChangeText={(value) => handleOtpChange(index, value)}
                                                    onKeyPress={({ nativeEvent }) => {
                                                        if (nativeEvent.key === 'Backspace' && !digit) {
                                                            handleCancel(index);
                                                        }
                                                    }}
                                                />
                                            ))}
                                        </View>

                                        <TouchableOpacity style={verifyOtpStyles.resendButton} onPress={handleResendCode} disabled={timer > 0}>
                                            <Text style={verifyOtpStyles.resendButtonText}>
                                                {timer > 0 ? `Resend Code in ${timer} seconds` : 'Resend Code'}
                                            </Text>
                                        </TouchableOpacity>

                                        {errorText !== '' && (
                                            <Text style={verifyOtpStyles.errorText}>{errorText}</Text>
                                        )}
                                        <View style={verifyOtpStyles.buttonContainer}>
                                            <GradientButton
                                                loading={loading}
                                                title={strings.verifyOtpScreen.submit}
                                                onPress={verifyPin}
                                                colors={[colors.gradientBg, colors.gradientBg2]}
                                            />
                                        </View>
                                        <TouchableOpacity onPress={() => navigation.replace('Login')} style={{ marginTop: responsiveHeight(6) }}>
                                            <Text style={verifyOtpStyles.newUser}>{strings.verifyOtpScreen.backtologin} <Text style={verifyOtpStyles.createAcc}>{strings.verifyOtpScreen.clickhere}</Text>
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>

                    </ScrollContainer>

                </KeyboardAvoidingWrapper>

            </LinearGradient>

        </SafeAreaView>
    );
};

export default VerifyOtpScreen;
