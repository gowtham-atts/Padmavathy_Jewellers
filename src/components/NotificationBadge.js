import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { COLORS, FONTS } from '../utils/constants';
import { rfpercentage } from '../utils/responsive';

const NotificationBadge = ({ count }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>{count || 0}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 15,
    padding: 2,
    minWidth:Platform.OS === 'ios' ? 25 : 24,
    zIndex:10
  },
  badge: {
    color:COLORS.WHITE,
    fontSize:rfpercentage(2),
    fontFamily:FONTS.OUTFIT_MEDIUM,
    textAlign:'center'
  }
});

export default NotificationBadge;