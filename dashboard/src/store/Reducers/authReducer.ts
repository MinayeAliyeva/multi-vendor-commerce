import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import type { AxiosError } from "axios";

export const admin_login = createAsyncThunk<any, any, { rejectValue: string }>(
  "auth/admin_login",
  async (info: any, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/admin-login", info, {
        withCredentials: true,
      });
      console.log("data", data);
      return fulfillWithValue(data);
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage = err.response?.data?.error;
      console.log("ERROR", errorMessage);
      return rejectWithValue(errorMessage ?? "Something went wrong");
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
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.succesMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(admin_login.pending, (state, { payload }) => {
      state.loader = true;
    });
    builder.addCase(admin_login.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload ?? "Something went wrong";
    });
    builder.addCase(admin_login.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.succesMessage = payload.message;
    });
  },
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
