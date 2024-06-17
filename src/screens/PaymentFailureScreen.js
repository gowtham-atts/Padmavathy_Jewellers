import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import DetailsHeader from '../components/DetailsHeader';
import { COLORS, FONTS, FONT_SIZES } from '../utils/constants';
import { hp, responsiveWidth, rfpercentage } from '../utils/responsive';
import { formatDate, formatDateTime } from '../utils/helpers';


const PaymentFailureScreen = ({ navigation, route }) => {

  const paymentData = route?.params?.paymentData;

  const transactionNO = route?.params?.transactionNo;

  const easeBuzzPayData = route?.params?.easebuzzData;

  return (
    <SafeAreaView style={styles.container}>
      <DetailsHeader
        title="Payment"
        onBackPress={() => {
          navigation.goBack();
        }}
        onNotifyPress={() => {
          navigation.navigate('Notification');
        }}
        onWishlistPress={() => {
          navigation.navigate('WishList');
        }}
      />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Image style={styles.icon} source={require('../assets/shanthi_jellewery/faild-icon.png')} />
          </View>

          <View style={{ alignItems: 'center', bottom: 30 }}>
            <Text style={styles.totalTxt}>{"Payment Failed"}</Text>
            <Text style={styles.totalSubTxt}>₹ {paymentData?.list?.amount || easeBuzzPayData?.amount}</Text>
          </View>

          <View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{formatDateTime(paymentData?.list?.trans_date)}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Amount</Text>
              <Text style={styles.detailValue}>₹ {paymentData?.list?.amount || easeBuzzPayData?.amount}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Transaction No</Text>
              <Text style={styles.detailValue}>{transactionNO}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Payment ID</Text>
              <Text style={styles.detailValue}>{paymentData?.list?.transactionId || easeBuzzPayData?.easepayid}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Payment Status</Text>
              <Text style={styles.detailValue}>{paymentData?.status || easeBuzzPayData?.status}</Text>
            </View>
          </View>

        </View>
      </View>

      <View style={{ flex: 0.4 }}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#1B243D' }]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Go to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    bottom: 60
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
    fontSize: rfpercentage(2),
    fontWeight: 'bold',
    color: '#333',
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500'
  },
  detailValue: {
    fontSize: rfpercentage(2),
    color: '#666',
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500',
    textTransform:'capitalize'
  },
  totalTxt: {
    fontSize: rfpercentage(2.8),
    color: '#666',
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500',
    textTransform: "uppercase"
  },
  totalSubTxt: {
    fontSize: FONT_SIZES.EXTRA_LARGE,
    color: COLORS.DARK_PRIMARY,
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500',
    marginTop: hp('1%')
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
});

export default PaymentFailureScreen;
