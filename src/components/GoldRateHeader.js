import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {  hp, responsiveWidth, rfpercentage, scaleFont } from '../utils/responsive';
import { COLORS, FONTS, colors } from '../utils/constants';
import { Iconify } from 'react-native-iconify';


const GoldRateHeader = ({ title, rate, isUp }) => {
  return (
   <TouchableOpacity style={styles.headerCtnrStyle}>
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.rateContainer}>
        <Text style={[styles.rateText]}>{rate}</Text>
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
    marginTop:hp('2%'),
    padding:6,
    // backgroundColor:"#1B243D",
    backgroundColor:colors.placeholder

  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:responsiveWidth(50),
    alignSelf:'center'
  },
  headerText: {
    color: "#1B243D",
    fontSize:rfpercentage(2),
    fontWeight: '400',
    fontFamily:FONTS.OUTFIT_MEDIUM,
    textTransform:'uppercase'
  },
  rateContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginLeft:5
  },
  rateText: {
    fontSize:rfpercentage(1.8),
    fontWeight: '500',
    fontFamily:FONTS.OUTFIT_MEDIUM,
    color:colors.gradientBg2
  },
});

export default GoldRateHeader;
