import {combineReducers} from 'redux';
import calcSlice, {CalcState} from '../features/Calc/calcSlice';

export interface AppCalcState {
  calc: CalcState;
}

export default combineReducers({
  calc: calcSlice,
});
