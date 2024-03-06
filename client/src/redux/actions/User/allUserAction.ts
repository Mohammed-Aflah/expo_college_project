import axiosInstance from "@/constant/constant";
import { createAsyncThunk } from "@reduxjs/toolkit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllUsers: any = createAsyncThunk(
  "users/getAllusers",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/get-allUsers?id=${id}`);
      return data;
    } catch (error) {
      console.log("🚀 ~ error:", error)
      return rejectWithValue(error);
    }
  }
);

export const uploadExpo:any = createAsyncThunk(
  "users/post-expo",
  async (body, { rejectWithValue }) => {
    console.log("🚀 ~ body:", body.coverImage)
    try {
      const {data}=await axiosInstance.post('/add-expo',body)
      return data
    } catch (error:Error|any) {
      console.log("🚀 ~ error:", error.message)
      return rejectWithValue(error);
    }
  }
);
