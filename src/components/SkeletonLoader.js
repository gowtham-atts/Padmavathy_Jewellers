import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, Easing } from 'react-native';

const { width } = Dimensions.get('window');

const SkeletonLoader = ({ length }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, [fadeAnim]);

  const skeletonItems = Array.from({ length }, (_, index) => (
    <View key={index}>
      <Animated.View
        style={[styles.rect, { opacity: fadeAnim }]}
      />
      <Animated.View
        style={[styles.desc, { opacity: fadeAnim }]}
      />
    </View>
  ));

  return <View style={styles.container}>{skeletonItems}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 2
  },
  rect: {
    width: 120,
    height: 120,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    margin: 10,
  },
  desc:{
    width: 120,
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    margin: 10,
  }
});

export default SkeletonLoader;
