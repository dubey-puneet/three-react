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
        console.log("err",err)
        dispatch(apiError());
      });
  };
}

export const addNewTicketForm = (token, data) => {

  const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  const id = uuidv4();

  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
    axios.post(`https://eshkolserver.azurewebsites.net/api/Dynamic/StoreDocument/requests/${id}`, data, { headers: headers })
      .then(resp => {
        dispatch(apiSuccess(resp.data));
        // Update the table data
      })
      .catch(err => {
        dispatch(apiError());
      });
  };
}

