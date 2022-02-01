import React, {useState, useEffect, useLayoutEffect} from 'react';
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
  SafeAreaView,
  Animated,
} from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
} from 'victory-native';
import {COLORS, dummyData, FONTS, icons, images, SIZES} from '../constants';
import {
  PriceAlert,
  NoticeAlert,
  TransactionHistory,
  HeaderBar,
  CurrencyLabel,
} from '../components';
import {VictoryCustomTheme} from '../styles';

const CryptoDetail = ({navigation, route}) => {
  const [currenctCurrency, setCurrentCurrency] = useState(null);

  const scrollX = new Animated.Value(0);
  const numberOfCharts = [1, 2, 3];

  useLayoutEffect(() => {
    const {currency} = route.params;
    setCurrentCurrency(currency);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightGray1}}>
      <HeaderBar right={true} />

      <View
        style={{
          backgroundColor: COLORS.white,
          marginHorizontal: SIZES.padding,
          borderRadius: SIZES.radius,
          ...styles.shadow,
          padding: SIZES.radius + 2,
          marginTop: SIZES.radius,
        }}>
        {/* Currncy Bar */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 1}}>
            <CurrencyLabel
              icon={currenctCurrency?.image}
              currency={currenctCurrency?.currency}
              code={currenctCurrency?.code}
            />
          </View>
          <View>
            <Text style={{...FONTS.h3, color: COLORS.black}}>
              ${currenctCurrency?.amount}
            </Text>
            <Text
              style={{
                color:
                  currenctCurrency?.type == 'I' ? COLORS.green : COLORS.red,
              }}>
              {currenctCurrency?.changes}
            </Text>
          </View>
        </View>

        {/* Chart */}

        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment={'center'}
          snapToInterval={SIZES.width - 40}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: scrollX},
                },
              },
            ],
            {useNativeDriver: false},
          )}>
          {numberOfCharts.map((item, index) => (
            <View key={`chart=${index}`}>
              <View style={{marginTop: -25}}>
                <VictoryChart
                  theme={VictoryCustomTheme}
                  height={220}
                  width={SIZES.width - 45}>
                  <VictoryLine
                    style={{
                      data: {
                        stroke: COLORS.secondary,
                      },
                      parent: {
                        border: '1px solid #ccc',
                      },
                    }}
                    data={currenctCurrency?.chartData}
                    categories={{
                      x: ['15MIN', '30MIN', '45MIN', '60MIN'],
                      y: ['15', '30', '45'],
                    }}
                  />
                  <VictoryScatter
                    style={{data: {fill: COLORS.secondary}}}
                    size={5}
                    data={currenctCurrency?.chartData}
                  />

                  {/* Components for Axis Lines */}
                  {/* <VictoryAxis
              styles={{
                grid: {
                  stroke: 'transparent',
                },
              }}
            /> */}
                  {/* <VictoryAxis
              dependentAxis
              styles={{
                axis: {
                  stroke: 'transparent',
                },
                grid: {
                  stroke: 'grey',
                },
              }}
            /> */}
                </VictoryChart>
              </View>
            </View>
          ))}
        </Animated.ScrollView>

        {/* Options */}

        {/* Dots */}
      </View>
    </SafeAreaView>
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

export default CryptoDetail;
