import { Dimensions, StyleSheet } from 'react-native';
import { hp, rfpercentage, wp } from '../../utils/responsive';
import { COLORS, FONTS } from '../../utils/constants';



const myPlanStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS.WHITE
    },
    title: {
        fontFamily: FONTS.OUTFIT_BOLD,
        fontSize: rfpercentage(2),
        width:wp(58),
        fontWeight: '500',
        color: "#4F4F4F"
    },
    titleText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        color: COLORS.DARK_PRIMARY
    },
    profileHeader: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        color: '#979797',
    },
    profileHeaderTxt: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        color: '#4F4F4F',
    },
    iconCntr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatorText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        fontWeight: '500',
        color: COLORS.DARK_PRIMARY
    },
    touchableBtn: {
        width: wp(26),
        padding:8,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:hp('0.5%')
    },
    goldRateHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    submitButton: {
        width: wp(85),
        borderRadius: 10,
        padding:12,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: hp(2)
    },
    submitText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        color: COLORS.WHITE,
    },
    mnthText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.6),
        fontWeight: '500',
        color: COLORS.BLACK,
    },
    input: {
        width: wp(80),
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        margin: 6
    },
    inputText: {
        color: COLORS.TEXT,
        fontSize: rfpercentage(1.4),
        fontWeight: '500',
        fontFamily: FONTS.OUTFIT_MEDIUM
    },

    contentCard: {
        borderRadius: 8,
        elevation: 3,
        padding: 15,
        margin: 15
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        padding: 20,
        backgroundColor: COLORS.LIGHT_WHITE,
        width: wp(100),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: hp(2)
    },
    modalTitle: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(2.2),
        fontWeight: '500',
        color: COLORS.DARK_PRIMARY,
        width: wp(60)
    },
    modalSubContent: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        fontWeight: '500',
        color: "#666666"
    },
    contentText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        textTransform: 'uppercase',
        color: "#666666"
    },
    durationcntr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(2),
    },
    durationStyle: {
        backgroundColor: '#CCE3D6',
        width: 'auto',
        padding: 5,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingIndicator: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        height:Dimensions.get('window').height
    },
    noWishlistContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height:Dimensions.get('window').height * 0.60
    },
    emptyWishlistImage: {
        width: wp(16),
        height: hp(8),
        marginBottom: hp(2),
        resizeMode: 'contain',
    },
    noWishlistText: {
        fontSize: rfpercentage(2),
        fontFamily: FONTS.OUTFIT_BOLD,
        color: COLORS.TITLE_TEXT,
    },


});

export default myPlanStyles;
