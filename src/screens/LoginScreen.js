import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, KeyboardAvoidingView, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import TextInput from '../components/TextInput';
import { isPhoneNumberValid, isUsernameValid, isPasswordValid } from '../utils/validations';
import loginStyles from './styles/loginStyles';
import authService, { clearCredentials, storeCredentials } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { strings } from '../utils/strings';
import { colors, images } from '../utils/constants';
import { hp, responsiveHeight, wp } from '../utils/responsive';
import GradientButton from '../components/GradientButton';
import { getData, storeData } from '../utils/storage';
import { fetchCompanyDetails } from '../features/company/companyActions';
import { useDispatch } from 'react-redux';
import locationService from '../services/locationService';
import { Iconify } from 'react-native-iconify';
import Toast from 'react-native-simple-toast';
import { fetchPayEMI } from '../features/payEMI/payEMIActions';
import FooterLogo from '../components/FooterLogo';




const LoginScreen = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorUserName, setErrorUserName] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [branchData, setBranchData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [branchId, setSelectedBranchId] = useState(null);
  const [showBranchList, setShowBranchList] = useState(false);


  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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


  const handleLogin = async () => {

    try {

      setErrorUserName('');
      setErrorPassword('');

      if (!isUsernameValid(username)) {
        setErrorUserName('Please enter a valid username.');
        return;
      } else if (!isPhoneNumberValid(username)) {
        setErrorUserName('Invalid phone number digits');
        return;
      }

      if (!password) {
        setErrorPassword('Please enter the password.');
        return;
      } else if (!isPasswordValid(password)) {
        setErrorPassword('Password must be strong and at least 5 characters long.');
        return;
      }

      setLoading(true);

      const external_id = await getData('external_id');

      const response = await authService.login(username, password, branchId, external_id);

      if (response.status === 'Success') {
        storeData('customerId', response.id_customer);
        storeData('branchId', response.id_branch);
        storeData('username', username);
        storeData('userToken', response.access_token);
        storeData('user_mobile', response.mobile);
        storeData('user_email', response?.email);
        storeData('loggedIn', 'true');

        if (keepLoggedIn) {
          await storeCredentials(username, password, keepLoggedIn);
        } else {
          await clearCredentials();
        }

        Toast.show(response?.message, Toast.BOTTOM);
        navigation.replace('Home');
      } else {
        Toast.show(response?.message, Toast.BOTTOM);
      }
    } catch (error) {
      Toast.show("An error occurred. Please try again later.", Toast.BOTTOM);
    } finally {
      setLoading(false);
    }
  };

  const handleSkipLogin = () => {
    dispatch(fetchPayEMI());
    navigation.navigate('Home')
  }

  useEffect(() => {
    const retrieveCredentials = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('username');
        const storedPassword = await AsyncStorage.getItem('password');
        const storedRememberMe = await AsyncStorage.getItem('rememberMe');
        if (storedEmail && storedPassword && storedRememberMe) {
          setUsername(storedEmail);
          setPassword(storedPassword);
          setKeepLoggedIn(JSON.parse(storedRememberMe));
        }
      } catch (error) {
        console.log('Error retrieving credentials:', error);
      }
    };
    retrieveCredentials();
    getAllBranch();
    dispatch(fetchCompanyDetails());
  }, []);


  return (
    <SafeAreaView style={loginStyles.container}>
      <ImageBackground source={images.login_bg} style={loginStyles.login_bg} resizeMode='cover'>

        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">

          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

            <TouchableOpacity onPress={handleSkipLogin} style={{ alignItems: 'flex-end', top: hp(2), right: hp(2) }}>
              <Text style={loginStyles.skipTxt}>{strings.loginScreen.skipLogin}</Text>
            </TouchableOpacity>


            <View style={{ alignItems: 'center', marginTop: hp(6) }}>
              <Image source={images.padtext_logo} style={loginStyles.img_logo} />
            </View>

            <View style={{ paddingLeft: hp(3), paddingRight: hp(3) }}>

              <View style={{ marginTop: hp(5) }}>
                <Text style={loginStyles.subHeader2}>{strings.loginScreen.title}</Text>
              </View>

              <View style={{ marginTop: responsiveHeight(4) }}>
                <Text style={loginStyles.userTitle}>{strings.loginScreen.mobilePlaceholder}</Text>
                <TextInput
                  placeholder={strings.loginScreen.mobilePlaceholder}
                  placeholderTextColor={colors.gray58}
                  value={username}
                  keyboardType={"numeric"}
                  onChangeText={(text) => { setUsername(text), setErrorUserName('') }}
                  style={[loginStyles.input, loginStyles.inputText]}
                  iconSource={images.mail}
                />
              </View>

              {errorUserName !== '' && (
                <Text style={loginStyles.errorText}>{errorUserName}</Text>
              )}

              <View>
                <Text style={loginStyles.passTitle}>{strings.loginScreen.passwordPlaceholder}</Text>
                <View style={loginStyles.passwordContainer}>
                  <TextInput
                    placeholder={strings.loginScreen.passwordPlaceholder}
                    placeholderTextColor={colors.gray58}
                    value={password}
                    onChangeText={(text) => { setPassword(text), setErrorPassword('') }}
                    secureTextEntry={!isPasswordVisible}
                    style={[loginStyles.passInput, loginStyles.passInputText]}
                    iconSource={images.pass}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility} style={loginStyles.eyeIcon}>
                    {isPasswordVisible ? (
                      <Iconify icon="ph:eye-light" size={25} color="#1E282A" />
                    ) : (
                      <Iconify icon="ph:eye-slash" size={25} color="#1E282A" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {errorPassword !== '' && (
                <Text style={loginStyles.errorText}>{errorPassword}</Text>
              )}

              {branchData?.length > 1 ?
                <View style={{ marginTop: responsiveHeight(2) }}>
                  <Text style={loginStyles.userTitle}>{strings.loginScreen.branch}</Text>
                  <View style={loginStyles.branchCtnr}>
                    <TouchableOpacity style={loginStyles.dropdown} onPress={toggleBranchList}>
                      <Text style={loginStyles.dropdownText}>{selectedBranch || strings.loginScreen.selectBranch}</Text>
                    </TouchableOpacity>
                    {showBranchList && (
                      <ScrollView style={loginStyles.branchList}>
                        {branchData.map((branch) => (
                          <TouchableOpacity
                            key={branch.id_branch}
                            style={loginStyles.branchItem}
                            onPress={() => handleBranchChange(branch.name, branch.id_branch)}
                          >
                            <Text style={loginStyles.branchText}>{branch.name}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    )}
                  </View>
                  {/* <Text style={registerStyles.errorText}>{branchError}</Text> */}
                </View> : null}


              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <View style={loginStyles.checkboxContainer}>
                  <TouchableOpacity
                    style={loginStyles.checkbox}
                    onPress={() => setKeepLoggedIn(!keepLoggedIn)}
                  >
                    {keepLoggedIn ? (
                      <Iconify icon="material-symbols:check-circle-outline" size={25} color={colors.gradientBg} />
                    ) : (
                      <Iconify icon="mdi:radio-button-unchecked" size={25} color={colors.gradientBg2} />
                    )}
                  </TouchableOpacity>
                  <Text style={loginStyles.checkboxLabel}>{strings.loginScreen.keepMeLogin}</Text>
                </View>
                <TouchableOpacity style={{ marginTop: responsiveHeight(2) }} onPress={() => navigation.navigate('Forgot')}>
                  <Text style={loginStyles.forgotText}>{strings.loginScreen.forgotPassword}</Text>
                </TouchableOpacity>
              </View>

              <View style={loginStyles.buttonContainer}>
                <GradientButton
                  title={strings.loginScreen.loginButton}
                  onPress={handleLogin}
                  colors={[colors.gradientBg, colors.gradientBg2]}
                  loading={loading}
                />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginTop: hp(2) }}>
                <Text style={loginStyles.newUser}>{strings.loginScreen.newUser} <Text style={loginStyles.createAcc}>{strings.loginScreen.createAccount}</Text>
                </Text>
              </TouchableOpacity>
            </View>


          </ScrollView>
        </KeyboardAvoidingView>

        <FooterLogo/>

      </ImageBackground>

    </SafeAreaView>
  );
};

export default LoginScreen;
