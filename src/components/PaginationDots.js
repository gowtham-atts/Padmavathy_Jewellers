import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const PaginationDots = ({ totalPages, activeIndex, onDotPress }) => {
  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < totalPages; i++) {
      const isActive = i === activeIndex;
      dots.push(
        <TouchableOpacity
          key={i}
          style={[styles.dot, isActive ? styles.activeDot : null]}
          onPress={() => onDotPress(i)}
        >
          <View style={isActive ? styles.activeInnerDot : styles.innerDot}></View>
        </TouchableOpacity>
      );
    }
    return dots;
  };

  return (
    <View style={styles.container}>
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    marginHorizontal: 5,
    width: 4,
    height: 4,
    borderRadius: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D38554F',
  },
  activeDot: {
    width: 14,
    height: 14,
    borderRadius: 16,
    borderColor: '#2D3855',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerDot: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    backgroundColor: '#2D3855',
  },
  activeInnerDot: {
    width: 6,
    height: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2D3855',
    backgroundColor: '#2D3855',
  },
  dotText: {
    fontSize: 18,
    color: '#333',
  },
  activeDotText: {
    fontSize: 18,
    color: 'white',
  },
});

export default PaginationDots;
