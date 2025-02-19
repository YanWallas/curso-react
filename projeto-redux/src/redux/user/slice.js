import { createSlice } from "@reduxjs/toolkit";
import { Address } from "../../pages/address";
import { act } from "react-dom/test-utils";

const initialState = {
  user: null,
}


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action) => {

      if(action.payload.name.length < 3){
        alert("PREENCHA UM NOME COM MAIS DE 3 LETRAS")
        return { ...state }
      }

      return {
        ...state,
        user:{
          name: action.payload.name,
          email: action.payload.email,
          Address: null,
        }
      }
    },
    logoutUser: (state) => {

      return {
        ...state,
        user: null,
      }
    },
    addAddress: (state, action) => {

      if(action.payload.location === '' || action.payload.number === ''){
        alert("Preencha todos os campos")
        return { ...state }
      }

      if(state.user === null){
        alert("Faça o login para cadastrar um endereço")
        return { ...state }
      }

      alert("Dados Atualizados!")      

      return{
        ...state,
        user:{
          ...state.user,
          address:{
            location: action.payload.location,
            number: action.payload.number,
          }
        }
      }
    },
    deleteAddress: (state) => {
      return{
        ...state,
        user:{
          ...state.user,
          address: null,
        }
      }
    }
  }
})

export const { createUser, logoutUser, addAddress, deleteAddress } = userSlice.actions;
export default userSlice.reducer;