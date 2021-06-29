import { combineReducers } from "redux"
import userReducer from "./user/user.reducer"
import tableReducer from "./table/table.reducer"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"]
}

const rootReducer = combineReducers({
  user: userReducer,
  table: tableReducer
})

export default persistReducer(persistConfig, rootReducer)
