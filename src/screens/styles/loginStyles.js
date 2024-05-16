import { Platform, StyleSheet } from 'react-native';
import { hp, responsiveHeight, responsiveWidth, rfpercentage, scale, scaleFont, wp } from '../../utils/responsive';
import { COLORS, FONTS, colors } from '../../utils/constants';


const commonFontFamily = {
    fontFamily: FONTS.OUTFIT_BOLD
}

const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.white
    },
    logoContainer: {
        alignItems: 'center', 
        marginBottom: responsiveHeight(4), 
    },
    formContainer: {
        paddingHorizontal: responsiveWidth(5), 
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    img_logo:{
        width: wp('40%'), 
        height: hp('10%'), 
        resizeMode: 'contain'
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    bgLogo: {
        width: wp(100),
        height: hp(100),
        resizeMode: 'contain'
    },
    headerText: {
        ...commonFontFamily,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        color: COLORS.TITLE_TEXT,
        textAlign: 'center',
        marginBottom: responsiveHeight(1)
    },
    headerText2: {
        ...commonFontFamily,
        fontSize: rfpercentage(3),
        fontWeight: '700',
        fontStyle:'normal',
        color: '#2D2B2E',
    },
    subHeader2: {
        fontFamily:FONTS.OUTFIT_BOLD,
        fontSize: rfpercentage(4),
        fontWeight: '500',
        color: colors.black_clr,
        textAlign:'center'
    },
    contentText: {
        ...commonFontFamily,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        color: COLORS.CONTENT_TEXT,
        textAlign: 'left',
        marginBottom: hp(4)
    },
    userTitle: {
        ...commonFontFamily,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        color: colors.headerclr,
        textAlign: 'left',
        marginBottom: hp(1)
    },
    passTitle: {
        ...commonFontFamily,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        color: colors.inputheader,
        textAlign: 'left',
        marginTop: hp(2)
    },
    input: {
        flex:1,
        backgroundColor:colors.placeholder,
        padding:Platform.OS === 'ios' ? 8 : 6
    },
    
    passInput: {
        flex:1,
        backgroundColor:colors.placeholder,
        padding:Platform.OS === 'ios' ? 8 : 6
    },
    inputText: {
        color: COLORS.TEXT,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        fontFamily:FONTS.OUTFIT_MEDIUM
    },
    passInputText: {
        color: COLORS.TEXT,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        fontFamily:FONTS.OUTFIT_MEDIUM
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(1),
        marginBottom: hp(1)
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
        marginTop: hp(4)
    },
    newUser: {
        color: COLORS.SECONDARY,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        fontFamily: FONTS.OUTFIT_MEDIUM,
        textAlign: 'center'
    },
    createAcc: {
        color: COLORS.PRIMARY,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        fontFamily: FONTS.OUTFIT_BOLD,
    },
    forgotText: {
        color: COLORS.DARK_PRIMARY,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        fontFamily: 'Outfit-Medium',
        textAlign: 'right'
    },
    errorText: {
        color: COLORS.ERROR,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        paddingVertical: hp(1),
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
        fontSize: rfpercentage(2.2),
        fontWeight: '400',
        color: colors.gray58,
        fontFamily:FONTS.OUTFIT_MEDIUM
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        padding: 20,
        backgroundColor: COLORS.LIGHT_WHITE,
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
    skipTxt:{
        fontSize: scaleFont(16),
        fontWeight: '400',
        color: colors.gray58,
        fontFamily:FONTS.OUTFIT_MEDIUM,
        margin:responsiveHeight(2),
        textAlign:"right"
    },
     // branch drop
     branchCtnr: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        overflow: 'hidden',
    }, 
    branchList: {
        maxHeight: 150,
    },
    dropdown: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    dropdownText: {
        fontSize: rfpercentage(1.8),
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontWeight: '500',
        color: '#333'
    },
    branchItem: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    branchText: {
        fontSize: rfpercentage(1.8),
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontWeight: '500',
        color: '#333'
    }
});

export default loginStyles;
