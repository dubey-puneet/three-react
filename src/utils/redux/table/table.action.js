import ActionsType from "../utils/actions.type"
export const setTableData = (data) => ({
  type: ActionsType.SET_TABLE_DATA,
  payload: data
})
