import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "mycart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, actions) => {
      const data = state.cart.filter((key) => key.id === actions.payload.id);
      if (data.length >= 1) {
        toast.warning("Product already added"); // ✅ toast instead of alert
      } else {
        state.cart.push(actions.payload);
      }
    },

    proIncrement: (state, actions) => {
      for (let i = 0; i < state.cart.length; i++) {
        
        if (state.cart[i].id === actions.payload.id) {
       
          
          state.cart[i].qnty++;
          
        }
      }
    },

    proDecrement: (state, actions) => {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id === actions.payload.id) {
          if (state.cart[i].qnty <= 1) {
            toast.error("Cannot be less than 1"); // ✅ toast instead of alert
          } else {
            state.cart[i].qnty--;
          }
        }
      }
    },
    itemRemove: (state, actions) => {
        state.cart = state.cart.filter(item => item.id !== actions.payload.id);
      }
      
  },
});

export const { addToCart, proIncrement, proDecrement,itemRemove} = cartSlice.actions;
export default cartSlice.reducer;
