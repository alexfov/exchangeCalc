import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {RectButton, State} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {AppCalcState} from '../../App/rootReducer';
import {MAIN_CURRENCIES} from '../../constants';
import CurrenciesList from './currenciesList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {setFrom, setTo} from './calcSlice';
import {Overlay} from 'react-native-elements';

export interface CurrenciesProps {
  direction: 'from' | 'to';
}

export default function Currencies({direction}) {
  const dispatch = useDispatch();
  const [additionalCurrency, setaAdditionalCurrency] = useState('');
  const [isModalShown, setIsModalShown] = useState(false);

  const activeCurrency = useSelector(
    (state: AppCalcState) => state.calc[direction],
  );

  const rates = useSelector((state: AppCalcState) => state.calc.rates);
  const currencies =
    Object.keys(rates).filter(
      (currency) => !MAIN_CURRENCIES.includes(currency),
    ) || [];

  useLayoutEffect(() => {
    setaAdditionalCurrency(currencies[0]);
  }, [rates]);

  const currenciesToRender = MAIN_CURRENCIES.concat(additionalCurrency);

  const onPress = (currency) => {
    const action = direction === 'from' ? setFrom : setTo;
    dispatch(action(currency));
  };

  return (
    <View style={styles.container}>
      {currenciesToRender.map((currency, index) => (
        <RectButton
          key={index}
          onPress={() => onPress(currency)}
          style={[
            styles.currency,
            activeCurrency === currency && styles.activeCurrency,
          ]}>
          <Text style={styles.currencyText}>{currency}</Text>
        </RectButton>
      ))}
      <RectButton style={styles.currency} onPress={() => setIsModalShown(true)}>
        <Icon name="chevron-down" size={20} style={styles.currencyText} />
      </RectButton>
      <Overlay
        isVisible={isModalShown}
        onBackdropPress={() => setIsModalShown(false)}>
        <CurrenciesList
          list={currencies}
          setIsShown={setIsModalShown}
          {...{setaAdditionalCurrency, direction}}
        />
      </Overlay>
    </View>
  );
}

const CELL_HEIGHT = 40;
const styles = StyleSheet.create({
  container: {flexDirection: 'row', justifyContent: 'space-between'},
  currency: {
    flex: 1,
    height: CELL_HEIGHT,
  },
  currencyText: {
    alignSelf: 'stretch',
    flex: 1,
    borderWidth: 1,
    borderColor: '#dedede',
    textAlign: 'center',
    lineHeight: CELL_HEIGHT,
  },
  activeCurrency: {
    backgroundColor: '#16b67f',
  },
});
