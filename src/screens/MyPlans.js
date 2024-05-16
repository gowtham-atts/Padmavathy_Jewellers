import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, LayoutAnimation, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import DetailsHeader from '../components/DetailsHeader';
import { responsiveHeight, rfpercentage } from '../utils/responsive';
import { COLORS, FONTS, colors } from '../utils/constants';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { Iconify } from 'react-native-iconify';
import newPlanService from '../services/newPlanService';
import Modal from 'react-native-modal';
import { getData } from '../utils/storage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanyDetails } from '../features/company/companyActions';
import { selectCompanyDetails } from '../features/company/companySlice';
import myPlanStyles from './styles/myPlanStyles';
import { fetchPayEMI } from '../features/payEMI/payEMIActions';
import Toast from 'react-native-simple-toast';
import { handleConfirmLogout } from '../utils/helpers';


const CONFIRMATION_MESSAGE = 'Are you sure you want to delete this plan?';


const MyPlans = ({ navigation }) => {

    const [isOpen, setIsOpen] = useState(true);

    const toggleAccordion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen(!isOpen);
    };

    const [getMyPlanData, setMyPlanData] = useState([]);

    const [isModalVisible, setModalVisible] = useState(false);

    const [getSchemeData, setSchemeData] = useState('');

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [isConfirmModal, setConfirmModal] = useState(false);

    const [schemeAccId, setSchemeAccId] = useState('');


    const toggleModal = (item) => {
        setModalVisible(!isModalVisible);
        setSchemeData(item)
    };


    const getMyPlanDetails = async () => {
        const custome_id = await getData('customerId');
        try {
            setLoading(true)
            const payload = {
                id_customer: custome_id
            };
            const response = await newPlanService.getMyPlans(payload);
            if(response.status === 'invalid'){
                Toast.show(response.message, Toast.SHORT)
                handleConfirmLogout();
                navigation.replace('Login');
            } else {
                setMyPlanData(response);
            }
            setLoading(false)
        } catch (err) {
            setError('No Records Found');
            setLoading(false)
        }
        finally {
            setLoading(false);
        }
    };

    const toggleConfirmModal = (scheme_acc_id) => {
        setSchemeAccId(scheme_acc_id);
        setConfirmModal(!isConfirmModal);
    };

    const deleteMyPlan = async () => {
        const custome_id = await getData('customerId');
        try {
            const payload = {
                id_customer: custome_id,
                id_scheme_account: schemeAccId
            };
            const response = await newPlanService.deleteMyPlans(payload);
            Toast.show(response.message, Toast.SHORT)
            dispatch(fetchPayEMI())
            getMyPlanDetails()
        } catch (err) {
            console.error("Error fetching categories", err);
        }
    };


    const paidWeight = () => {
        let paid_weight;
        if (['2', '3', '5', '6'].includes(getSchemeData.scheme_type)) {
            paid_weight = getSchemeData.paid_weight;
            return paid_weight;
        }
    }

    const dispatch = useDispatch()


    useEffect(() => {
        getMyPlanDetails();
        dispatch(fetchCompanyDetails());
    }, []);


    const showModalPayAmout = () => {
        if (getSchemeData.scheme_type == '3') {
            return getSchemeData.min_weight + ' - ' + getSchemeData.max_weight + ' grm';
        } else if (getSchemeData.scheme_type == '4' || getSchemeData.scheme_type == '5') {
            return '₹ ' + getSchemeData.min_amount + ' - ' + getSchemeData.max_amount;
        } else {
            return '₹ ' + getSchemeData.amount
        }
    }


    const getStatusText = (status) => {
        switch (status) {
            case '0':
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Iconify
                            icon='radix-icons:dot-filled'
                            size={30}
                            color={'green'}
                        />
                        <Text style={[myPlanStyles.submitText, { color: 'green' }]}>
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
                        <Text style={[myPlanStyles.submitText, { color: 'red' }]}>
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
                        <Text style={[myPlanStyles.submitText, { color: COLORS.GOLD }]}>
                            {"Completed"}
                        </Text>
                    </View>
                );
            default:
                return null;
        }
    };




    const renderMyPlan = ({ item, index }) => {


        const onSchemeBasedColor = () => {
            // Define two colors
            const colors = ['#FFFFF7', '#EBEEFF'];
            // Alternate between the two colors based on the index
            return colors[index % 2];
        };


        const backgroundColor = onSchemeBasedColor();

        const paybleAmount = () => {
            switch (item.scheme_type) {
                case '3':
                    return `${item.min_weight} - ${item.max_weight} grm`;
                case '4':
                case '5':
                case '6':
                default:
                    return `₹ ${item.amount}`;
            }
        };

        const confirmStyle = StyleSheet.create({

            modalContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },
            modalContent: {
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                width: '80%',
            },
            modalTitle: {
                fontSize: rfpercentage(2.2),
                fontWeight: '600',
                marginBottom: 10,
                fontFamily: FONTS.OUTFIT_MEDIUM,
                color: COLORS.BLACK
            },
            modalMessage: {
                fontSize: rfpercentage(2),
                marginBottom: 20,
                color: colors.gray58,
                fontFamily: FONTS.OUTFIT_MEDIUM
            },
            cancelButton: {
                backgroundColor: colors.gradientBg,
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
            },
            okButton: {
                backgroundColor: colors.gray58,
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
                marginTop: 10,
            },
            buttonText: {
                color: COLORS.WHITE,
                fontWeight: 'bold',
                fontFamily: FONTS.OUTFIT_MEDIUM,
                fontStyle: 'normal',
                fontSize: rfpercentage(1.8)
            },
        });


        return (
            <View key={item.id_scheme_account}>
                <TouchableOpacity onPress={toggleAccordion} style={[myPlanStyles.contentCard,
                { backgroundColor: COLORS.WHITE }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ width: 'auto' }}>
                            <Text style={myPlanStyles.title}>{item.scheme_name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {getStatusText(item?.status)}
                            {item.viewdelete === true ? <TouchableOpacity onPress={() => toggleConfirmModal(item.id_scheme_account)}
                                style={{
                                    backgroundColor: '#E24C4C', borderRadius: 6, width: 'auto',
                                    justifyContent: 'center', alignItems: 'center', marginLeft: 6,
                                    padding: 4
                                }}>
                                <Iconify icon='mingcute:delete-line' size={16} color={COLORS.WHITE} />
                            </TouchableOpacity> : null}
                        </View>
                    </View>
                    {isOpen && (
                        <View style={{ gap: 8, marginTop: 10 }}>
                            <View style={{ borderBottomColor: '#E6E6E6', borderBottomWidth: 1, marginTop: 5 }} />
                            {renderInfo('Metal:', item.metal_name)}
                            {renderInfo('Account Name :', item.account_name)}
                            {renderInfo('Account No :', item.scheme_acc_number === '' ? "NOT ALLOCATED" : item.scheme_acc_number)}
                            {renderInfo('Maturity Date :', item.maturity_date)}
                            {renderInfo('Monthly Payable :', paybleAmount())}
                            {renderInfo(item.complement === '1' ? 'Complement :' : ''
                                , item.complement === '1' ? 'Received' : '')}
                            <View style={{ borderBottomColor: '#E6E6E6', borderBottomWidth: 1, marginTop: 5 }} />
                            <View style={[myPlanStyles.iconCntr, { marginTop: 5 }]}>
                                {renderBtnInfo('Paid Amount', `₹ ${item.total_paid_amount}`, '#706FE5', '#c5c5f4')}
                                {['2', '3', '5', '6'].includes(item.scheme_type) &&
                                 renderBtnInfo('Paid Weight', item.paid_weight, '#A17353', '#E59F6F')}
                                {renderBtnInfo('Installments', `${item.total_paid_installments}/${item.total_installments}`, '#4F9349', '#bcf2b7')}
                            </View>
                            <TouchableOpacity onPress={() => toggleModal(item)} style={[myPlanStyles.submitButton, { backgroundColor: colors.gradientBg }]}>
                                <Text style={myPlanStyles.submitText}>View History</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </TouchableOpacity>
                <Modal
                    isVisible={isConfirmModal}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    backdropOpacity={0.2}
                >
                    <View style={confirmStyle.modalContainer}>
                        <View style={confirmStyle.modalContent}>
                            <Text style={confirmStyle.modalTitle}>Confirmation</Text>
                            <Text style={confirmStyle.modalMessage}>{CONFIRMATION_MESSAGE}</Text>
                            <View style={confirmStyle.buttonContainer}>
                                <TouchableOpacity style={confirmStyle.cancelButton} onPress={toggleConfirmModal}>
                                    <Text style={confirmStyle.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={confirmStyle.okButton}
                                    onPress={() => {
                                        deleteMyPlan();
                                        toggleConfirmModal();
                                    }}
                                >
                                    <Text style={confirmStyle.buttonText}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };


    function renderInfo(title, value, color) {
        return (
            <TouchableOpacity style={myPlanStyles.iconCntr}>
                <Text style={myPlanStyles.profileHeader}>{title}</Text>
                <Text style={[myPlanStyles.profileHeaderTxt, { color: color || '#979797' }]}>{value}</Text>
            </TouchableOpacity>
        );
    }


    function renderBtnInfo(title, value, color, backgroundColor) {
        return (
            <TouchableOpacity style={{alignItems:'center'}}>
                <Text style={myPlanStyles.profileHeaderTxt}>{title}</Text>
                <TouchableOpacity style={[myPlanStyles.touchableBtn, { backgroundColor: backgroundColor }]}>
                    <Text style={[myPlanStyles.profileHeaderTxt, { color: color || '#979797' }]}>{value}</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }



    return (
        <SafeAreaView style={myPlanStyles.container}>
            <KeyboardAvoidingWrapper>

                {loading &&
                    <ActivityIndicator
                        size="large"
                        color={COLORS.DARK_PRIMARY}
                        style={myPlanStyles.loadingIndicator} />}
 
                <View>
                    <FlatList
                        data={getMyPlanData}
                        keyExtractor={(item, index) => item.id_scheme_account.toString() + index.toString()}
                        renderItem={renderMyPlan}
                        ListHeaderComponent = {
                            <View>
                                <DetailsHeader
                                    title="My Plans"
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
                            </View>}
                        ListEmptyComponent={
                            !loading && !error && (<View style={myPlanStyles.noWishlistContainer}>
                                <Text style={myPlanStyles.noWishlistText}>No Records Found</Text>
                            </View>)}
                    />
                </View>

                <Modal style={{ margin: 0 }} isVisible={isModalVisible} onRequestClose={() => setModalVisible(!isModalVisible)}>
                    <View style={myPlanStyles.modalContainer}>
                        <View style={myPlanStyles.modalContent}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={myPlanStyles.modalTitle}>View Plan Details</Text>
                                <TouchableOpacity onPress={toggleModal} style={{
                                    borderColor: '#9FA2AB',
                                    borderWidth: 0.5,
                                    borderRadius: 8,
                                    padding: 5
                                }}>
                                    <Iconify icon='iconamoon:close-fill' size={20} color={'#131B2E'} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ borderBottomColor: COLORS.BUTTON_PRIMARY, borderBottomWidth: 0.2, marginTop: responsiveHeight(2) }} />

                            <TouchableOpacity style={myPlanStyles.durationcntr}>
                                <Text style={myPlanStyles.modalTitle}>{getSchemeData?.scheme_name}</Text>
                                <View style={myPlanStyles.durationStyle}>
                                    <Iconify icon='ion:calendar-clear-outline' size={10} color={'#131B2E'} />
                                    <Text style={[myPlanStyles.mnthText, { marginLeft: 4 }]}>{getSchemeData?.maturity_month} months</Text>
                                </View>
                            </TouchableOpacity>

                            <View style={{ marginTop: responsiveHeight(4), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={myPlanStyles.modalSubContent}>Metal</Text>
                                <Text style={myPlanStyles.contentText}>{getSchemeData?.metal_name}</Text>
                            </View>

                            <View style={{ marginTop: responsiveHeight(4), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={myPlanStyles.modalSubContent}>Account Number</Text>
                                <Text style={myPlanStyles.contentText}>{getSchemeData?.scheme_acc_number == "" ? "NOT ALLOCATED" : getSchemeData?.scheme_acc_number}</Text>
                            </View>

                            <View style={{ marginTop: responsiveHeight(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={myPlanStyles.modalSubContent}>Account Name</Text>
                                <Text style={myPlanStyles.contentText}>{getSchemeData?.account_name}</Text>
                            </View>

                            <View style={{ marginTop: responsiveHeight(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={myPlanStyles.modalSubContent}>Payable</Text>
                                <Text style={myPlanStyles.contentText}>{showModalPayAmout()}</Text>
                            </View>

                            <View style={{ marginTop: responsiveHeight(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={myPlanStyles.modalSubContent}>Start Date</Text>
                                <Text style={myPlanStyles.contentText}> {getSchemeData?.start_date}</Text>
                            </View>

                            <View style={{ marginTop: responsiveHeight(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={myPlanStyles.modalSubContent}>Maturity Date</Text>
                                <Text style={myPlanStyles.contentText}>{getSchemeData?.maturity_date}</Text>
                            </View>

                            <View style={[myPlanStyles.iconCntr, { marginTop: responsiveHeight(2) }]}>
                                <Text style={myPlanStyles.titleText}>Paid Amount</Text>
                                {paidWeight() && <Text style={myPlanStyles.titleText}>Paid Weight</Text>}
                                <Text style={myPlanStyles.titleText}>Installments</Text>
                            </View>

                            <View style={[myPlanStyles.iconCntr, { marginTop: responsiveHeight(1) }]}>
                                <TouchableOpacity style={[myPlanStyles.touchableBtn, { backgroundColor: '#c5c5f4', }]}>
                                    <Text style={[myPlanStyles.contentText, { color: "#706FE5" }]}>₹ {getSchemeData?.total_paid_amount}</Text>
                                </TouchableOpacity>
                                {paidWeight() &&
                                    <TouchableOpacity style={[myPlanStyles.touchableBtn, { backgroundColor: '#E59F6F', }]}>
                                        <Text style={[myPlanStyles.contentText, { color: '#A17353' }]}>{paidWeight()}</Text>
                                    </TouchableOpacity>}
                                <TouchableOpacity style={[myPlanStyles.touchableBtn, { backgroundColor: '#bcf2b7', }]}>
                                    <Text style={[myPlanStyles.contentText, { color: "#4F9349" }]}>{getSchemeData?.total_paid_installments}/{getSchemeData?.total_installments}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ borderBottomColor: COLORS.BUTTON_PRIMARY, borderBottomWidth: 0.2, marginTop: responsiveHeight(2) }} />

                        </View>
                    </View>
                </Modal>

            </KeyboardAvoidingWrapper>
        </SafeAreaView>
    );
};


export default MyPlans;
