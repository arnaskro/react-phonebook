import { types } from '../actions/CounterActions';

export const initialState = {
	value: 0
};

// payload handling for SearchBar actions
export default (state = initialState, action) => {

	switch (action.type) {
    case types.ADD:
			return Object.assign({}, state, {
			  value: state.value + action.payload
			});
    case types.REMOVE:
			return Object.assign({}, state, {
			  value: state.value - action.payload
			});
		default:
      return state;
      // eslint-disable-next-line 
	};

};