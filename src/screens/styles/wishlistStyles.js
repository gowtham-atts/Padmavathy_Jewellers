import { Dimensions, StyleSheet } from 'react-native';
import { hp, rfpercentage, wp } from '../../utils/responsive';
import { COLORS, FONTS } from '../../utils/constants';


const commonFontFamily = {
    fontFamily: FONTS.OUTFIT_MEDIUM
}

const windowWidth = Dimensions.get('window').width;


const commonFontWeight = {
    fontWeight: '500'
}



const wishlistStyles = StyleSheet.create({

    container: {
        flex: 1,
    },
    productCardContainer: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth - 50) / 3,
        aspectRatio: 0.8,
        backgroundColor: COLORS.BACKGROUND,
        elevation: 2,
        margin: hp(1)
    },
    productImage: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        borderRadius: 8,
    },
    productName: {
        ...commonFontFamily,
        textTransform: 'capitalize',
        fontSize: rfpercentage(2),
        color: '#333333',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: rfpercentage(2),
        fontFamily: FONTS.OUTFIT_MEDIUM,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    loadingIndicator: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: rfpercentage(2.2),
        fontFamily: FONTS.OUTFIT_BOLD,
        ...commonFontWeight,
        color: COLORS.TEXT_COLOR,
    },
    columnWrapperStyle: {
        paddingHorizontal: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

});

export default wishlistStyles;
