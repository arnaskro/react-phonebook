export const types = {
  ADD: 'ADD',
  REMOVE: 'REMOVE'
};

export const add = (value = '') => {
  return function (dispatch) {
    dispatch({
      type: types.ADD,
      payload: value
    });
  }
}

export const remove = (value = '') => {
  return function (dispatch) {
    dispatch({
      type: types.REMOVE,
      payload: value
    });
  }
}