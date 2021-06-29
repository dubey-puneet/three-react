import ActionsType from "../utils/actions.type"
export const setTableData = (data) => ({
  type: ActionsType.SET_TABLE_DATA,
  payload: data
})

export const updateTableData = (data, id, ticket) => ({
  type: ActionsType.UPDATE_TABLE_DATA,
  payload: data,
  id,
  ticket
})
