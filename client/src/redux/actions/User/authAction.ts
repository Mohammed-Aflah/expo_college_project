import axiosInstance from "@/constant/constant";
import { userData } from "@/types/userAuth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signupUser: any = createAsyncThunk(
  "user/signupUser",
  async (userCredentials: userData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/signup", userCredentials);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkAuthentication: any = createAsyncThunk(
  "user/checkUserAuth",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/checkAuth");

      // const { status, message } = data;
      // const { username, email, id } = data.user;

      // return { status, message, username, email, id };
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logoutUser: any = createAsyncThunk(
  "user/logoutuser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/logout");
      if (data.status) {
        data.status = false;
      }
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginUser: any = createAsyncThunk(
  "user/loginuser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/login", userCredentials);

      return data;
    } catch (error) {
      if (error.response.data.err) {
        return rejectWithValue(error.response.data.err);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAllExpo = createAsyncThunk(
  "admin/getALlexpo",
  async (filterQuery:{district:any}, { rejectWithValue }) => {
    console.log("🚀 ~ filterQuery:", filterQuery)
    try {
      const {data}=await axiosInstance.get(`/add-expo?district=${filterQuery.district}`)
      return data
    } catch (error) {
      if (error.response.data.err) {
        return rejectWithValue(error.response.data.err);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
