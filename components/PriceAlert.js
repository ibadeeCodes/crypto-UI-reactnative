import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';

const PriceAlert = ({customStyling}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: SIZES.radius,
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: SIZES.radius,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.radius,
        marginHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        // ...styles.shadow,
        ...customStyling,
      }}>
      <Image
        source={icons.notification_color}
        style={{width: 25, height: 25}}
      />
      <View style={{flex: 1, marginLeft: SIZES.radius}}>
        <Text style={{...FONTS.h3, color: 'black'}}>Set Price Alert</Text>
        <Text style={{...FONTS.body4}}>
          Get notified when your coins are moving
        </Text>
      </View>
      <Image source={icons.right_arrow} style={{width: 18, height: 18}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default PriceAlert;
