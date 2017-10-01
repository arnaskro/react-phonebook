import { types, SortColumns } from '../actions/ContactsActions';

export const initialState = {
  data: [
    {id: 0, name: "Johny", phonenumber: 88228844},
    {id: 1, name: "Bob", phonenumber: 11223344},
    {id: 2, name: "Elisa", phonenumber: 99887766},
    {id: 3, name: "Bart", phonenumber: 22332233}
  ],
  fetching: false,
  fetched: false,
  error: null,
  input: {
    name: "",
    phonenumber: ""
  },
  sorting: {
    asc: true,
    column: SortColumns.ID
  },
  modal: {
    isOpen: false,
    isNestedOpen: false
  }

};

export default (state = initialState, action) => {

  switch (action.type) {
    case types.ADD_CONTACT:
      return {
        ...state,
        data: dataSort([...state.data, action.payload], state.sorting.asc, state.sorting.column),
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
    case types.CONTACTS_TOGGLE_SORT:
      let sortDirection = state.sorting.column === action.payload ? !state.sorting.asc : true;
        return {
        ...state,
        data: dataSort(state.data, sortDirection, action.payload),
        sorting: {
          asc: sortDirection,
          column: action.payload
        }
      };
    case types.TOGGLE_CONTACT_MODAL_STATE:
    console.log(state);
      return {
        ...state,
        modal: {
          isOpen: action.payload,
          isNestedOpen: false
        }
      };
    case types.TOGGLE_CONTACT_NESTED_MODAL_STATE:
      return {
        ...state,
        modal: {
          isOpen: true,
          isNestedOpen: action.payload
        }
      };
    default:
      return state;

  // eslint-disable-next-line
  };

};

const dataSort = (data, asc, column) => {
  let sortedData = [];

  switch (column){
    case SortColumns.PHONENUMBER:
      sortedData = data.sort((a, b) => { return a.phonenumber < b.phonenumber });
      break;
    case SortColumns.NAME:
      sortedData = data.sort((a, b) => { return a.name.toLowerCase() < b.name.toLowerCase() });
      break;
    case SortColumns.ID:
    default:
      sortedData = data.sort((a, b) => { return a.id - b.id; });
      break;
  }

  return asc ? sortedData : sortedData.reverse();
};
