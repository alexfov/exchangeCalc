import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppCalcState} from '../../App/rootReducer';
import {init} from './calcSlice';
import {DatePicker} from './datePicker';
import FromInputBlock from './fromInputBlock';
import ToInputBlock from './toInputBlock';

export default function Calc() {
  const dispatch = useDispatch();
  const date = useSelector((state: AppCalcState) => state.calc.date);
  useEffect(() => {
    fetch('https://api.exchangeratesapi.io/' + date)
      .then((response) => response.json())
      .then((rates) => dispatch(init(rates)));
  }, [date]);

  return (
    <View style={styles.container}>
      <DatePicker />
      <Text style={styles.directionText}>У меня есть</Text>
      <FromInputBlock />
      <Text style={styles.directionText}>Хочу приобрести</Text>
      <ToInputBlock />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  directionText: {
    fontSize: 25,
    margin: 5,
  },
});
