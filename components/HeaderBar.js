import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, icons, SIZES} from '../constants';

const HeaderBar = ({right}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding,
        flexDirection: 'row',
        paddingVertical: SIZES.radius,
        alignItems: 'center',
      }}>
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back_arrow}
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              tintColor: COLORS.black,
            }}
          />
          <Text
            style={{marginLeft: SIZES.base, ...FONTS.h3, color: COLORS.black}}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
      {right && (
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity>
            <Image
              source={icons.star}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HeaderBar;
