import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth, rfpercentage, scaleFont, wp } from '../utils/responsive';
import { FONTS, COLORS, colors } from '../utils/constants';
import { Iconify } from 'react-native-iconify';

const PaymentList = ({ item, index, toggleAccordion, handleModal, isOpen, bgColor }) => {

    const paybleAmount = () => {

        switch (item.scheme_type) {
            case '3':
                return `${item.min_weight} - ${item.max_weight} grm`;
            case '4': 
            case '5': 
                return `₹ ${item.min_amount} - ${item.max_amount}`; 
            case '6':
            default:
                return `₹ ${item.amount}`;
        }
        
    };

    
    const onSchemeBasedColor = () => {
        // Define two colors
        const colors = ['#f4f3f7', '#f4ffef'];        
        // Alternate between the two colors based on the index
        return colors[index % 2];
    };


    const backgroundColor = onSchemeBasedColor();

    const getStatusText = () => {
        switch (item.status) {
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
                        <Text style={[styles.statusText, { color:COLORS.GOLD }]}>
                            {"Completed"}
                        </Text>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={toggleAccordion} style={[styles.contentCard,{backgroundColor:COLORS.WHITE}]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                   <View style={{width:responsiveWidth(60)}}>
                       <Text style={styles.title}>{item?.scheme_name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {getStatusText()}
                    </View>
                </View>
                {isOpen && (
                    <View style={{ gap: 8, marginTop: 10 }}>
                        <View style={{ borderBottomColor: '#E6E6E6', borderBottomWidth: 1, marginTop: 5 }} />
                            {renderInfo('Account Name', item.account_name)}
                            {renderInfo('Account No', item.scheme_acc_number)}
                            {renderInfo('Maturity Date', item.maturity_date)}
                            {renderInfo('Monthly Payable', paybleAmount())}
                            {/* {renderInfo('Payment Amount', `₹ ${item.amount}`)} */}
                            {/* {renderInfo('Complement',onComplementStatus())} */}
                        <View style={{ borderBottomColor: '#E6E6E6', borderBottomWidth: 1, marginTop: 5 }} />
                        <View style={[styles.iconCntr, { marginTop: 5 }]}>
                            {renderBtnInfo('Paid Amount', `₹ ${item.total_paid_amount}`, '#706FE5','#c5c5f4' )}
                            {['2', '3', '5','6'].includes(item.scheme_type) &&
                             renderBtnInfo('Paid Weight', item.paid_weight,  '#a17353' ,'#d9c7ba')}
                            {renderBtnInfo('Installments', `${item.total_paid_installments}/${item.total_installments}`, '#4F9349','#bcf2b7')}
                        </View>
                        <TouchableOpacity onPress={() => handleModal(item.id_scheme_account)} 
                                          style={[styles.submitButton,{backgroundColor:colors.gradientBg}]}>
                            <Text style={styles.submitText}>View History</Text>
                        </TouchableOpacity>
                    </View>)}
            </TouchableOpacity>
        </View>
    );

    function renderInfo(title, value, color) {
        return (
            <TouchableOpacity style={styles.iconCntr}>
                <Text style={styles.profileHeader}>{title}:</Text>
                <Text style={[styles.profileHeaderTxt, { color: color || '#979797' }]}>{value}</Text>
            </TouchableOpacity>
        );
    }

    function renderBtnInfo(title, value, color, backgroundColor) {
        return (
            <TouchableOpacity>
                <Text style={styles.profileHeaderTxt}>{title}:</Text>
                <TouchableOpacity style={[styles.touchableBtn,{backgroundColor: backgroundColor || '#c5c5f4'}]}>
                    <Text style={[styles.profileHeaderTxt, { color: color || '#979797' }]}>{value}</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
};

const styles = {
    contentCard: {
        borderRadius: 8,
        elevation: 3,
        padding: 15,
        margin: 15,
    },
    title: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(2),
        fontWeight: '500',
        color: '#666666',
    },
    profileHeader: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(2.2),
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
        alignItems: 'center',
    },
    touchableBtn: {
        padding: 6,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButton: {
        width: wp('90%'),
        borderRadius: 10,
        padding:12,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: responsiveHeight(2),
    },
    submitText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: scaleFont(14),
        fontWeight: '500',
        color: COLORS.WHITE
    },
    statusText: {
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: scaleFont(14),
        fontWeight: '500',
    },
};

export default PaymentList;
