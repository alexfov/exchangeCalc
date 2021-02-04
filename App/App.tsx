import {configureStore} from '@reduxjs/toolkit';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {Provider, useDispatch} from 'react-redux';
import {PADDING} from '../constants';
import Calc from '../features/Calc';
import {init} from '../features/Calc/calcSlice';
import rootReducer from './rootReducer';

const store = configureStore({reducer: rootReducer});

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Calc />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: PADDING},
});
