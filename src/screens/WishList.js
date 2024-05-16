import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import DetailsHeader from '../components/DetailsHeader';
import {  hp } from '../utils/responsive';
import { COLORS } from '../utils/constants';
import wishListService from '../services/wishListService';
import { getData } from '../utils/storage';
import { useDispatch } from 'react-redux';
import { setSelectedProductDetails } from '../features/products/productSlice';
import wishlistStyles from './styles/wishlistStyles';
import LoadingSpinner from '../components/LoadingSpinner';


const WishList = ({ navigation }) => {

  const [wishListData, setWishListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const getWishList = useCallback(async () => {
    try {
      const customer_id = await getData('customerId');
      const payload = {
        id_customer: customer_id,
      };

      const response = await wishListService.getWishList(payload);

      if (response?.list) {
        const filteredData = response.list.filter(item => item && item.id !== null);
        setWishListData(filteredData);
      } else {
        setWishListData([]);
        setError('No wishlist items found');
      }
    } catch (err) {
      console.error('Error fetching wishlist', err);
      setError('Error fetching wishlist. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const dispatch = useDispatch();

  

  const handleProductPress = (item) => {
  
    dispatch(setSelectedProductDetails(item))
    navigation.navigate('WishListDetails');
  };




  const renderWishList = useMemo(() => ({ item }) => (
    <TouchableOpacity
      style={wishlistStyles.productCardContainer}
      onPress={() => handleProductPress(item)}>
      <Image
        source={{ uri: item.urlpath + item.image }}
        style={wishlistStyles.productImage}
      />
      <Text style={wishlistStyles.productName}>{item.name}</Text>
    </TouchableOpacity>
  ), []);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getWishList();
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
    };
  }, [getWishList]);

  return (
    <View style={wishlistStyles.container}>
      <DetailsHeader
        title="Wishlist"
        onBackPress={() => navigation.goBack()}
        onNotifyPress={() => navigation.navigate('Notification')}
      />

      {loading && <LoadingSpinner /> }

      {error && (
        <View style={wishlistStyles.errorContainer}>
          <Text style={wishlistStyles.errorText}>{error}</Text>
        </View>)}

      {wishListData.length > 0 ? (
        <FlatList
          data={wishListData}
          keyExtractor={(item, index) => `${item?.id?.toString()}_${index}`}
          renderItem={renderWishList}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={wishlistStyles.columnWrapperStyle}
          ListFooterComponent={<View style={{ paddingBottom: hp(10) }} />}
        />
      ) : !loading && !error && (
        <View style={wishlistStyles.noWishlistContainer}>
          <Image
            source={require('../assets/shanthi_jellewery/empty-wishlst.png')}
            style={wishlistStyles.emptyWishlistImage}
            resizeMode="contain"
          />
          <Text style={wishlistStyles.noWishlistText}>Your wishlist is empty</Text>
        </View>
      )}

    </View>
  );
};



export default WishList;
