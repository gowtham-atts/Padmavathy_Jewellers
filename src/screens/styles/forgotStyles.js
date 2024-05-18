import { StyleSheet } from 'react-native';
import { rfpercentage, hp, wp } from '../../utils/responsive';
import { COLORS, FONTS, colors } from '../../utils/constants';


const commonFontFamily = {
    fontFamily: FONTS.OUTFIT_BOLD
}

const forgotStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    login_bg:{
        width:"100%",
        height:"100%"
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    header: {
        ...commonFontFamily,
        fontSize: rfpercentage(12),
        fontWeight: '500',
        color: COLORS.TITLE_TEXT,
        marginTop:hp(2)
    },
    headerText: {
        ...commonFontFamily,
        fontSize: rfpercentage(2.6),
        fontWeight: '500',
        color: COLORS.TITLE_TEXT,
        marginTop:hp(2),
        textAlign:'center'
    },
    contentText: {
        ...commonFontFamily,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        color: COLORS.CONTENT_TEXT,
        textAlign: 'center',
        marginBottom: hp(2)
    },
    userTitle: {
        ...commonFontFamily,
        fontSize:rfpercentage(2.2),
        fontWeight: '500',
        color: COLORS.DARK_PRIMARY,
        textAlign: 'left',
        marginBottom: hp(1)
    },
    passTitle: {
        ...commonFontFamily,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        color: COLORS.DARK_PRIMARY,
        textAlign: 'left',
        marginTop: hp(2)
    },
    input: {
        width: wp('90%'),
        alignSelf:'center',
        flex:1
    },
    inputText: {
        color: COLORS.TEXT,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        fontFamily:FONTS.OUTFIT_MEDIUM
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(10),
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
        marginTop: hp('10%'),
        width:wp('90%'),
        alignSelf:'center'
    },
    back:{
        fontFamily:FONTS.OUTFIT_BOLD,
        fontSize:rfpercentage(2.2),
        fontWeight:'500',
        color:colors.gray58
      },
    button: {
        backgroundColor: '#3498db',
        padding: 4,
        paddingLeft: hp(30),
        paddingRight: hp(30),
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: rfpercentage(2),
        fontWeight: 'bold',
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
        padding:20,
        textAlign:'left'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: hp(15),
    },
    checkbox: {
        marginRight: 10,
    },
    checkboxLabel: {
        fontSize: rfpercentage(2),
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
        height: hp(60),
        width: wp(100),
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    scrollwidth: {
        backgroundColor: '#CFCFCF',
        padding: 2,
        width: wp(15),
        alignSelf: 'center',
        marginBottom: hp(2)
    },
    modalText: {
        fontSize:rfpercentage(2),
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

export default forgotStyles;
