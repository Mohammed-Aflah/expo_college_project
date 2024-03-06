import { createSlice } from "@reduxjs/toolkit";
import { uploadExpo } from "../actions/User/allUserAction";
import toast from "react-hot-toast";

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
        state.err = payload.response.data.err;
        state.loading = false;
        state.expos = null;
      });
  },
});

export default expoSlicee.reducer;
