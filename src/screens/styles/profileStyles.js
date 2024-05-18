import { StyleSheet } from 'react-native';
import { hp, imageBorderRadius, imageHeight, imageWidth, responsiveImageSize, rfpercentage, wp } from '../../utils/responsive';
import { COLORS, FONTS, colors } from '../../utils/constants';



const commonFontWeight = {
    fontWeight: '500'
}



const avator = responsiveImageSize(100, 50);


const profileStyles = StyleSheet.create({
   
    container: {
        flex: 1,
        backgroundColor:COLORS.WHITE
     },
     login_bg:{
      width:"100%",
      height:"100%"
     },
     titleStyle: {
       fontFamily: FONTS.OUTFIT_BOLD,
       fontSize: rfpercentage(2.2),
       ...commonFontWeight,
       color: COLORS.DARK_PRIMARY,
     },
     profileHeaderTxt: {
       fontFamily: FONTS.OUTFIT_MEDIUM,
       fontSize: rfpercentage(2.5),
       ...commonFontWeight,
       color:COLORS.DARK_PRIMARY,
     },
     signup: {
      fontFamily: FONTS.OUTFIT_MEDIUM,
      fontSize: rfpercentage(2.4),
      ...commonFontWeight,
      color: colors.gradientBg,
      padding:10
    },
     itemheaderTxt: {
       fontFamily: FONTS.OUTFIT_MEDIUM,
       fontSize: rfpercentage(2.4),
       ...commonFontWeight,
       color: COLORS.DARK_PRIMARY,
       padding:10
     },
     descStyle: {
       fontFamily: FONTS.OUTFIT_MEDIUM,
       fontSize: rfpercentage(1.8),
       ...commonFontWeight,
       color: COLORS.DARK_PRIMARY,
     },
     iconCntr: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       marginTop: hp(2),
     },
     iconRow: {
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
     },
     notifyItem: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
     },
     iconBorder: {
       padding: 3,
       borderColor: '#B6B6B6',
       borderWidth: 1,
       borderRadius: 15
     },
     avatar: {
      width:imageWidth * 0.60,
      height:imageHeight * 0.60,
      borderRadius:imageBorderRadius,
   },
     notify: {
        width:wp(5),
        height:hp(2.5),
        resizeMode: 'contain',
     },
   
     iconImg:{
      width:wp(6),
      height:hp(3),
      resizeMode:'contain',
   },
   arrowImg: {
       width: wp(8),
       height: hp(4),
       resizeMode: 'contain'
   },
   deleteTxt: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: rfpercentage(2.4),
    ...commonFontWeight,
    color: '#D91111',
    padding:10
  },


});

export default profileStyles;
