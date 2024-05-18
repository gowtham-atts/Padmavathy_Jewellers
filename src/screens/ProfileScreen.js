import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import { hp, wp, rfpercentage } from '../utils/responsive';
import { Iconify } from 'react-native-iconify';
import SwitchToggle from '../components/SwitchToggle';
import ScrollContainer from '../components/ScrollContainer';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfileDetails } from '../features/profile/profileSlice';
import { fetchCustomerDetails } from '../features/profile/profileActions';
import DetailsHeader from '../components/DetailsHeader';
import notificationService from '../services/notificationService';
import { getData, removeData } from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileStyles from './styles/profileStyles';
import { COLORS, FONTS, colors, images } from '../utils/constants';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import authService, { clearCredentials, deleteCredentials } from '../services/authService';
import { selectNotificationCount } from '../features/notifications/notificationSlice';
import { handleConfirmLogout } from '../utils/helpers';
import { useFocusEffect } from '@react-navigation/native';




const ProfileScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const profileList = useSelector(selectProfileDetails);

  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const notifyCount = useSelector(selectNotificationCount);

  const [err, setErr] = useState('')

  const [isUserLogin, setIsLoggedIn] = useState('');

  const isAuth = async () => {
    const isLoggedIn = await AsyncStorage.getItem('loggedIn');
    setIsLoggedIn(isLoggedIn)
    return isLoggedIn;
  }

  const handleToggleSwitch = async () => {
    let custome_id = await getData('customerId');
    try {
      if (!custome_id) {
        navigation.replace('Login');
        Toast.show('Please login.', Toast.BOTTOM)
        return;
      }
      const payload = {
        id_customer: custome_id,
        notification: notificationEnabled ? 2 : 1 // On - 1 , Off - 2
      }
      const response = await notificationService.notificationStatusChange(payload);
      if (response.status === 'invalid') {
        Toast.show(response.message, Toast.SHORT)
        handleConfirmLogout();
      } else {
        if (response.status === "success") {
          setNotificationEnabled(!notificationEnabled);
          Toast.show(response?.message, Toast.SHORT)
        }
      }
    } catch (err) {
      setErr(err)
    }

  }

  const handleCancel = () => {
    setDeleteModalVisible(false)
  }

  const handleConfirmDelete = () => {
    deleteAccount()
    setDeleteModalVisible(false);
  }


  const deleteAccount = async () => {
    try {
      const customer_id = await getData('customerId');
      const payload = {
        id_customer: customer_id
      }
      const response = await authService.delete_account(payload);
      if (response.status === 'invalid') {
        Toast.show(response.message, Toast.SHORT)
        handleConfirmLogout();
        navigation.replace('Login')
      } else {
        if (response?.status === 'success') {
          Toast.show(response?.message, Toast.BOTTOM);
          await deleteCredentials();
          navigation.replace('Login');
        } else {
          Toast.show(response?.message, Toast.BOTTOM);
        }
      }
    } catch {
      console.log('err')
    }
  }


  useEffect(() => {
    dispatch(fetchCustomerDetails());
    isAuth()
  }, []);


  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchCustomerDetails());
    }, [dispatch])
  )


  const renderBase64Image = () => {

    const response = useSelector(selectProfileDetails);
    const getImage = response?.urlprofile ?? '';
    const cusImg = response?.cus_img ?? '';


    let source = images.empty_avator;

    if (!cusImg || !getImage) {
      return <Image source={source} style={profileStyles.avatar} />;
    }

    const imageUrl = `${getImage}${cusImg}`;

    if (imageUrl.trim() === '') {
      return <Image source={source} style={profileStyles.avatar} />;
    }

    return <Image source={{ uri: imageUrl }} style={profileStyles.avatar} />;
  };



  return (
    <SafeAreaView style={profileStyles.container}>
      <ImageBackground source={images.login_bg} style={profileStyles.login_bg} resizeMode='cover'>

        <ScrollContainer>

          <DetailsHeader
            title="Profile"
            onBackPress={() => {
              navigation.goBack('Offer');
            }}
            onNotifyPress={() => {
              navigation.navigate('Notification');
            }}
            onWishlistPress={() => {
              navigation.navigate('WishList');
            }}
            notificationCount={notifyCount}
          />

          <View style={{
            flexDirection: 'row', alignItems: 'center', marginTop: hp(2),
            marginHorizontal: hp(2)
          }}>
            {renderBase64Image()}
            <View style={{ marginHorizontal: hp(2) }}>
              <Text style={profileStyles.titleStyle}>{(profileList?.firstname || 'Welcome') + ' ' + (profileList?.lastname || ' ')}</Text>
              <Text style={profileStyles.descStyle}>{profileList?.address1 || ''}</Text>
            </View>
          </View>

          <View style={[profileStyles.iconCntr, { marginLeft: hp(1.5), marginRight: hp(2) }]}>
            <View style={profileStyles.iconRow}>
              <Image source={images.notify_bell} style={profileStyles.notify} />
              <Text style={[profileStyles.itemheaderTxt]}>Notification</Text>
            </View>
            <View>
              <SwitchToggle value={notificationEnabled} onValueChange={handleToggleSwitch} />
            </View>
          </View>

          <View style={{ borderBottomColor: '#979797', borderBottomWidth: 0.5, marginTop: hp(2) }} />

          {isUserLogin &&
            <View style={{ margin: 15 }}>
              <View style={[{ marginTop: hp(1) }]}>
                <Text style={profileStyles.profileHeaderTxt}>Profile Settings</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={profileStyles.iconCntr}>
                  <View style={profileStyles.iconRow}>
                    <Image source={images.terms} style={profileStyles.iconImg} />
                    <Text style={profileStyles.itemheaderTxt}>Edit Profile</Text>
                  </View>
                  <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} >
                    <Image source={images.oval_arrow} style={profileStyles.arrowImg} />
                  </TouchableOpacity>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')} style={profileStyles.iconCntr}>
                  <View style={profileStyles.iconRow}>
                    <Image source={images.changePass} style={profileStyles.iconImg} />
                    <Text style={profileStyles.itemheaderTxt}>Change Password</Text>
                  </View>
                  <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')} >
                    <Image source={images.oval_arrow} style={profileStyles.arrowImg} />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </View>}


          <View style={{ margin: 15, marginBottom: isUserLogin ? hp(15) : hp(40) }}>
            <View>
              <Text style={profileStyles.profileHeaderTxt}>Main Menu</Text>
            </View>
            <View>
              {isUserLogin && <TouchableOpacity onPress={() => navigation.navigate('PaymentHistory')} style={profileStyles.iconCntr}>
                <View style={profileStyles.iconRow}>
                  <Image source={images.history} style={profileStyles.iconImg} />
                  <Text style={profileStyles.itemheaderTxt}>Payment History</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('PaymentHistory')} >
                  <Image source={images.oval_arrow} style={profileStyles.arrowImg} />
                </TouchableOpacity>
              </TouchableOpacity>}
            </View>

            {!isUserLogin &&
              <View>

                <TouchableOpacity onPress={() => navigation.navigate('HomeDrawer', { screen: 'Offers' })} style={profileStyles.iconCntr}>
                  <View style={profileStyles.iconRow}>
                    <Image source={images.offers} style={profileStyles.iconImg} />
                    <Text style={profileStyles.itemheaderTxt}>Offers</Text>
                  </View>
                  <TouchableOpacity onPress={() => navigation.navigate('HomeDrawer', { screen: 'Offers' })} >
                    <Image source={images.oval_arrow} style={profileStyles.arrowImg} />
                  </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.replace('Register')} style={[profileStyles.iconCntr]}>
                  <View style={profileStyles.iconRow}>
                    <Iconify icon='mdi:sign-in' size={25} color={colors.gradientBg} />
                    <Text style={profileStyles.signup}>Sign Up</Text>
                  </View>
                </TouchableOpacity>

              </View>}


            <View style={{ borderBottomColor: '#979797', borderBottomWidth: 0.5, marginTop: hp(2) }} />


            {isUserLogin &&
              <TouchableOpacity onPress={() => setDeleteModalVisible(true)}
                style={[profileStyles.iconCntr, { marginTop: hp('5%') }]}>
                <View style={profileStyles.iconRow}>
                  <Image source={images.delete} style={profileStyles.iconImg} />
                  <Text style={profileStyles.deleteTxt}>Delete Account</Text>
                </View>
              </TouchableOpacity>}
          </View>


          <Modal
            isVisible={isDeleteModalVisible}
            animationIn='bounceIn'
            animationOut='bounceOut'
            hasBackdrop={true}
            onBackdropPress={() => setDeleteModalVisible(false)}
            onBackButtonPress={() => setDeleteModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>

                <View style={{ alignItems: 'flex-end' }}>
                  <TouchableOpacity onPress={() => setDeleteModalVisible(false)} style={{
                    borderColor: '#000000',
                    borderWidth: 0.5,
                    borderRadius: 8,
                    padding: 8,
                  }}>
                    <Image source={images.close} style={{
                      width: wp('4%'),
                      height: hp('2%'), resizeMode: 'contain'
                    }} />
                  </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <Image source={images.rafiki} style={{ width: wp('15%'), height: hp('15%'), resizeMode: 'contain' }} />
                </View>


                <View style={{}}>
                  <Text style={styles.modalText}>Are you sure you want to delete</Text>
                  <Text style={styles.modalText}>your account?</Text>
                </View>

                <View style={{ marginTop: hp(2) }}>
                  <Text style={styles.contentText}>Deleting your account will also terminate your access to</Text>
                  <Text style={styles.contentText}>all services and functionalities provided by this platform.</Text>
                </View>


                <View style={styles.btnCtr}>
                  <TouchableOpacity style={styles.confirmButton} onPress={handleCancel}>
                    <Text style={styles.confirmButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.closeButton} onPress={handleConfirmDelete}>
                    <Text style={styles.closeButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </Modal>

        </ScrollContainer>

      </ImageBackground>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 25,
  },
  modalText: {
    fontSize: rfpercentage(2.2),
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '400',
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  contentText: {
    fontSize: rfpercentage(1.6),
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '300',
    color: '#9A9A9A'
  },
  closeButtonText: {
    fontSize: rfpercentage(2),
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500',
    color: COLORS.WHITE,
  },
  btnCtr: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: hp(2)
  },
  confirmButtonText: {
    color: COLORS.WHITE,
    fontSize: rfpercentage(2),
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#BA2020',
    padding: 8,
    borderRadius: 5,
    paddingLeft: hp(3),
    paddingRight: hp(3)
  },
  closeButton: {
    backgroundColor: '#666666',
    padding: 8,
    borderRadius: 5,
    paddingLeft: hp(4),
    paddingRight: hp(4)
  },
})



export default ProfileScreen;
