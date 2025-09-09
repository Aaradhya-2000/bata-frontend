import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [], // reviews: { orderId, productid, review, rating, userName }
  productId: null
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
    addReview: (state, action) => {
      const { orderId, productid, review, rating, userName } = action.payload;
      const existingIndex = state.list.findIndex(r => r.orderId === orderId);

      if (existingIndex >= 0) {
        state.list[existingIndex] = { orderId, productid, review, rating, userName };
      } else {
        state.list.push({ orderId, productid, review, rating, userName });
      }
    },
    deleteReview: (state, action) => {
      const orderIdToDelete = action.payload;
      state.list = state.list.filter(r => r.orderId !== orderIdToDelete);
    }
  }
});

export const { setProductId, addReview, deleteReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
