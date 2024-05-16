import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import DetailsHeader from '../components/DetailsHeader';
import offerService from '../services/offerService';
import { getData } from '../utils/storage';
import { selectProductState, setNewArrivalDetails } from '../features/products/productSlice';
import { setSelectedNewArrivals } from '../features/offers/offerSlice';
import { useDispatch, useSelector } from 'react-redux';
import newArrivalStyles from './styles/newArrivalStyles';
import { COLORS } from '../utils/constants';


const NewArrivals = ({ navigation }) => {

  const [newArrivalsData, setNewArrivalsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();


  const handleNotifyPress = () => navigation.navigate('Notification');
  const handleWishlistPress = () => navigation.navigate('WishList');

  const getNewArrivals = async () => {
    try {
      setLoading(true)
      const customerId = await getData('customerId');
      const payload = { id_customer: customerId };
      const response = await offerService.getAllNewArrivals(payload);
      setNewArrivalsData(response?.list || [])
      dispatch(setNewArrivalDetails(response?.list || []))
      setLoading(false)
    } catch (err) {
      console.error("Error fetching new arrivals", err);
      setLoading(false)
    }
  };

  const handleNewArrivalsDetails = (item) => {
    navigation.navigate('NewArrivalsDetails')
    dispatch(setSelectedNewArrivals(item))
  }

  const renderNewArrivals = ({ item }) => {

    const splitStrings = item.new_arrivals_img_path.split(",");

    const imageUrl = `${item.urlpath}${splitStrings[0]}`;

    return (
      <TouchableOpacity style={newArrivalStyles.cardContainer} onPress={() => handleNewArrivalsDetails(item)}>
        <Image source={{ uri: imageUrl }} style={newArrivalStyles.image} />
        <Text style={newArrivalStyles.productName}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getNewArrivals();
  }, []);


  return (
    <SafeAreaView style={newArrivalStyles.container}>
      {loading &&
        <ActivityIndicator
          size="large"
          color={COLORS.DARK_PRIMARY}
          style={newArrivalStyles.loadingIndicator} />}
      <FlatList
        data={newArrivalsData}
        style={newArrivalStyles.flatListContainer}
        keyExtractor={(item) => item.id_new_arrivals.toString()}
        renderItem={renderNewArrivals}
        numColumns={3}
        columnWrapperStyle={newArrivalStyles.columnWrapperStyle}
        ListHeaderComponent={<View>
          <DetailsHeader
            title="New Arrivals"
            onBackPress={() => navigation.replace('Home')}
            onNotifyPress={handleNotifyPress}
            onWishlistPress={handleWishlistPress}
          />
        </View>}
        ListEmptyComponent={
          !loading  && (<View style={newArrivalStyles.noWishlistContainer}>
            <Text style={newArrivalStyles.noWishlistText}>No Records Found</Text>
          </View>)}
      />
    </SafeAreaView>
  );
};



export default NewArrivals;
