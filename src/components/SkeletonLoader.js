import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SkeletonLoader = () => {
  const [loadingAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    startLoadingAnimation();
  }, []);

  const startLoadingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(loadingAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const skeletonStyle = {
    opacity: loadingAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    }),
    backgroundColor: '#E0E0E0',
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.skeleton, skeletonStyle]} />
      <Animated.View style={[styles.skeleton, skeletonStyle]} />
      <Animated.View style={[styles.skeleton, skeletonStyle]} />
      <Animated.View style={[styles.skeleton, skeletonStyle]} />
      <Animated.View style={[styles.skeleton, skeletonStyle]} />
      <Animated.View style={[styles.skeleton, skeletonStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 10,
  },
  skeleton: {
    height: 80,
    width: '100%',
    marginVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default SkeletonLoader;
