import { StyleSheet } from 'react-native';
import { hp, responsiveImageSize, rfpercentage, wp } from '../../utils/responsive';
import { COLORS, FONTS, colors } from '../../utils/constants';

const img = responsiveImageSize(300, 200);


const commonFontWeight = {
    fontWeight: '500'
}

const newPlanStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS.WHITE
    },
    titleText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(2.4),
        width: wp(60),
        ...commonFontWeight,
        textTransform: 'capitalize',
        color: "#4F4F4F"
    },
    profileHeaderTxt: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(2),
        ...commonFontWeight,
        color: colors.gray58,
        width: 'auto'
    },
    iconCntr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    submitButton: {
        width: wp(80),
        height: hp(5),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(2)
    },
    submitText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(2),
        ...commonFontWeight,
        color: COLORS.WHITE
    },
    imgStyle: {
        width:wp('100%'),
        height:hp(40),
        resizeMode:'contain'
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    subheadertxt: {
        fontSize: rfpercentage(3),
        ...commonFontWeight,
        color: COLORS.BLACK,
        fontFamily: FONTS.OUTFIT_MEDIUM
    },
    accordianContainer:{
        width: wp(90), 
        borderWidth:1,
        borderRadius:10,
        marginVertical:12,
        alignSelf: 'center'
    },
    accordionItem: {
        paddingHorizontal: 16, 
        paddingVertical: 12,
        borderRadius:10,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',        
    },
    accordionTitle: {
        fontSize: rfpercentage(2.2),
        fontFamily:FONTS.OUTFIT_MEDIUM, 
        fontWeight: 'bold', 
        textTransform:'capitalize' 
    },
    borderButtonStyle:{
        backgroundColor:colors.gradientBg,
        padding:8,
        borderRadius:10
    },
    arrowIcon: {
        width: wp('4%'), 
        height: hp('2%'),
        resizeMode:'contain',
    },
    accordionContent: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius:10
    },


});

export default newPlanStyles;
