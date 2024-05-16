import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { COLORS, colors } from '../utils/constants';
import { hp } from '../utils/responsive';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ITEM_WIDTH = Math.round(screenWidth * 0.8);
const ITEM_HEIGHT = Math.round(screenWidth * 0.5); 

const CarouselComponent = ({ data }) => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const renderItem = ({ item, index }) => {
    const imageUrl = item.urlpath + item.offer_img_path;

    return (
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setActiveSlide(index)}
        autoplay
        autoplayInterval={3000} // Adjust autoplay interval as needed
        loop
        layout={'default'}
        layoutCardOffset={10}
      />
      <Pagination
        dotsLength={data?.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.activeDot}
        inactiveDotStyle={styles.inactiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  paginationContainer: {
    marginTop: hp(1),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDot: {
    width: 20,
    height: 8,
    borderRadius: 6,
    backgroundColor: colors.gradientBg,
    marginHorizontal: 4,
  },
  inactiveDot: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: 'gray',
    marginHorizontal: 4,
  },
});

export default CarouselComponent;
