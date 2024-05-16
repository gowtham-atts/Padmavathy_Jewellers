import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { hp, rfpercentage, wp } from '../utils/responsive';
import { COLORS, FONTS, colors, images } from '../utils/constants';
import NotificationBadge from './NotificationBadge';




const top = Platform.isPad ? -20 : (Platform.OS === 'ios' ? -15 : -10);

const right = Platform.isPad ? -10 : (Platform.OS === 'ios' ? -10 :  10);

const width = Platform.isPad ? 40 : (Platform.OS === 'ios' ? 20 : 0);

const height = Platform.isPad ? 40 :  (Platform.OS === 'ios' ? 30  : 25);




const DetailsHeader = ({ title, onBackPress, onNotifyPress ,notificationCount }) => {
  return (
    <View style={styles.header}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={onBackPress} >
            <Image source={images.back} style={styles.iconImg} />
        </TouchableOpacity> 
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={onNotifyPress} >
          <Image source={images.notify} style={styles.iconImg} />
          <View style={styles.notificationCountContainer}>
              <NotificationBadge count={notificationCount} />
            </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  notificationCountContainer: {
    position: 'absolute', 
    top:top, 
    right:right,
    width:width,
    height:height,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backCtnr: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor:'#9FA2AB',
    borderWidth:0.5,
    borderRadius:8
  },
  headerText: {
    fontSize: rfpercentage(2.4),
    fontWeight: 'bold',
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color:COLORS.DARK_PRIMARY,
    marginLeft: 8,
    width:wp('70%')
  },
  notifyButton: {
    padding: 8,
  },
  iconButton: {
    marginLeft: 16,
    position: 'relative',
  },
  iconImg:{
    width:wp(8),
    height:hp(4),
    resizeMode:'contain',
    tintColor:colors.black_clr
  }
});

export default DetailsHeader;
