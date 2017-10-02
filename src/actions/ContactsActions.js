export const types = {
  ADD_CONTACT: 'ADD_CONTACT',
  REMOVE_CONTACT: 'REMOVE_CONTACT',
  UPDATE_CONTACT: 'UPDATE_CONTACT',
  INPUT_CONTACT_NAME: 'INPUT_CONTACT_NAME',
  INPUT_CONTACT_PHONENUMBER: 'INPUT_CONTACT_PHONENUMBER',
  CONTACTS_TOGGLE_SORT: 'CONTACTS_TOGGLE_SORT',
  TOGGLE_CONTACT_MODAL_STATE : 'TOGGLE_CONTACT_MODAL_STATE',
  TOGGLE_CONTACT_NESTED_MODAL_STATE : 'TOGGLE_CONTACT_NESTED_MODAL_STATE'
};

export const SortColumns = {
  ID: "ID",
  NAME: "NAME",
  PHONENUMBER: "PHONENUMBER"
};

export const sortByColumn = (column = SortColumns.ID) => {
  return function (dispatch) {
    dispatch({
      type: types.CONTACTS_TOGGLE_SORT,
      payload: column
    });
  };
};

export const add = (id, name, phonenumber) => {
  return function (dispatch) {
    dispatch({
      type: types.ADD_CONTACT,
      payload: {id: id, name: name, phonenumber: phonenumber}
    });
  };
};

export const remove = (id = -1) => {
  return function (dispatch) {

    dispatch({
      type: types.REMOVE_CONTACT,
      payload: id
    });
  };
};
export const update = (id = -1, activeObject = {}) => {
  return function (dispatch) {

    dispatch({
      type: types.UPDATE_CONTACT,
      payload: {
        id: id,
        activeObject: activeObject
      }
    });
  };
};

export const inputName = (value = "", type = false) => {
  return function (dispatch) {
    dispatch({
      type: types.INPUT_CONTACT_NAME,
      payload: {
        value: value,
        type: type
      }
    });
  };
};

export const inputPhonenumber = (value = "", type = false) => {
  return function (dispatch) {
    dispatch({
      type: types.INPUT_CONTACT_PHONENUMBER,
      payload: {
        value: value,
        type: type
      }
    });
  };
};

export const toggleModal = (objectId = null) => {
  return function (dispatch) {
    dispatch({
      type: types.TOGGLE_CONTACT_MODAL_STATE,
      payload: objectId
    });
  };
};

export const toggleNestedModal = (object = null) => {
  return function (dispatch) {
    dispatch({
      type: types.TOGGLE_CONTACT_NESTED_MODAL_STATE,
      payload: {
        isNestedOpened : object.isNestedOpened,
        id: object.objectId
      }
    });
  };
};
