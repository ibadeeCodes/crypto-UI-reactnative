import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  FlatList,
  LogBox,
} from 'react-native';
import {COLORS, dummyData, FONTS, icons, images, SIZES} from '../constants';
import {PriceAlert, NoticeAlert, TransactionHistory} from '../components';

const renderPriceAlert = () => {
  return <PriceAlert />;
};

const renderNoticeAlert = () => {
  return <NoticeAlert />;
};

const renderTransactionHistory = () => {
  const [transactionData, setTransactionData] = useState(
    dummyData.transactionHistory,
  );

  return (
    <TransactionHistory
      history={transactionData}
      customStyling={styles.shadow}
    />
  );
};

const Home = ({navigation}) => {
  const [trending, setTrending] = useState(dummyData.trendingCurrencies);
  const renderHeader = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 250,
          ...styles.shadow,
        }}>
        <ImageBackground
          source={images.banner}
          style={{flex: 1, alignItems: 'center'}}>
          {/* Header Bar */}
          <View
            style={{
              marginTop: SIZES.padding - 8,
              width: '100%',
              alignItems: 'flex-end',
              paddingHorizontal: SIZES.padding,
            }}>
            <TouchableOpacity
              style={{
                width: 25,
                height: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                console.log('Notify');
              }}>
              <Image
                source={icons.notification_white}
                resizeMode="contain"
                style={{flex: 1}}
              />
            </TouchableOpacity>
          </View>
          {/* Balance */}
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h3,
              }}>
              Your Portfolio Balance
            </Text>
            <Text
              style={{
                marginTop: SIZES.base,
                color: COLORS.white,
                ...FONTS.h1,
              }}>
              {dummyData.portfolio.balance}
            </Text>
            <Text style={{color: COLORS.white, ...FONTS.body5}}>
              {dummyData.portfolio.changes} Last 24 hours
            </Text>
          </View>

          {/* Trending */}
          <View
            style={{
              position: 'absolute',
              bottom: '-35%',
            }}>
            <Text
              style={{
                marginLeft: SIZES.padding - SIZES.padding / 2,
                color: COLORS.white,
                ...FONTS.h3,
              }}>
              Trending
            </Text>
            <FlatList
              contentContainerStyle={{marginTop: SIZES.base}}
              data={trending}
              renderItem={renderItem}
              keyExtractor={item => `${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ImageBackground>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          width: 165,
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          marginLeft: index == 0 ? SIZES.padding / 2 : 0,
          marginRight: SIZES.radius,
          borderRadius: 10,
          backgroundColor: COLORS.white,
        }}
        onPress={() => {
          navigation.navigate('CryptoDetail', {
            currency: item,
          });
        }}>
        {/* Currency */}
        <View style={{flexDirection: 'row'}}>
          <View>
            <Image
              source={item.image}
              resizeMode="cover"
              style={{
                width: 25,
                height: 25,
                marginTop: 5,
              }}
            />
          </View>
          <View style={{marginLeft: SIZES.base}}>
            <Text style={{...FONTS.h2}}>{item.currency}</Text>
            <Text style={{color: COLORS.gray, ...FONTS.body3}}>
              {item.code}
            </Text>
          </View>
        </View>

        {/* Value */}
        <View style={{marginTop: SIZES.radius}}>
          <Text style={{...FONTS.h2}}>${item.amount}</Text>
          <Text
            style={{
              color: item.type == 'I' ? COLORS.green : COLORS.red,
              ...FONTS.h3,
            }}>
            {item.changes}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <ScrollView>
      <View style={{paddingBottom: 100}}>{renderHeader()}</View>
      <View>{renderPriceAlert()}</View>
      <View>{renderNoticeAlert()}</View>
      <View style={{marginBottom: 80}}>{renderTransactionHistory()}</View>
    </ScrollView>
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

export default Home;
