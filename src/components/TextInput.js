import React from 'react';
import { TextInput as RNTextInput, View, Image, StyleSheet } from 'react-native';
import { colors } from '../utils/constants';
import { hp, wp } from '../utils/responsive';

const TextInput = ({ keyboardType, editable, placeholder, placeholderTextColor, value, onChangeText, secureTextEntry, style, iconSource }) => {
  return (
    <View style={[styles.inputContainer, style]}>
      {iconSource && <Image source={iconSource} style={styles.icon} />}
      <RNTextInput
        style={style}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={placeholderTextColor}
        editable={editable}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor:colors.gradientBg,
    borderWidth:1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
    width:wp(4), 
    height: hp(2),
    resizeMode:'contain'
  },
});

export default TextInput;
