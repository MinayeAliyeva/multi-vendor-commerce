import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info:any) => {
    console.log("info", info);
    try {
      const { data } = await api.post("/admin-login", info, {
        withCredentials: true,
      });
    } catch (error) {
      console.log("error",error)
    }
  }
);

const authReducer = createSlice({
  name: "auth",
  initialState: {
    succesMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
  },
  reducers: {},
  extraReducers: () => {},
});

export default authReducer.reducer;
