import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./redux/auth/auth.service";
import authReducer from "./redux/auth/auth.slice";
import userProductsReducer from "./redux/user/user_products.slice";

const store = configureStore({
  reducer: {
    userProducts: userProductsReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
export default store;
