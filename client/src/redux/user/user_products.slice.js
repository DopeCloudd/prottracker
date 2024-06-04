import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserProductsAlerted,
  fetchUserProductsLiked,
} from "./user_products.actions";

const initialState = {
  loading: true,
  likedProducts: [],
  alertedProducts: [],
};

const userProductsSlice = createSlice({
  name: "userProducts",
  initialState,
  reducers: {
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProductsAlerted.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProductsAlerted.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.alertedProducts = payload;
      })
      .addCase(fetchUserProductsAlerted.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserProductsLiked.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProductsLiked.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.likedProducts = payload;
      })
      .addCase(fetchUserProductsLiked.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userProductsSlice.reducer;
