import { Dimensions, StyleSheet } from 'react-native';
import { hp, responsiveImageSize, rfpercentage, wp } from '../../utils/responsive';
import { COLORS, FONTS, colors } from '../../utils/constants';


const commonFontWeight = {
    fontWeight: '500'
}

const ringImg = responsiveImageSize(350, 300);

const ringDesc = responsiveImageSize(80, 80);


const offerDetailStyles = StyleSheet.create({
    container: {
        backgroundColor:COLORS.WHITE,
        flex:1
    },
    cardCtnr: {
        flex: 1,
        borderRadius: 8,
        alignItems:'center',
        alignSelf: 'center',
    },
    descCard: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        borderRadius:8,
        overflow:'hidden',
        marginHorizontal:hp(2),
        marginVertical:hp(2)
    },
    contentCard: {
        borderRadius: 8,
        gap: 10,
        padding: 6,
        margin: 10,
    },
    socialCard: {
        marginLeft: 10,
        marginBottom: hp(3),
        marginTop: hp(2)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 5,
    },
    titleText: {
        fontSize: rfpercentage(2.8),
        ...commonFontWeight,
        color: COLORS.DARK_PRIMARY,
        fontFamily: FONTS.OUTFIT_MEDIUM,
        textTransform: 'capitalize'
    },
    descText: {
        fontSize: rfpercentage(2.2),
        ...commonFontWeight,
        color: '#B7B7B7',
        fontFamily: FONTS.OUTFIT_MEDIUM,
        textTransform: 'capitalize'
    },
    subtitleText: {
        fontSize: rfpercentage(2.2),
        fontFamily: FONTS.OUTFIT_BOLD,
        color: COLORS.DARK_PRIMARY,
        ...commonFontWeight
    },
    priceText: {
        fontSize: rfpercentage(2.2),
        ...commonFontWeight
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    thirdButton: {
        padding: 8,
    },
    socialCntr: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap:20,
        marginTop:hp(2)
    },
    mainImg: {
        width:wp('100%'),
        height:hp('50%'),
        resizeMode: 'cover',
        alignSelf:'center'
    },
    subImg: {
        ...ringDesc,
        resizeMode: 'cover',
        borderRadius: 10
    },
    enquiryAlign: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    enquiryTxt: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(2),
        color: '#292929',
        ...commonFontWeight,
        textAlign:'center',
        marginTop:hp(1)
    },
    loadingIndicator: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noWishlistContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyWishlistImage: {
        width: hp(10),
        height: hp(10),
        marginBottom: hp(2),
        resizeMode: 'contain',
    },
    noWishlistText: {
        fontSize: rfpercentage(2),
        fontFamily: FONTS.OUTFIT_BOLD,
        color: COLORS.TEXT_COLOR,
    },

});

export default offerDetailStyles;
