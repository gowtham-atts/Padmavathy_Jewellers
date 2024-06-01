import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Dimensions } from 'react-native';
import { COLORS, FONTS, colors } from '../utils/constants';
import Card from './Card';
import { useSelector } from 'react-redux';
import { selectGoldRateState, selectPrevGoldRateState } from '../features/products/productSlice';
import { hp, rfpercentage, wp } from '../utils/responsive';

const refreshIcon = require('../assets/shanthi_jellewery/update_refresh.png');

const GoldRateCard = ({  isGoldArrow, isSilverArrow, onRefresh }) => {


  const todayGoldRate = useSelector(selectGoldRateState);

  const prevGoldRate = useSelector(selectPrevGoldRateState);




  return (
    <Card style={styles.goldRateCard}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={styles.todaytext}>Today’s Rates</Text>
        </View>
        <TouchableOpacity onPress={onRefresh} style={styles.updateRateButton}>
          {/* <Text style={styles.updateTxt}>Update Rates</Text> */}
          <View style={{ paddingLeft: hp('1%') }}>
            <Image source={refreshIcon} style={styles.refreshIcon} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.goldRateContentContainer}>

        <View style={styles.goldRateDetails}>
          <View style={styles.columAlign}>
            <Text style={[styles.goldRateTxt, { color: COLORS.DARK_PRIMARY }]}>Gold Rate</Text>
            <Text style={styles.gramContent}>22Kt  1 Gm</Text>
          </View>
          <View style={styles.rowAlign}>
              <Text style={[styles.goldRateContent, { color: isGoldArrow ? 'green' : 'red' }]}>
                 {`₹ ${prevGoldRate?.mjdmagoldrate_22ct ?? todayGoldRate?.mjdmagoldrate_22ct ?? 0}`}
              </Text>    
              {prevGoldRate && todayGoldRate && (
                <Text style={{ color: isGoldArrow ? 'green' : 'red', fontSize: rfpercentage(2.8) }}>
                  {isGoldArrow ? ' ▲' : ' ▼'}
                </Text>
              )}
            </View>
        </View>


        <View style={styles.divider} />

        <View style={styles.goldRateDetails}>
          <View style={styles.columAlign}>
            <Text style={[styles.goldRateTxt, { color: COLORS.DARK_PRIMARY }]}>Silver Rate</Text>
            <Text style={styles.gramContent}>1 Gm</Text>
          </View>
          <View style={styles.rowAlign}>
             <Text style={[styles.goldRateContent, { color: isGoldArrow ? 'green' : 'red' }]}>
                 {`₹ ${prevGoldRate?.silverrate_1gm ?? todayGoldRate?.silverrate_1gm ?? 0}`}
             </Text>          
              {prevGoldRate && todayGoldRate && (
                <Text style={{ color: isSilverArrow ? 'green' : 'red', fontSize: rfpercentage(2.8) }}>
                  {isSilverArrow ? ' ▲' : ' ▼'}
                </Text>
              )}
            </View>
        </View>


      </View>

    </Card>
  );
};

const styles = StyleSheet.create({
  goldRateCard: {
    paddingTop:hp('4%'),
    paddingLeft:hp('2%'),
    paddingRight:hp('2%')
  },
  loadingcontainer: {
    position: 'absolute',
    left: '50%',
    top: 0,
    transform: [{ translateX: -25 }, { translateY: -25 }],
    backgroundColor: COLORS.BLACK,
    borderRadius: 15,
    padding: 16
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:hp('1%')
  },
  columAlign: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: hp('2%')
  },
  updateTxt: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: rfpercentage(1.5),
    color: '#666',
    fontWeight: '400',
  },
  loadingIndicator: {
    alignSelf: 'center',
  },
  updateRateButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  refreshIcon: {
    width: wp('6%'),
    height: hp('3%'),
    resizeMode: 'contain'
  },
  goldRateContentContainer: {
    marginTop: hp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    backgroundColor:colors.placeholder,
    borderRadius:10
  },
  goldRateDetails: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin:15
  },
  todaytext: {
    fontFamily: FONTS.OUTFIT_BOLD,
    fontSize: rfpercentage(2.8),
    color: '#1B243D',
    fontWeight: '600'
  },
  goldRateTxt: {
    fontSize: rfpercentage(2.2),
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: COLORS.BLACK,
  },
  goldRateContent: {
    fontSize: rfpercentage(2.2),
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '400',
    color:colors.gradientBg2
  },
  gramContent: {
    fontSize: rfpercentage(2.2),
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '400',
    color: '#666',
  },
  divider: {
    width: wp('0.5%'),
    height: hp('10%'),
    backgroundColor: colors.borderclr
  },
});


export default GoldRateCard;
