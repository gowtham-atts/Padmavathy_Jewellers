import { Dimensions, StyleSheet } from 'react-native';
import { hp, rfpercentage, wp } from '../../utils/responsive';
import { COLORS, FONTS } from '../../utils/constants';


const commonFontFamily = {
    fontFamily: FONTS.OUTFIT_MEDIUM
}

const commonFontWeight = {
    fontWeight: '500'
}


const paymentHistoryStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS.WHITE
    },
    totalWt: {
        ...commonFontFamily,
        fontSize: rfpercentage(2),
        ...commonFontWeight,
        color: "#9FA2AB"
    },
    title: {
        ...commonFontFamily,
        fontSize: rfpercentage(2),
        ...commonFontWeight,
        color: "#666666"
    },
    subTitle: {
        fontFamily: FONTS.OUTFIT_BOLD,
        fontSize: rfpercentage(3),
        ...commonFontWeight,
        color: COLORS.DARK_PRIMARY
    },
    scheme: {
        fontFamily: FONTS.OUTFIT_BOLD,
        fontSize: rfpercentage(2.5),
        ...commonFontWeight,
        color: COLORS.DARK_PRIMARY,
        paddingLeft:hp(2)
    },
    titleText: {
        ...commonFontFamily,
        fontSize: rfpercentage(2),
        ...commonFontWeight,
        color: "#4F4F4F"
    },
    profileHeaderTxt: {
        ...commonFontFamily,
        fontSize: rfpercentage(2),
        ...commonFontWeight,
        color: "#979797",
    },
    iconCntr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(1)
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatorText: {
        ...commonFontFamily,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color: COLORS.DARK_PRIMARY
    },

    transactionCard: {
        // backgroundColor:COLORS.WHITE,
        borderRadius: 8,
        // elevation: 1,
        padding: 10,
        marginTop: hp(1)
    },
    touchableBtn: {
        width: wp(26),
        height: hp(5),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: COLORS.DARK_PRIMARY,
        width: wp(85),
        height: hp(5),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: hp(2)
    },
    submitText: {
        ...commonFontFamily,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color: COLORS.WHITE
    },
    input: {
        width: wp(80),
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        margin: 6
    },
    inputText: {
        color: COLORS.TEXT,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        fontFamily: FONTS.OUTFIT_MEDIUM
    },
    contentText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color: '#151E32'
    },
    contentCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,
        padding: 15,
        margin: 15
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        padding: 20,
        backgroundColor: COLORS.LIGHT_WHITE,
        width: wp(100),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    modalTitle: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(2.2),
        ...commonFontWeight,
        color: COLORS.DARK_PRIMARY
    },
    amttxt: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.6),
        ...commonFontWeight,
        color: '#C7C7C7'
    },
    durationcntr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    durationStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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
        height:Dimensions.get('window').height * 0.40
    },
    emptyWishlistImage: {
        width: wp(16),
        height: hp(8),
        marginBottom: hp(2),
        resizeMode: 'contain',
    },
    noWishlistText: {
        fontSize: rfpercentage(2),
        fontFamily: FONTS.OUTFIT_BOLD,
        color: COLORS.TEXT_COLOR,
        ...commonFontWeight
    },
    statusText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.4),
        ...commonFontWeight,
    },
    goldRateHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }

});

export default paymentHistoryStyles;
