import React from 'react';
import {Text, StyleSheet, View, TouchableNativeFeedback} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useDispatch} from 'react-redux';
import {setFrom, setTo} from './calcSlice';

export interface CurrenciesListProps {
  list: string[];
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  setaAdditionalCurrency: React.Dispatch<React.SetStateAction<string>>;
  direction: 'from' | 'to';
}

export default function CurrenciesList({
  list,
  setIsShown,
  direction,
  setaAdditionalCurrency,
}: CurrenciesListProps) {
  const dispatch = useDispatch();

  const onPress = (currency) => {
    const action = direction === 'from' ? setFrom(currency) : setTo(currency);
    dispatch(action);
    setaAdditionalCurrency(currency);
    setIsShown(false);
  };
  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      {list.map((currency) => (
        //got a bug here - rectbutton doesn't work on android
        <TouchableNativeFeedback
          key={currency}
          onPress={() => onPress(currency)}>
          <Text style={styles.text}>{currency}</Text>
        </TouchableNativeFeedback>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    paddingTop: getStatusBarHeight(),
  },
  text: {
    fontSize: 20,
    padding: 5,
    paddingHorizontal: 40,
  },
});
