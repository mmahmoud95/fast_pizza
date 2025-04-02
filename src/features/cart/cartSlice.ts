import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ICartItem } from "../../utils/types/types";

interface IState {
  cart: ICartItem[];
}

const initialState: IState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(
      state,
      action: PayloadAction<{
        pizzaId: number;
        name: string;
        unitPrice: number;
        quantity: number;
        totalPrice: number;
      }>,
    ) {
      state.cart = [...state.cart, action.payload];
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }

      if (item?.quantity === 0)
        cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state: RootState) => state.cart.cart;

export const getTotalCartQuantity = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state: RootState) => {
  return state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
};

export const getCurrentQuantityById = (id: number) => (state: RootState) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

// more efficient for performance to use reselect library this use form memoized selector functions

import { createSelector } from "@reduxjs/toolkit";

// export const getTotalCartQuantity = createSelector(
//   [(state: RootState) => state.cart.cart],
//   (cart) => cart.reduce((sum, item) => sum + item.quantity, 0),
// );

// export const getTotalCartPrice = createSelector(
//   [(state: RootState) => state.cart.cart],
//   (cart) => cart.reduce((sum, item) => sum + item.totalPrice, 0),
// );
// export const selectCartItem = createSelector(
//   [(state: RootState) => state.cart.cart, (_, pizzaId: number) => pizzaId],
//   (cart, pizzaId) => cart.find((item) => item.pizzaId === pizzaId)
// );
