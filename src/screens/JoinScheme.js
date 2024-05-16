import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Image } from 'react-native';
import { hp, responsiveHeight, rfpercentage, wp } from '../utils/responsive';
import { COLORS, FONTS, colors, images } from '../utils/constants';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import newPlanService from '../services/newPlanService';
import GradientButton from '../components/GradientButton';
import { getData } from '../utils/storage';
import { validateAccName } from '../utils/validations';
import { useDispatch, useSelector } from 'react-redux';
import { selectGoldRateState, selectPrevGoldRateState } from '../features/products/productSlice';
import { selectJoinScheme } from '../features/newplan/newPlanSlice';
import DetailsHeader from '../components/DetailsHeader';
import joinSchemeStyles from './styles/joinSchemeStyles';
import { fetchPayEMI } from '../features/payEMI/payEMIActions';
import Toast from 'react-native-simple-toast';
import { handleConfirmLogout } from '../utils/helpers';



const JoinScheme = ({ navigation }) => {

    const dispatch = useDispatch()

    const [username, setUsername] = useState('');
    const [refferalCode, setRefferalCode] = useState('');
    const [checked, setChecked] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [getSchemeData, setSchemeData] = useState('');
    const [accNameError, setAccNameError] = useState('');
    const [refferalError, setRefferalError] = useState('');
    const [payAmtError, setPaidAmtError] = useState('');
    const [enteredPayable, setEnteredPayable] = useState('');
    const [error, setError] = useState('');
    const todayGoldRate = useSelector(selectGoldRateState);
    const prevGoldRate = useSelector(selectPrevGoldRateState);
    const [isJoinButtonDisabled, setIsJoinButtonDisabled] = useState(false);
    const [agreeErr, setAgreeErr] = useState('');
    const [isLoading, setIsLoading]  = useState(false);
    const joinSchemes = useSelector(selectJoinScheme);



    const createNewPlan = async () => {
        const custome_id = await getData('customerId');
        try {
            let total_paid_amount;
            if (joinSchemes.scheme_type === '6') {
                total_paid_amount = enteredPayable;
            } else {
                total_paid_amount = joinSchemes.amount;
            }
            const payload = {
                id_customer: custome_id,
                id_branch: joinSchemes.id_branch,
                id_scheme: joinSchemes.id_scheme,
                amount:total_paid_amount,
                accounter_name: username,
                total_paid_amount: total_paid_amount,
                reference_no: refferalCode,
            };
            const response = await newPlanService.addNewPlan(payload);
            if(response.status === 'invalid'){
                Toast.show(response.message, Toast.SHORT)
                handleConfirmLogout();
            } else {
                dispatch(fetchPayEMI())
                Toast.show(response.message, Toast.SHORT)
                navigation.replace('PayEMA');
            }
        } catch (err) {
            console.log(err.response);
        }
    };

    const validateAndSetPayable = (amount) => {
        const enteredAmount = parseFloat(amount);
        const minAmount = parseFloat(joinSchemes.min_amount);
        const maxAmount = parseFloat(joinSchemes.max_amount);

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
        if (joinSchemes.scheme_type === '6') {
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
            setAgreeErr('Please Accept the Terms And Conditions')
            isValid = false;
        }

        if (!isJoinButtonDisabled) {
            setIsJoinButtonDisabled(true)
        }
        if (isLoading) {
            setIsLoading(true)
            isValid = true;
        }
        if (isValid) {
            createNewPlan();
        }
    };

    const renderSchemeTypeBased = () => {
        if (joinSchemes.scheme_type === '6') {
            return (
                <View>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={colors.gray58}
                        placeholder={`Enter amount between ₹ ${joinSchemes.min_amount} and ₹ ${joinSchemes.max_amount}`}
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


    const showModalPayAmount = () => {
        if (joinSchemes.scheme_type === '3') {
            return `${joinSchemes.min_weight} - ${joinSchemes.max_weight} grm`;
        } else if (joinSchemes.scheme_type === '4' || joinSchemes.scheme_type === '5' || joinSchemes.scheme_type === '6') {
            return `₹ ${joinSchemes.min_amount} - ₹ ${joinSchemes.max_amount}`;
        } else {
            return `₹ ${joinSchemes.amount}`;
        }
    };




    return (
        <SafeAreaView style={joinSchemeStyles.container}>
            <KeyboardAvoidingWrapper>

                <DetailsHeader
                    title={joinSchemes?.scheme_name?.toUpperCase()}
                    onBackPress={() => navigation.goBack()}
                    onNotifyPress={() => navigation.navigate('Notification')}
                    onWishlistPress={() => navigation.navigate('WishList')}
                />

                <View style={joinSchemeStyles.modalContainer}>
                    <View style={joinSchemeStyles.modalContent}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={joinSchemeStyles.modalTitle}>Purchase {joinSchemes?.scheme_name}</Text>
                        </View>
                        <View style={{ borderBottomColor: COLORS.BUTTON_PRIMARY, borderBottomWidth: 0.2, marginTop: responsiveHeight(2) }} />
                        
                        <View style={joinSchemeStyles.iconCntr}>
                            <Text style={joinSchemeStyles.modalTitle}>{"Metal"}</Text>
                            <View style={joinSchemeStyles.iconBorder}>
                                <Text style={joinSchemeStyles.priceText}>{joinSchemes?.metal_name}</Text>
                            </View>
                        </View>

                        <View style={joinSchemeStyles.durationcntr}>
                            <Text style={joinSchemeStyles.modalTitle}>Duration</Text>
                            <View>
                            <Text style={joinSchemeStyles.submitText}>{joinSchemes?.maturity_month} months</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: responsiveHeight(4), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={joinSchemeStyles.modalTitle}>Payable</Text>
                            <Text style={joinSchemeStyles.modalTitle}>{showModalPayAmount()}</Text>
                        </View>
                        <View>
                            {renderSchemeTypeBased()}
                        </View>
                        <View style={{ borderBottomColor: COLORS.BUTTON_PRIMARY, borderBottomWidth: 0.2, marginTop: responsiveHeight(2) }} />
                        <View style={{ marginBottom: responsiveHeight(1), marginTop: responsiveHeight(1) }}>
                            <Text style={joinSchemeStyles.userTitle}>{"Name"}</Text>
                            <TextInput
                                placeholder={"Enter your name"}
                                placeholderTextColor={colors.gray58}
                                value={username}
                                onChangeText={(text) => { setUsername(text), setAccNameError(''), setIsJoinButtonDisabled(false) }}
                                style={joinSchemeStyles.textInput}
                            />
                            <Text style={joinSchemeStyles.errorText}>{accNameError}</Text>
                        </View>
                        <View>

                            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value={checked}
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked(!checked)}
                                />
                                <Text style={joinSchemeStyles.textAgree}>Referral Code</Text>
                            </View>
                            <View>
                                {checked === true && (
                                    <View style={{ marginTop: responsiveHeight(1), borderColor: colors.gray58, borderWidth: 0.8, borderRadius: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TextInput
                                            placeholder={"Enter Referral Code"}
                                            placeholderTextColor={colors.gray58}
                                            value={refferalCode}
                                            onChangeText={(text) => { setRefferalCode(text), setIsJoinButtonDisabled(false) }}
                                            style={{ color: COLORS.TEXT, fontFamily: FONTS.OUTFIT_MEDIUM, fontSize: rfpercentage(2), paddingHorizontal: 15, fontWeight: '400', width: '60%' }}
                                        />
                                        <TouchableOpacity onPress={handleApply} style={{ backgroundColor: colors.gradientBg, borderRadius: 10, paddingVertical: 8, margin: 6, width: '25%', alignItems: 'center' }}>
                                            <Text style={{ color: colors.white, fontSize: rfpercentage(2), fontWeight: '500', fontFamily: FONTS.OUTFIT_MEDIUM }}>Apply</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View> */}
                            {/* <Text style={joinSchemeStyles.errorText}>{refferalError}</Text> */}

                            <View style={{ marginTop: responsiveHeight(1), flexDirection: 'row', alignItems: 'center' }}>
                                  <TouchableOpacity onPress={() => { setChecked2(!checked2), setIsJoinButtonDisabled(false), setAgreeErr('') }}>
                                            {checked2 ? 
                                                <Image style={{ width: wp('6%'), height: hp("3%"), resizeMode: 'contain',tintColor:colors.gradientBg }}
                                                    source={images.radio_checked} /> : 
                                                <Image  style={{  width: wp('6%'), height: hp("3%"), resizeMode: 'contain',tintColor:colors.gradientBg }}
                                                    source={images.radio_unchecked} /> }
                                 </TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginLeft:hp(1) }}>
                                    <Text style={joinSchemeStyles.textAgree}>I agree with </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('JoinTerms')}>
                                        <Text style={joinSchemeStyles.termsText}>terms and conditions</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {agreeErr ? <Text style={styles.error}>{agreeErr}</Text> : null}
                        </View>
                        <View style={joinSchemeStyles.buttonContainer}>
                            <GradientButton
                                title={"Join Plan"}
                                colors={[colors.gradientBg, colors.gradientBg2]}
                                onPress={validationPlan}
                                disabled={isJoinButtonDisabled}
                                loading={isLoading}
                            />
                        </View>
                    </View>
                </View>

            </KeyboardAvoidingWrapper>
        </SafeAreaView>
    );
};

export default JoinScheme;

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
    },
    error: {
        color: COLORS.ERROR,
        marginTop: hp(1),
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(1.8),
        fontWeight: '500'
    },
});
