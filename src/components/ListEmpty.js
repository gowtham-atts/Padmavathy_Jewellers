import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS } from '../utils/constants';
import { hp, rfpercentage, wp } from '../utils/responsive';

const ListEmpty = ({ empty }) => {
    return (
        <View style={styles.noWishlistContainer}>
            <Text style={styles.noWishlistText}>{empty}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    noWishlistContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height:Dimensions.get('window').height * 0.80
    },
    emptyWishlistImage: {
        width: wp(16),
        height: hp(8),
        resizeMode: 'contain',
    },
    noWishlistText: {
        fontSize: rfpercentage(2),
        fontFamily: FONTS.OUTFIT_BOLD,
        color: COLORS.TITLE_TEXT,
        fontWeight:'500'
    },

});

export default ListEmpty;
