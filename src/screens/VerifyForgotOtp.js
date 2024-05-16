import React, { useState, useRef, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, TextInput, SafeAreaView } from 'react-native';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import ScrollContainer from '../components/ScrollContainer';
import verifyOtpStyles from './styles/verifyOtpStyles';
import { strings } from '../utils/strings';
import { COLORS, colors, images } from '../utils/constants';
import { hp, responsiveHeight, responsiveImageSize } from '../utils/responsive';
import GradientButton from '../components/GradientButton';
import authService from '../services/authService';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, setLoading } from '../features/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


const aurumLogo = responsiveImageSize(150, 100);


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

const VerifyForgotOtp = ({ navigation, route }) => {


    const user = route.params.username;

    const [errorText, setErrorText] = useState('');

    const [loading, setLoading] = useState(false)

    const [otp, setOtp] = useState(['', '', '', '']);
    const refs = Array.from({ length: 6 }, () => useRef(null));
    const [timer, setTimer] = useState(60);


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
        handleSendOtp();
    };


    const handleSendOtp = async () => {
        try {
            const response = await authService.send_otp(user);
            if (response?.status === 'success') {
                Toast.show(response?.message, Toast.BOTTOM);
            } else {
                Toast.show(response?.message, Toast.BOTTOM);
            }
        } catch (error) {
            console.log('error', error)
        }
    };



    const onPinEntered = async () => {
        try {
            setLoading(true)
            const enteredOtp = otp.join('');
            const response = await authService.verify_otp(user, enteredOtp);
            if (response?.status === 'success') {
                navigation.navigate('ResetPassword');
                Toast.show(response?.message, Toast.BOTTOM);
                setOtp(['', '', '', ''])
            } else {
                Toast.show(response?.message, Toast.BOTTOM);
                setLoading(false);
                setOtp(['', '', '', ''])
            }
            setLoading(false)
        } catch (error) {
            Toast.show('Invalid PIN', Toast.BOTTOM);
            setLoading(false)
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
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
            <KeyboardAvoidingWrapper>
                <ScrollContainer>

                    <View style={{flex:1}}>
                        <View style={{ alignItems: 'center',flex:0.5, marginTop:hp(8) }}>
                            <Image source={images.dark_logo} style={aurumLogo} resizeMode="contain" />
                        </View>

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
                    </View>

                    <View style={verifyOtpStyles.buttonContainer}>
                            <GradientButton
                                title={strings.verifyOtpScreen.submit}
                                onPress={onPinEntered}
                                colors={[colors.gradientBg, colors.gradientBg2]}
                                loading={loading}
                            />
                        </View>
                        <TouchableOpacity onPress={() => navigation.replace('Login')} style={{ marginTop: responsiveHeight(4), marginBottom:hp(2) }}>
                            <Text style={verifyOtpStyles.newUser}>{strings.verifyOtpScreen.backtologin} <Text style={verifyOtpStyles.createAcc}>{strings.verifyOtpScreen.clickhere}</Text>
                            </Text>
                        </TouchableOpacity>

                </ScrollContainer>
            </KeyboardAvoidingWrapper>
        </SafeAreaView>

    );
};

export default VerifyForgotOtp;
