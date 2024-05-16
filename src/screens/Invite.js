import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, ScrollView, Share, SafeAreaView } from 'react-native';
import { responsiveHeight } from '../utils/responsive';
import { COLORS } from '../utils/constants';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { Iconify } from 'react-native-iconify';
import inviteService from '../services/inviteService';
import Clipboard from '@react-native-clipboard/clipboard';
import DetailsHeader from '../components/DetailsHeader';
import { selectGoldRateState, selectPrevGoldRateState } from '../features/products/productSlice';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import inviteStyles from './styles/inviteStyles';


const Invite = ({ navigation }) => {

  const [invite, setInvite] = useState('');

  const [image, setImage] = useState('');

  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleDismissAlert = () => {
    setShowAlert(false);
  };

  const copyToClipboard = () => {
    Clipboard.setString(invite?.reference_no);
    handleShowAlert()
  };

  const phone = '8667361738';

  const whatsapp = '8667361738';

  const email = 'gowtham@atts.in';

  const getInvite = async () => {
    const payload = {
      id_customer: 1,
      id_branch: 1,
    };
    try {
      const response = await inviteService.getInvite(payload);
      const img = response.urlpath + response.logo;
      setImage(img);
      setInvite(response);
    } catch (error) {
      console.error("Error fetching invite", error);
    }
  };

  useEffect(() => {
    getInvite();
  }, []);

  const handleWhatsAppPress = () => {
    Linking.openURL(`whatsapp://send?phone=${whatsapp}`);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:invite?.message,
        title: 'Awesome Content',
        url: 'https://www.example.com/awesome-content',
        subject: 'Sharing Awesome Content',
        dialogTitle: 'Share this content',
        failOnCancel: false,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared with activity type: ${result.activityType}`);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };



  const handleMailPress = () => {
    Linking.openURL(`mailto:${email}`);
  };


  return (
    <SafeAreaView style={inviteStyles.container}>
      <KeyboardAvoidingWrapper>
        <ScrollView style={{ marginBottom: responsiveHeight(10) }}>
          <DetailsHeader
            title="Invite"
            onBackPress={() => {
              navigation.goBack()
            }}
            onNotifyPress={() => navigation.navigate('Notification')}
            onWishlistPress={() => navigation.navigate('WishList')}
          />

          <View style={inviteStyles.cardContainer}>

            <Image
              source={image ? { uri: image } : require('../assets/shanthi_jellewery/contact-us.png')}
              style={inviteStyles.imageStyle}
            />

            <View style={inviteStyles.textContainer}>
              <Text style={inviteStyles.descStyle}>{invite?.message}</Text>

              <View style={inviteStyles.rowContainer}>
                <Text style={inviteStyles.titleStyle}>Referral Code : </Text>
                <Text style={inviteStyles.titleStyle}>{invite?.reference_no}</Text>
              </View>

              <View>
                <Text style={inviteStyles.textcntr}>Invite by</Text>
              </View>


              <View style={inviteStyles.copyContainer}>
                <TouchableOpacity onPress={handleWhatsAppPress}>
                  <Iconify icon='logos:whatsapp-icon' size={24} color={COLORS.DARK_PRIMARY} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleMailPress}>
                  <Iconify icon='logos:google-gmail' size={20} color={COLORS.DARK_PRIMARY} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleShare}>
                  <Iconify icon='ant-design:message-outlined' size={24} color={'#4285F4'} />
                </TouchableOpacity>
              </View>

            </View>

          </View>

           <Footer/>

        </ScrollView>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};



export default Invite;
