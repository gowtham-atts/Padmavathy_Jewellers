import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { hp } from '../utils/responsive';

const ScrollContainer = ({ children }) => {
  return <ScrollView contentContainerStyle={styles.container}>{children}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default ScrollContainer;
