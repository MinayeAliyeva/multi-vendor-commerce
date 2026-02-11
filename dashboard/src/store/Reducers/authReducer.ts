import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import type { AxiosError } from "axios";
export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info: any) => {
    try {
      const { data } = await api.post("/admin-login", info, {
        withCredentials: true,
      });
      console.log("data", data);
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage = err.response?.data?.error;
      console.log("ERROR", errorMessage);
      return errorMessage;
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
  extraReducers: (builder) => {
    builder.addCase(admin_login.pending, (state, { payload }) => {
      state.loader = true;
    });
  },
});

export default authReducer.reducer;
