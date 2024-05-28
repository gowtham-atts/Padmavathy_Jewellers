import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Pressable, ScrollView, ActivityIndicator, Platform, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Iconify } from 'react-native-iconify';
import Header from '../components/Header';
import CarouselComponent from '../components/CarouselComponent';
import { hp, rfpercentage, wp } from '../utils/responsive';
import { COLORS, FONTS, FONT_SIZES, colors, images } from '../utils/constants';
import offerService from '../services/offerService';
import { getData } from '../utils/storage';
import notificationService from '../services/notificationService';
import { setGoldRateDetails, setPrevGoldDetails } from '../features/products/productSlice';
import { setNotificationCount } from '../features/notifications/notificationSlice';
import { fetchCompanyDetails } from '../features/company/companyActions';
import { SafeAreaView } from 'react-native-safe-area-context';
import PayEMICount from '../components/PayEMICount';
import GoldRateCard from '../components/GoldRateCard';
import { fetchPayEMI } from '../features/payEMI/payEMIActions';
import { selectProfileDetails } from '../features/profile/profileSlice';
import { fetchGoldRates } from '../features/products/productActions';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';



const windowWidth = Dimensions.get('screen').width;

const size = Platform.isPad ? 60 : (Platform.OS === "ios" ? wp(6) : wp(6));

const top = Platform.isPad ? -20 : (Platform.OS === 'ios' ? -15 : -10);

const right = Platform.isPad ? -10 : (Platform.OS === 'ios' ? -10 :  10);

const width = Platform.isPad ? 40 : (Platform.OS === 'ios' ? 20 : 0);

const height = Platform.isPad ? 40 :  (Platform.OS === 'ios' ? 30  : 25);


const HomeScreen = ({ navigation }) => {

  const [goldLoading, setGoldLoading] = useState(true);
  const [getOfferBannerData, setOfferBannerData] = useState([]);
  const [todayGoldRate, setTodayGoldRate] = useState('');
  const [prevGoldRate, setPrevGoldRate] = useState('');
  const [notifyCount, setNotifyCount] = useState('');
  const [showComingSoon, setShowComingSoon] = useState(false);

  const [isGoldArrow, setIsGoldArrow] = useState(false);
  const [isSilverArrow, setIsSilverArrow] = useState(false);
  const [isUserLogin, setIsLoggedIn] = useState('');


  const profileList = useSelector(selectProfileDetails);


  const dispatch = useDispatch();


  const openToggle = () => {
    navigation.openDrawer();
  };

  const wishList = () => {
    navigation.navigate('WishList');
  };

  const notify = () => {
    navigation.navigate('Notification');
  };

  const getOfferBanner = async () => {
    let customerId = await getData('customerId');
    if (!customerId) {
      customerId = 0;
    }
    const payload = {
      id_customer: customerId,
      type: 1,
    };
    const offerList = await offerService.getOfferBanner(payload);
    setOfferBannerData(offerList?.list);
  };

  

  const getGoldRate = async () => {
    let customerId = await getData('customerId');
    try {
      setGoldLoading(true);
      if (!customerId) {
        customerId = 0;
      }
      const payload = {
        id_customer: customerId,
      };
      const response = await offerService.getGoldRate(payload);
      const todayGoldRate = response?.currentgold;
      const prevGoldRate = response?.prevgold;
      
      // Checking if today's gold rate is higher or lower than yesterday's to determine the arrow direction
      const isGoldArrowUp = todayGoldRate?.mjdmagoldrate_22ct < prevGoldRate?.mjdmagoldrate_22ct;
      const isSilverArrowUp = todayGoldRate?.silverrate_1gm < prevGoldRate?.silverrate_1gm;

      setPrevGoldRate(prevGoldRate);
      setTodayGoldRate(todayGoldRate);
      setIsGoldArrow(isGoldArrowUp);
      setIsSilverArrow(isSilverArrowUp);

      dispatch(setPrevGoldDetails(prevGoldRate));
      dispatch(setGoldRateDetails(todayGoldRate));
      setGoldLoading(false);
    } catch (error) {
      setGoldLoading(false);
      console.log("Error fetching gold rate:", error);
    }
  };

  const getNotifyCount = async () => {
    let customerId = await getData('customerId');
    if (!customerId) {
      customerId = 0;
    }
    const payload = {
      id_customer: customerId
    };
    try {
      const response = await notificationService.getNotifyCount(payload);
      setNotifyCount(response?.count);
      dispatch(setNotificationCount(response?.count));
    } catch (error) {
      console.log("Error fetching notification count:", error);
    }
  };

  const handleRefresh = () => {
    setGoldLoading(true);
    getGoldRate();
  };


  const isAuth = async () => {
    const isLoggedIn = await getData('userToken');
    setIsLoggedIn(isLoggedIn)
    return isLoggedIn;
  }


  const handleMyPlan = () => {
    if (isUserLogin) {
        navigation.replace('MyPlans');
    } else {
        Toast.show("Please log in to view your plans.",Toast.BOTTOM);
        navigation.replace('Login');
    }
  };


  const handlePayEma = () => {
    if (isUserLogin) {
        navigation.replace('PayEMA');
    } else {
        Toast.show("Please log in to make payments.",Toast.BOTTOM);
        navigation.replace('Login');
    }
 };


  const handlePayHistory = () => {
    if (isUserLogin) {
        navigation.replace('PaymentHistory');
    } else {
        Toast.show("Please log in to view your payment history.", Toast.BOTTOM);
        navigation.replace('Login');
    }
  };


  const handleTotalWeight = () => {
    if (isUserLogin) {
        navigation.replace('TotalWeight');
    } else {
        Toast.show("Please log in to access total weight information.", Toast.BOTTOM);
        navigation.replace('Login');
    }
  };


  const handleClosedAccount = () => {
    if (isUserLogin) {
        navigation.replace('ClosedAccounts');
    } else {
        Toast.show("Please log in to view closed accounts.", Toast.BOTTOM);
        navigation.replace('Login');
    }
  };


  useEffect(() => {
    handleRefresh()
    getOfferBanner();
    getGoldRate();
    getNotifyCount();
    dispatch(fetchCompanyDetails());
    isAuth()
    dispatch(fetchPayEMI())
    dispatch(fetchGoldRates())
  }, []);



  useFocusEffect(
    React.useCallback(() => {
      isAuth()
      handleRefresh()
      dispatch(fetchGoldRates());
    }, [dispatch])
  );
  

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={images.login_bg} style={styles.login_bg} resizeMode='cover'>
        <ScrollView contentContainerStyle={{ paddingVertical: hp(2), paddingBottom: hp(10) }}>

        <Header
          title="Shanthi Jewellery"
          onMenuPress={openToggle}
          onWishlistPress={wishList}
          onNotifyPress={notify}
          notificationCount={notifyCount}
          todayGoldRate={`₹ ${todayGoldRate?.mjdmagoldrate_22ct}`}
          todaySliverRate={`₹ ${todayGoldRate?.silverrate_1gm}`}
          isGoldArrow={isGoldArrow}
          isSilverArrow={isSilverArrow}
        />

        {goldLoading && (
            <View style={styles.whiteOverlay}>
              <ActivityIndicator size="large" color={COLORS.WHITE} style={styles.loadingIndicator} />
            </View> 
         )}

    
        <View style={styles.cardYupye}>

            <View>
              {isUserLogin ? (
                <Text style={styles.welcome}>Welcome, {profileList?.firstname && profileList?.lastname ? `${profileList.firstname} ${profileList.lastname}!` : 'User!'}</Text>
              ) : (
                <Text style={styles.welcome}>Welcome to {`${'PADMAVATHY JEWELLERS'}`}</Text>
              )}
            </View>


          <View style={{ marginTop: hp(2) }}>
            <View style={styles.slide}>
              <View style={styles.slideContainer}>

                <TouchableOpacity style={{alignItems:'center'}} onPress={() => navigation.navigate('NewPlans')}>
                  <View style={styles.roundCtnr}>
                    <Iconify icon='mingcute:file-new-fill' size={size} color={'#1B243D'} />
                  </View>
                  <Text style={styles.cardText}>New{'\n'}Plan</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignItems:'center'}} onPress={handleMyPlan}>
                  <View style={styles.roundCtnr}>
                    <Iconify icon='heroicons:wallet-solid' size={size} color={'#1B243D'} />
                  </View>
                  <Text style={styles.cardText}>My{'\n'}Plans</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignItems:'center',position: 'relative'}} onPress={handlePayEma}>
                  <View style={styles.roundCtnr}>
                    <Iconify icon='gg:qr' size={size} color={'#1B243D'} />
                  </View>
                  {isUserLogin &&
                    <View style={styles.notificationCountContainer}>
                      <PayEMICount count={0} />
                    </View>}
                  <Text style={styles.cardText}>Pay{'\n'}EMA</Text>
                </TouchableOpacity>


                <TouchableOpacity style={{alignItems:'center'}} onPress={handlePayHistory}>
                  <View style={styles.roundCtnr}>
                    <Iconify icon='fluent:money-hand-20-filled' size={size} color={'#1B243D'} />
                  </View>
                  <Text style={styles.cardText}>Payments{'\n'}History</Text>
                </TouchableOpacity>

              </View>
            </View>

            <View style={styles.carouselContainer}>
              <CarouselComponent data={getOfferBannerData} />
            </View>

            <View style={styles.slide}>
              <View style={styles.slideContainer}>

                <TouchableOpacity style={{alignItems:'center'}} onPress={handleTotalWeight}>
                  <View style={styles.roundCtnr}>
                    <Iconify icon='healthicons:weight' size={size} color={'#1B243D'} />
                  </View>
                  <Text style={styles.cardText}>Total{'\n'}Weight</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignItems:'center'}} onPress={() => {
                  setShowComingSoon(true);
                  setTimeout(() => {
                    setShowComingSoon(false);
                  }, 3000);
                }} >
                  <View style={styles.roundCtnr}>
                    <Iconify icon='fontisto:wallet'size={size} color={'#1B243D'} />
                  </View>
                  {!showComingSoon && <Text style={styles.cardText}>My{'\n'}Wallet</Text>}
                  {showComingSoon && <Text style={[styles.comingText]}>Coming{'\n'}Soon</Text>}
                </TouchableOpacity>

                <TouchableOpacity style={{alignItems:'center'}} onPress={() => navigation.navigate('NewArrivals')}>
                  <View style={styles.roundCtnr}>
                    <Iconify icon='mdi:jewel-case' size={size} color={'#1B243D'} />
                  </View>
                  <Text style={styles.cardText}>New{'\n'}Arrivals</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignItems:'center'}} onPress={handleClosedAccount} >
                  <View style={styles.roundCtnr}>
                    <Iconify icon='mdi:account-alert' size={size}  color={'#1B243D'} />
                  </View>
                  <Text style={styles.cardText}>Closed{'\n'}Accounts</Text>
                </TouchableOpacity>

              </View>
            </View>

          </View>
        </View>

        <View style={{ marginTop: hp(4) }}>
          <View style={{ paddingLeft: hp(2), }}>
            <Text style={styles.todaytext}>Today’s Rates</Text>
          </View>
        </View>

        <View>
          <GoldRateCard
            todayGoldRate={todayGoldRate}
            prevGoldRate={prevGoldRate}
            isGoldArrow={isGoldArrow}
            isSilverArrow={isSilverArrow}
            onRefresh={handleRefresh}
            goldLoading={goldLoading}
          />
        </View>

        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};


const FONT_MEDIUM = {
  fontFamily: FONTS.OUTFIT_MEDIUM,
};


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  slideContainer: {
    width: wp(80),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  login_bg:{
    width:"100%",
    height:"100%"
 },
  scrollViewContent: {
    flexGrow: 1
  },
  title: {
    fontSize: rfpercentage(2.5),
    ...FONT_MEDIUM,
    fontWeight: '700',
    color: COLORS.DARK_PRIMARY
  },
  welcome: {
    fontSize: rfpercentage(2.8),
    fontFamily: FONTS.OUTFIT_BOLD,
    color: '#1B243D',
    marginTop: hp(2)
  },
  offertxt: {
    fontSize: rfpercentage(2),
    fontFamily: FONTS.OUTFIT_BOLD,
    fontWeight: '700',
    color: COLORS.DARK_PRIMARY
  },
  updateRate: {
    backgroundColor: 'white',
    elevation: 3,
    padding: 6,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginLeft: 16,
    marginRight: 16,
  },
  goldRateCard: {
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    elevation: 3,
    padding: 16,
    margin: 16
  },
  goldRateTxt: {
    fontSize: FONT_SIZES.MEDIUM,
    ...FONT_MEDIUM,
    fontWeight: '500',
    textTransform: 'uppercase'
  },
  goldRateContent: {
    fontSize: FONT_SIZES.SMALL,
    ...FONT_MEDIUM,
    fontWeight: '500',
    color: COLORS.GOLD,
    textTransform: 'uppercase',
    textAlign: 'justify',
    marginTop: 10
  },
  gramContent: {
    fontSize: FONT_SIZES.SMALL,
    ...FONT_MEDIUM,
    fontWeight: '400',
    color: COLORS.LIGHT_GRAY,
    textTransform: 'uppercase',
    textAlign: 'justify'
  },
  gramcnt: {
    fontSize: FONT_SIZES.SMALL,
    ...FONT_MEDIUM,
    fontWeight: '400',
    color: COLORS.LIGHT_GRAY,
    textAlign: 'justify'
  },

  seeAll: {
    fontSize: FONT_SIZES.LARGE,
    ...FONT_MEDIUM,
    fontWeight: '500',
    color: COLORS.DARK_PRIMARY,
    borderBottomColor: COLORS.DARK_PRIMARY,
    borderBottomWidth: 1
  },

  goldRateHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 248, 255, 0.1)',
    width: wp(100),
    alignSelf: 'center'
  },

  carouselContainer: {
    marginTop: 20,
  },

  welcomeTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },

  todayGoldRateContainer: {
    padding: 10,
  },

  goldRateContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  updateRateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: hp(2)
  },

  productListContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: '20%',
  },

  cardYupye: {
    marginTop: hp(2),
    paddingLeft: hp(2)
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundCtnr: {
    width: wp(12),
    height: hp(6),
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E8DFE3',
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardText: {
    fontSize: rfpercentage(1.8),
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500',
    color: COLORS.DARK_PRIMARY,
    marginTop: hp(2),
    textAlign: 'center',
  },
  comingText: {
    fontSize: rfpercentage(1.6),
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500',
    color: colors.gray58,
    marginTop: hp(2),
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 15,
    backgroundColor: '#2D38554F',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },

  activePaginationDot: {
    backgroundColor: '#2D3855',
    borderWidth: 0,
  },

  cardContainer: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: (windowWidth - 48) / 3,
    aspectRatio: 0.8,
    backgroundColor: COLORS.BACKGROUND,
    elevation: 2,
    margin: hp(1)
  },

  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    resizeMode: 'contain',
  },

  columnWrapperStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  productName: {
    marginTop: 5,
    color: COLORS.DARK_PRIMARY,
    textAlign: 'center',
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: rfpercentage(2),
    fontWeight: '500',
    textTransform: 'capitalize'
  },

  todaytext: {
    fontFamily: FONTS.OUTFIT_BOLD,
    fontSize: rfpercentage(2.8),
    color: '#1B243D',
    textAlign: 'left'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(90),
    alignSelf: 'center'
  },

  bgHeaderImg: {
    width: wp('100%'),
    height: hp('40%'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: hp('9%')
  },

  headerContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  menuButton: {
    marginRight: 16,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  header_logo: {
    width: wp('40%'),
    height: hp('6%'),
    resizeMode: 'contain'
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  iconButton: {
    marginLeft: 16,
    position: 'relative',
  },
  notificationCountContainer: {
    position: 'absolute', 
    top:top, 
    right:right,
    width:width,
    height:height,
  },
  notificationCount: {
    color: COLORS.WHITE,
    fontSize: rfpercentage(2),
    fontFamily: FONTS.OUTFIT_MEDIUM,
    textAlign: 'center'
  },

  goldRateHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 248, 255, 0.1)',
    width: wp(100),
    alignSelf: 'center'
  },

  headerbg: {
    padding: 15,
  },

  headerborder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(80),
    alignSelf: 'center',
    marginTop: hp(3)
  },

  texthead: {
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: '500',
    color: '#404046',
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  whiteOverlay: {
    position: 'absolute',
    left: '40%',
    top: '40%',
    backgroundColor: COLORS.BLACK, 
    borderRadius: 12, 
    width:wp('20%'),
    height:hp('10%'),
    zIndex:10
 },

  loadingIndicator: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },

});

export default HomeScreen;
