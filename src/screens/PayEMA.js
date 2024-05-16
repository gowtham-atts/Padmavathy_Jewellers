import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import payEMIStyles from './styles/payEMIStyles';
import ListEmpty from '../components/ListEmpty';
import DetailsHeader from '../components/DetailsHeader';
import Stepper from '../components/Stepper';
import { COLORS, colors, getMerchantKey, images, payEmaTextInputListByAmount, payEmaTextInputListByWeight, payEmaTotalAmountByShow, payEmaTotalWeightByShow } from '../utils/constants';
import newPlanService from '../services/newPlanService';
import { getData } from '../utils/storage';
import offerService from '../services/offerService';
import paymentService from '../services/paymentService';
import RazorpayCheckout from 'react-native-razorpay';
import { setExtendScheme } from '../features/payEMI/payEMISlice';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import Toast from 'react-native-simple-toast';
import { handleConfirmLogout } from '../utils/helpers';




const PayEMA = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [emaData, setEmaData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState([]);
    const [customerId, setCustomerId] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [todayGoldRate, setGoldRate] = useState(0);
    const [todaySliverRate, setSliverRate] = useState(0);
    const [error, setError] = useState('');
    const [wterror, setWtError] = useState('');
    const [flexwtError, setFlexWetError] = useState('');
    const [statusuccess, setStatusSuccess] = useState('');
    const [transactionId, setTranscationId] = useState('');
    const merchant_key = getMerchantKey();
    const [live_key, setLiveKey] = useState('');
    const [loadbutton, setLodebutton] = useState(false);



    const dispatch = useDispatch();



    const getGoldRate = async () => {
        const customerId = await getData('customerId');
        try {
            const payload = {
                id_customer: customerId,
            };
            const response = await offerService.getGoldRate(payload);
            setGoldRate(response.currentgold.goldrate_22ct)
            setSliverRate(response.currentgold.mjdmasilverrate_1gm)
        } catch (error) {
        }
    };

    useEffect(() => {
        fetchData();
        getGoldRate()
    }, []);

    useEffect(() => {

        let selectedData = [];

        if (emaData?.length > 0) {
            for (var i of emaData) {
                if (selectedIndex.includes(i.id_scheme_account)) {
                    let schemeData = {
                        "id_scheme_account": i.id_scheme_account,
                        "scheme_type": i.scheme_type,
                        "payable": i.payamount,
                        "noofinstallment": i.installments
                    }
                    selectedData.push(schemeData);
                }
            }
        }

        updateCalculateApi(selectedData);
    }, [selectedIndex, emaData]);



    const fetchData = async () => {
        try {
            const id = await AsyncStorage.getItem('customerId');
            if (id) {
                setCustomerId(id);
                fetchEmaData(id);
            } else {
                setError('Customer ID not found in AsyncStorage');
                navigation.replace('Login');
                setLoading(false);
            }
        } catch (error) {
            setError('Error fetching customer ID from AsyncStorage');
            setLoading(false);
        }
    };

    const fetchEmaData = async (customerId) => {
        try {
            const payload = { id_customer: customerId };
            const response = await newPlanService.getPayEMI(payload);
            if(response.status === "invalid"){
                Toast.show(response.message, Toast.SHORT)
                handleConfirmLogout();
                navigation.replace('Login');
            } else {
                setEmaData(response);
            }
        } catch (error) {
            setError('Error fetching EMA data');
            setLoading(false);
        }
    };


    const updateCalculateApi = async (selectedData) => {
        try {
            // Display a loading indicator
            setLoading(true);

            // Retrieve the customerId from storage
            const customerId = await getData('customerId');

            // Create the payload for the API request
            const payload = {
                id_customer: customerId,
                todayrate: todayGoldRate,
                scheme: selectedData,
            };

            // Make the API request to get the calculated EMI
            const response = await newPlanService.getCalculateEMI(payload);
           
            if (response.status === 'Failed') {
                setTotalAmount(0);
            } else {
                setTotalAmount(response?.totalamount);
            }

        } catch (error) {
            console.error('Error fetching scheme calculation', error);
        } finally {
            // Hide the loading indicator
            setLoading(false);
        }
    };



    const handleSelectItem = (itemId, item) => {
        let dataIndex = [...selectedIndex];
        let dataItem = [...selectedItems];
        if (selectedIndex.includes(itemId)) {
            // Item already selected, remove it
            let index = selectedIndex.indexOf(itemId);
            dataIndex.splice(index, 1);
            let itemIdIndex = selectedItems.findIndex(selected => selected.id_scheme_account === itemId);
            dataItem.splice(itemIdIndex, 1);
        } else {
            // Item not selected, add it
            dataIndex.push(itemId);
            dataItem.push(item);
        }
        setSelectedIndex(dataIndex);
        setSelectedItems(dataItem);
    };



    const handleIncreament = (item) => {
        let data = [...emaData];

        for (var i in emaData) {
            if (emaData[i].id_scheme_account == item.id_scheme_account) {
                if (data[i]['installments'] < item?.adavinstallments) {
                    data[i]['installments'] = item?.installments + 1;
                    break;
                }
            }
        }

        setEmaData(data)
    }


    const handleDecreament = (item) => {

        let data = [...emaData];

        for (var i in emaData) {
            if (emaData[i].id_scheme_account == item.id_scheme_account) {
                if (1 < data[i]['installments']) {
                    data[i]['installments'] = parseInt(data[i]['installments']) - 1;
                    break;
                }
            }
        }
        setEmaData(data)

    }


    const handleChange = (item, value) => {

        let data = [...emaData];

        const enteredAmount = parseFloat(value);
        const minAmount = parseFloat(item.min_amount);
        const maxAmount = parseFloat(item.max_amount);

        for (var i in emaData) {
            if (emaData[i].id_scheme_account === item.id_scheme_account) {
                data[i]['payamount'] = parseFloat(value) || 0;
                break;
            }
        }

        for (var i in emaData) {
            if (emaData[i].id_scheme_account === item.id_scheme_account) {
                data[i]['payamount'] = parseFloat(value) || 0;
                if (isNaN(enteredAmount) || enteredAmount < minAmount || enteredAmount > maxAmount) {
                    data[i]['text_field_error'] = `Amount must be between ₹ ${minAmount} - ₹ ${maxAmount}.`
                } else {
                    data[i]['text_field_error'] = "";
                }
                break;
            }
        }

        setEmaData(data);
    }





    const handleWeightChange = (item, value) => {

        let data = [...emaData];

        const enteredAmount = parseFloat(value);
        const minWeight = parseFloat(item.min_weight);
        const maxWeight = parseFloat(item.max_weight);

        for (var i in emaData) {
            if (emaData[i].id_scheme_account == item.id_scheme_account) {
                data[i]['payamount'] = parseFloat(value);
                data[i]['paytotal_weight'] = parseFloat(value);
                if (isNaN(enteredAmount) || enteredAmount < minAmount || enteredAmount > maxAmount) {
                    data[i]['text_field_error'] = `Weight must between ₹ ${minWeight} - ₹ ${maxWeight}.`
                } else {
                    data[i]['text_field_error'] = "";
                }
                break;
            }
        }

        setEmaData(data);
    }


    const updatePayEMI = async () => {

        try {

            const mobile = await AsyncStorage.getItem('user_mobile');

            const customerId = await getData('customerId');

            const branchId = await getData('branchId');

            const updatedPaymentList = [];

            selectedItems.forEach((selectedItem) => {

                let metaltotalwt;

                if (["2", "3", "4", "5"].includes(selectedItem.scheme_type)) {
                    if (selectedItem.id_metal === "1") {
                        metaltotalwt = `${(parseInt(selectedItem.installments) * (parseFloat(selectedItem.payamount) / todayGoldRate)).toFixed(2)} g`;
                    } else if (selectedItem.id_metal === "2") {
                        metaltotalwt = `${(parseInt(selectedItem.installments) * (parseFloat(selectedItem.payamount) / todaySliverRate)).toFixed(2)} g`;
                    } else {
                        metaltotalwt = selectedItem.paidmetalweight;
                    }
                } else {
                    metaltotalwt = selectedItem.paidmetalweight;
                }


                let metaltotalRate;

                if (selectedItem.id_metal === "1") {
                    metaltotalRate = `${todayGoldRate}`;
                } else if (selectedItem.id_metal === "2") {
                    metaltotalRate = `${todaySliverRate}`;
                } else {
                    metaltotalRate = 0;
                }

                const paymentItem = {
                    id_scheme_account: selectedItem.id_scheme_account,
                    scheme_type: selectedItem.scheme_type,
                    id_scheme: selectedItem.id_scheme,
                    account_name: selectedItem.accounter_name,
                    amount: selectedItem.payamount,
                    installment_count: selectedItem?.installments,
                    total_installment_amount: selectedItem.payamount,
                    metal_weight: metaltotalwt,
                    metal_rate: metaltotalRate,
                };
                updatedPaymentList.push(paymentItem);
            });

            const payload = {
                typeofway: 'android',
                id_customer: customerId,
                id_branch: branchId,
                mobile: mobile,
                total_account: selectedIndex.length,
                total_amount: totalAmount,
                payment_list: updatedPaymentList
            };

            const response = await paymentService.schemePayment(payload);
            setTranscationId(response?.transactionid);
            setStatusSuccess(response?.status);
            if (response?.status == "Success") {
                handlePayment(response)
            } else {
                console.log('Error in update payment. Response:', response);
            }

        } catch (error) {
            console.log('Error fetching update payment', error);
        }
    };

    const callPaymentApi = async (res, payment_id, status) => {
        try {
            const customerId = await getData('customerId');
            const payload = {
                id_customer: customerId,
                txnid: res?.transactionid,
                status: status,
                payment_id: payment_id
            };
            if (status === "success") {
                const successData = await paymentService.successPayment(payload)
                return successData;
            } else {
                const failedData = await paymentService.failedPayment(payload)
                return failedData;
            }
        } catch (error) {
            console.error('Error in successCallApi:', error);
            throw error;
        }
    };


    const handlePayment = async (res) => {
        try {
            const mobile = await AsyncStorage.getItem('user_mobile');
            const email = await AsyncStorage.getItem('user_email');
            // const test_key = 'rzp_test_CspnTHk4H1jNwS';
            // const live_key = 'rzp_live_qOLmPqyGFeMWjI';  
            setLodebutton(true);
            const options = {
                description: 'Purchase Description',
                image: images.logo,
                currency: 'INR',
                key: merchant_key,
                amount: res?.total_trans,
                name: 'Padmavathy Jewellers',
                prefill: {
                    email: email,
                    contact: mobile
                },
                theme: { color: colors.gradientBg },
            };

            const paymentData = await RazorpayCheckout.open(options);
            let payment_id = paymentData?.razorpay_payment_id;
            let transaction_no = res?.transactionid;
            let paymentStatus = 'failed'; // Default to failed

            if (paymentData) {
                paymentStatus = 'success';
            } else if (paymentData?.status === 'pending') {
                paymentStatus = 'pending';
            }

            const result = await callPaymentApi(res, payment_id, paymentStatus);
            const extenedData = result?.completeaccount;
            dispatch(setExtendScheme(extenedData));
            if (result && result.status === 'Success') {
                if (paymentStatus === 'pending') {
                    navigation.navigate('PaymentPendingScreen', { paymentData: result, transactionNo: transaction_no });
                } else if (paymentStatus === 'failed') {
                    navigation.navigate('PaymentFailureScreen', { paymentData: result, transactionNo: transaction_no });
                } else {
                    navigation.navigate('PaymentSuccessScreen', { paymentData: result, transactionNo: transaction_no });
                }
            } else {
                if (paymentStatus === 'failed') {
                    navigation.navigate('PaymentFailureScreen');
                }
            }
        } catch (error) {
            console.error('Error in payment');
        } finally {
            setLodebutton(false);
        }
    };



    const renderEmaList = ({ item }) => {


        const paybleAmount = () => {
            switch (item.scheme_type) {
                case '3':
                    return `${item.min_weight} - ${item.max_weight} grm`;
                case '4':
                    return `₹ ${item.min_amount} - ${item.max_amount}`;
                case '5':
                    return `₹ ${item.min_amount} - ${item.max_amount}`;
                case '6': `₹ ${item.payamount}`;
                default:
                    return `₹ ${item.payamount}`;
            }

        };



        return (
            <View style={payEMIStyles.contentCard}>
                <TouchableOpacity onPress={() => handleSelectItem(item.id_scheme_account, item)} style={payEMIStyles.radioButtonContainer}>
                    <TouchableOpacity onPress={() => handleSelectItem(item.id_scheme_account, item)} style={payEMIStyles.radioButton}>
                        {selectedIndex.includes(item.id_scheme_account) && <View style={payEMIStyles.radioButtonSelected} />}
                    </TouchableOpacity>
                    <Text style={payEMIStyles.title}>{item.scheme_name}</Text>
                </TouchableOpacity>

                <View style={{ gap: 8, marginTop: 10 }}>
                    <View style={{ borderBottomColor: '#E6E6E6', borderBottomWidth: 1, marginTop: 5 }} />


                    <View style={payEMIStyles.iconCntr}>
                        <Text style={payEMIStyles.profileHeaderTxt}>Metal Name</Text>
                        <Text style={payEMIStyles.profileHeaderTxt}>{item.metal_name}</Text>
                    </View>


                    <View style={payEMIStyles.iconCntr}>
                        <Text style={payEMIStyles.profileHeaderTxt}>Payable</Text>
                        <Text style={payEMIStyles.payAmntTxt}>{paybleAmount()}</Text>
                    </View>

                    <View style={payEMIStyles.iconCntr}>
                        <Text style={payEMIStyles.profileHeaderTxt}>Account No</Text>
                        <Text style={payEMIStyles.profileHeaderTxt}>{item.scheme_acc_number || 'NOT ALLOCATED'}</Text>
                    </View>

                    <View style={payEMIStyles.iconCntr}>
                        <Text style={payEMIStyles.profileHeaderTxt}>Accounter Name</Text>
                        <Text style={payEMIStyles.profileHeaderTxt}>{item.accounter_name}</Text>
                    </View>

                    {selectedIndex.includes(item.id_scheme_account) && (
                        <View style={payEMIStyles.iconCntr}>
                            <Text style={payEMIStyles.profileHeaderTxt}>Installment</Text>
                            <View>
                                <Stepper
                                    value={item.installments}
                                    onIncrement={() => handleIncreament(item)}
                                    onDecrement={() => handleDecreament(item)}
                                />
                            </View>
                        </View>
                    )}

                    {selectedIndex.includes(item.id_scheme_account) && (
                        <>
                            {payEmaTextInputListByAmount.includes(parseInt(item.scheme_type)) &&
                                <View>
                                    <View style={payEMIStyles.rangeContainer}>
                                        <Text style={payEMIStyles.profileHeaderTxt}>{"Payable Amount"}</Text>
                                        <View style={payEMIStyles.inputRange}>
                                            <TextInput
                                                style={[payEMIStyles.input]}
                                                value={item?.payamount.toString()}
                                                onChangeText={(value) => { handleChange(item, value) }}
                                                keyboardType="numeric"
                                                placeholderTextColor={COLORS.BLACK}
                                            />
                                        </View>
                                    </View>

                                    <View>
                                        <Text style={payEMIStyles.errorText}>{item.text_field_error}</Text>
                                    </View>

                                </View>}


                            {(payEmaTextInputListByWeight.includes(parseInt(item.scheme_type)) && selectedIndex.includes(item.id_scheme_account)) &&
                                <View>
                                    <View style={payEMIStyles.rangeContainer}>
                                        <Text style={payEMIStyles.profileHeaderTxt}>{"Payable Weight"}</Text>
                                        <View style={payEMIStyles.inputRange}>
                                            <TextInput
                                                style={[payEMIStyles.input]}
                                                value={item?.paytotal_weight.toString()}
                                                onChangeText={(value) => { handleWeightChange(item, value) }}
                                                keyboardType="numeric"
                                                placeholderTextColor={COLORS.BLACK}
                                            />
                                        </View>
                                    </View>
                                    <Text style={payEMIStyles.errorText}>{item.text_field_error}</Text>
                                </View>}

                            {(payEmaTotalAmountByShow.includes(parseInt(item.scheme_type)) && <View style={payEMIStyles.iconCntr}>
                                <Text style={payEMIStyles.profileHeaderTxt}>Total Amount</Text>
                                <Text style={payEMIStyles.profileHeaderTxt}>{`₹ ${parseInt(item.installments) * parseFloat(item.payamount) || 0}`}</Text>
                            </View>)}

                            {(payEmaTextInputListByWeight.includes(parseInt(item.scheme_type)) && <View style={payEMIStyles.iconCntr}>
                                <Text style={payEMIStyles.profileHeaderTxt}>Total Amount</Text>
                                <Text style={payEMIStyles.profileHeaderTxt}>{`₹ ${parseInt(item.installments) * parseFloat(item.payamount) * todayGoldRate || 0}`}</Text>
                            </View>)}


                            {(payEmaTotalWeightByShow.includes(parseInt(item.scheme_type)) &&
                                <View style={payEMIStyles.iconCntr}>
                                    <Text style={payEMIStyles.profileHeaderTxt}>Total Weight</Text>
                                    {item.id_metal === "1" && (
                                        <Text style={payEMIStyles.profileHeaderTxt}>
                                            {`${parseInt(item.installments) * (parseFloat(item.payamount) / todayGoldRate).toFixed(2) || 0} g`}
                                        </Text>
                                    )}
                                    {item.id_metal === "2" && (
                                        <Text style={payEMIStyles.profileHeaderTxt}>
                                            {`${parseInt(item.installments) * (parseFloat(item.payamount) / todaySliverRate).toFixed(2) || 0} g`}
                                        </Text>
                                    )}
                                </View>
                            )}

                            {(payEmaTextInputListByWeight.includes(parseInt(item.scheme_type)) && <View style={payEMIStyles.iconCntr}>
                                <Text style={payEMIStyles.profileHeaderTxt}>Total Weight</Text>
                                <Text style={payEMIStyles.profileHeaderTxt}>{parseInt(item.installments) * (parseFloat(item.paytotal_weight)) || 0} g</Text>
                            </View>)}

                        </>

                    )}

                    <View style={{ borderBottomColor: '#E6E6E6', borderBottomWidth: 1, marginTop: 5 }} />
                </View>
            </View>

        );
    };

    return (
        <SafeAreaView style={payEMIStyles.container}>
            <KeyboardAvoidingWrapper>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {loading && <ActivityIndicator size="large" color={COLORS.PRIMARY} style={payEMIStyles.loadingIndicator} />}
                    <FlatList
                        data={emaData}
                        keyExtractor={(item) => item.id_scheme_account}
                        renderItem={renderEmaList}
                        ListHeaderComponent={
                            <DetailsHeader
                                title="Pay EMA"
                                onBackPress={() => navigation.replace('Home')}
                                onNotifyPress={() => navigation.navigate('Notification')}
                                onWishlistPress={() => navigation.navigate('WishList')}
                            />
                        }
                        ListEmptyComponent={!loading && <ListEmpty empty={'No Records Found'} />}
                    />

                </ScrollView>

                {selectedIndex.length > 0 && (
                    <View style={[payEMIStyles.paymentSummaryContainer, { backgroundColor: colors.gradientBg }]}>
                        {loading ? (
                            <ActivityIndicator color={colors.white} size={'small'} style={{ flex: 1 }} />
                        ) : (
                            <View style={payEMIStyles.summaryTextContainer}>
                                <Text style={payEMIStyles.contentText}>{`${selectedIndex.length} Selected`}</Text>
                                <View style={payEMIStyles.separator} />
                                <Text style={payEMIStyles.contentText}>₹ {totalAmount}</Text>
                            </View>
                        )}
                        <TouchableOpacity
                            onPress={updatePayEMI}
                            disabled={loading}
                            style={payEMIStyles.payNowButton}>
                            {loadbutton ? (
                                <ActivityIndicator color={COLORS.DARK_PRIMARY} size={'small'} />
                            ) : (
                                <Text style={payEMIStyles.payText}>Pay</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            </KeyboardAvoidingWrapper>
        </SafeAreaView>
    );
};

export default PayEMA;