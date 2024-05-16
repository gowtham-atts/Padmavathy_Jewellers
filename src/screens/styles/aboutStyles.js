import { StyleSheet } from 'react-native';
import { hp, responsiveImageSize, rfpercentage, wp } from '../../utils/responsive';
import { COLORS, FONTS, FONTWEIGHT, FONT_SIZES } from '../../utils/constants';


const commonFontFamily = {
    fontFamily: FONTS.OUTFIT_MEDIUM
}

const avator = responsiveImageSize(350, 200);


const aboutStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS.WHITE
    },
    imageStyle: {
        width:wp('90%'),
        height:hp('45%'),
        borderRadius: 8,
        overflow: 'hidden',
        alignSelf: 'center'
    },
    titleStyle: {
        ...commonFontFamily,
        fontSize: rfpercentage(2),
        width: wp(38),
        fontWeight:FONTWEIGHT.NORMAL,
        color: COLORS.DARK_PRIMARY,
        paddingLeft: 20,
        paddingRight: 20,
    },

    copyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    copytxt: {
        ...commonFontFamily,
        fontSize: rfpercentage(2),
        fontWeight:FONTWEIGHT.NORMAL,
        color: '#878787',
        textAlign:'justify'
    },
    desContainer: {
        padding: 16,
        marginBottom:hp(10)
      },
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
     },
    poweredByLogo: {
        width: 45,
        height: 25,
        resizeMode: 'contain'
    },
    errorText: {
        fontSize: rfpercentage(2),
        fontFamily: FONTS.OUTFIT_MEDIUM,
        color: 'red',
        textAlign: 'center',
    },
});

export default aboutStyles;
