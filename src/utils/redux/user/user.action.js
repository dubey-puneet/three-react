import ActionsType from "./../utils/actions.type"
export const setCurrentUser = (user) => ({
  type: ActionsType.SET_CURRENT_USER,
  payload: user
})
