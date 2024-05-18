import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { images } from '../utils/constants';
import { hp, wp } from '../utils/responsive';

const FooterLogo = () => {
    return (
        <View style={styles.container}>
            <Image
                source={images.atts_logo_dark}
                style={styles.logo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent:'flex-end',
        padding:10
    },
    logo: {
        width: wp(14),
        height: hp(7),
        resizeMode: 'contain',
    },

});

export default FooterLogo;
