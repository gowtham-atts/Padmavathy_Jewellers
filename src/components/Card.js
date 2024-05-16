import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ children, style }) => {
  return (
    <View style={style}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
    padding: 16,
    margin: 16,
  },
});

export default Card;
