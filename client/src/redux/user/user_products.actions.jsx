import { createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:3032";

export const fetchUserProductsLiked = createAsyncThunk(
  "userProducts/fetchUserProductsLiked",
  async (userId, thunkAPI) => {
    try {
      const responseLike = await fetch(`${API}/user/liked/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataLike = await responseLike.json();
      return dataLike;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const fetchUserProductsAlerted = createAsyncThunk(
  "userProducts/fetchUserProductsAlerted",
  async (userId, thunkAPI) => {
    try {
      const responseAlerted = await fetch(`${API}/user/alerted/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataAlerted = await responseAlerted.json();
      return dataAlerted;
    } catch (error) {
      console.log("error", error);
    }
  }
);
