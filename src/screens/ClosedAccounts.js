import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import DetailsHeader from '../components/DetailsHeader';
import { hp } from '../utils/responsive';
import { COLORS } from '../utils/constants';
import closedPlanService from '../services/closedPlanService';
import { getData } from '../utils/storage';
import closedAccStyles from './styles/closedAccStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { handleConfirmLogout } from '../utils/helpers';




const ClosedAccounts = ({ navigation }) => {

    const [isOpen, setIsOpen] = useState(true);

    const [closedPlans, setClosedPlans] = useState([])

    const toggleAccordion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen(!isOpen);
    };

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [totalAcc, setTotalAcc] = useState('');

    const [totalInstallment, setTotalInst] = useState('');



    const getClosedPlans = async () => {
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
            const response = await closedPlanService.getClosedPlans(payload);
            if(response.status === 'invalid'){
                Toast.show(response.message, Toast.SHORT)
                handleConfirmLogout();
                navigation.replace('Login')
            } else {
                setClosedPlans(response);
                setTotalAcc(response?.main_totalamt);
                setTotalInst(response?.main_totalinstallment)
            }
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    };


    useEffect(() => {
        getClosedPlans()
    }, []);

    const renderClosedList = ({ item }) => {

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

        
        function renderBtnInfo(title, value, color, backgroundColor) {
            return (
                <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={closedAccStyles.profileHeaderTxt}>{title}:</Text>
                    <TouchableOpacity style={[closedAccStyles.touchableBtn, { backgroundColor: backgroundColor || '#c5c5f4' }]}>
                        <Text style={[closedAccStyles.profileHeaderTxt, { color: color || '#979797' }]}>{value}</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            );
        }



        return (
            <TouchableOpacity key={item.id_scheme_account} onPress={toggleAccordion} style={closedAccStyles.contentCard}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={closedAccStyles.title}>{item?.scheme_name}</Text>
                  </View>
                  {isOpen &&
                      <View key={item.id_scheme_account} style={{ gap: 8, marginTop: 10 }}>
                          <View style={{ borderBottomColor: "#E6E6E6", borderBottomWidth: 1, marginTop: 5 }} />
                          <TouchableOpacity style={closedAccStyles.iconCntr}>
                              <Text style={closedAccStyles.profileHeaderTxt}>Account Name</Text>
                              <Text style={closedAccStyles.profileHeaderTxt}>{item?.account_name}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={closedAccStyles.iconCntr}>
                              <Text style={closedAccStyles.profileHeaderTxt}>Account No</Text>
                              <Text style={closedAccStyles.profileHeaderTxt}>{item?.scheme_acc_number === null ? "NOT ALLOCATED" : item?.scheme_acc_number}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={closedAccStyles.iconCntr}>
                              <Text style={closedAccStyles.profileHeaderTxt}>Maturity Date</Text>
                              <Text style={closedAccStyles.profileHeaderTxt}>{item?.maturity_date}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={closedAccStyles.iconCntr}>
                              <Text style={closedAccStyles.profileHeaderTxt}>Metal Name</Text>
                              <Text style={closedAccStyles.profileHeaderTxt}>{item?.metal_name}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={closedAccStyles.iconCntr}>
                              <Text style={closedAccStyles.profileHeaderTxt}>Payable</Text>
                              <Text style={closedAccStyles.profileHeaderTxt}>{paybleAmount()}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity>
                             {renderBtnInfo('Paid Installments', `${item.total_paid_installments}/${item.total_installments}`, '#4F9349','#bcf2b7')}
                          </TouchableOpacity>
                          <TouchableOpacity style={closedAccStyles.iconCntr}>
                              <Text style={closedAccStyles.profileHeaderTxt}>Paid Amount</Text>
                              <Text style={closedAccStyles.profileHeaderTxt}>{`₹ ${item?.total_paid_amount}`}</Text>
                          </TouchableOpacity>
                          {['2', '3', '5','6'].includes(item.scheme_type) && <TouchableOpacity style={closedAccStyles.iconCntr}>
                              <Text style={closedAccStyles.profileHeaderTxt}>Paid Weight</Text>
                              <Text style={closedAccStyles.profileHeaderTxt}>{`${item?.paid_weight} grm`}</Text>
                          </TouchableOpacity>}
                          <TouchableOpacity style={closedAccStyles.iconCntr}>
                              <Text style={closedAccStyles.profileHeaderTxt}>Bill No</Text>
                              <Text style={closedAccStyles.profileHeaderTxt}>{`${item?.bill_no}`}</Text>
                          </TouchableOpacity>
                          {item?.complement === '1' &&
                              <TouchableOpacity style={closedAccStyles.iconCntr}>
                                  <Text style={closedAccStyles.profileHeaderTxt}>Complement</Text>
                                  <Text style={closedAccStyles.profileHeaderTxt}>{'Received'}</Text>
                              </TouchableOpacity>}
                          <TouchableOpacity style={closedAccStyles.iconCntr}>
                              <Text style={closedAccStyles.profileHeaderTxt}>Closed Amount</Text>
                              <Text style={closedAccStyles.profileHeaderTxt}>{item?.account_name}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={closedAccStyles.iconCntr}>
                              <Text style={closedAccStyles.profileHeaderTxt}>Closed Date</Text>
                              <Text style={closedAccStyles.profileHeaderTxt}>{item?.closed_date}</Text>
                          </TouchableOpacity>
      
                          <View style={{ borderBottomColor: "#E6E6E6", borderBottomWidth: 1, marginTop: 5 }} />
                      </View>}
              </TouchableOpacity>
          )
    } 
     
    

    return (
        <SafeAreaView style={closedAccStyles.container}>
            {loading &&
                <ActivityIndicator
                    size="large"
                    color={COLORS.DARK_PRIMARY}
                    style={closedAccStyles.loadingIndicator} />}
            <FlatList
                data={closedPlans}
                keyExtractor={(item) => item.scheme_type}
                renderItem={renderClosedList}
                ListHeaderComponent={
                    <View>
                        <DetailsHeader
                            title="Closed Accounts"
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
                        <View style={{ marginTop: hp(2), flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                                <Text style={closedAccStyles.totalWt}>Total Accounts</Text>
                                <Text style={closedAccStyles.subTitle}>{closedPlans.length}</Text>
                            </View>
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    !loading && !error && (<View style={closedAccStyles.noWishlistContainer}>
                        <Text style={closedAccStyles.noWishlistText}>No Records Found</Text>
                    </View>)}
            />

        </SafeAreaView>
    );
};



export default ClosedAccounts;
