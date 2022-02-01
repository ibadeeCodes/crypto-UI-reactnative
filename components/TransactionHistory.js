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

const TransactionHistory = ({history, customStyling}) => {
  console.log(history);
  const renderItem = ({item}) => {
    console.log(item);
    return (
      <TouchableOpacity
        onPress={() => console.log(item)}
        style={{
          marginTop: SIZES.radius,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: COLORS.lightGray,
          paddingBottom: SIZES.radius,
        }}>
        <Image
          source={icons.transaction}
          style={{height: 25, width: 25, tintColor: COLORS.secondary}}
        />
        <View style={{flex: 1, marginLeft: SIZES.radius}}>
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.black,
            }}>
            {item.description}
          </Text>
          <Text>{item.date}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: item.type == 'S' ? COLORS.red : COLORS.green,
              ...FONTS.body4,
              fontWeight: 'bold',
            }}>
            {item.amount} {item.currency}
          </Text>
          <Image
            source={icons.right_arrow}
            style={{height: 20, width: 20, marginLeft: SIZES.radius}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        marginTop: SIZES.padding,

        padding: 20,
        color: COLORS.white,
        marginHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        // ...styles.shadow,
        ...customStyling,
        backgroundColor: COLORS.white,
      }}>
      <Text style={{...FONTS.h2, color: COLORS.black}}>
        Transaction History
      </Text>
      <FlatList
        contentContainerStyle={{marginTop: SIZES.radius}}
        scrollEnabled={false}
        data={history}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TransactionHistory;
