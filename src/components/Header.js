import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { hp, responsiveImageSize, rfpercentage, wp } from '../utils/responsive';
import { COLORS, FONTS, FONT_SIZES, colors, images } from '../utils/constants';
import NotificationBadge from './NotificationBadge';




const aurumLogo = responsiveImageSize(100, 40);


const top = Platform.isPad ? -20 : (Platform.OS === 'ios' ? -15 : -10);

const right = Platform.isPad ? -10 : (Platform.OS === 'ios' ? -10 :  10);

const width = Platform.isPad ? 40 : (Platform.OS === 'ios' ? 20 : 0);

const height = Platform.isPad ? 40 :  (Platform.OS === 'ios' ? 30  : 25);


const Header = ({
  onMenuPress,
  onNotifyPress,
  notificationCount,
  todayGoldRate,
  todaySliverRate,
  isGoldArrow,
  isSilverArrow }) => {



  return (

    <View style={styles.headerContainer}>
     
        <View>

          <View style={styles.header}>
            <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
              <Image source={images.menu}
                style={{ width: wp(8), height: hp(4), resizeMode: 'contain', tintColor:colors.black_clr }} />
            </TouchableOpacity>
            <View style={{flex:1,alignItems:'center'}}>
              <Image style={styles.header_logo} source={images.dark_logo} />
            </View>
            <TouchableOpacity onPress={onNotifyPress} style={styles.iconButton}>
              <Image source={images.notify}
                style={{ width: wp(8), height: hp(4), resizeMode: 'contain',tintColor:colors.black_clr  }} />
            <View style={styles.notificationCountContainer}>
              <NotificationBadge count={notificationCount} />
            </View>
            </TouchableOpacity>
          </View>

        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(90),
    alignSelf: 'center'
  },

  bgHeaderImg: {
    width: wp('100%'),
    height:hp('40%'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: hp('9%')
  },

  headerContainer:{
    flex:1,
    // backgroundColor:'#F2F2F2',
  },

  menuButton: {
    marginRight: 1,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  header_logo: {
    width: wp('60%'),
    height: hp('10%'),
    resizeMode: 'contain',
  },
  logoImg: {
    ...aurumLogo,
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
    color: COLORS.WHITE,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  cardYupye: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: hp(2),
    width: wp(85),
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default Header;
