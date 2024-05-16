import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, colors } from '../utils/constants';
import DetailsHeader from '../components/DetailsHeader';
import { useSelector } from 'react-redux';
import { selectExtendScheme } from '../features/payEMI/payEMISlice';
import { hp, rfpercentage, wp } from '../utils/responsive';
import { getData } from '../utils/storage';
import paymentService from '../services/paymentService';
import Toast from 'react-native-simple-toast';

const completeaccount = [
    {
        "scheme_name": "FIXED AMOUNT TO WEIGHT (GOLD)",
        "scheme_type": "6",
        "amount": "550.00",
        "id_scheme_account": "1",
        "min_amount": "500.00",
        "max_amount": "1000.00",
        "min_weight": "0.000",
        "max_weight": "0.000",
        "total_installments": "6",
        "scheme_acc_number": "FIXWGT-2",
        "account_name": "MAHA"
    },
    {
        "scheme_name": "FIXED AMOUNT TO WEIGHT (GOLD)",
        "scheme_type": "6",
        "amount": "650.00",
        "id_scheme_account": "2",
        "min_amount": "500.00",
        "max_amount": "1000.00",
        "min_weight": "0.000",
        "max_weight": "0.000",
        "total_installments": "7",
        "scheme_acc_number": "FIXWGT-2",
        "account_name": "MAHA"
    },

];

const ExtendedScheme = ({ navigation }) => {
    const [selectedSchemes, setSelectedSchemes] = useState([]);

    const extendData = useSelector(selectExtendScheme)

    const renderScheme = ({ item }) => (
        <TouchableOpacity onPress={() => toggleSelectScheme(item)}>
            <View style={[styles.schemeItem, isSelectedScheme(item) ? styles.selectedSchemeItem : null]}>
                <Text style={styles.schemeName}>Scheme Name: {item.scheme_name}</Text>
                <Text style={styles.schemeDetails}>Account Name: {item.account_name}</Text>
                <Text style={styles.schemeDetails}>Paid Amount: {item.amount}</Text>
                <Text style={styles.schemeDetails}>Payable: {`₹ ${item.min_amount} - ₹ ${item.max_amount}`}</Text>
                <Text style={styles.schemeDetails}>Extend Installment: {item.total_installments}</Text>
            </View>
        </TouchableOpacity>
    );

    const toggleSelectScheme = (scheme) => {
        const selectedIndex = selectedSchemes.findIndex((selectedScheme) => selectedScheme.id_scheme_account === scheme.id_scheme_account);
        if (selectedIndex === -1) {
            setSelectedSchemes([...selectedSchemes, scheme]);
        } else {
            setSelectedSchemes(selectedSchemes.filter((_, index) => index !== selectedIndex));
        }
    };


    const isSelectedScheme = (scheme) => {
        return selectedSchemes.some((selectedScheme) => selectedScheme.id_scheme_account === scheme.id_scheme_account);
    };

    const handleExtendScheme = async () => {
        const selectedAccScheme = [];

        selectedSchemes.forEach(scheme => {
            const selectedScheme = {
                id_scheme_account: scheme.id_scheme_account,
            };
            selectedAccScheme.push(selectedScheme);
        });


        try {
            const customerId = await getData('customerId');
            const payload = {
                id_customer: customerId,
                schemeaccount: selectedAccScheme
            };
            const response = await paymentService.extendPayment(payload);
            if(response?.status === "Success"){
               Toast.show(response?.message, Toast.BOTTOM);
               navigation.replace('Home')
            }
        } catch (error) {
            console.error('Error in successCallApi:', error);
            throw error;
        }
    }

    return (
        <View style={styles.container}>

            <DetailsHeader
                title="Extend Scheme"
                onBackPress={() => navigation.goBack()}
                onNotifyPress={() => navigation.navigate('Notification')}
                onWishlistPress={() => navigation.navigate('WishList')}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View>
                    <FlatList
                        data={completeaccount}
                        keyExtractor={(item) => item.id_scheme_account.toString()}
                        renderItem={renderScheme}
                        style={styles.flatContainer}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity
                style={[styles.button, !selectedSchemes.length ? styles.disabledButton : null]}
                onPress={handleExtendScheme}
                disabled={!selectedSchemes.length}
            >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flatContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        padding: 10,
        marginBottom: hp(20)
    },
    schemeItem: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        elevation: 2,
    },
    selectedSchemeItem: {
        borderColor: COLORS.DARK_PRIMARY,
        borderWidth: 2,
    },
    schemeName: {
        fontFamily: FONTS.OUTFIT_BOLD,
        fontSize: rfpercentage(2),
        color:COLORS.DARK_PRIMARY,
        fontWeight:'500',
        marginBottom: 5,
    },
    schemeDetails: {
        fontFamily: FONTS.OUTFIT_REGULAR,
        fontSize: rfpercentage(2),
        fontWeight:'500',
        color: COLORS.DARK_PRIMARY,
    },
    button: {
        position: 'absolute',
        bottom: hp(12),
        backgroundColor: colors.gradientBg,
        paddingVertical: 12,
        width: wp(90),
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontFamily: FONTS.OUTFIT_BOLD,
        fontSize: rfpercentage(2),
        fontWeight:'500',
        color: COLORS.WHITE,
    },
    disabledButton: {
        opacity: 0.5, 
    },
});

export default ExtendedScheme;
