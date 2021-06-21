import ActionsType from "../utils/actions.type"
const INITIAL_STATE = {
  tableData: []
}

const tableReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionsType.SET_TABLE_DATA:
      return {
        ...state,
        tableData: action.payload
      }
    default:
      return state
  }
}

export default tableReducer
