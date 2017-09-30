import { types } from '../actions/ContactsActions';

export const initialState = {
  data: [],
  fetching: false,
  fetched: false,
  error: null,
  input: {
    name: "",
    phonenumber: ""
  }
};

export default (state = initialState, action) => {

  switch (action.type) {
    case types.ADD_CONTACT:
      return {
        ...state,
        data: [...state.data, action.payload],
        input: {
          name: "",
          phonenumber: ""
        }
      };
      case types.REMOVE_CONTACT:
        return Object.assign({}, state, {
          data: state.filter(x => x !== action.payload.id)
        });
      case types.INPUT_CONTACT_NAME:
        return {
          ...state,
          input: { ...state.input, name: action.payload }
        };
      case types.INPUT_CONTACT_PHONENUMBER:
        return {
          ...state,
          input: { ...state.input, phonenumber: action.payload }
        };
    default:
      return state;
  // eslint-disable-next-line
  };

};