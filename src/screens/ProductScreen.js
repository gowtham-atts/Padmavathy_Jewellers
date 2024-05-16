import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  setProducts, setSelectedTab, selectProductState,
  selectCategoryState, setCategories, selectGoldRateState,
  selectPrevGoldRateState
} from '../features/products/productSlice';
import { hp,rfpercentage } from '../utils/responsive';
import ScrollContainer from '../components/ScrollContainer';
import productService from '../services/productService';
import CategoryList from './Products/CategoryList';
import ProductList from './Products/ProductList';
import { COLORS, FONTS, colors, getBgColor } from '../utils/constants';
import categoryService from '../services/categoryService';
import { getData } from '../utils/storage';
import { selectNotificationCount } from '../features/notifications/notificationSlice';
import SubHeader from '../components/SubHeader';
import { SafeAreaView } from 'react-native-safe-area-context';


const commonFontFamily = {
  fontFamily: FONTS.OUTFIT_MEDIUM,
};

const ProductScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const { selectedTab, products } = useSelector(selectProductState);

  const categories = useSelector(selectCategoryState);

  const todayGoldRate = useSelector(selectGoldRateState);

  const prevGoldRate = useSelector(selectPrevGoldRateState);

  const notifyCount = useSelector(selectNotificationCount);

  const BG_COLOR = getBgColor();

  const isGoldArrow = parseFloat(todayGoldRate?.mjdmagoldrate_22ct) > parseFloat(prevGoldRate?.mjdmagoldrate_22ct);

  const isSilverArrow = parseFloat(todayGoldRate?.silverrate_1gm) > parseFloat(prevGoldRate?.silverrate_1gm);


  const openToggle = () => {
    navigation.openDrawer();
  };

  const wishList = () => {
    navigation.navigate('WishList');
  };

  const notify = () => {
    navigation.navigate('Notification');
  };

  const getAllCategory = async () => {
    let custome_id = await getData('customerId');
    try {
      if (!custome_id) {
        custome_id = 0;
      }
      const payload = {
        id_customer: custome_id,
      };
      const response = await categoryService.getAllCategoryList(payload);
      const categoryList = response?.list;
      const showAllCategory = { id_category: 'all', categoryname: 'All' };
      const updatedCategoryList = [showAllCategory, ...categoryList];
      dispatch(setCategories(updatedCategoryList));
    } catch (err) {
      console.error('Error fetching categories', err);
    }
  };

  const getAllProducts = async () => {
    let custome_id = await getData('customerId');
    try {
      if (!custome_id) {
        custome_id = 0;
      }
      const payload = {
        id_customer: custome_id,
      };
      const response = await productService.getAllProductList(payload);
      const productList = response?.list;
      dispatch(setProducts(productList));
    } catch (err) {
      console.error('Error fetching all products', err);
    }
  };

  const getAllProductsByCategory = async (categoryId) => {
    let custome_id = await getData('customerId');
    try {
      if (!custome_id) {
        custome_id = 0;
      }
      const payload = {
        id_customer: custome_id,
        id_category: categoryId || 'all'
      };
      const response = await productService.getAllProductList(payload);
      const productList = response?.list;
      dispatch(setProducts(productList));
    } catch (err) {
      console.error('Error fetching products by category', err);
    }
  };

  const handleChangeProducts = async (categoryId) => {
    try {
      dispatch(setSelectedTab(categoryId));
      if (categoryId === 'all' || categoryId === null || categoryId === '') {
        await getAllProducts();
      } else {
        await getAllProductsByCategory(categoryId);
      }
    } catch (err) {
      console.error('Error handling product change', err);
    }
  };


  useEffect(() => {
    getAllCategory()
    handleChangeProducts(selectedTab);
  }, [selectedTab]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom:hp(10)}}>

        <SubHeader
          title="Sri Kandan Thangamalihai"
          onMenuPress={openToggle}
          onWishlistPress={wishList}
          onNotifyPress={notify}
          notificationCount={notifyCount}
          todayGoldRate={`₹ ${todayGoldRate?.mjdmagoldrate_22ct}`}
          todaySliverRate={`₹ ${todayGoldRate?.silverrate_1gm}`}
          isGoldArrow={isGoldArrow}
          isSilverArrow={isSilverArrow}
        />

        <View style={{ padding: 10 }}>
          <Text style={styles.title}>All Products</Text>
        </View>

        <View>
          <CategoryList
            categories={categories}
            selectedTab={selectedTab}
            handleBannerPress={handleChangeProducts}
            tabColor={colors.gradientBg} />
        </View>

        <View style={{ bottom: hp(4), marginTop: hp(4) }}>
          {products?.length !== 0 ?
            <ProductList products={products} navigation={navigation} tabColor={BG_COLOR} />
            :
            <View style={{ marginTop: hp(20) }}>
              <Text style={styles.emptyTxt}>No products available for the selected category</Text>
            </View>}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: rfpercentage(2.5),
    ...commonFontFamily,
    fontWeight: '700',
    color: COLORS.DARK_PRIMARY,
  },
  emptyTxt: {
    fontSize: rfpercentage(2),
    ...commonFontFamily,
    fontWeight: '500',
    color: COLORS.DARK_PRIMARY,
    textAlign: 'center'
  }

});

export default ProductScreen;
