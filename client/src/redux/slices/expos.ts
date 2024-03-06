import { createSlice } from "@reduxjs/toolkit";
import { uploadExpo } from "../actions/User/allUserAction";
import toast from "react-hot-toast";
import { getAllExpo } from "../actions/User/authAction";

const initialState: {
  loading: boolean;
  expos: nul | any[];
  err: boolean | string;
} = {
  loading: false,
  expos: null,
  err: false,
};
const expoSlicee = createSlice({
  name: "expos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadExpo.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadExpo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.expos = payload.expos;
      })
      .addCase(uploadExpo.rejected, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ payload:", payload)
        state.err = payload;
        state.loading = false;
        state.expos = null;
        toast.error(payload.message)
      })
      .addCase(getAllExpo.pending,(state)=>{
        state.loading=true
      }).addCase(getAllExpo.fulfilled,(state,{payload})=>{
        state.loading=false
        state.err=false,
        state.expos=payload.expos
      })
      .addCase(getAllExpo.rejected,(state,{payload})=>{
        state.loading=false
        state.err=payload.message,
        state.expos=null
        toast.error(payload.message)
      })
  },
});

export default expoSlicee.reducer;
