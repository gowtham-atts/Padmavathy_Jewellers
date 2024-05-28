import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { FONTS, images } from '../utils/constants';
import { hp, rfpercentage, wp } from '../utils/responsive';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Powered By</Text>
      <Image
        source={images.poweredLogo}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: wp('16%'),
    height: hp("6%"),
    resizeMode: 'contain',
  },
  text: {
    color:'#D1B5B5',
    fontFamily:FONTS.OUTFIT_MEDIUM,
    fontSize:rfpercentage(1),
    textTransform:'uppercase',
    fontWeight:'500',
    marginTop:hp(2),
  },
});

export default Footer;
