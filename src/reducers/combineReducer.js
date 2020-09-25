import { useReducer } from 'react';
import breadcrumbReducer, { breadcrumbInitialState } from './breadcrumbReducer';
import snackbarReducer, { snackbarInitialState } from './snackbarReducer';

const useCombineReducers = () => {

	const combineReducers = {
		breadcrumb: useReducer(breadcrumbReducer, breadcrumbInitialState),
		snackbar: useReducer(snackbarReducer, snackbarInitialState),
	};

	const state = Object.keys(combineReducers).reduce(
	  (acc, key) => ({ ...acc, [key]: combineReducers[key][0] }), {});

	const dispatch = action =>
	  Object.keys(combineReducers)
		.map(key => combineReducers[key][1])
		.forEach(fn => fn(action));
  
	return [state, dispatch];
};

export default useCombineReducers;
