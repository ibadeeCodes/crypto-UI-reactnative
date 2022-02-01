import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, icons, SIZES} from '../constants';

const CurrencyLabel = ({icon, currency, code}) => {
  const navigation = useNavigation();

  return (
    <View style={{flexDirection: 'row'}}>
      <Image source={icon} style={{width: 30, height: 30}} />
      <View style={{marginLeft: 5}}>
        <Text style={{...FONTS.h3, color: COLORS.black}}>{currency}</Text>
        <Text style={{...FONTS.body4, color: COLORS.gray}}>{code}</Text>
      </View>
    </View>
  );
};

export default CurrencyLabel;
