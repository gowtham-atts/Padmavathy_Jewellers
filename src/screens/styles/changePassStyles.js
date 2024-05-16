import { Platform, StyleSheet } from 'react-native';
import { hp, imageBorderRadius, imageHeight, imageWidth, responsiveImageSize, rfpercentage, wp } from '../../utils/responsive';
import { COLORS, FONTS, colors } from '../../utils/constants';


const mediumFont = {
    fontFamily: FONTS.OUTFIT_MEDIUM
}

const commmonFontSize = {
    fontSize: rfpercentage(1.8)
}

const commonFontWeight = {
    fontWeight: '500'
}

const BLACK = {
    color: COLORS.BLACK
}


const avator = responsiveImageSize(100, 100);


const changePassStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS.WHITE
    },
    titleText: {
        fontFamily: FONTS.OUTFIT_BOLD,
        fontSize: rfpercentage(1.6),
        ...commonFontWeight,
        color: COLORS.WHITE
    },
    profileHeaderTxt: {
        ...mediumFont,
        fontSize: rfpercentage(2.2),
        ...commonFontWeight,
        color: "#666666"
    },

    iconCntr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10
    },
    avatar: {
        width:imageWidth,
        height:imageHeight,
        borderRadius:imageBorderRadius,
    },
    avatorText: {
        ...mediumFont,
        fontSize: rfpercentage(2),
        ...commonFontWeight,
        color: COLORS.DARK_PRIMARY
    },
    submitButton: {
        backgroundColor: colors.gradientBg,
        width: wp(30),
        height: hp(5),
        borderRadius: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(3),
        marginRight: hp(6)
    },
    submitText: {
        ...mediumFont,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color: COLORS.WHITE
    },
    input: {
        width: wp(80),
        borderColor: colors.gray58,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        margin: 6,
        padding:Platform.OS === 'ios' ? 16 : 12
    },
    inputText: {
        color: COLORS.DARK_PRIMARY,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        ...mediumFont
    },
    errorTxt: {
        color: COLORS.ERROR,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        ...mediumFont,
        width: '80%',
        paddingLeft: wp(3)
    },

});

export default changePassStyles;
