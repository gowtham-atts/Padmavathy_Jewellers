import React from 'react';
import { Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { scaleFont } from '../../utils/responsive';
import { FONTS } from '../../utils/constants';

const CategoryList = ({ categories, selectedTab, handleBannerPress, tabColor }) => {
  
  const renderTabBar = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id_category}
        style={[
          styles.tab,
          {
            backgroundColor: selectedTab === item.id_category ? tabColor : 'white',
            borderColor: selectedTab === item.id_category ? tabColor : '#E2E2E2',
          },
        ]}
        onPress={() => handleBannerPress(item.id_category)}
      >
        <Text style={[styles.tabText, { color: selectedTab === item.id_category ? 'white' : '#1B243D' }]}>
          {item.categoryname}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={(item) => item.id_category.toString()}
      renderItem={renderTabBar}
      style={{ margin: 10 }}
    />
  );
};

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 6,
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    borderRadius:20,
    margin: 6,
  },
  tabText: {
    fontSize: scaleFont(16),
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontWeight: '500',
  },
  
});

export default CategoryList;
