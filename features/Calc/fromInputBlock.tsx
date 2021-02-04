import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {AppCalcState} from '../../App/rootReducer';
import {setFromVal} from './calcSlice';
import Currencies from './currencies';
import InputBlock from './inputBlock';

export default function FromInputBlock() {
  const rates = useSelector((state: AppCalcState) => state.calc.rates);
  const from = useSelector((state: AppCalcState) => state.calc.to);
  const toRate = rates[from];
  const to = useSelector((state: AppCalcState) => state.calc.from);
  const fromRate = rates[to];
  const ratio = (fromRate / toRate).toFixed(4);
  const value = useSelector((state: AppCalcState) => state.calc.fromVal);
  const action = setFromVal;

  return (
    <View style={styles.container}>
      <Currencies direction="from" />
      <InputBlock {...{from, to, ratio, value, action}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginBottom: 20},
});
