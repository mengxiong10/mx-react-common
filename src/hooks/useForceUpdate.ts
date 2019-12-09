import { useReducer, Reducer } from 'react';

function reducer(state: boolean) {
  return !state;
}

export default function useForceUpdate() {
  return useReducer<Reducer<boolean, void>>(reducer, false);
}
