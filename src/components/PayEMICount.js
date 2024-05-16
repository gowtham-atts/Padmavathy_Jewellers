import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { COLORS, FONTS, colors } from '../utils/constants';
import { rfpercentage } from '../utils/responsive';
import { useDispatch, useSelector } from 'react-redux';
import { selectPayEMA } from '../features/payEMI/payEMISlice';
import { fetchPayEMI } from '../features/payEMI/payEMIActions';

const PayEMICount = ({count}) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPayEMI())
  }, [])

  const payEMICount = useSelector(selectPayEMA);

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>{payEMICount?.length || count}</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 15,
    padding: 1,
    // position: 'absolute',
    minWidth:Platform.OS === 'ios' ? 25 : 24,
    // right:Platform.OS === 'ios' ? 10 : 0,
    // bottom: Platform.OS === 'ios' ? 40 : 20,
  },
  badge: {
    color: COLORS.WHITE,
    fontSize: rfpercentage(2),
    fontFamily: FONTS.OUTFIT_MEDIUM,
    textAlign: 'center'
  }
});

export default PayEMICount;