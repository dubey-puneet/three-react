import ActionsType from "./../utils/actions.type"
const INITIAL_STATE = {
  currentUser: null,
  currentLang: "en",
  error: {},
  response: {}
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionsType.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    case ActionsType.SET_CURRENT_LANG:
      return {
        ...state,
        currentLang: action.payload
      }
    case ActionsType.API_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case ActionsType.API_SUCCESS:
        return {
          ...state,
          response: action.payload
        }
    default:
      return state
  }
}

export default userReducer
