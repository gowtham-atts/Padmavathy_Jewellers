import { StyleSheet } from 'react-native';
import { hp, rfpercentage, wp } from '../../utils/responsive';
import { COLORS, FONTS } from '../../utils/constants';


const commonFontFamily = {
    fontFamily: FONTS.OUTFIT_MEDIUM
}


const commonFontWeight = {
    fontWeight: '500'
}

const avator = responsiveImageSize(100, 100);

const contactusStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageStyle: {
        ...avator,
    },
    titleStyle: {
        fontFamily: FONTS.OUTFIT_BOLD,
        fontSize: rfpercentage(1.6),
        ...commonFontWeight,
        color: COLORS.DARK_PRIMARY,
    },
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,
        margin: 16,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    msgContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,
        margin: 16,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    textContainer: {
        flex: 1,
        paddingLeft: 12,
    },
    copyContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 6,
    },
    copytxt: {
        ...commonFontFamily,
        fontSize: rfpercentage(1.4),
        ...commonFontWeight,
        marginLeft: 6,
    },
    input: {
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        color: COLORS.TEXT,
    },
    buttonContainer: {
        marginTop: hp(2),
        width: wp(90),
        alignSelf: 'center',
        marginBottom: hp(2),
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
        fontSize: rfpercentage(1.6),
        fontFamily: FONTS.OUTFIT_BOLD,
        color: COLORS.TEXT_COLOR,
        ...commonFontWeight
    },
    errorText: {
        color: COLORS.ERROR,
        fontSize: rfpercentage(14),
        ...commonFontWeight,
        paddingVertical: rfpercentage(1),
        textAlign: 'left',
        marginLeft: hp(2)
    }
});

export default contactusStyles;
