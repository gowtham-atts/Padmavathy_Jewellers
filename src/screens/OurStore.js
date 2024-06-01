import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Linking,
  FlatList,
  Platform,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import DetailsHeader from '../components/DetailsHeader';
import { hp, responsiveImageSize, rfpercentage, wp } from '../utils/responsive';
import { COLORS, FONTS, colors } from '../utils/constants';
import { Iconify } from 'react-native-iconify';
import { getData } from '../utils/storage';
import termsService from '../services/termsService';
import FooterLogo from '../components/FooterLogo';

const defaultImg = require('../assets/shanthi_jellewery/blank-branch.jpg');

const avator = responsiveImageSize(100, 100);


const OurStore = ({ navigation }) => {


  const [branch, setBranch] = useState([]);
  const [loading, setLoading] = useState(false);



  const handlePhonePress = (mobile) => {
    Linking.openURL(`tel:${mobile}`);
  };

  const getAllContactUs = async () => {
    const customer_id = await getData('customerId');
    try {
      setLoading(true);
      Keyboard.dismiss();
      const response = await termsService.getAllBranch(customer_id);
      setBranch(response);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };


  const renderItem = ({ item }) => {

    const image = item?.urlpath + item?.logo;

    return (
      <View style={styles.cardContainer}>
        <View>
          {image == null ? (
            <Image source={defaultImg} style={avator} />
          ) : (
            <Image source={{ uri: image }} style={avator} />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleStyle}>{item.name}</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(item.map_url)}
            style={styles.copyContainer}
          >
            <Iconify icon="mdi:address-marker" size={wp(6)} color={COLORS.DARK_PRIMARY} />
            <Text style={[styles.copytxt]}>
              {item.address1}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handlePhonePress(item.mobile)}
            style={[styles.copyContainer]}
          >
            <Iconify icon="fluent:call-20-filled" size={wp(6)} color={COLORS.DARK_PRIMARY} />
            <Text
              style={[
                styles.copytxt,
                { color: '#151E32', textDecorationLine: 'underline' },
              ]}
            >
              {item.mobile}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useEffect(() => {
    getAllContactUs();
  }, []);



  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <FlatList
          data={branch}
          keyExtractor={(item, index) => item.id_branch.toString()}
          renderItem={renderItem}
          ListHeaderComponent={
            <View>
              <DetailsHeader
                title="Our Store"
                onBackPress={() => {
                  navigation.goBack();
                }}
                onNotifyPress={() => navigation.navigate('Notification')}
                onWishlistPress={() => navigation.navigate('WishList')}
              />
            </View>}
        />
         <FooterLogo />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const commonFontFamily = {
  fontFamily: FONTS.OUTFIT_MEDIUM,
  fontSize: rfpercentage(2),
  fontWeight: '500'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.WHITE
  },

  imageStyle: {
    ...avator,
  },
  titleStyle: {
    ...commonFontFamily,
    color: COLORS.DARK_PRIMARY,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
    margin: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  msgContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
    margin: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 12,
  },
  copyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 6,
  },
  copytxt: {
    ...commonFontFamily,
    marginLeft: 6,
    color: COLORS.DARK_PRIMARY,
    width:wp('40%')
  },
  input: {
    borderColor: colors.gray58,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    color: COLORS.TEXT,
    ...commonFontFamily
  },
  buttonContainer: {
    marginTop: hp(2),
    width: wp(90),
    alignSelf: 'center',
    marginBottom: hp(2),
  },
  loadingIndicator: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noWishlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyWishlistImage: {
    width: wp(10),
    height: hp(10),
    marginBottom: hp(2),
    resizeMode: 'contain',
  },
  noWishlistText: {
    fontSize: rfpercentage(2.2),
    fontFamily: FONTS.OUTFIT_BOLD,
    color: COLORS.TEXT_COLOR,
  },
  errorText: {
    color: COLORS.ERROR,
    ...commonFontFamily,
    textAlign: 'left',
    marginLeft: hp(2)
  },
});

export default OurStore;
