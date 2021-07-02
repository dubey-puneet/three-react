import ActionsType from "../utils/actions.type"
const INITIAL_STATE = {
  tableData: []
}

const tableReducer = (state = INITIAL_STATE, action) => {
  let newState = []
  switch (action.type) {
    case ActionsType.SET_TABLE_DATA:
      return {
        ...state,
        tableData: action.payload
      }
    
    case ActionsType.UPDATE_TABLE_DATA:
      newState = state.tableData
      newState[action.ticket] = action.payload
      return {
        ...state,
        tableData: newState
      }
    default:
      return state
  }
}

export default tableReducer
