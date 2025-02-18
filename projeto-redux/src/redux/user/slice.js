import { createSlice } from "@reduxjs/toolkit";
import { Address } from "../../pages/address";

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
    }
  }
})

export const { createUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;