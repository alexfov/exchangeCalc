import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';

export interface ApiResponse {
  base: string;
  date: string;
  rates: {[key: string]: number};
}

export interface CalcState {
  rates: {[key: string]: number};
  from: string;
  to: string;
  base: string;
  toVal: string;
  fromVal: string;
  date: string;
}

interface initAction {
  type: string;
  payload: ApiResponse;
}

interface ActionWithStringPayload {
  type: string;
  payload: string;
}

const today = moment().format('YYYY-MM-DD');

const initialState: CalcState = {
  rates: {},
  from: 'EUR',
  to: 'USD',
  base: 'EUR',
  toVal: '1',
  fromVal: '1',
  date: today,
};

const calcSlice = createSlice({
  name: 'calc',
  initialState,
  reducers: {
    init(state, action: initAction) {
      state.rates = action.payload.rates;
      state.rates.EUR = 1;
      state.base = action.payload.base;
      state.toVal = String(action.payload.rates.USD);
    },
    setTo(state, action: ActionWithStringPayload) {
      state.to = action.payload;
      const ratio = state.rates[state.to] / state.rates[state.from];
      state.toVal = (Number(state.fromVal) * ratio).toFixed(4);
    },
    setFrom(state, action: ActionWithStringPayload) {
      state.from = action.payload;
      const ratio = state.rates[state.from] / state.rates[state.to];
      state.fromVal = (Number(state.toVal) * ratio).toFixed(4);
    },
    setDate(state, action: ActionWithStringPayload) {
      state.date = action.payload;
    },
    setToVal(state, action: ActionWithStringPayload) {
      state.toVal = action.payload;
      const ratio = state.rates[state.from] / state.rates[state.to];
      state.fromVal = (Number(action.payload) * ratio).toFixed(4);
    },
    setFromVal(state, action: ActionWithStringPayload) {
      state.fromVal = action.payload;
      const ratio = state.rates[state.to] / state.rates[state.from];
      state.toVal = (Number(action.payload) * ratio).toFixed(4);
    },
  },
});

export const {
  init,
  setTo,
  setFrom,
  setDate,
  setToVal,
  setFromVal,
} = calcSlice.actions;
export default calcSlice.reducer;
