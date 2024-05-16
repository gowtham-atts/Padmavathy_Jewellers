import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import DetailsHeader from '../components/DetailsHeader';
import { COLORS, FONTS, FONT_SIZES } from '../utils/constants';
import { hp, responsiveWidth } from '../utils/responsive';
import { Iconify } from 'react-native-iconify';

const PaymentPendingScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <DetailsHeader
                title="Payment"
                onBackPress={() => {
                    navigation.goBack();
                }}
                onNotifyPress={() => {
                    navigation.navigate('Notification');
                }}
                onWishlistPress={() => {
                    navigation.navigate('WishList');
                }}
            />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <ImageBackground style={styles.icon} source={require('../assets/shanthi_jellewery/wait.png')} >
                            <Image style={styles.humbleIcon} source={require('../assets/shanthi_jellewery/humbleicons.png')} />
                        </ImageBackground>
                    </View>

                    <View style={{ alignItems: 'center', bottom: 30 }}>
                        <Text style={styles.totalTxt}>Payment Total</Text>
                        <Text style={styles.totalSubTxt}>$1000</Text>
                    </View>

                    <View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.detailLabel}>Date</Text>
                            <Text style={styles.detailValue}>2024-01-11</Text>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.detailLabel}>Scheme</Text>
                            <Text style={styles.detailValue}>Gold</Text>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.detailLabel}>Payment ID</Text>
                            <Text style={styles.detailValue}>123456</Text>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.detailLabel}>Payment Status</Text>
                            <Text style={styles.detailValue}>Pending</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ marginTop: hp(1) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Iconify icon='majesticons:clock-line' size={24} color={'#FAB019'} />
                    <Text style={styles.paytxt}>Payment Verification in Waiting. Please Wait Until the Status{'\n'}Changes to Success</Text>
                </View>
            </View>

            <View style={{ flex: 0.4 }}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#1B243D' }]}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.buttonText}>Go to Dashboard</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        width: responsiveWidth(90),
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 3,
        padding: 20,
        alignSelf: 'center',
    },
    cardHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 60
    },
    icon: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center'
    },
    humbleIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontWeight: '500'
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    detailLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontWeight: '500'
    },
    detailValue: {
        fontSize: 16,
        color: '#666',
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontWeight: '500'
    },
    detailLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontWeight: '500'
    },
    totalTxt: {
        fontSize: 16,
        color: '#666',
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontWeight: '500'
    },
    totalSubTxt: {
        fontSize: FONT_SIZES.EXTRA_LARGE,
        color: COLORS.DARK_PRIMARY,
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontWeight: '500'
    },
    button: {
        marginTop: 20,
        padding: 12,
        borderRadius: 10,
        width: responsiveWidth(60),
        alignItems: 'center',
        alignSelf: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontWeight: '500'
    },
    paytxt: {
        fontSize: FONT_SIZES.SMALL,
        color: COLORS.DARK_PRIMARY,
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontWeight: '500',
        marginLeft: 7
    }
});

export default PaymentPendingScreen;
