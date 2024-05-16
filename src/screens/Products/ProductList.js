import React from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { setSelectedProductDetails } from '../../features/products/productSlice';
import { useDispatch } from 'react-redux';
import { hp, rfpercentage } from '../../utils/responsive';
import { COLORS, FONTS } from '../../utils/constants';


const windowWidth = Dimensions.get('screen').width;

const ProductList = ({ products, navigation }) => {

  const dispatch = useDispatch();

  const handleProductDetails = (item) => {
    navigation.navigate('ProductDetails');
    dispatch(setSelectedProductDetails(item))
  }

  const renderProduct = ({ item }) => {
    const imageUrl = item.urlpath + item.proimage;
    return (
      <TouchableOpacity style={styles.cardContainer} onPress={() => handleProductDetails(item)}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.productName}>{item?.productname}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id_product.toString()}
      renderItem={renderProduct}
      numColumns={3}
      columnWrapperStyle={styles.columnWrapperStyle}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: (windowWidth - 48) / 3,
    aspectRatio: 0.8,
    backgroundColor: COLORS.BACKGROUND,
    elevation: 2,
    margin: hp(1)
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  columnWrapperStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  productName: {
    marginTop: 5,
    color: COLORS.DARK_PRIMARY,
    textAlign: 'center',
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: rfpercentage(2),
    fontWeight: '500',
    textTransform: 'capitalize'
  },
})

export default ProductList;
