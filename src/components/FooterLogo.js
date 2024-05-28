import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { FONTS, images } from '../utils/constants';
import { hp, rfpercentage, wp } from '../utils/responsive';

const FooterLogo = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Powered By</Text>
            <Image
                source={images.powered_aurum}
                style={styles.logo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex:1,
        alignItems: 'center',
        justifyContent:'flex-end',
        padding:10
    },
    text: {
        color:'#A3A3A3',
        fontFamily:FONTS.OUTFIT_MEDIUM,
        fontSize:rfpercentage(1),
        textTransform:'uppercase',
        fontWeight:'500'
      },
    logo: {
        width: wp('16%'),
        height: hp('6%'),
        resizeMode: 'contain',
    },

});

export default FooterLogo;
