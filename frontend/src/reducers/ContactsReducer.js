import { types, SortColumns, ListTypes } from '../actions/ContactsActions';
import Contact from '../models/Contact';
import FavoriteContact from '../models/FavoriteContact';

const initialContactsData = () => {
  return JSON.parse(localStorage.getItem('contactsData')) || [
    new Contact(0, "Johny", 88228844),
    new Contact(1, "Bob", 11223344),
    new Contact(2, "Elisa", 99887766),
    new Contact(3, "Bart", 22332233)
  ];
}

const initialFavoriteContactsData = () => {
  return JSON.parse(localStorage.getItem('favoriteContactsData')) || [];
}

export const initialState = {
  data: initialContactsData(),
  fetching: false,
  fetched: false,
  error: null,
  input: new Contact(),
  sorting: {
    asc: true,
    column: SortColumns.ID
  },
  modal: {
    isOpen: false,
    isNestedOpened: false,
    activeId: null,
    activeObject: new Contact()
  },
  favorites: initialFavoriteContactsData(),
  activeList: ListTypes.ALL,
  searchParam: "",
  searchedData: null,
  searched: false
};

export default (state = initialState, action) => {
  let newState = manipulateData(state, action);

  localStorage.setItem('contactsData', JSON.stringify(newState.data));
  localStorage.setItem('favoriteContactsData', JSON.stringify(newState.favorites));

  return newState;
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

const manipulateData = (state, action) => {

  switch (action.type) {
    case types.ADD_CONTACT:
      return {
        ...state,
        data: dataSort([...state.data, new Contact(action.payload.id,action.payload.name,action.payload.phonenumber)], state.sorting.asc, state.sorting.column),
        input: {
          name: "",
          phonenumber: ""
        }
      };
    case types.REMOVE_CONTACT:
    let filteredData = state.data.filter((x,i) => x.id !== action.payload);
    return Object.assign({}, state, {
        data: filteredData,
        favorites: state.favorites.filter(y => y.contactId !== action.payload),
        searchedData: filterSearchResult(filteredData, state.searchParam),
        modal: {
          isOpen: false,
          isNestedOpened: false,
          activeId: null,
          activeObject: new Contact()
        }
        });
    case types.UPDATE_CONTACT:
      return {
        ...state,
        data: state.data.map((x,i) => i === action.payload.id ? action.payload.activeObject : x),
        modal: {
          isOpen : false,
          isNestedOpened : false,
          activeId : null,
          activeObject : new Contact()
        }
      };
    case types.INPUT_CONTACT_NAME:
      return action.payload.type ? { //If true we save in modal.activeObject.name else we save in input.name
        ...state,
        modal : {
          ...state.modal,
          activeObject : {
            ...state.modal.activeObject,
            name : action.payload.value
          }
        }
      } : {
        ...state,
        input: { ...state.input, name: action.payload.value }
      };
    case types.INPUT_CONTACT_PHONENUMBER:
    return action.payload.type ? { //If true we save in modal.activeObject.phonenumber else we save in input.phonenumber
      ...state,
      modal : {
        ...state.modal,
        activeObject : {
          ...state.modal.activeObject,
          phonenumber : action.payload.value
        }
      }
    } : {
      ...state,
      input: { ...state.input, phonenumber: action.payload.value }
    };
    case types.INPUT_SEARCH_PARAM:
      return {
        ...state,
        searchParam: action.payload
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
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpen: action.payload !== null,
          activeId: action.payload,
          activeObject: action.payload !== null ? state.data.filter(x => x.id === action.payload)[0] : new Contact()

        }
      };
      case types.TOGGLE_CONTACT_NESTED_MODAL_STATE:
        return {
          ...state,
          modal: {
            ...state.modal,
            isNestedOpened: action.payload.isNestedOpened
          }
        };
      case types.TOGGLE_FAVORITE_CONTACT:
        return {
          ...state,
          favorites: state.favorites.filter(y => y.contactId === action.payload).length > 0 ? state.favorites.filter(y => y.contactId !== action.payload) : [...state.favorites, new FavoriteContact(action.payload)]
        };
      case types.TOGGLE_LIST_TYPE:
        return {
          ...state,
          activeList: action.payload
        };
      case types.FILTER_SEARCH_RESULT:

        return action.payload.length ? {
          ...state,
          searchedData: filterSearchResult(state.data, action.payload),
          searched: true
        } : {
          ...state,
          searched: false
        };
    default:
      return state;

  // eslint-disable-next-line
  };

};

const filterSearchResult = (data, searchParam) =>  data.filter(x => x.name.toLowerCase().indexOf(searchParam.toLowerCase()) !== -1 || (`${x.phonenumber}`).indexOf(searchParam) !== -1 );