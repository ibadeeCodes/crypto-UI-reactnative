import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';

const TextButton = ({label, customLabelStyle, customButtonStyle, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        height: 25,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.green,
        ...customButtonStyle,
      }}
      onPress={onPress}>
      <Text style={{color: COLORS.white, ...FONTS.h3, ...customLabelStyle}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
