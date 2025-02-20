import { all, takeEvery, call, put, delay, takeLatest } from "redux-saga/effects";
import { fetchUsersSuccess, fetchUsersFailure, fetchUsersByIdFailure, fetchUsersByIdSuccess } from "./slice";

import axios from 'axios'
// API USERS: https://jsonplaceholder.typicode.com/users/

function* fetchUsers(){
  try{
    yield delay(2000);//criando delay da API(esperando 2s)

    const response = yield call(axios.get, "https://jsonplaceholder.typicode.com/users/")
    yield put(fetchUsersSuccess(response.data))

  }catch(error){
    yield put(fetchUsersFailure(error.message))
  }
}

function* fetchUsersById(action){
  try{
    const userId = action.payload;

    const response = yield call(axios.get, `https://jsonplaceholder.typicode.com/users/${userId}`)
    yield put(fetchUsersByIdSuccess(response.data))

  }catch(error){
    yield put(fetchUsersByIdFailure(error.message))
  }
}

export default all([
  takeLatest("user/fetchUsers", fetchUsers),
  takeLatest("user/fetchUsersById", fetchUsersById)
])