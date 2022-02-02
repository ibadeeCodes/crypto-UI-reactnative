import React, {useState, useLayoutEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  Animated,
} from 'react-native';
import {VictoryChart, VictoryLine, VictoryScatter} from 'victory-native';
import {COLORS, dummyData, FONTS, icons, images, SIZES} from '../constants';
import {
  HeaderBar,
  CurrencyLabel,
  TextButton,
  NoticeAlert,
  AboutCoin,
  PriceAlert,
} from '../components';
import {VictoryCustomTheme} from '../styles';

const CryptoDetail = ({navigation, route}) => {
  const [currenctCurrency, setCurrentCurrency] = useState(null);
  const [chartOptions, setChartOptions] = useState(dummyData.chartOptions);
  const [currentChartOption, setCurentChartOption] = useState(
    dummyData.chartOptions[0],
  );

  const scrollX = useRef(new Animated.Value(0)).current;
  const dotScrollX = useRef(new Animated.Value(0)).current;
  const numberOfCharts = [1, 2, 3];

  useLayoutEffect(() => {
    const {currency} = route.params;
    setCurrentCurrency(currency);
  }, []);

  const onPressChartOptionHandler = option => {
    setCurentChartOption(option);
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(dotScrollX, SIZES.width);

    return (
      <View style={{height: 30, marginTop: 15}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {numberOfCharts.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.gray, COLORS.primary, COLORS.gray],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightGray1}}>
      <HeaderBar right={true} />

      <ScrollView>
        <View
          style={{
            backgroundColor: COLORS.white,
            marginHorizontal: SIZES.radius,
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
                    contentOffset: {y: scrollX},
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

          {/* Chart Options */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{paddingVertical: 6}}>
            {chartOptions.map(option => (
              <TextButton
                key={`key-${option.id}`}
                label={option.label}
                customButtonStyle={{
                  marginHorizontal: 20,
                  backgroundColor:
                    option.id == currentChartOption.id
                      ? COLORS.primary
                      : COLORS.lightGray,
                }}
                customLabelStyle={{
                  color:
                    option.id == currentChartOption.id
                      ? COLORS.white
                      : COLORS.black,
                  ...FONTS.body5,
                }}
                onPress={onPressChartOptionHandler.bind(this, option)}
              />
            ))}
          </ScrollView>

          {/* Dots */}

          {renderDots()}
        </View>

        {/* Buy Section */}
        <View
          style={{
            backgroundColor: COLORS.white,
            marginHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            ...styles.shadow,
            padding: SIZES.radius + 2,
            // marginTop: SIZES.radius,
            marginTop: SIZES.padding - 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <CurrencyLabel
                icon={currenctCurrency?.image}
                currency={currenctCurrency?.currency}
                code={currenctCurrency?.code}
              />
            </View>
            <View>
              <Text style={{...FONTS.h3, color: COLORS.black}}>
                ${currenctCurrency?.wallet.value}
              </Text>
              <Text
                style={{
                  color:
                    currenctCurrency?.type == 'I' ? COLORS.green : COLORS.red,
                }}>
                {currenctCurrency?.wallet.crypto} {currenctCurrency?.code}
              </Text>
            </View>
            <Image
              source={icons.right_arrow}
              style={{
                height: 18,
                width: 18,
                marginLeft: SIZES.radius,
              }}
            />
          </View>
          <TextButton
            label="Buy"
            customButtonStyle={{marginTop: SIZES.radius, height: 45}}
          />
        </View>
        <AboutCoin
          customStyling={{marginBottom: 15}}
          coin={currenctCurrency?.currency}
          description={currenctCurrency?.description}
        />
        <PriceAlert customStyling={{marginBottom: SIZES.radius}} />
      </ScrollView>
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
