import { all, takeEvery  } from "redux-saga/effects";

function* fetchUsers(){
  console.log("CHAMOU DENTRO DO SAGA")
}

export default all([
  takeEvery("user/fetchUsers", fetchUsers)
])