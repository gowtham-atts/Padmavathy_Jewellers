import { Dimensions, StyleSheet } from 'react-native';
import { hp, rfpercentage, wp } from '../../utils/responsive';
import { COLORS, FONTS } from '../../utils/constants';


const commonFontFamily = {
    fontFamily: FONTS.OUTFIT_MEDIUM
}


const commonFontWeight = {
    fontWeight: '500'
}




const closedAccStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS.WHITE
    },
    totalWt:{
        ...commonFontFamily,
        fontSize: rfpercentage(2.4),
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
        fontSize: rfpercentage(3.0),
        ...commonFontWeight,
        color:COLORS.DARK_PRIMARY
    },
    titleText: {
        ...commonFontFamily,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        color: "#666666"
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
        alignItems: 'center'
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    avatorText: {
         ...commonFontFamily,
        fontSize: rfpercentage(1.4),
        ...commonFontWeight,
        color: COLORS.DARK_PRIMARY
    },
    touchableBtn: {
        backgroundColor: '#D7F7D4',
        width: wp('20%'),
        height: hp('4%'),
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
        fontSize: rfpercentage(1.4),
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
        fontSize: rfpercentage(14),
        ...commonFontWeight,
        ...commonFontFamily
    },
    contentText: {
        ...commonFontFamily,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color:COLORS.CONTENT_TEXT
    },
    contentCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,
        padding: 15,
        margin: 15
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
        width: wp(16),
        height: hp(8),
        marginBottom: hp(2),
        resizeMode: 'contain',
      },
      noWishlistText: {
        fontSize: rfpercentage(2),
        fontFamily: FONTS.OUTFIT_BOLD,
        color: COLORS.DARK_PRIMARY,
        ...commonFontWeight
      },

});

export default closedAccStyles;
