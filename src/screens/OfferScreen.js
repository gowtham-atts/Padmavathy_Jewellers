import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { hp } from '../utils/responsive';
import offerService from '../services/offerService';
import { getData } from '../utils/storage';
import { useDispatch, useSelector } from 'react-redux';
import { selectGoldRateState, selectPrevGoldRateState } from '../features/products/productSlice';
import { selectNotificationCount } from '../features/notifications/notificationSlice';
import { setSelectedOfferDetails } from '../features/offers/offerSlice';
import offerStyles from './styles/offerStyles';
import Header from '../components/Header';
import CarouselComponent from '../components/CarouselComponent';
import LoadingSpinner from '../components/LoadingSpinner';




const OfferScreen = ({ navigation }) => {


  const dispatch = useDispatch()

  const [getTodayOfferData, setTodayOfferData] = useState('');

  const [getOfferBannerData, setOfferBannerData] = useState([]);

  const todayGoldRate = useSelector(selectGoldRateState);

  const prevGoldRate = useSelector(selectPrevGoldRateState);

  const notifyCount = useSelector(selectNotificationCount);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);


  const openToggle = () => {
    navigation.openDrawer();
  }

  const wishList = () => {
    navigation.navigate('WishList');
  }

  const notify = () => {
    navigation.navigate('Notification')
  }

  const getTodayOffer = async () => {
    const custome_id = await getData('customerId');
    try {
      setLoading(true)
      const payload = {
        id_customer: custome_id,
        type: "0"
      };
      const response = await offerService.getAllOffer(payload);
      const offerList = response?.list;
      setTodayOfferData(offerList);
      setLoading(false)
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  };


  const handleOfferDetails = (item) => {
    navigation.navigate('OfferDetails')
    dispatch(setSelectedOfferDetails(item))
  }


  const renderTodayOffer = ({ item }) => {


    const splitStrings = item.offer_img_path.split(",");

    const imageUrl = `${item.urlpath}${splitStrings[0]}`;

    return (
      <TouchableOpacity style={offerStyles.cardContainer} onPress={() => handleOfferDetails(item)}>
        <Image source={{ uri: imageUrl }} style={offerStyles.image} />
        <Text style={offerStyles.productName}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };


  const getOfferBanner = async () => {
    let customerId = await getData('customerId');
    if (!customerId) {
      customerId = 0;
    }
    const payload = {
      id_customer: customerId,
      type: 1,
    };
    const offerList = await offerService.getOfferBanner(payload);
    setOfferBannerData(offerList?.list);
  };


  useEffect(() => {
    getTodayOffer()
    getOfferBanner()
  }, [])


  const isGoldArrow = parseFloat(todayGoldRate?.mjdmagoldrate_22ct) > parseFloat(prevGoldRate?.mjdmagoldrate_22ct);
  const isSilverArrow = parseFloat(todayGoldRate?.silverrate_1gm) > parseFloat(prevGoldRate?.silverrate_1gm);


  return (
    <SafeAreaView style={offerStyles.container}>

      <FlatList
        data={getTodayOfferData}
        keyExtractor={(item) => item.id_offer.toString()}
        style={{ marginBottom: hp(8) }}
        renderItem={renderTodayOffer}
        numColumns={3}
        columnWrapperStyle={offerStyles.columnWrapperStyle}
        ListHeaderComponent={
          <View style={{ paddingTop: hp(2) }}>
            <Header
              onMenuPress={openToggle}
              onWishlistPress={wishList}
              onNotifyPress={notify}
              notificationCount={notifyCount}
              todayGoldRate={`₹ ${todayGoldRate?.mjdmagoldrate_22ct}`}
              todaySliverRate={`₹ ${todayGoldRate?.silverrate_1gm}`}
              isGoldArrow={isGoldArrow}
              isSilverArrow={isSilverArrow}
            />
            <View style={offerStyles.carouselContainer}>
              <CarouselComponent data={getOfferBannerData} />
            </View>
            {loading &&  <LoadingSpinner/>}
            <View style={{ paddingLeft: hp(2),marginBottom:hp(2) }}>
              <Text style={offerStyles.title}>Offers</Text>
            </View>
          </View>}
        ListEmptyComponent={
          loading &&
          <View style={offerStyles.noWishlistContainer}>
            <Text style={offerStyles.noWishlistText}>No Records Founds</Text>
          </View>}
      />


    </SafeAreaView>
  );
};


export default OfferScreen;
