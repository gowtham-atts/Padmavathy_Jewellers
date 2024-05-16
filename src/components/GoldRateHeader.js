import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {  responsiveWidth, scaleFont } from '../utils/responsive';
import { COLORS, FONTS, colors } from '../utils/constants';
import { Iconify } from 'react-native-iconify';


const GoldRateHeader = ({ title, rate, isUp }) => {
  return (
   <TouchableOpacity style={styles.headerCtnrStyle}>
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.rateContainer}>
        <Text style={styles.rateText}>{rate}</Text>
        {isUp ? (
          <Iconify icon='fluent-mdl2:stock-up' size={20} color="#4CE965" />
        ) : (
          <Iconify icon='fluent-mdl2:stock-down' size={20} color="red" />
        )}
      </View>
     </View>
    </TouchableOpacity> 
  );
};

const styles = StyleSheet.create({
  headerCtnrStyle: {
    marginTop:10,
    marginBottom:10
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:responsiveWidth(50),
    alignSelf:'center'
  },
  headerText: {
    color: colors.white,
    fontSize:scaleFont(13),
    fontWeight: '400',
    fontFamily:FONTS.OUTFIT_MEDIUM,
  },
  rateContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginLeft:5
  },
  rateText: {
    color:COLORS.GOLD,
    fontSize:scaleFont(13),
    fontWeight: '500',
    fontFamily:FONTS.OUTFIT_MEDIUM,
  },
});

export default GoldRateHeader;
