import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../utils/constants';
import { hp, rfpercentage, scaleFont, wp } from '../utils/responsive';

const Stepper = ({ value, onIncrement, onDecrement }) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={COLORS.LIGHT_GRAY}
        onPress={onDecrement}
        style={styles.button}
      >
        <Text style={styles.icon}>-</Text>
      </TouchableHighlight>
      <Text style={styles.value}>{value}</Text>
      <TouchableHighlight
        underlayColor={COLORS.LIGHT_GRAY}
        onPress={onIncrement}
        style={styles.button}
      >
        <Text style={styles.icon}>+</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderColor: COLORS.DARK_PRIMARY,
    borderRadius: 6,
    marginHorizontal: 8,
    borderWidth: 1,
    justifyContent:'center',
    width: wp('8%'),
    height: hp('4%')
  },
  icon: {
    color: COLORS.BLACK,
    fontSize: rfpercentage(2),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  value: {
    color: COLORS.DARK_PRIMARY,
    fontSize: rfpercentage(2),
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500',
  },
});

export default Stepper;
