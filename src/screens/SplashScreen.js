import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, images } from '../utils/constants';
import Footer from '../components/Footer';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = ({ navigation }) => {
  
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textSlideAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const playSoundAndNavigate = async () => {
      try {
        // Code to play sound (uncomment when needed)
        // await SoundPlayer.playSoundFile('intro', 'mpeg');
        Animated.parallel([
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(textSlideAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]).start(async () => {
          // Code to stop sound (uncomment when needed)
          // await SoundPlayer.stop();
          const isAuthenticated = await AsyncStorage.getItem('loggedIn');
          if (isAuthenticated) {
            navigation.replace('Home');
          } else {
            navigation.replace('Login');
          }
        });
      } catch (error) {
        console.log('Failed to play the sound', error);
      }
    };

    playSoundAndNavigate();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
       <ImageBackground source={images.pad_splash} style={styles.splash_logo} resizeMode='cover'>
        <View style={styles.logoContainer}>
          <Animated.Image
            source={images.dark_logo}
            style={[styles.logo, { opacity: logoOpacity }]}
            resizeMode="contain"
          />
        </View>
        <View style={styles.footer}>
          <Footer />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  splash_logo:{
     flex:1,
     justifyContent:'center',
     width:"100%",
     height:"100%",
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  }
});

export default SplashScreen;
