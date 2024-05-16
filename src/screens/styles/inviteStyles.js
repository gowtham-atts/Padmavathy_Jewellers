import { StyleSheet } from 'react-native';
import { hp, rfpercentage, wp } from '../../utils/responsive';
import { COLORS, FONTS, colors } from '../../utils/constants';



const commonFontWeight = {
    fontWeight: '500'
}

const inviteStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,
        margin: 16,
        padding: 8
    },
    imageStyle: {
        width: 'auto',
        height: hp(50),
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 1,
        margin: 16,
    },
    descStyle: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(2),
        ...commonFontWeight,
        color: '#636363',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    titleStyle: {
        fontFamily: FONTS.OUTFIT_BOLD,
        fontSize: rfpercentage(2),
        ...commonFontWeight,
        color: COLORS.DARK_PRIMARY,
        textAlign: 'center',
        marginTop: hp(1)
    },
    copyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        width: wp(60),
        marginTop: hp(2),
    },
    textcntr: {
        fontFamily: FONTS.OUTFIT_BOLD,
        fontSize: rfpercentage(1.8),
        ...commonFontWeight,
        color:colors.gray58,
        textAlign: 'center',
        marginTop: hp(2),
    }

});

export default inviteStyles;
