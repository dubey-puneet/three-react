import ActionsType from "./../utils/actions.type"
import axios from "axios"
import { updateTableData } from "../table/table.action";


export const setCurrentUser = (user) => ({
  type: ActionsType.SET_CURRENT_USER,
  payload: user
})
export const setCurrentLang = (lang) => ({
  type: ActionsType.SET_CURRENT_LANG,
  payload: lang
});

const apiError = (data) => {
  return {
    type: ActionsType.API_ERROR,
    data
  };
};

const apiSuccess = data => {
  return {
    type: ActionsType.API_SUCCESS,
    data
  };
};

export const updateTicketForm = (token, id, data, ticket) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
    axios.post(`https://eshkolserver.azurewebsites.net/api/Dynamic/StoreDocument/requests/${id}`, data, { headers: headers })
      .then(resp => {
        dispatch(apiSuccess(resp.data));
        // Update the table data
        dispatch(updateTableData(data, id, ticket))
      })
      .catch(err => {
        dispatch(apiError());
      });
  };
}

