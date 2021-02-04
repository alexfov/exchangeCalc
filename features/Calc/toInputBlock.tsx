import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {AppCalcState} from '../../App/rootReducer';
import {setToVal} from './calcSlice';
import Currencies from './currencies';
import InputBlock from './inputBlock';

export default function ToInputBlock() {
  const rates = useSelector((state: AppCalcState) => state.calc.rates);
  const to = useSelector((state: AppCalcState) => state.calc.to);
  const toRate = rates[to];
  const from = useSelector((state: AppCalcState) => state.calc.from);
  const fromRate = rates[from];
  const ratio = (toRate / fromRate).toFixed(4);
  const value = useSelector((state: AppCalcState) => state.calc.toVal);
  const action = setToVal;

  return (
    <View style={styles.container}>
      <Currencies direction="to" />
      <InputBlock {...{from, to, ratio, value, action}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
