import { createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:3032";

export const fetchUserProducts = createAsyncThunk(
  "userProducts/fetchUserProducts",
  async (userId, thunkAPI) => {
    try {
      const responseLike = await fetch(`${API}/user/liked/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseAlert = await fetch(`${API}/user/alerted/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataLike = await responseLike.json();
      const dataAlert = await responseAlert.json();
      return { likedProducts: dataLike, alertedProducts: dataAlert };
    } catch (error) {
      console.log("error", error);
    }
  }
);
