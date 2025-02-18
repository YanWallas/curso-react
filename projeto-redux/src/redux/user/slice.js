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

      return {
        ...state,
        user:{
          name: action.payload.name,
          email: action.payload.email,
          Address: null,
        }
      }
    }
  }
})

export const { createUser } = userSlice.actions;
export default userSlice.reducer;