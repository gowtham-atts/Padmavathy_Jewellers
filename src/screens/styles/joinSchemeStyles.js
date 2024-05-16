import { Platform, StyleSheet } from 'react-native';
import { hp, rfpercentage, wp } from '../../utils/responsive';
import { COLORS, FONTS, colors } from '../../utils/constants';


const commonFontFamily = {
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


const joinSchemeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS.WHITE
    },
    userTitle: {
        ...commmonFontSize,
        ...commonFontWeight,
        ...BLACK,
        ...commonFontFamily
    },
    textAgree: {
        ...commonFontFamily,
        ...commmonFontSize,
        ...commonFontWeight,
        ...BLACK
    },
    termsText: {
        color: 'blue',
        ...commonFontFamily,
        ...commmonFontSize,
        ...commonFontWeight,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop:hp(2)
    },
    modalContent: {
        padding: 20,
        width: wp('90%'),
        borderColor:'#D4D4D4',
        borderWidth:1,
        borderRadius:6
    },
    modalTitle: {
        ...commonFontFamily,
        fontSize: rfpercentage(2),
        ...commonFontWeight,
        color: COLORS.DARK_PRIMARY,
    },
    profileHeaderTxt: {
        ...commonFontFamily,
        fontSize: rfpercentage(2),
        ...commonFontWeight,
        color: "#666666",
        marginLeft: 10
    },
    contentCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        margin: 15
    },
    iconBorder: {
        padding: 3,
        backgroundColor: COLORS.WHITE,
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: 10,
    },
    iconCntr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(2)
    },
    priceBtn: {
        padding: 6,
        backgroundColor: "#706FE5",
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto'
    },
    priceText: {
        ...commonFontFamily,
        ...commmonFontSize,
        ...commonFontWeight,
        color: '#202020'
    },
    submitButton: {
        backgroundColor: '#CCE3D6',
        width: wp(20),
        height: hp(3),
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    durationcntr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(4),
    },
    durationStyle: {
        backgroundColor: '#CCE3D6',
        width: wp(20),
        height: hp(3),
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitText: {
        ...commonFontFamily,
        fontSize: rfpercentage(1.5),
        ...commonFontWeight,
        color: "#202020",
        marginLeft: hp(0.4)
    },
    errorText: {
        color: COLORS.ERROR,
        fontSize: rfpercentage(1.8),
        fontWeight: '500',
        ...commonFontFamily,
        textAlign: 'left'
    },
    textInput: {
        borderColor: colors.gray58,
        borderWidth: 0.8,
        borderRadius: 6,
        padding:Platform.OS === 'ios' ? 16 : 8,
        paddingHorizontal: hp(1.5),
        marginVertical: hp(1),
        color:COLORS.BLACK,
        ...commonFontFamily,
        ...commmonFontSize,
        ...commonFontWeight
    },
    buttonContainer: {
        marginTop:hp(2)
    }

});

export default joinSchemeStyles;
