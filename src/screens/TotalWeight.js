import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, LayoutAnimation, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import DetailsHeader from '../components/DetailsHeader';
import { hp, responsiveHeight } from '../utils/responsive';
import { COLORS, colors, getBgColor } from '../utils/constants';
import { Iconify } from 'react-native-iconify';
import weightService from '../services/weightService';
import Modal from 'react-native-modal';
import WeightList from './WeightList';
import { getData } from '../utils/storage';
import Card from '../components/Card';
import totalWtStyles from './styles/totalWtStyles';
import { formatDate, handleConfirmLogout } from '../utils/helpers';
import Toast from 'react-native-simple-toast';



const TotalWeight = ({ navigation }) => {

    const [isOpen, setIsOpen] = useState(true);

    const toggleAccordion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen(!isOpen);
    };

    const [weightData, setWeightData] = useState([]);

    const [mainWeight, setMainWeight] = useState('');

    const [mainInstallment, setMainInstallment] = useState('');

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [viewPaymentlist, setViewPaymentlist] = useState('');
    const [paymentlist, setPaymentlist] = useState([]);
    const [viewpayable, setViewpayable] = useState('');
    const [viewpayweight, setViewpayweight] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const [modalContentLoader, setContentLoader] = useState(false);

    const bg_color = getBgColor();


    const getTotalWeight = async () => {
        const custome_id = await getData('customerId');
        try {
            if(!custome_id){
                navigation.replace('Login');
                return;
             }
            setLoading(true)
            const payload = {
                id_customer: custome_id,
            };
            const response = await weightService.getWeight(payload);
            if(response.status === 'invalid'){
                Toast.show(response.message, Toast.SHORT);
                handleConfirmLogout();
                navigation.replace('Login')
            } else {
                setWeightData(response?.list);
            }
            setMainWeight(response?.main_weight)
            setMainInstallment(response?.main_paid_installment)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching payment history', error);
            setError(error)
            setLoading(false)
        }
    };


    useEffect(() => {
        getTotalWeight();
    }, []);


    const handleModal = async (id_scheme_account) => {
        const custome_id = await getData('customerId');
        setModalVisible(!isModalVisible);
        setViewPaymentlist('');
        setPaymentlist([]);
        setViewpayable('');
        setViewpayweight('');

        try {
            setContentLoader(true)
            const payload = {
                id_customer: custome_id,
                id_scheme_account: id_scheme_account,
            };
            const response = await weightService.viewWeight(payload);

            if (response.status === 'invalid') {
                Toast.show(response.message, Toast.SHORT);
                handleConfirmLogout();
            } else {
                if (response?.list) {
                    const viewpay = response.list;
                    setViewPaymentlist(viewpay);
                    setPaymentlist(viewpay.payment_list);
                    let viewpayable;
                    if (viewpay.scheme_type === '3') {
                        viewpayable = `${viewpay.min_weight} - ${viewpay.max_weight} grm`;
                    } else if (['4', '5'].includes(viewpay.scheme_type)) {
                        viewpayable = `₹ ${viewpay.min_amount} - ₹ ${viewpay.max_amount}`;
                    } else {
                        viewpayable = `₹ ${viewpay.amount}`;
                    }
                    setViewpayable(viewpayable);
                    let viewpaid_weight;
                    if (['2', '3', '5', '6'].includes(viewpay.scheme_type)) {
                        viewpaid_weight = viewpay.paid_weight;
                    }
                    setViewpayweight(viewpaid_weight);
                }
            }
            setContentLoader(false)
        } catch (error) {
            Toast.show(error, Toast.BOTTOM);
        } finally {
            setContentLoader(false)
        }
    };


    const renderViewWeightList = ({ item, index }) => (
        <WeightList
            item={item}
            index={index}
            toggleAccordion={toggleAccordion}
            handleModal={handleModal}
            isOpen={isOpen}
            bgColor={bg_color}
        />
    );


    const getStatusText = () => {
        switch (viewPaymentlist.status) {
            case '0':
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Iconify
                            icon='radix-icons:dot-filled'
                            size={30}
                            color={'green'}
                        />
                        <Text style={[totalWtStyles.statusTxt, { color: 'green' }]}>
                            {"Active"}
                        </Text>
                    </View>
                );
            case '1':
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Iconify
                            icon='radix-icons:dot-filled'
                            size={30}
                            color={'red'}
                        />
                        <Text style={[totalWtStyles.statusTxt, { color: 'red' }]}>
                            {"Closed"}
                        </Text>
                    </View>
                );
            case '2':
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Iconify
                            icon='radix-icons:dot-filled'
                            size={30}
                            color={COLORS.GOLD}
                        />
                        <Text style={[totalWtStyles.statusTxt, { color: COLORS.GOLD }]}>
                            {"Completed"}
                        </Text>
                    </View>
                );
            default:
                return null;
        }
    };


    return (
        <SafeAreaView style={totalWtStyles.container}>
            {loading && <ActivityIndicator size="large"
                color={colors.gradientBg}
                style={totalWtStyles.loadingIndicator} />}
            <FlatList
                data={weightData}
                keyExtractor={(item, index) => item.scheme_type.toString() + index.toString()}
                renderItem={renderViewWeightList}
                ListHeaderComponent={
                    <View>
                        <DetailsHeader
                            title="Total Weight"
                            onBackPress={() => {
                                navigation.replace('Home')
                            }}
                            onNotifyPress={() => {
                                navigation.navigate('Notification')
                            }}
                            onWishlistPress={() => {
                                navigation.navigate('WishList')
                            }}
                        />
                        <View style={{ marginTop: responsiveHeight(2), flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                                <Text style={totalWtStyles.totalWt}>Total Weight Paid</Text>
                                <Text style={totalWtStyles.subTitle}>{mainWeight} gm</Text>
                            </View>
                            <View style={{ backgroundColor: '#7E7E7E80', width: 1, height: 50 }} />
                            <View style={{ flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                                <Text style={totalWtStyles.totalWt}>Paid Dues</Text>
                                <Text style={totalWtStyles.subTitle}>{mainInstallment}</Text>
                            </View>
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    !loading && !error && (
                        <View style={totalWtStyles.noWishlistContainer}>
                            <Text style={totalWtStyles.noWishlistText}>No Records Found</Text>
                        </View>)
                }
            />


            <Modal style={{ margin: 0 }} isVisible={isModalVisible} animationIn={'fadeInUp'}
                onRequestClose={() => setModalVisible(!isModalVisible)}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={totalWtStyles.modalContainer}>
                        <View style={totalWtStyles.modalContent}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={totalWtStyles.headtltle}>View Plan Details</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={{
                                    borderColor: '#9FA2AB',
                                    borderWidth: 0.5,
                                    borderRadius: 8,
                                    padding: 5
                                }}>
                                    <Iconify icon='iconamoon:close-fill' size={20} color={'#131B2E'} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ borderBottomColor: COLORS.BUTTON_PRIMARY, borderBottomWidth: 0.2, marginTop: responsiveHeight(2) }} />

                            <TouchableOpacity style={totalWtStyles.durationcntr}>
                                <Text style={totalWtStyles.modalTitle}>{viewPaymentlist?.scheme_name}</Text>
                                {getStatusText()}
                            </TouchableOpacity>

                            <View style={{ marginTop: responsiveHeight(4), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={totalWtStyles.modalTitle}>Metal Name</Text>
                                <Text>{viewPaymentlist?.metal_name}</Text>
                            </View>

                            <View style={{ marginTop: hp(4), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={totalWtStyles.modalTitle}>Account Name</Text>
                                <Text style={totalWtStyles.inputText}>{viewPaymentlist?.account_name}</Text>
                            </View>

                            <View style={{ marginTop: hp(4), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={totalWtStyles.modalTitle}>Account Number</Text>
                                <Text style={totalWtStyles.inputText}>{viewPaymentlist?.scheme_acc_number == "" ? "NOT ALLOCATED" : viewPaymentlist?.scheme_acc_number}</Text>
                            </View>

                            {modalContentLoader && <ActivityIndicator size='large' color={COLORS.DARK_PRIMARY} />}


                            <View style={{ marginTop: hp(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={totalWtStyles.modalTitle}>Payable</Text>
                                <Text style={totalWtStyles.inputText}>{viewpayable}</Text>
                            </View>


                            <View style={[totalWtStyles.iconCntr, { marginTop: responsiveHeight(2) }]}>
                                <Text style={totalWtStyles.titleText}>Paid Amount</Text>
                                {viewpayweight && <Text style={totalWtStyles.titleText}>Paid Weight</Text>}
                                <Text style={totalWtStyles.titleText}>Installments</Text>
                            </View>

                            <View style={[totalWtStyles.iconCntr, { marginTop: 6 }]}>
                                <TouchableOpacity style={[totalWtStyles.touchableBtn, { backgroundColor: '#c5c5f4' }]}>
                                    <Text style={[totalWtStyles.contentText, { color: '#706FE5' }]}>₹ {viewPaymentlist?.total_paid_amount}</Text>
                                </TouchableOpacity>
                                {viewpayweight &&
                                    <TouchableOpacity style={[totalWtStyles.touchableBtn, { backgroundColor: '#d9c7ba' }]}>
                                        <Text style={[totalWtStyles.contentText, { color: '#A17353' }]}>{viewpayweight}</Text>
                                    </TouchableOpacity>}
                                <TouchableOpacity style={[totalWtStyles.touchableBtn, { backgroundColor: '#bcf2b7' }]}>
                                    <Text style={[totalWtStyles.contentText, { color: '#4F9349' }]}>{viewPaymentlist.total_paid_installments}/{viewPaymentlist.total_installments}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ borderBottomColor: COLORS.BUTTON_PRIMARY, borderBottomWidth: 0.2, marginTop: responsiveHeight(2) }} />

                            <View style={{ marginTop: responsiveHeight(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={totalWtStyles.modalTitle}>Transaction Details</Text>
                            </View>

                            <Card style={totalWtStyles.transactionCard}>

                                {paymentlist?.map((viewItem) => (
                                    <View style={totalWtStyles.cardTransaction} key={viewItem.id_transaction}>
                                        <TouchableOpacity style={totalWtStyles.durationcntr}>
                                            <Text style={totalWtStyles.modalTitle}>{viewItem?.date_payment}</Text>
                                            <View style={totalWtStyles.durationStyle}>
                                                <Iconify
                                                    icon='radix-icons:dot-filled'
                                                    size={25}
                                                    color={viewItem?.payment_status === '1' ? 'green' : '#F4A42E'}
                                                />
                                                <Text style={[totalWtStyles.statusTxt, { color: viewItem?.payment_status === '1' ? 'green' : '#F4A42E' }]}>
                                                    {viewItem?.payment_status === '1' ? 'Success' : 'Waiting for approval'}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                        <View style={{ marginTop: responsiveHeight(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={totalWtStyles.transactionTxt}>Paid Amount</Text>
                                            <Text style={totalWtStyles.contentText}>₹ {viewItem?.payment_amount}</Text>
                                        </View>


                                        <View style={{ marginTop: responsiveHeight(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={totalWtStyles.transactionTxt}>Metal Rate</Text>
                                            <Text style={totalWtStyles.contentText}>₹ {viewItem?.metal_rate}</Text>
                                        </View>

                                        <View style={{ marginTop: responsiveHeight(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={totalWtStyles.transactionTxt}>Metal Weight</Text>
                                            <Text style={totalWtStyles.contentText}>₹ {viewItem?.metal_weight}</Text>
                                        </View>

                                        <View style={{ marginTop: responsiveHeight(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={totalWtStyles.transactionTxt}>Paid Installments</Text>
                                            <Text style={totalWtStyles.contentText}>{viewItem?.paid_installments}</Text>
                                        </View>

                                        <View style={{ marginTop: responsiveHeight(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={totalWtStyles.transactionTxt}>Transaction Id</Text>
                                            <Text style={totalWtStyles.contentText}>{viewItem?.id_transaction}</Text>
                                        </View>

                                        <View style={{ borderBottomColor: '#E6E6E6', borderBottomWidth: 1, marginTop: responsiveHeight(1) }} />

                                    </View>
                                ))}
                            </Card>

                        </View>
                    </View>
                </ScrollView>
            </Modal>

        </SafeAreaView>
    );
};


export default TotalWeight;
