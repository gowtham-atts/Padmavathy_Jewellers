import { Platform, StyleSheet } from 'react-native';
import { hp, responsiveHeight, responsiveWidth, rfpercentage, scale, scaleFont, wp } from '../../utils/responsive';
import { COLORS, FONTS, colors } from '../../utils/constants';


const commonFontFamily = {
    fontFamily: FONTS.OUTFIT_BOLD
}

const registerStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    logo:{
        width: wp('40%'), height: hp('10%'), resizeMode: 'contain'
    },
    headerText: {
        ...commonFontFamily,
        fontSize: scaleFont(12),
        fontWeight: '500',
        color: COLORS.TITLE_TEXT,
        textAlign: 'center',
        marginBottom: responsiveHeight(1)
    },
    headerText2: {
        ...commonFontFamily,
        fontSize: rfpercentage(3.5),
        fontWeight: '700',
        fontStyle: 'normal',
        color: colors.black_clr,
        textAlign:'center'
    },
    subHeader2: {
        fontFamily: FONTS.OUTFIT_LIGHT,
        fontSize: rfpercentage(2.2),
        fontWeight: 'bold',
        color: "#8D8D8D",
        marginTop: responsiveHeight(1)
    },
    contentText: {
        ...commonFontFamily,
        fontSize: scaleFont(10),
        fontWeight: '500',
        color: COLORS.CONTENT_TEXT,
        textAlign: 'center',
        marginBottom: responsiveHeight(4)
    },
    contentSpace: {
        marginTop: responsiveHeight(1)
    },
    userTitle: {
        ...commonFontFamily,
        fontSize: scaleFont(14),
        fontWeight: '500',
        color: COLORS.DARK_PRIMARY,
        textAlign: 'left',
        marginBottom: responsiveHeight(1)
    },
    passTitle: {
        ...commonFontFamily,
        fontSize: scaleFont(14),
        fontWeight: '500',
        color: COLORS.DARK_PRIMARY,
        textAlign: 'left',
        marginBottom: responsiveHeight(1)
    },
    input: {
        width: 'auto',
        flex: 1,
        padding:Platform.OS === 'ios' ? 8 : 6,
        backgroundColor:'#F1F1F1',
        borderRadius: 10
    },
    inputText: {
        color: COLORS.DARK_PRIMARY,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        fontFamily: FONTS.OUTFIT_MEDIUM
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        marginTop: hp(6)
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
    forgotText: {
        color: COLORS.DARK_PRIMARY,
        fontSize: scaleFont(14),
        fontWeight: '500',
        fontFamily: 'Outfit-Medium',
        textAlign: 'right'
    },
    errorText: {
        color: COLORS.ERROR,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        paddingVertical: hp(0.5),
        textAlign: 'left'
    },
    optionalText:{
        color: colors.gray58,
        fontSize: rfpercentage(1.6),
        fontWeight: '500',
        fontFamily:FONTS.OUTFIT_MEDIUM,
        textAlign:'right',
        marginTop:hp(0.6)
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginTop: hp(1),
    },
    checkbox: {
        marginRight: 10,
    },
    checkboxLabel: {
        fontSize: scaleFont(14),
        fontWeight: '400',
        fontFamily: FONTS.OUTFIT_MEDIUM,
        color: COLORS.TEXT
    },
    terms: {
        fontSize: scaleFont(14),
        fontWeight: '400',
        fontFamily: FONTS.OUTFIT_MEDIUM,
        color: 'blue',
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
        color: '#333',
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
        color: '#333',
    }

});

export default registerStyles;
