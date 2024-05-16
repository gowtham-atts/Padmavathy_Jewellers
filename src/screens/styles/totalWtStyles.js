import { Dimensions, StyleSheet } from 'react-native';
import { hp, responsiveImageSize, rfpercentage, wp } from '../../utils/responsive';
import { COLORS, FONTS } from '../../utils/constants';

const img = responsiveImageSize(300, 200);


const commonFontWeight = {
    fontWeight: '500'
}

const totalWtStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS.WHITE
    },
    totalWt: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color: "#9FA2AB"
    },
    title: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color: "#666666"
    },
    subTitle: {
        fontFamily: FONTS.OUTFIT_BOLD,
        fontSize: rfpercentage(2.8),
        ...commonFontWeight,
        color: COLORS.DARK_PRIMARY
    },
    titleText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color: "#666666"
    },
    profileHeaderTxt: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color: "#979797",
    },

    iconCntr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    avatorText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color: COLORS.DARK_PRIMARY
    },
    touchableBtn: {
        backgroundColor: '#D7F7D4',
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
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color: COLORS.DARK_PRIMARY
    },
    statusTxt: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight
    },
    input: {
        width: wp(80),
        height: 40,
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
        alignItems: 'center'
    },
    modalContent: {
        padding: 20,
        backgroundColor: COLORS.LIGHT_WHITE,
        width: wp(100),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    headtltle: {
        fontFamily: FONTS.OUTFIT_BOLD,
        fontSize: rfpercentage(2.2),
        ...commonFontWeight,
        color: COLORS.DARK_PRIMARY,
    },
    modalTitle: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(2),
        ...commonFontWeight,
        color: COLORS.DARK_PRIMARY,
    },
    transactionTxt: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color: '#C7C7C7',
    },
    modalSubContent: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color: "#666666"
    },
    contentText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color: COLORS.PRIMARY
    },
    durationcntr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(2),
    },
    durationStyle: {
        // backgroundColor: '#CCE3D6',
        width: 'auto',
        borderRadius: 15,
        padding: 2,
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
        height:Dimensions.get('window').height * 0.50
    },
    emptyWishlistImage: {
        width: wp(10),
        height: hp(10),
        marginBottom: hp(2),
        resizeMode: 'contain',
    },
    noWishlistText: {
        fontSize: rfpercentage(1.8),
        fontFamily: FONTS.OUTFIT_BOLD,
        color: COLORS.DARK_PRIMARY,
    },

    transactionCard: {
        padding: 6,
        marginTop: hp(1)
    },
    goldRateHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }


});

export default totalWtStyles;
