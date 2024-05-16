import React, { useState } from 'react';
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { COLORS, FONTS, images } from '../utils/constants';
import { hp, responsiveHeight, responsiveImageSize, responsiveWidth, rfpercentage, scaleFont, wp } from '../utils/responsive';

const OnGoingScreen = ({ navigation }) => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = index => {
    setCurrentSlide(index);
  };


  const handleSubmit = () => {
    navigation.replace('Login');
  }


  return (
    <ImageBackground source={images.bg_splash} style={styles.bgLogo} >

      <Swiper
        loop={false}
        onIndexChanged={handleSlideChange}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}>

        <View style={styles.slide}>

          <View style={{}}>
            <Image source={images.onGoingFirst} style={styles.image} />
          </View>

          <View style={{ marginTop: responsiveHeight(2) }}>
            <Text style={[styles.text1, { color: COLORS.WHITE }]}>Choose Your Scheme</Text>
          </View>
          <View style={{ marginTop: responsiveHeight(2) }}>
            <Text style={[styles.text2, { color: '#FBF3FF' }]}>I provide essential stuff for your</Text>
          </View>
          <View style={{ marginTop: responsiveHeight(2) }}>
            <Text style={[styles.text2, { color: '#FBF3FF' }]}>ui designs every tuesday!</Text>
          </View>
        </View>

        <View style={styles.slide}>

          <View>
            <Image source={images.onGoingSecond} style={styles.image} />
          </View>

          <View style={{ marginTop: responsiveHeight(2) }}>
            <Text style={[styles.text1, { color: COLORS.WHITE }]}>Make Your Payment</Text>
          </View>
          <View style={{ marginTop: responsiveHeight(2) }}>
            <Text style={[styles.text2, { color: '#FBF3FF' }]}>I provide essential stuff for your</Text>
          </View>
          <View style={{ marginTop: responsiveHeight(2) }}>
            <Text style={[styles.text2, { color: '#FBF3FF' }]}>ui designs every tuesday!</Text>
          </View>
        </View>

        <View style={styles.slide}>

          <View>
            <Image source={images.onGoingThird} style={styles.image} />
          </View>

          <View style={{ marginTop: responsiveHeight(2) }}>
            <Text style={[styles.text1, { color: COLORS.WHITE }]}>Explore  the Products</Text>
          </View>

          <View style={{ marginTop: responsiveHeight(2) }}>
            <Text style={[styles.text2, { color: '#FBF3FF' }]}>I provide essential stuff for your</Text>
          </View>

          <View style={{ marginTop: responsiveHeight(2) }}>
            <Text style={[styles.text2, { color: '#FBF3FF' }]}>ui designs every tuesday!</Text>
          </View>

        </View>

      </Swiper>

      <View style={styles.dotsContainer}>
        {[...Array(3)].map((_, index) => (
          <View
            key={index}
            style={[styles.dotIndicator, currentSlide === index && styles.activeDotIndicator]}
          >
            {currentSlide === index && <View style={styles.innerDot} />}
          </View>
        ))}
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={[styles.buttonTxt]}>Get Started</Text>
      </TouchableOpacity>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: wp(50),
    height: hp(25),
    resizeMode: 'contain',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    bottom: hp(20)
  },
  dotIndicator: {
    width: 10,
    height: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDotIndicator: {
    borderColor: COLORS.WHITE,
    borderWidth: 1,
    padding: 6
  },
  innerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.WHITE,
  },
  text1: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: scaleFont(24),
    fontWeight: '600',
    color: COLORS.WHITE
  },
  text2: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: '#FBF3FF'
  },
  headerText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: scaleFont(12),
    fontWeight: '500',
    color: COLORS.WHITE,
    textAlign: 'center',
    marginBottom: responsiveHeight(1)
  },
  button: {
    backgroundColor: COLORS.WHITE,
    padding: 15,
    borderRadius: 15,
    alignSelf: 'center',
    width: responsiveWidth(80),
    marginBottom: responsiveHeight(5)
  },
  buttonTxt: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: rfpercentage(2),
    fontWeight: '600',
    color: "#1B243D",
    textAlign: 'center'
  },
  bgLogo: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    resizeMode: 'contain'
  },
});

export default OnGoingScreen;
