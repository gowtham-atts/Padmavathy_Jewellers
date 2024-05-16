import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, BackHandler } from 'react-native';
import DetailsHeader from '../components/DetailsHeader';
import { COLORS, FONTS, FONT_SIZES } from '../utils/constants';
import { hp, responsiveHeight, responsiveWidth, rfpercentage } from '../utils/responsive';
import { formatDateTime } from '../utils/helpers';
import { selectExtendScheme } from '../features/payEMI/payEMISlice';
import { useSelector } from 'react-redux';

const PaymentSuccessScreen = ({ navigation, route }) => {

  const paymentData = route?.params?.paymentData;

  const transactionNO = route?.params?.transactionNo;
  

  const [isModalVisible, setIsModalVisible] = useState(false);

  const extendSchemeData = useSelector(selectExtendScheme)


  const handleExtendScheme = () => {
    setIsModalVisible(true);
  };

  const handleExtendSchemeConfirm = () => {
    // Add logic to extend the scheme here
    navigation.navigate('ExtendedScheme')
    setIsModalVisible(false); // Close the modal after extending the scheme
  };

  const handleExtendSchemeCancel = () => {
    setIsModalVisible(false); // Close the modal if the user cancels
  };

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.replace('Home');
      return true;
    });
    return () => backHandler.remove();
  }, []);


  return (
    <View style={styles.container}>
      <DetailsHeader
        title="Payment"
        onBackPress={() => {
          navigation.replace('Home');
        }}
        onNotifyPress={() => {
          navigation.navigate('Notification');
        }}
        onWishlistPress={() => {
          navigation.navigate('WishList');
        }}
      />

      <View style={{ marginTop: hp(10) }}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Image style={styles.icon} source={require('../assets/shanthi_jellewery/success-icon.png')} />
          </View>

          <View style={{ alignItems: 'center', bottom: 30 }}>
            <Text style={styles.totalTxt}>Paid Amount</Text>
            <Text style={styles.totalSubTxt}>₹ {paymentData?.list?.amount}</Text>
          </View>

          <View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{formatDateTime(paymentData?.list?.trans_date)}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Amount</Text>
              <Text style={styles.detailValue}>₹ {paymentData?.list?.amount}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Transaction No</Text>
              <Text style={styles.detailValue}>{transactionNO}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Payment ID</Text>
              <Text style={styles.detailValue}>{paymentData?.list?.transactionId}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Payment Status</Text>
              <Text style={styles.detailValue}>{paymentData?.status}</Text>
            </View>
          </View>

        </View>
      </View>

      <View style={{}}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#1E282A' }]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Go to Dashboard</Text>
        </TouchableOpacity>
      </View>

      {extendSchemeData?.length > 0 ?
        <View style={{}}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#1E282A' }]}
            onPress={handleExtendScheme}
          >
            <Text style={styles.buttonText}>Extend Scheme</Text>
          </TouchableOpacity>
        </View> : null}

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(!isModalVisible)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Do you want to continue extend the this scheme?</Text>
            <TouchableOpacity onPress={handleExtendSchemeConfirm}>
              <Text style={styles.modalButton}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleExtendSchemeCancel}>
              <Text style={styles.modalButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: responsiveWidth(90),
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 3,
    padding: 20,
    alignSelf: 'center',
  },
  cardHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 60,
  },
  icon: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500'
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500'
  },
  detailValue: {
    fontSize: 16,
    color: '#666',
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500'
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500'
  },
  totalTxt: {
    fontSize:rfpercentage(2.8),
    color: '#666',
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500'
  },
  totalSubTxt: {
    fontSize: FONT_SIZES.EXTRA_LARGE,
    color: COLORS.DARK_PRIMARY,
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500'
  },
  button: {
    marginTop: 20,
    padding: 12,
    borderRadius: 10,
    width: responsiveWidth(60),
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500'
  },
  paytxt: {
    fontSize: FONT_SIZES.SMALL,
    color: COLORS.DARK_PRIMARY,
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500',
    marginLeft: 7
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: rfpercentage(2),
    fontWeight: 'bold',
    color: COLORS.BLACK,
    fontFamily: FONTS.OUTFIT_MEDIUM,
    marginBottom: 10,
  },
  modalButton: {
    fontSize: 16,
    color: '#294279',
    marginTop: 10,
  },
});

export default PaymentSuccessScreen;
