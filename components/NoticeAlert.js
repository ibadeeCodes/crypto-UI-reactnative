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
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, icons, SIZES} from '../constants';

const NoticeAlert = ({customStyling}) => {
  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      style={{
        marginTop: SIZES.padding - 5,
        paddingVertical: SIZES.radius,
        backgroundColor: COLORS.secondary,
        color: COLORS.white,
        paddingHorizontal: SIZES.radius,
        marginHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        ...customStyling,
      }}>
      <Text style={{color: COLORS.white, ...FONTS.h3}}>Investing Safety</Text>
      <Text
        style={{
          color: COLORS.white,
          marginTop: SIZES.base,
          ...FONTS.body4,
          lineHeight: 18,
        }}>
        It is very difficult time in investing.It is very difficult time in
        investing.It is very difficult time in investing.It is very difficult
        time in investing.It is very difficult time in investing.It is very
        difficult time in investing.It is very difficult time in investing.
      </Text>
      <TouchableOpacity>
        <Text
          style={{
            color: COLORS.green,
            textDecorationLine: 'underline',
            marginTop: 5,
            ...FONTS.body4,
          }}>
          Learn More
        </Text>
      </TouchableOpacity>
    </LinearGradient>
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

export default NoticeAlert;
