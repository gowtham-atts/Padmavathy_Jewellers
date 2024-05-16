import { StyleSheet } from 'react-native';
import { hp, responsiveImageSize, rfpercentage, wp } from '../../utils/responsive';
import { COLORS, FONTS } from '../../utils/constants';


const commonFontWeight = {
    fontWeight: '500'
}

const myWalletStyles = StyleSheet.create({
  container: {
    flex: 1,
},
totalWt:{
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: rfpercentage(2.2),
    ...commonFontWeight,
    color: "#9FA2AB"
},

subTitle: {
    fontFamily: FONTS.OUTFIT_BOLD,
    fontSize: rfpercentage(2.2),
    ...commonFontWeight,
    color:COLORS.DARK_PRIMARY
},

walletContainer:{
    marginTop:hp(2), 
    flexDirection: 'row', 
    justifyContent:'space-around', 
    alignItems: 'center'
},

walletRow: {
    flexDirection: 'column',
    alignItems:'center',
    gap:5
},

goldRateHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

});

export default myWalletStyles;
