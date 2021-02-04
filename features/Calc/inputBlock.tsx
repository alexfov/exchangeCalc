import {ActionCreatorWithOptionalPayload} from '@reduxjs/toolkit';
import React from 'react';
import {Text, StyleSheet, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';

interface InputBlockProps {
  to: string;
  from: string;
  ratio: string;
  value: string;
  action: ActionCreatorWithOptionalPayload<string, string>;
}

export default function InputBlock({
  to,
  from,
  ratio,
  value,
  action,
}: InputBlockProps) {
  const dispatch = useDispatch();
  return (
    <>
      <TextInput
        style={styles.input}
        value={String(value)}
        onChangeText={(text) => dispatch(action(text))}
      />
      <Text style={styles.ratioText}>
        {1} {to} = {ratio} {from}
      </Text>
    </>
  );
}

const PADDING = 30;
const styles = StyleSheet.create({
  input: {
    height: 150,
    marginTop: 15,
    borderColor: 'gray',
    borderWidth: 1,
    padding: PADDING,
    fontSize: 50,
    fontWeight: 'bold',
  },
  ratioText: {
    marginTop: -30,
    marginLeft: PADDING,
    color: '#878787',
  },
});
