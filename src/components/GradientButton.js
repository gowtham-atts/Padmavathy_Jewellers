import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../utils/constants';
import { scaleFont } from '../utils/responsive';

const GradientButton = ({ title, onPress, colors, disabled,loading }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        disabled ? styles.disabledButton : styles.gradientButton,
        pressed && { opacity: 0.6 },
      ]}
      disabled={disabled}
    >
      <LinearGradient
        colors={colors || ['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  gradientButton: {
    borderRadius: 13,
    overflow: 'hidden',
  },
  disabledButton: {
    borderRadius: 8,
    overflow: 'hidden',
    opacity: 0.6,
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default GradientButton;
