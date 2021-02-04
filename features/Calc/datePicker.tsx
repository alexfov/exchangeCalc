import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';
import {setDate} from './calcSlice';
import {AppCalcState} from '../../App/rootReducer';
import moment from 'moment';
import {RectButton} from 'react-native-gesture-handler';

export const DatePicker = () => {
  const dispatch = useDispatch();
  const date = useSelector((state: AppCalcState) => state.calc.date);
  const [isShown, setIsShown] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const formatedDate = moment(currentDate).format('YYYY-MM-DD');
    dispatch(setDate(formatedDate));
    setIsShown(false);
  };

  const timestamp = moment(date).valueOf();

  return (
    <View>
      <RectButton onPress={() => setIsShown(true)}>
        <Text style={styles.text}>Дата: {date}</Text>
      </RectButton>
      {isShown && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(timestamp)}
          maximumDate={new Date()}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingVertical: 10,
    fontSize: 18,
  },
});
