export const types = {
    ADD_CONTACT: 'ADD_CONTACT',
    REMOVE_CONTACT: 'REMOVE_CONTACT',
    INPUT_CONTACT_NAME: 'INPUT_CONTACT_NAME',
    INPUT_CONTACT_PHONENUMBER: 'INPUT_CONTACT_PHONENUMBER'
  };
  
  export const add = (id, name, phonenumber) => {
    return function (dispatch) {
      dispatch({
        type: types.ADD_CONTACT,
        payload: {id: id, name: name, phonenumber: phonenumber}
      });
    }
  }
  
  export const remove = (id = -1) => {
    return function (dispatch) {
      dispatch({
        type: types.REMOVE_CONTACT,
        payload: id
      });
    }
  }
  
  export const inputName = (value = "") => {
    return function (dispatch) {
      dispatch({
        type: types.INPUT_CONTACT_NAME,
        payload: value
      });
    }
  }
  
  export const inputPhonenumber = (value = "") => {
    return function (dispatch) {
      dispatch({
        type: types.INPUT_CONTACT_PHONENUMBER,
        payload: value
      });
    }
  }