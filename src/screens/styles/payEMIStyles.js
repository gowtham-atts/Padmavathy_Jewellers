import { Dimensions, StyleSheet } from 'react-native';
import { hp, responsiveImageSize, rfpercentage, wp } from '../../utils/responsive';
import { COLORS, FONTS, colors } from '../../utils/constants';

const img = responsiveImageSize(300, 200);


const commonFontWeight = {
    fontWeight: '500'
}

const payEMIStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS.WHITE
    },
    title: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(2),
        ...commonFontWeight,
        color: '#666666',
    },
    profileHeaderTxt: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color: '#979797',
    },
    payAmntTxt: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color: COLORS.BLACK,
    },
    rangeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputRange: {
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 5,
        paddingLeft: 10,
        borderRadius: 6,
        width: wp(20),
        height: 40,
    },
    input: {
        marginRight: 5,
        paddingLeft: 4,
        width: wp('20%'),
        fontSize: 16,
        height: 40,
        position: 'absolute',
        left: 0,
    },
    iconCntr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(1),
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.gradientBg,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonSelected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.gradientBg,
    },
    touchableBtn: {
        backgroundColor: COLORS.WHITE,
        width: wp(20),
        height: hp(5),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    payText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color: COLORS.BLACK,
    },
    contentText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color: COLORS.WHITE,
        marginLeft: 8
    },
    contentCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,
        padding: 15,
        margin: 15,
    },
    errorText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.6),
        ...commonFontWeight,
        color: 'red',
        textAlign: 'right',
        marginTop: hp(1),
    },
    goldRateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    paymentSummaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 10,
        marginBottom:hp(2)
    },
    summaryTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    separator: {
        width: 0.8,
        height: 25,
        backgroundColor: COLORS.WHITE,
        marginLeft: 8,
    },
    payNowButton: {
        backgroundColor: COLORS.WHITE,
        width: wp(20),
        height: hp(5),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingIndicator: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        height:Dimensions.get('window').height 
      },
    
    noWishlistContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height:Dimensions.get('window').height * 0.60
    },
    emptyWishlistImage: {
        width: hp(10),
        height: hp(10),
        marginBottom: hp(2),
        resizeMode: 'contain',
    },
    noWishlistText: {
        fontSize: rfpercentage(1.8),
        fontFamily: FONTS.OUTFIT_BOLD,
        color: COLORS.TEXT_COLOR,
    }

});

export default payEMIStyles;
