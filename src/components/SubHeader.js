import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { hp, responsiveImageSize, rfpercentage, wp } from '../utils/responsive';
import { COLORS, FONTS, FONT_SIZES, images } from '../utils/constants';
import GoldRateHeader from './GoldRateHeader';
import { Iconify } from 'react-native-iconify';

const aurumLogo = responsiveImageSize(100, 40);

const SubHeader = ({
    title,
    onMenuPress,
    onNotifyPress,
    todayGoldRate,
    todaySliverRate,
    isGoldArrow,
    isSilverArrow }) => {


    return (

     <View style={styles.headerContainer}>
        <ImageBackground source={images.header_effect}
          resizeMode='cover'
          style={styles.bgHeaderImg}>
  
          <View>
  
            <View style={styles.header}>
              <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
                <Image source={images.menu}
                  style={{ width: wp(8), height: hp(4), resizeMode: 'contain' }} />
              </TouchableOpacity>
              <View>
                {/* <Text style={styles.headerText}>{title}</Text> */}
                <Image style={styles.header_logo} source={images.header_logo} />
              </View>
              <TouchableOpacity onPress={onNotifyPress} style={styles.iconButton}>
                <Image source={images.notify}
                  style={{ width: wp(8), height: hp(4), resizeMode: 'contain' }} />
              </TouchableOpacity>
            </View>
  
            <View style={styles.headerbg}>
  
              <View style={styles.goldRateHeaderContainer}>
                <GoldRateHeader title="Shop Gold Rate" rate={todayGoldRate} isUp={isGoldArrow} />
                <GoldRateHeader title="Shop Silver Rate" rate={todaySliverRate} isUp={isSilverArrow} />
              </View>
  
              <View style={styles.headerborder}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <Text style={styles.texthead}>TN Gold Rate</Text>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.texthead}>{todayGoldRate}</Text>
                    {isGoldArrow ? (
                      <Iconify icon='fluent-mdl2:stock-up' size={20} color="#4CE965" />
                    ) : (
                      <Iconify icon='fluent-mdl2:stock-down' size={20} color="red" />
                    )}
                  </View>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <Text style={styles.texthead}>TN Sliver Rate</Text>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.texthead}>{todaySliverRate}</Text>
                    {isSilverArrow ? (
                      <Iconify icon='fluent-mdl2:stock-up' size={20} color="#4CE965" />
                    ) : (
                      <Iconify icon='fluent-mdl2:stock-down' size={20} color="red" />
                    )}
                  </View>
                </View>
              </View>
  
            </View>
  
          </View>
        </ImageBackground>
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
      height:hp('28%'),
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      bottom: hp('2%')
    },
  
    headerContainer:{
      backgroundColor:'#1E282A',
      position:'relative',
      padding:15,
      height:hp('28%'),
      borderBottomLeftRadius:30,
      borderBottomRightRadius:30
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
      left: 10,
      bottom: 10,
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
  

export default SubHeader;
