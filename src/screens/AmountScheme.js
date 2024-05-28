import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { hp, responsiveHeight, rfpercentage } from '../utils/responsive';
import { COLORS, FONTS, colors } from '../utils/constants';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { Iconify } from 'react-native-iconify';
import newPlanService from '../services/newPlanService';
import Modal from 'react-native-modal';
import { RadioButton } from 'react-native-paper';
import GradientButton from '../components/GradientButton';
import { getData } from '../utils/storage';
import { isValidReferralCode, validateAccName } from '../utils/validations'; 
import { useDispatch, useSelector } from 'react-redux';
import { selectGoldRateState, selectPrevGoldRateState } from '../features/products/productSlice';
import { selectNewPlan, setJoinScheme } from '../features/newplan/newPlanSlice';
import amountStyles from './styles/amountStyles';
import DetailsHeader from '../components/DetailsHeader';
import Toast from 'react-native-simple-toast';
import { handleConfirmLogout } from '../utils/helpers';
import { fetchPayEMI } from '../features/payEMI/payEMIActions';


const AmountScheme = ({ navigation }) => {

    const dispatch = useDispatch()

    const [getNewPlanData, setNewPlanData] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [refferalCode, setRefferalCode] = useState('');
    const [checked, setChecked] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [getSchemeData, setSchemeData] = useState('');
    const [accNameError, setAccNameError] = useState('');
    const [refferalError, setRefferalError] = useState('');
    const [payAmtError, setPaidAmtError] = useState('');
    const classData = useSelector(selectNewPlan);
    const [enteredPayable, setEnteredPayable] = useState('');
    const [error, setError] = useState('');
    const todayGoldRate = useSelector(selectGoldRateState);
    const prevGoldRate = useSelector(selectPrevGoldRateState);
    const isGoldArrow = parseFloat(todayGoldRate?.mjdmagoldrate_22ct) > parseFloat(prevGoldRate?.mjdmagoldrate_22ct);
    const isSilverArrow = parseFloat(todayGoldRate?.silverrate_1gm) > parseFloat(prevGoldRate?.silverrate_1gm);
    const [notifyCount, setNotifyCount] = useState('');
    const [isJoinButtonDisabled, setIsJoinButtonDisabled] = useState(false);


    useEffect(() => {
        getNewPlanDetails();
    }, []);

    const toggleModal = (item) => {
        setModalVisible(!isModalVisible);
        setSchemeData(item);
    };


    const handleApply = () => {
        if (isValidReferralCode(refferalCode)) {
            // Logic to handle valid referral code
            console.log('Valid referral code:', refferalCode);
            // Perform any additional actions here, such as submitting the referral code to the server
            Toast.show('Applied', Toast.SHORT);
        } else {
            // Logic to handle invalid referral code
            console.log('Invalid referral code:', refferalCode);
            // You can display an error message or perform any other action to notify the user
            Toast.show('Invalid referral code', Toast.SHORT);
        }
    };


    const getNewPlanDetails = async () => {
        const custome_id = await getData('customerId');
        const branch_id = await getData('branchId');
        try {
            const payload = {
                id_customer: custome_id,
                id_branch: branch_id,
                id_classification: classData?.id_classification
            };
            const response = await newPlanService.getAllNewPlan(payload);
            console.log('response',response)
            setNewPlanData(response);
        } catch (err) {
            console.log("Error fetching categories", err);
        }
    };



    const createNewPlan = async () => {
        const custome_id = await getData('customerId');
        try {
            let total_paid_amount;
            if (getSchemeData.scheme_type === '6') {
                total_paid_amount = enteredPayable;
            } else {
                total_paid_amount = getNewPlanData.amount;
            }
            const payload = {
                id_customer: custome_id,
                id_branch: getSchemeData.id_branch,
                id_scheme: getSchemeData.id_scheme,
                accounter_name: username,
                amount:total_paid_amount,
                total_paid_amount: total_paid_amount,
                reference_no: refferalCode,
            };
            const response = await newPlanService.addNewPlan(payload);
            if(response.status === 'invalid'){
                Toast.show(response.message, Toast.SHORT)
                handleConfirmLogout()
            } else {
                dispatch(fetchPayEMI())
                Toast.show(response.message, Toast.SHORT)
                setModalVisible(false);
                navigation.replace('PayEMA');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const validateAndSetPayable = (amount) => {
        const enteredAmount = parseFloat(amount);
        const minAmount = parseFloat(getSchemeData.min_amount);
        const maxAmount = parseFloat(getSchemeData.max_amount);

        if (isNaN(enteredAmount)) {
            setError('Please enter a valid amount.');
            return false;
        } else if (enteredAmount < minAmount || enteredAmount > maxAmount) {
            setError(`Please enter an amount between ₹ ${minAmount} and ₹ ${maxAmount}.`);
            return false;
        } else {
            setError('');
            setEnteredPayable(amount);
            return true;
        }
    };

    const validationPlan = () => {
        let isValid = true;
        if (getSchemeData.scheme_type === '6') {
            isValid = validateAndSetPayable(enteredPayable);
        }
        if (isValid) {
            const accNameError = validateAccName(username);
            setIsJoinButtonDisabled(true)
            // if(checked){
            //     const referralCodeError = validateReferralCode(refferalCode); 
            //     setRefferalError(referralCodeError);
            //     if (referralCodeError) {
            //         isValid = false;
            //     }
            // }
            setPaidAmtError('');
            setAccNameError(accNameError);
            if (accNameError) {
                isValid = false;
            }
        }
        if (!checked2) {
            isValid = false;
        }

        if (!isJoinButtonDisabled) {
            setIsJoinButtonDisabled(true)
        }
        if (isValid) {
            createNewPlan();
        }
    };

    const renderSchemeTypeBased = () => {
        if (getSchemeData.scheme_type === '6') {
            return (
                <View>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={colors.gray58}
                        placeholder={`Enter amount between ₹ ${getSchemeData.min_amount} and ₹ ${getSchemeData.max_amount}`}
                        keyboardType="numeric"
                        value={enteredPayable}
                        onChangeText={(text) => {
                            setEnteredPayable(text);
                            validateAndSetPayable(text);
                            setPaidAmtError('');
                            setIsJoinButtonDisabled(false);
                        }}
                    />
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                </View>
            );
        } else {
            return null;
        }
    };

    const handleJoinNow = (item) => {
        dispatch(setJoinScheme(item));
        navigation.navigate('JoinScheme')
    }


    const renderSchemeData = ({ item }) => {

        const paybleAmout = () => {
            if (item.scheme_type == 3) {
                return item.min_weight + ' - ' + item.max_weight + ' grm';
            } else if (item.scheme_type == 4 || item.scheme_type == 5 || item.scheme_type == 6) {
                return '₹ ' + item.min_amount + ' - ₹ ' + item.max_amount;
            } else {
                return '₹ ' + item.amount;
            }
        }

        return (

            <View style={amountStyles.contentCard}>
                <View style={amountStyles.iconCntr}>
                    <Text style={amountStyles.profileHeaderTxt}>{item.scheme_name}</Text>
                </View>

                <View style={amountStyles.iconCntr}>
                    <Text style={amountStyles.profileHeaderTxt}>Payable:</Text>
                    <TouchableOpacity>
                        <Text style={amountStyles.priceText}>{paybleAmout()}</Text>
                    </TouchableOpacity>
                </View>

                <View style={amountStyles.iconCntr}>
                    <Text style={amountStyles.profileHeaderTxt}>{"Metal"}</Text>
                    <View style={amountStyles.iconBorder}>
                        <Text style={amountStyles.priceText}>{item?.metal_name}</Text>
                    </View>
                </View>

                <View style={amountStyles.iconCntr}>
                    <Text style={amountStyles.profileHeaderTxt}>Duration:</Text>
                    <TouchableOpacity>
                        <Text style={amountStyles.priceText}>{item.maturity_month} months</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingTop: hp(3) }}>
                    <TouchableOpacity onPress={()=>handleJoinNow(item)} style={{
                        backgroundColor: colors.gradientBg, padding: 8,
                        marginLeft: hp(12), marginRight: hp(12), borderRadius: 6
                    }}>
                        <Text style={{
                            fontFamily: FONTS.OUTFIT_MEDIUM, fontSize: rfpercentage(2),
                            fontWeight: '500', color: COLORS.WHITE, textAlign: 'center'
                        }}>Join Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };


    const showModalPayAmount = () => {
        if (getSchemeData.scheme_type === '3') {
            return `${getSchemeData.min_weight} - ${getSchemeData.max_weight} grm`;
        } else if (getSchemeData.scheme_type === '4' || getSchemeData.scheme_type === '5' || getSchemeData.scheme_type === '6') {
            return `₹ ${getSchemeData.min_amount} - ₹ ${getSchemeData.max_amount}`;
        } else {
            return `₹ ${getSchemeData.amount}`;
        }
    };

    return (
        <SafeAreaView style={amountStyles.container}>
            <KeyboardAvoidingWrapper>

                    <FlatList
                        data={getNewPlanData}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        renderItem={renderSchemeData}
                        ListHeaderComponent={
                            <View>
                                <DetailsHeader
                                    title={classData?.classification_name.toUpperCase()}
                                    onBackPress={() => navigation.goBack()}
                                    onNotifyPress={() => navigation.navigate('Notification')}
                                    onWishlistPress={() => navigation.navigate('WishList')}
                                />
                            </View>
                        }
                    />

                <Modal style={{ margin: 0 }} isVisible={isModalVisible} onRequestClose={() => setModalVisible(!isModalVisible)}>
                    <View style={amountStyles.modalContainer}>
                        <View style={amountStyles.modalContent}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={amountStyles.modalTitle}>Purchase {getSchemeData?.scheme_name}</Text>
                                <TouchableOpacity onPress={toggleModal} style={{ borderColor: '#9FA2AB', borderWidth: 0.5, borderRadius: 8, padding: 5 }}>
                                    <Iconify icon='iconamoon:close-fill' size={20} color={'#131B2E'} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderBottomColor: COLORS.BUTTON_PRIMARY, borderBottomWidth: 0.2, marginTop: responsiveHeight(2) }} />
                            <TouchableOpacity style={amountStyles.durationcntr}>
                                <Text style={amountStyles.modalTitle}>Duration</Text>
                                <View style={amountStyles.durationStyle}>
                                    <Iconify icon='ion:calendar-clear-outline' size={10} color={'#131B2E'} />
                                    <Text style={amountStyles.submitText}>{getSchemeData?.maturity_month} months</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ marginTop: responsiveHeight(4), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={amountStyles.modalTitle}>Payable</Text>
                                <Text style={amountStyles.modalTitle}>{showModalPayAmount()}</Text>
                            </View>
                            <View>
                                {renderSchemeTypeBased()}
                            </View>
                            <View style={{ borderBottomColor: COLORS.BUTTON_PRIMARY, borderBottomWidth: 0.2, marginTop: responsiveHeight(2) }} />
                            <View style={{ marginBottom: responsiveHeight(1), marginTop: responsiveHeight(1) }}>
                                <Text style={amountStyles.userTitle}>{"Name"}</Text>
                                <TextInput
                                    placeholder={"Enter your name"}
                                    placeholderTextColor={colors.gray58}
                                    value={username}
                                    onChangeText={(text) => { setUsername(text), setAccNameError(''), setIsJoinButtonDisabled(false) }}
                                    style={amountStyles.textInput}
                                />
                                <Text style={amountStyles.errorText}>{accNameError}</Text>
                            </View>
                            <View>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value={checked}
                                        status={checked ? 'checked' : 'unchecked'}
                                        onPress={() => setChecked(!checked)}
                                    />
                                    <Text style={amountStyles.textAgree}>Referral Code</Text>
                                </View> */}
                                {/* <View>
                                    {checked === true && (
                                        <View style={{ marginTop: responsiveHeight(1), borderColor: colors.gray58, borderWidth: 0.8, borderRadius: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <TextInput
                                                placeholder={"Enter Referral Code"}
                                                placeholderTextColor={colors.gray58}
                                                value={refferalCode}
                                                onChangeText={(text) => { setRefferalCode(text), setIsJoinButtonDisabled(false) }}
                                                style={{ color: COLORS.TEXT, fontFamily: FONTS.OUTFIT_MEDIUM, fontSize: scaleFont(14), paddingHorizontal: 15, fontWeight: '400', width: '60%' }}
                                            />
                                            <TouchableOpacity onPress={handleApply} style={{ backgroundColor: colors.gradientBg, borderRadius: 10, paddingVertical: 8, margin: 6, width: '25%', alignItems: 'center' }}>
                                                <Text style={{ color: colors.white, fontSize: scaleFont(16), fontWeight: '500', fontFamily: FONTS.OUTFIT_MEDIUM }}>Verify</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View> */}
                                {/* <Text style={amountStyles.errorText}>{refferalError}</Text> */}

                                <View style={{ marginTop: responsiveHeight(1), flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value={checked2}
                                        status={checked2 ? 'checked' : 'unchecked'}
                                        onPress={() => { setChecked2(!checked2), setIsJoinButtonDisabled(false) }}
                                    />
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={amountStyles.textAgree}>I agree with </Text>
                                        <TouchableOpacity onPress={() => navigation.navigate('JoinTerms')}>
                                            <Text style={amountStyles.termsText}>terms and conditions</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={amountStyles.buttonContainer}>
                                <GradientButton
                                    title={"Join Plan"}
                                    colors={[colors.gradientBg, colors.gradientBg2]}
                                    onPress={validationPlan}
                                    disabled={isJoinButtonDisabled}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>

            </KeyboardAvoidingWrapper>
        </SafeAreaView>
    );
};

export default AmountScheme;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: colors.gray58,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginTop: 10,
        fontSize: rfpercentage(1.8),
        fontFamily: FONTS.OUTFIT_MEDIUM,
        color:COLORS.BLACK
    },
    error: {
        color: COLORS.ERROR,
        marginTop: hp(1),
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        fontWeight: '500'
    },
});
