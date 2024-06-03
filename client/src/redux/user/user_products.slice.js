import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProducts } from "./user_products.actions";

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
      .addCase(fetchUserProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.likedProducts = payload.likedProducts;
        state.alertedProducts = payload.alertedProducts;
      })
      .addCase(fetchUserProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userProductsSlice.reducer;
