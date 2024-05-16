import React, { useState, useEffect } from 'react';
import {
    View, SafeAreaView, StyleSheet, Text, TouchableOpacity, ActivityIndicator,
    LayoutAnimation, FlatList, ScrollView,
} from 'react-native';
import DetailsHeader from '../components/DetailsHeader';
import { hp, responsiveHeight, responsiveWidth, scaleFont } from '../utils/responsive';
import { COLORS, FONTS, getBgColor } from '../utils/constants';
import { Iconify } from 'react-native-iconify';
import paymentService from '../services/paymentService';
import Modal from 'react-native-modal';
import PaymentList from './PaymentList';
import { getData } from '../utils/storage';
import Card from '../components/Card';
import paymentHistoryStyles from './styles/paymentHistoryStyles';
import Toast from 'react-native-simple-toast';
import { handleConfirmLogout } from '../utils/helpers';





const PaymentHistory = ({ navigation }) => {

    const [isOpen, setIsOpen] = useState(true);
    const [historyDetails, setHistoryDetails] = useState([]);
    const [totalAmount, setTotalAmnt] = useState('');
    const [totalMainAmount, setTotalMainAmnt] = useState('');
    const [viewPaymentlist, setViewPaymentlist] = useState('');
    const [paymentlist, setPaymentlist] = useState([]);
    const [viewpayable, setViewpayable] = useState('');
    const [viewpayweight, setViewpayweight] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const [loading, setLoading] = useState(true);

    const [modalContentLoader, setContentLoader] = useState(false);


    const [error, setError] = useState(null);

    const BG_COLOR = getBgColor();

    const toggleAccordion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen(!isOpen);
    };

    const toggleModal = (item) => {
        setModalVisible(!isModalVisible);
        setHistoryDetails(item);
    };

    const getPaymentHistory = async () => {
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
            const response = await paymentService.getAllPaymentHistory(payload);
            if(response.status === 'invalid'){
                Toast.show(response.message, Toast.SHORT)
                handleConfirmLogout();
                navigation.replace('Login');
            } else {
                setHistoryDetails(response.list);
            }
            setTotalAmnt(response.main_totalamt);
            setTotalMainAmnt(response.main_totalinstallment);
            setLoading(false)
        } catch (error) {
            console.log('Error fetching payment history', error);
            setLoading(false)
        }
    };

    useEffect(() => {
        getPaymentHistory();
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
            const response = await paymentService.viewAllPaymentHistory(payload);

            if (response.list.length > 0) {

                const viewpay = response.list[0];

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
            setContentLoader(false)
        } catch (error) {
            setError(error)
        } finally {
            setContentLoader(false)
        }
    };


    const renderPaymentHistory = ({ item, index }) => (
        <PaymentList
            item={item}
            index={index}
            toggleAccordion={toggleAccordion}
            handleModal={handleModal}
            isOpen={isOpen}
            bgColor={BG_COLOR}
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
                        <Text style={[styles.statusText, { color: 'green' }]}>
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
                        <Text style={[styles.statusText, { color: 'red' }]}>
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
                        <Text style={[styles.statusText, { color: COLORS.GOLD }]}>
                            {"Completed"}
                        </Text>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={paymentHistoryStyles.container}>
            {loading && <ActivityIndicator size="large"
                color={COLORS.DARK_PRIMARY}
                style={paymentHistoryStyles.loadingIndicator} />}
            <FlatList
                data={historyDetails}
                keyExtractor={(item, index) => item.scheme_type.toString() + index.toString()}
                renderItem={renderPaymentHistory}
                ListHeaderComponent={
                    <View>
                        <DetailsHeader
                            title="Payment History"
                            onBackPress={() => navigation.replace('Home')}
                            onNotifyPress={() => navigation.navigate('Notification')}
                            onWishlistPress={() => navigation.navigate('WishList')}
                        />
                        <View style={{ marginTop: hp(2), flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                                <Text style={paymentHistoryStyles.totalWt}>Total Amount Paid</Text>
                                <Text style={paymentHistoryStyles.subTitle}>{totalAmount}</Text>
                            </View>
                            <View style={{ backgroundColor: '#7E7E7E80', width: 1, height: 50 }} />
                            <View style={{ flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                                <Text style={paymentHistoryStyles.totalWt}>Paid Dues</Text>
                                <Text style={paymentHistoryStyles.subTitle}>{totalMainAmount}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <Text style={paymentHistoryStyles.scheme}>Your Schemes</Text>
                        </View>
                    </View>
                }

                ListEmptyComponent={
                    !loading && !error && (<View style={paymentHistoryStyles.noWishlistContainer}>
                        <Text style={paymentHistoryStyles.noWishlistText}>No Records Found</Text>
                    </View>)}
            />


            <Modal style={{ margin: 0 }} isVisible={isModalVisible} animationIn={'fadeInUp'}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={paymentHistoryStyles.modalContainer}>
                        <View style={paymentHistoryStyles.modalContent}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={paymentHistoryStyles.modalTitle}>View Plan Details</Text>
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

                            <TouchableOpacity style={paymentHistoryStyles.durationcntr}>
                                <Text style={paymentHistoryStyles.modalTitle}>{viewPaymentlist?.scheme_name}</Text>
                                {getStatusText()}
                            </TouchableOpacity>

                            <View style={{ marginTop: hp(4), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={paymentHistoryStyles.modalTitle}>Account Name</Text>
                                <Text style={paymentHistoryStyles.inputText}>{viewPaymentlist?.account_name}</Text>
                            </View>

                            <View style={{ marginTop: hp(4), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={paymentHistoryStyles.modalTitle}>Account Number</Text>
                                <Text style={paymentHistoryStyles.inputText}>{viewPaymentlist?.scheme_acc_number == "" ? "NOT ALLOCATED" : viewPaymentlist?.scheme_acc_number}</Text>
                            </View>

                            {modalContentLoader && <ActivityIndicator size='large' color={COLORS.DARK_PRIMARY} />}


                            <View style={{ marginTop: hp(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={paymentHistoryStyles.modalTitle}>Payable</Text>
                                <Text style={paymentHistoryStyles.inputText}>{viewpayable}</Text>
                            </View>


                            <View style={[paymentHistoryStyles.iconCntr, { marginTop: hp(2) }]}>
                                <Text style={paymentHistoryStyles.titleText}>Paid Amount</Text>
                                {viewpayweight &&
                                    <Text style={paymentHistoryStyles.titleText}>Paid Weight</Text>}
                                <Text style={paymentHistoryStyles.titleText}>Installments</Text>
                            </View>

                            <View style={paymentHistoryStyles.iconCntr}>
                                <TouchableOpacity style={[paymentHistoryStyles.touchableBtn, { backgroundColor: '#c5c5f4' }]}>
                                    <Text style={[paymentHistoryStyles.contentText, { color: '#706FE5' }]}>₹ {viewPaymentlist?.total_paid_amount}</Text>
                                </TouchableOpacity>
                                {viewpayweight && <TouchableOpacity style={[paymentHistoryStyles.touchableBtn, { backgroundColor: '#E59F6F' }]}>
                                    <Text style={[paymentHistoryStyles.contentText, { color: '#A17353' }]}>{viewpayweight}</Text>
                                </TouchableOpacity>}
                                <TouchableOpacity style={[paymentHistoryStyles.touchableBtn, { backgroundColor: '#bcf2b7' }]}>
                                    <Text style={[paymentHistoryStyles.contentText, { color: '#4F9349' }]}>{viewPaymentlist?.total_paid_installments}/{viewPaymentlist?.total_installments}</Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{ borderBottomColor: COLORS.BUTTON_PRIMARY, borderBottomWidth: 0.2, marginTop: hp(2) }} />

                            <View style={{ marginTop: hp(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={paymentHistoryStyles.modalTitle}>Transaction Details</Text>
                            </View>

                            <Card style={paymentHistoryStyles.transactionCard}>
                                {paymentlist?.map((viewItem) => (
                                    <View key={viewItem.id_transaction} style={paymentHistoryStyles.cardTransaction}>
                                        <TouchableOpacity style={paymentHistoryStyles.durationcntr}>
                                            <Text style={paymentHistoryStyles.modalTitle}>{viewItem?.date_payment}</Text>
                                            <View style={paymentHistoryStyles.durationStyle}>
                                                <Iconify
                                                    icon='radix-icons:dot-filled'
                                                    size={25}
                                                    color={viewItem?.payment_status === '1' ? "green" : '#F4A42E'}
                                                />
                                                <Text style={[paymentHistoryStyles.submitText, { marginLeft: 3, color: viewItem?.payment_status === '1' ? "green" : '#F4A42E' }]}>
                                                    {viewItem?.payment_status === '1' ? 'Success' : 'Awaiting'}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                        <View style={{ marginTop: hp(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={paymentHistoryStyles.amttxt}>Amount Paid</Text>
                                            <Text style={paymentHistoryStyles.contentText}>₹ {viewItem?.payment_amount}</Text>
                                        </View>

                                        {viewpayweight && <View style={{ marginTop: hp(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={paymentHistoryStyles.amttxt}>Metal Rate</Text>
                                            <Text style={paymentHistoryStyles.contentText}>₹ {viewItem?.metal_rate}</Text>
                                        </View>}

                                        {viewpayweight && <View style={{ marginTop: hp(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={paymentHistoryStyles.amttxt}>Metal Weight</Text>
                                            <Text style={paymentHistoryStyles.contentText}>{viewItem?.metal_weight} grm</Text>
                                        </View>}

                                         <View style={{ marginTop: hp(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={paymentHistoryStyles.amttxt}>Paid Installments</Text>
                                            <Text style={paymentHistoryStyles.contentText}>{viewItem?.paid_installments}</Text>
                                        </View>

                                        <View style={{ marginTop: hp(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={paymentHistoryStyles.amttxt}>Transaction Id</Text>
                                            <Text style={paymentHistoryStyles.contentText}>{viewItem?.id_transaction}</Text>
                                        </View>
                                        <View style={{ borderBottomColor: '#E6E6E6', borderBottomWidth: 1, marginTop: hp(1) }} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    totalWt: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: scaleFont(14),
        fontWeight: '500',
        color: "#9FA2AB"
    },
    title: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: scaleFont(16),
        fontWeight: '500',
        color: "#666666"
    },
    subTitle: {
        fontFamily: FONTS.OUTFIT_BOLD,
        fontSize: scaleFont(30),
        fontWeight: '500',
        color: COLORS.DARK_PRIMARY
    },
    scheme: {
        fontFamily: FONTS.OUTFIT_BOLD,
        fontSize: scaleFont(16),
        fontWeight: '500',
        color: COLORS.DARK_PRIMARY,
        paddingLeft: 20
    },
    titleText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: scaleFont(16),
        fontWeight: '500',
        color: "#4F4F4F"
    },
    profileHeaderTxt: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: scaleFont(14),
        fontWeight: '500',
        color: "#979797",
    },
    iconCntr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: responsiveHeight(1)
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatorText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: scaleFont(14),
        fontWeight: '500',
        color: COLORS.DARK_PRIMARY
    },

    transactionCard: {
        // backgroundColor:COLORS.WHITE,
        borderRadius: 8,
        // elevation: 1,
        padding: 10,
        marginTop: responsiveHeight(1)
    },
    touchableBtn: {
        width: responsiveWidth(26),
        height: responsiveHeight(5),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: COLORS.DARK_PRIMARY,
        width: responsiveWidth(85),
        height: responsiveHeight(5),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: responsiveHeight(2)
    },
    submitText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: scaleFont(14),
        fontWeight: '500'
    },
    input: {
        width: responsiveWidth(80),
        height: 40,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        margin: 6
    },
    inputText: {
        color: COLORS.TEXT,
        fontSize: scaleFont(14),
        fontWeight: '500',
        fontFamily: FONTS.OUTFIT_MEDIUM
    },
    contentText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: scaleFont(14),
        fontWeight: '500',
        color: '#151E32'
    },
    contentCard: {
        backgroundColor: 'white',
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
        width: responsiveWidth(100),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    modalTitle: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: scaleFont(18),
        fontWeight: '500',
        color: COLORS.DARK_PRIMARY
    },
    amttxt: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: scaleFont(16),
        fontWeight: '400',
        color: '#C7C7C7'
    },
    durationcntr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    durationStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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
        width: responsiveHeight(10),
        height: responsiveHeight(10),
        marginBottom: responsiveHeight(2),
        resizeMode: 'contain',
    },
    noWishlistText: {
        fontSize: scaleFont(16),
        fontFamily: FONTS.OUTFIT_BOLD,
        color: COLORS.TEXT_COLOR,
    },
    statusText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: scaleFont(14),
        fontWeight: '500',
    },
    goldRateHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

export default PaymentHistory;
