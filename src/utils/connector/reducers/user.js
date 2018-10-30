const UPDATE_USER = 'UPDATE_USER'

const initialState = {
  currentUser: null,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        currentUser: action.user,
      }
    default:
      return state
  }
}

export const actions = {
  updateUser: user => ({
    type: UPDATE_USER,
    currentUser: user,
  }),
}
