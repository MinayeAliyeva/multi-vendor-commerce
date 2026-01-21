import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import type { AxiosError } from "axios";
export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info: any) => {
    console.log("info", info);
    try {
      const { data } = await api.post("/admin-login", info, {
        withCredentials: true,
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.log("error", err.response?.data?.message);
      return err.response?.data?.message;
    }
  },
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
