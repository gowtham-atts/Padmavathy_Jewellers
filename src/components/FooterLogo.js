import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { FONTS, images } from '../utils/constants';
import { hp, rfpercentage, wp } from '../utils/responsive';

const FooterLogo = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Powered by</Text>
            <Image
                source={images.powered_aurum}
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
        width: wp(14),
        height: hp(7),
        resizeMode: 'contain',
    },
    text: {
        color: '#D1B5B5',
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.2),
        textTransform: 'uppercase',
        fontWeight: '500',
    }
});

export default FooterLogo;
