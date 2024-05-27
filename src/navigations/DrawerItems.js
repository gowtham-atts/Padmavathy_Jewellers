import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, FONTS, colors, getBgColor, images } from '../utils/constants';
import { hp, responsiveHeight, responsiveImageSize, rfpercentage, wp } from '../utils/responsive';
import CustomModal from '../components/Modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollContainer from '../components/ScrollContainer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerDetails } from '../features/profile/profileActions';
import { selectProfileDetails } from '../features/profile/profileSlice';
import { Iconify } from 'react-native-iconify';
import FooterLogo from '../components/FooterLogo';
import { removeData } from '../utils/storage';



const companyLogo = responsiveImageSize(60, 60);

const profileLogo = responsiveImageSize(80, 80);

const avator = responsiveImageSize(100, 100);

const notifyImg = responsiveImageSize(20, 20);


const DrawerItems = ({ navigation }) => {

    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

    const [isUserLogin, setIsLoggedIn] = useState('');

    const dispatch = useDispatch()

    const profileList = useSelector(selectProfileDetails);

    const renderBase64Image = () => {
        const response = useSelector(selectProfileDetails);
        const getImage = `${response?.urlprofile ?? ''}${response?.cus_img ?? ''}`;
        let source = images.empty_avator; 
      
        if (!response?.cus_img) {
          return <Image source={source} style={styles.profileImage} />;
        }
      
        if (getImage && typeof getImage === 'string') {
            source = { uri: getImage };
        }
        
        return <Image source={source} style={styles.profileImage} />;
      };

    const isAuth = async () => {
       const isLoggedIn = await AsyncStorage.getItem('loggedIn');
       setIsLoggedIn(isLoggedIn)
       return isLoggedIn;
    }

    const openToggle = () => {
        navigation.closeDrawer();
      };

    const handleLogout = () => {
        navigation.closeDrawer()
        setLogoutModalVisible(true);
    };

    const handleLogin = () => {
        navigation.closeDrawer()
        navigation.replace('Register')
    };

    const handleCloseLogoutModal = () => {
        setLogoutModalVisible(false);
    };

    const handleConfirmLogout = async () => {
        await removeData('userToken');
        navigation.push('Login');
    };

    const bg_color = getBgColor();

    useEffect(() => {
        dispatch(fetchCustomerDetails());
        isAuth();
    }, []);

  

    return (
        <SafeAreaView>
           <ScrollContainer>
            <View style={styles.drawerContainer}>

                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity  onPress={openToggle} >
                        <Iconify icon="lucide:menu" size={30} color="#1B243D" />
                    </TouchableOpacity>
                    <Text style={styles.menu}>{"Menu"}</Text>
                </View>

                <View style={{flexDirection:'row', alignItems: 'center', marginVertical:hp(3) }}>
                   {renderBase64Image()}
                   <View style={{flexDirection:'column', marginHorizontal:hp(2)}}>
                        <Text style={styles.userName}>{(profileList?.firstname || 'Welcome') + ' ' + (profileList?.lastname || ' ')}</Text>
                   {isUserLogin && <TouchableOpacity style={[styles.drawerItem,{marginVertical:hp(1)}]}  onPress={handleLogout}>
                        <View style={styles.iconRow}>
                            <Image source={images.logout} style={[styles.iconImg,{ tintColor:'#D93636'}]} />
                            <Text style={[styles.logoutText]}>Logout</Text>
                        </View>
                    </TouchableOpacity> }
                    </View>  
                </View>

                <View style={{ borderBottomColor: COLORS.BACKGROUND, borderBottomWidth: 2, marginBottom: responsiveHeight(2) }} />

               
                <View style={{ rowGap: responsiveHeight(4), marginTop:hp(2) }}>

                    <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('About')}>
                        <View style={styles.iconRow}>
                            <Image source={images.about} style={styles.iconImg} />
                            <Text style={styles.drawerItemText}>About Us</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('About')} >
                            <Image source={images.oval_arrow} style={styles.arrowImg} />
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('TermConditions')}>
                        <View style={styles.iconRow}>
                            <Image source={images.terms} style={styles.iconImg} />
                            <Text style={styles.drawerItemText}>Terms and Conditions</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('TermConditions')} >
                            <Image source={images.oval_arrow} style={styles.arrowImg} />
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('RefundPolicy')}>
                        <View style={styles.iconRow}>
                           <Image source={images.refund} style={styles.iconImg} />
                            <Text style={styles.drawerItemText}>Refund Policy</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('RefundPolicy')} >
                            <Image source={images.oval_arrow} style={styles.arrowImg} />
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('ContactUs')}>
                        <View style={styles.iconRow}>
                            <Image source={images.contact} style={styles.iconImg} />
                            <Text style={styles.drawerItemText}>Contact Us</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('ContactUs')} >
                            <Image source={images.oval_arrow} style={styles.arrowImg} />
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('OurStore')}>
                        <View style={styles.iconRow}>
                            <Image source={images.ourstore} style={styles.iconImg} />
                            <Text style={styles.drawerItemText}>Our Store</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('OurStore')} >
                            <Image source={images.oval_arrow} style={styles.arrowImg} />
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <View style={{ borderBottomColor: COLORS.BACKGROUND, borderBottomWidth: 2, marginBottom: 20 }} />

                </View>

           
                {!isUserLogin &&
                    <TouchableOpacity style={[styles.drawerItem, { marginTop: responsiveHeight(2) }]} onPress={handleLogin}>
                        <View style={styles.iconRow}>
                            <Iconify icon='mdi:sign-in' size={25} color={colors.gradientBg} />
                            <Text style={styles.signup}>Sign Up</Text>
                        </View>
                    </TouchableOpacity>
                }

                <View style={{marginTop:hp('15%')}}>
                    <FooterLogo />
                </View>

                <CustomModal
                    isVisible={isLogoutModalVisible}
                    onClose={handleCloseLogoutModal}
                    onConfirm={handleConfirmLogout}
                    bgColor={bg_color}
                />

            </View>
           </ScrollContainer>

        </SafeAreaView>
   
    );
};

const styles = StyleSheet.create({
    drawerContainer: {
        padding: 20,
        flex: 1,
    },
    profileImage: {
        ...profileLogo,
        borderRadius: 100,
        marginBottom:hp(1),
    },
    logoImage: {
        ...companyLogo,
        marginBottom:hp(1),
    },
    userName: {
        fontSize: rfpercentage(2.5),
        fontWeight: '600',
        width:wp('40%'),
        fontFamily: FONTS.OUTFIT_BOLD,
        color: COLORS.DARK_PRIMARY
    },
    menu: {
        fontSize: rfpercentage(2.2),
        fontWeight: 'bold',
        fontFamily: FONTS.OUTFIT_BOLD,
        color: COLORS.DARK_PRIMARY,
        marginLeft: 10
    },
    mainMenu: {
        fontSize: rfpercentage(1.8),
        fontWeight: '400',
        fontFamily: FONTS.OUTFIT_MEDIUM,
        color: "#A0A0A0",
    },
    poweredByLogo: {
        width: 40,
        height: 20,
        resizeMode: 'contain'
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    notifyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    signup: {
        fontSize: rfpercentage(2.2),
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontWeight: '500',
        color:colors.gradientBg,
        marginLeft: responsiveHeight(5),
        position: 'absolute'
      },
    drawerItemText: {
        fontSize: rfpercentage(2.2),
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontWeight: '500',
        color:COLORS.DARK_PRIMARY,
        marginLeft: responsiveHeight(5),
        position: 'absolute'
    },
    logoutText: {
        fontSize: rfpercentage(2.2),
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontWeight: '500',
        color: "#D93636",
        marginLeft: responsiveHeight(5),
        position: 'absolute'
    },
    rightArrow: {
        marginLeft: 10,
    },
    image: {
        ...avator,
        resizeMode: 'contain',
        borderRadius: 80,
    },
    iconImg:{
       width:wp(6),
       height:hp(3),
       resizeMode:'contain',
    },
    arrowImg: {
        width: wp(6),
        height: hp(3),
        resizeMode: 'contain'
    },

    notify: {
        ...notifyImg,
        resizeMode: 'contain'
    }
});

export default DrawerItems;
