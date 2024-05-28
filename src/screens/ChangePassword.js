import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, Alert, TextInput, SafeAreaView, ImageBackground } from 'react-native';
import DetailsHeader from '../components/DetailsHeader';
import { hp } from '../utils/responsive';
import { colors, images } from '../utils/constants';
import ScrollContainer from '../components/ScrollContainer';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { useSelector } from 'react-redux';
import { selectProfileDetails } from '../features/profile/profileSlice';
import customerService from '../services/customerService';
import { validateConfirmPassword, validatePassword } from '../utils/validations';
import changePassStyles from './styles/changePassStyles';
import Toast from 'react-native-simple-toast';




const ChangePassword = ({ navigation }) => {

    const [passwd, setPassword] = useState('');
    const [confirmpasswd, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const [passError, setPassError] = useState('');
    const [cfpassError, setCfPassError] = useState('');

    const profileList = useSelector(selectProfileDetails);


    const handleValidation = () => {

        let isValid = true;

        const passError = validatePassword(passwd);
        setPassError(passError);
        if (passError) isValid = false;

        const cpassError = validateConfirmPassword(confirmpasswd, passwd);
        setCfPassError(cpassError);
        if (cpassError) isValid = false;

        if (isValid) {
            handleChangePassword()
        }

    }

    const handleChangePassword = async () => {
        const user_name = profileList?.username;
        try {
            const payload = {
                username: user_name,
                passwd: passwd,
                confirmpasswd: confirmpasswd,
            };
            const response = await customerService.changePassword(payload);
            if (response?.status === 'success') {
                Toast.show(response?.message, Toast.BOTTOM);
                navigation.goBack();
            } else {
                setError(response?.message);
            }
        } catch (error) {
            setError(error);
        }
    };

    const renderBase64Image = () => {
        const response = useSelector(selectProfileDetails);
        const getImage = `${response?.urlprofile ?? ''}${response?.cus_img ?? ''}`;
        let source = images.empty_avator;

        if (!response?.cus_img) {
            return <Image source={source} style={changePassStyles.avatar} />;
        }

        if (getImage && typeof getImage === 'string') {
            source = { uri: getImage };
        }

        return <Image source={source} style={changePassStyles.avatar} />;
    };

    return (
        <SafeAreaView style={changePassStyles.container}>
          <ImageBackground source={images.login_bg} style={changePassStyles.login_bg} resizeMode='cover'>
            <KeyboardAvoidingWrapper>
                <ScrollContainer>
                    <DetailsHeader
                        title="Change Password"
                        onBackPress={() => {
                            navigation.goBack()
                        }}
                        onNotifyPress={() => {
                            Alert.alert('Notify')
                        }}
                        onWishlistPress={() => {
                            Alert.alert('WishList')
                        }}
                    />

                    <TouchableOpacity style={{ alignItems: 'center', marginTop: hp(4) }}>
                        {renderBase64Image()}
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center', marginTop: hp(2) }}>
                        <Text style={changePassStyles.avatorText}>{(profileList?.firstname || '') + ' ' + (profileList?.lastname || '')}</Text>
                    </View>


                    <View style={{ marginTop: hp(4), alignSelf: 'center' }}>
                        <View>
                            <TouchableOpacity style={changePassStyles.iconCntr}>
                                <View style={changePassStyles.iconRow}>
                                    <Text style={changePassStyles.profileHeaderTxt}>Enter New Password</Text>
                                </View>
                            </TouchableOpacity>
                            <TextInput
                                placeholder={'New Password'}
                                placeholderTextColor={colors.gray58}
                                value={passwd}
                                onChangeText={(text) => { setPassword(text), setPassError('') }}
                                style={[changePassStyles.input, changePassStyles.inputText]}
                                secureTextEntry
                            />
                        </View>
                        {passError && <Text style={changePassStyles.errorTxt}>{passError}</Text>}
                        <View>
                            <TouchableOpacity style={changePassStyles.iconCntr}>
                                <View style={changePassStyles.iconRow}>
                                    <Text style={changePassStyles.profileHeaderTxt}>Enter Confirm Password</Text>
                                </View>
                            </TouchableOpacity>
                            <TextInput
                                placeholder={'Confirm Password'}
                                placeholderTextColor={colors.gray58}
                                value={confirmpasswd}
                                onChangeText={(text) => { setConfirmPassword(text), setCfPassError('') }}
                                style={[changePassStyles.input, changePassStyles.inputText]}
                                secureTextEntry
                            />
                        </View>
                        {cfpassError && <Text style={changePassStyles.errorTxt}>{cfpassError}</Text>}
                    </View>

                    <TouchableOpacity disabled={!confirmpasswd} onPress={handleValidation}
                        style={[changePassStyles.submitButton, { opacity: !confirmpasswd ? 0.6 : '' }]}>
                        <Text style={changePassStyles.submitText}>Submit</Text>
                    </TouchableOpacity>

                </ScrollContainer>
            </KeyboardAvoidingWrapper>
            </ImageBackground>
        </SafeAreaView>
    );
};



export default ChangePassword;
