import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    SafeAreaView,
    Dimensions
} from 'react-native';
import DetailsHeader from '../components/DetailsHeader';
import {
    hp,
    rfpercentage,
    wp,
} from '../utils/responsive';
import { COLORS, FONTS } from '../utils/constants';
import termsService from '../services/termsService';
import FooterLogo from '../components/FooterLogo';





const RefundPolicy = ({ navigation }) => {

    const [termsCondition, setTermsCondition] = useState('');
    const [image, setImage] = useState('');


    const getTermsCondition = async () => {
        const payload = { type: 2 }
        try {
            const response = await termsService.getAllTermsCondition(payload);
            const img = response.urlpath + response.image;
            setImage(img)
            setTermsCondition(response.list)
        } catch {
            throw console.error("error terms condition");
        }
    }

    useEffect(() => {
        getTermsCondition()
    }, [])



    return (
        <SafeAreaView style={styles.container}>

            <DetailsHeader
                title="Return & Refund Policy"
                onBackPress={() => navigation.goBack()}
                onNotifyPress={() => {
                    navigation.navigate('Notification');
                }}
                onWishlistPress={() => {
                    navigation.navigate('WishList');
                }}
                
            />

            <ScrollView contentContainerStyle={styles.contentContainer}>

                <View style={styles.sectionContainer}>
                    <Text style={styles.heading}>REFUND POLICY</Text>
                    <Text style={styles.definition}>
                    In case the item you have ordered has been shipped but has not yet been delivered to you, you may still cancel the order online. Your refund will be processed within 7 working days once we receive the originally ordered item back from the courier.
                    </Text>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.heading}>CREDIT CARD:</Text>
                    <Text style={styles.definition}>
                       The credit card account of the Member will be re-credited with the refund amount by SRI PADMAVATHY JEWELLERS. The refund amount will be credited to the Member's account within the time span stipulated by the bank which has issued the credit card.
                    </Text>
                </View>


                <View style={styles.sectionContainer}>
                    <Text style={styles.heading}>CHEQUE OR WIRE TRANSFER:</Text>
                    <Text style={styles.definition}>
                    The refund amount shall be deposited into the bank account of the Member by SRI PADMAVATHY JEWELLERS within seven (7) business days after the receipt of a request for refund by the Member.
                    </Text>
                </View>


                <View style={styles.sectionContainer}>
                    <Text style={styles.heading}>RETURN REQUESTS</Text>
                    <Text style={styles.definition}>
                    Note that neither the Company nor the Platform shall at any given point of time entertain any request in any manner towards the Cancellation and Refund of the payment made by the user towards the services delivered services to you. </Text>
                    <Text style={styles.definition}>
                    Upon your purchase of the products through the Company’s Platform, you do not have the right to place a return request or process a return request on the Platform. The Company deals in Gold and Silver items and hence, return of the goods or products once delivered is not possible.</Text>
                    <Text style={styles.definition}>
                    You shall not be allowed to return the goods once delivered by the Company under any circumstances whatsoever. The Users may exchange the products the Platform shall provide exchange based on various external factors such as market-rate & wastage as per market standard at the sole cost and expenses of the User as mentioned on the Platform.
                    </Text>
                    <Text style={styles.definition}>
                       If the goods so delivered is damage when received, not delivered or any transaction processing error has happened the User may raise a request for new product by contacting the customer care at +91-9443721041 within 24 hours from the delivery of the product.
                    </Text>
                    <Text style={styles.definition}>
                    A return request shall be made only upon the Customer has sufficient proofs for the product to be damaged on delivery or the product so delivered is incorrect.
                    </Text>
                    <Text style={styles.definition}>
                    The Return or the Refund process shall be not be undertaken by the Platform if the Customer or the User does not have sufficient proofs towards the same.
                    </Text>
                    <Text style={styles.definition}>
                    All requests shall be made by the User by emailing to which will be the official mode of communication with the Platform and the Company. The Company shall waive all other means of communication made.
                    </Text>
                </View>
               

                <View style={styles.sectionContainer}>
                    <Text style={styles.heading}>CANCELLATION</Text>
                    <Text style={styles.definition}>
                        As a User, you do not have the right to cancel your order upon placing the same.
                    </Text>
                    <Text style={styles.definition}>
                       The Company at its sole discretion may cancel any order(s):
                    </Text>
                </View>

        

            </ScrollView>

  

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS.WHITE
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingVertical: 20
    },
    sectionContainer: {
        marginBottom: 20,
    },
    heading: {
        fontSize: rfpercentage(2),
        fontWeight: 'bold',
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontStyle: "normal",
        textTransform:'uppercase',
        color: '#202020',
        marginBottom: 10,
    },

    definition: {
        marginBottom: 10,
        fontFamily: FONTS.OUTFIT_MEDIUM,
        fontSize: rfpercentage(2),
        lineHeight: 25,
        fontWeight: '400',
        color: '#878787',
    },

    note: {
        marginLeft: 10,
        marginBottom: 5,
        fontFamily:FONTS.OUTFIT_MEDIUM,
        fontSize:rfpercentage(2),
        color:'#878787',
        lineHeight:25
    },

    subHeading: {
        fontWeight: 'bold',
        fontFamily:FONTS.OUTFIT_MEDIUM,
        fontSize:rfpercentage(2),
        color:'#878787',
        marginBottom: 5,
        lineHeight:25,
    },

});

export default RefundPolicy;
