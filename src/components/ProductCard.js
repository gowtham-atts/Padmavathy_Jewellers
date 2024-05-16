import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { responsiveImageSize, rfpercentage } from '../utils/responsive';
import { COLORS, FONTS } from '../utils/constants';


const image = responsiveImageSize(100, 134);

const ProductCard = ({ imageSources, productName, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.productContainer}>
          <Image source={{ uri: imageSources }} style={styles.productImage} />
          <Text style={styles.productName}>{productName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    justifyContent:'flex-start',
    padding: 10,
    borderRadius: 8,
  },
  productImage: {
    ...image,
    resizeMode: 'cover',
    marginBottom: 8,
    borderRadius: 4,
  },
  productName: {
    fontSize:rfpercentage(2),
    fontWeight: '400',
    fontFamily:FONTS.OUTFIT_MEDIUM,
    color:COLORS.DARK_PRIMARY,
    marginBottom: 4,
    textTransform:'capitalize',
  },
  productDescription: {
    fontSize:rfpercentage(2),
    color: '#61A375',
    fontFamily:FONTS.OUTFIT_REGULAR,
    fontWeight:'500',
  },
});

export default ProductCard;
