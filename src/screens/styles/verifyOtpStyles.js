import { StyleSheet } from 'react-native';
import { hp, responsiveHeight, responsiveWidth, rfpercentage, scale, scaleFont, wp } from '../../utils/responsive';
import { COLORS, FONTS } from '../../utils/constants';


const commonFontFamily = {
    fontFamily: FONTS.OUTFIT_BOLD
}

const verifyOtpStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    headerText: {
        ...commonFontFamily,
        fontSize: rfpercentage(3),
        fontWeight: '500',
        color: COLORS.TITLE_TEXT,
        textAlign: 'center',
        marginBottom: responsiveHeight(8)
    },
    contentText: {
        ...commonFontFamily,
        fontSize: scaleFont(10),
        fontWeight: '500',
        color: COLORS.CONTENT_TEXT,
        textAlign: 'center',
        marginBottom: responsiveHeight(4)
    },
    userTitle: {
        ...commonFontFamily,
        fontSize: rfpercentage(1.8),
        fontWeight: '500',
        color: COLORS.DARK_PRIMARY,
        textAlign: 'center',
        marginBottom: responsiveHeight(1)
    },
    passTitle: {
        ...commonFontFamily,
        fontSize: scaleFont(14),
        fontWeight: '500',
        color: COLORS.DARK_PRIMARY,
        textAlign: 'left',
        marginTop: responsiveHeight(2)
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:responsiveHeight(3),
    },
    otpInput: {
        width: wp('10%'),
        height:hp('5%'),
        borderWidth: 1,
        borderRadius: 8,
        marginHorizontal: 5,
        textAlign: 'center',
        fontSize: 18,
        color:COLORS.DARK_PRIMARY
    },
    input: {
        width: responsiveWidth(90),
    },
    inputText: {
        color: COLORS.TEXT,
        fontSize: scaleFont(14),
        fontWeight: '500',
        fontFamily: FONTS.OUTFIT_MEDIUM
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scale(10),
        marginBottom: responsiveHeight(1)
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
    },
    eyeIconImage: {
        width: 20,
        height: 20,
    },
    buttonContainer: {
        marginTop:responsiveHeight(3),
        marginLeft:responsiveHeight(3),
        marginRight:responsiveHeight(3)
    },
    button: {
        backgroundColor: '#3498db',
        padding: 4,
        paddingLeft: scale(30),
        paddingRight: scale(30),
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: scaleFont(16),
        fontWeight: 'bold',
    },
    newUser: {
        color: COLORS.SECONDARY,
        fontSize: scaleFont(14),
        fontWeight: '500',
        fontFamily: FONTS.OUTFIT_MEDIUM,
        textAlign: 'center'
    },
    createAcc: {
        color: COLORS.PRIMARY,
        fontSize: scaleFont(14),
        fontWeight: '500',
        fontFamily: FONTS.OUTFIT_BOLD,
    },
    resendButton: {
        marginTop: 10,
        paddingVertical: 10,
        marginTop:responsiveHeight(4)
    },
    resendButtonText: {
        textAlign:'center',
        color: COLORS.DARK_PRIMARY,
        fontSize: scaleFont(14),
        fontWeight: '500',
        fontFamily: FONTS.OUTFIT_MEDIUM
    },
    forgotText: {
        color: COLORS.DARK_PRIMARY,
        fontSize: scaleFont(14),
        fontWeight: '500',
        fontFamily: 'Outfit-Medium',
        textAlign: 'center'
    },
    errorText: {
        color: COLORS.ERROR,
        fontSize: scaleFont(14),
        fontWeight: '500',
        paddingVertical: scale(4),
        textAlign: 'left'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: scale(15),
    },
    checkbox: {
        marginRight: 10,
    },
    checkboxLabel: {
        fontSize: scaleFont(16),
        fontWeight: '400',
        color: COLORS.TEXT
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        padding: 20,
        backgroundColor: COLORS.LIGHT_WHITE,
        height: responsiveHeight(60),
        width: responsiveWidth(100),
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    scrollwidth: {
        backgroundColor: '#CFCFCF',
        padding: 2,
        width: responsiveWidth(15),
        alignSelf: 'center',
        marginBottom: responsiveHeight(2)
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    modalButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#3498db',
        borderRadius: 5,
        alignSelf: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default verifyOtpStyles;
