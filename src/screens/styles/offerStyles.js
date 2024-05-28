import { Dimensions, StyleSheet } from 'react-native';
import { hp, rfpercentage, wp } from '../../utils/responsive';
import { COLORS, FONTS, colors } from '../../utils/constants';


const commonFontWeight = {
    fontWeight: '500',
}

const windowWidth = Dimensions.get('window').width;


const offerStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS.WHITE
      },
      login_bg:{
        width:"100%",
        height:"100%"
     },
      title: {
        fontSize: rfpercentage(2.8),
        fontFamily: FONTS.OUTFIT_MEDIUM,
        ...commonFontWeight,
        color: COLORS.DARK_PRIMARY
      },
      carouselContainer: {
        marginTop: hp(3),
      },
      noWishlistContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyWishlistImage: {
        width: wp(10),
        height: hp(10),
        marginBottom: hp(2),
        resizeMode: 'contain',
      },
      noWishlistText: {
        fontSize: rfpercentage(1.6),
        fontFamily: FONTS.OUTFIT_BOLD,
        ...commonFontWeight,
        color: COLORS.TEXT_COLOR,
      },
      cardContainer: {
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: (windowWidth - 48) / 3, 
        aspectRatio: 0.8,
        margin: hp(1)
      },
      image: {
        width: wp('30%'), 
        height: hp('15%'),
        borderRadius: 8,
        overflow:'hidden'
      },
      columnWrapperStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      productName: {
        marginTop: 5,
        color: colors.gray58,
        textAlign: 'center',
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(2),
        ...commonFontWeight,
        textTransform:'capitalize'
      },


      loadingContainer: {
        position: 'absolute',
        left: '40%',
        top: '40%',
        backgroundColor: COLORS.BLACK, 
        borderRadius: 12, 
        width:wp('20%'),
        height:hp('10%'),
        zIndex:10
     },
    
      loadingIndicator: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
      },

});

export default offerStyles;
