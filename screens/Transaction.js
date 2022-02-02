import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView} from 'react-native';
import {COLORS, dummyData, FONTS, SIZES} from '../constants';
import {
  HeaderBar,
  CurrencyLabel,
  TextButton,
  TransactionHistory,
} from '../components';

const Transaction = ({navigation, route}) => {
  const [currenctCurrency, setCurrentCurrency] = useState(
    dummyData.trendingCurrencies[1],
  );

  const [transactionData, setTransactionData] = useState(
    dummyData.transactionHistory,
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightGray1}}>
      <HeaderBar right={false} />

      <ScrollView>
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
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: SIZES.radius,
            }}>
            <Text style={{...FONTS.h2, color: COLORS.black}}>
              13.770 {currenctCurrency?.code}
            </Text>
            <Text>${13.77 * 2775}</Text>
          </View>
          <TextButton
            label="Trade"
            customButtonStyle={{marginTop: SIZES.radius, height: 45}}
          />
        </View>

        <View style={{marginBottom: 80}}>
          <TransactionHistory
            history={transactionData}
            customStyling={styles.shadow}
          />
        </View>
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

export default Transaction;
