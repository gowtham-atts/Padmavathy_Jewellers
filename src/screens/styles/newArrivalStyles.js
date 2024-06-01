import { StyleSheet, Dimensions } from 'react-native';
import { hp, rfpercentage, wp } from '../../utils/responsive';
import { COLORS, FONTS, colors } from '../../utils/constants';


const commonFontWeight = {
  fontWeight: '500'
}

const windowWidth = Dimensions.get('window').width;


const newArrivalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  flatListContainer: {
    marginBottom: hp(2),
    marginTop: hp(1),
  },
  columnWrapperStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  cardContainer: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: (windowWidth - 48) / 3, 
    margin:hp(1)
  },
  image: {
    width: wp('30%'), 
    height: hp('15%'),
    borderRadius: 8,
    overflow:'hidden'
  },

  productName: {
    marginTop: hp(1),
    color: colors.gray58,
    textAlign: 'center',
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: rfpercentage(2),
    ...commonFontWeight,
  },
  loadingIndicator: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height
  },
  noWishlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.8
  },
  emptyWishlistImage: {
    width: wp(16),
    height: hp(8),
    marginBottom: hp(2),
    resizeMode: 'contain',
  },
});

export default newArrivalStyles;
