import React from 'react';
import { View, Text } from 'react-native';
import DetailsHeader from '../components/DetailsHeader';
import ScrollContainer from '../components/ScrollContainer';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import myWalletStyles from './styles/myWalletStyles';





const MyWallet = ({ navigation }) => {

   
    return (
        <View style={myWalletStyles.container}>
            <KeyboardAvoidingWrapper>
                <ScrollContainer>

                    <DetailsHeader
                        title="My Wallet"
                        onBackPress={() => {
                            navigation.goBack()
                        }}
                        onNotifyPress={() => {
                            navigation.navigate('Notification')
                        }}
                        onWishlistPress={() => {
                            navigation.navigate('WishList')
                        }}
                    />


                    <View style={myWalletStyles.walletContainer}>
                        <View style={myWalletStyles.walletRow}>
                            <Text style={myWalletStyles.totalWt}>Jewellery Wallet</Text>
                        </View>
                    </View>

                </ScrollContainer>
            </KeyboardAvoidingWrapper>
        </View>
    );
};



export default MyWallet;
