import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Dimensions } from 'react-native';
import { COLORS, FONTS } from '../utils/constants';
import Card from './Card';
import { useSelector } from 'react-redux';
import { selectGoldRateState, selectPrevGoldRateState } from '../features/products/productSlice';
import { hp, rfpercentage, wp } from '../utils/responsive';

const refreshIcon = require('../assets/shanthi_jellewery/update_refresh.png');

const GoldRateCard = ({ goldLoading, isGoldArrow, isSilverArrow, onRefresh }) => {


  const todayGoldRate = useSelector(selectGoldRateState);

  const prevGoldRate = useSelector(selectPrevGoldRateState);



  return (
    <Card style={styles.goldRateCard}>
      {/* Loading indicator */}
      {/* {goldLoading && (
        <View style={styles.loadingcontainer}>
          <ActivityIndicator size="large" color={COLORS.WHITE} style={styles.loadingIndicator} />
        </View>
      )} */}

      {/* Refresh button */}
      <TouchableOpacity onPress={onRefresh} style={styles.updateRateButton}>
        <Image source={refreshIcon} style={styles.refreshIcon} />
      </TouchableOpacity>

      <View style={styles.goldRateContentContainer}>
        {/* Gold Rate */}
        <View style={styles.goldRateDetails}>
          <View style={{flexDirection:'row',gap:15}}>
            <Text style={[styles.goldRateTxt, { color: COLORS.DARK_PRIMARY }]}>Gold Rate</Text>
            <Text style={styles.gramContent}>22Kt  1 Gm</Text>
          </View>
          <View style={{flexDirection:'row',gap:0,alignItems:'center',justifyContent:'center'}}>
          <Text style={[styles.goldRateContent,{color: isGoldArrow ? 'green' : 'red'}]}>
              {`₹ ${prevGoldRate ? prevGoldRate.mjdmagoldrate_22ct : todayGoldRate.mjdmagoldrate_22ct}`}
            </Text>
            {prevGoldRate && todayGoldRate && (
                <Text style={{ color: isGoldArrow ? 'green' : 'red' ,fontSize:rfpercentage(2.8) }}>
                  {isGoldArrow ? ' ▲' : ' ▼'}
                </Text>
              )}
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Silver Rate */}
        <View style={styles.goldRateDetails}>
          <View style={{flexDirection:'row',gap:15}}>
            <Text style={[styles.goldRateTxt, { color: COLORS.DARK_PRIMARY }]}>Silver Rate</Text>
            <Text style={styles.gramContent}>1 Gm</Text>
          </View>
          <View style={{flexDirection:'row',gap:10,alignItems:'center', justifyContent:'center'}}>
            <Text style={[styles.goldRateContent,{color: isSilverArrow ? 'green' : 'red'}]}>
                {`₹ ${prevGoldRate ? prevGoldRate.silverrate_1gm : todayGoldRate.silverrate_1gm}`}
            </Text>
            {prevGoldRate && todayGoldRate && (
                <Text style={{ color: isSilverArrow ? 'green' : 'red', fontSize:rfpercentage(2.8) }}>
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
    margin: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
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
  loadingIndicator: {
    alignSelf: 'center',
  },
  updateRateButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  refreshIcon: {
    width: wp('6%'),
    height: hp('3%'),
    resizeMode:'contain'
  },
  goldRateContentContainer: {
    marginTop: hp(4),
  },
  goldRateDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goldRateTxt: {
    fontSize: rfpercentage(2.2),
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: COLORS.BLACK
  },
  goldRateContent: {
    fontSize: rfpercentage(2.2),
    fontFamily: FONTS.OUTFIT_MEDIUM,
    // color: COLORS.BLACK
  },
  gramContent: {
    fontSize: rfpercentage(2.2),
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '400',
    color: '#666',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 12,
  },
});


export default GoldRateCard;
