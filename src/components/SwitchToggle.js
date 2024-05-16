import React from 'react';
import { Switch as RNDSwitch } from 'react-native';
import { COLORS, colors } from '../utils/constants';

const SwitchToggle = ({ value, onValueChange }) => {

  return (
      <RNDSwitch
        onValueChange={onValueChange}
        value={value}
        trackColor={{
          false: COLORS.LIGHT_GRAY,
          true: colors.gradientBg,
        }}
        thumbColor={value ? COLORS.WHITE : COLORS.WHITE}
        ios_backgroundColor={COLORS.LIGHT_GRAY}
      />
  );
};

export default SwitchToggle;
