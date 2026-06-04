import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string | number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
}

const getCartItems = () => {

  if (typeof window === "undefined") return [];

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  if (!currentUser) return [];

  return JSON.parse(
    localStorage.getItem(`cart_${currentUser.email}`) || "[]"
  );
};

const initialState: CartState = {
  cartItems: getCartItems(),
};

const saveCart = (cartItems: CartItem[]) => {

  if (typeof window === "undefined") return;

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  if (!currentUser) return;

  localStorage.setItem(
    `cart_${currentUser.email}`,
    JSON.stringify(cartItems)
  );
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {

    loadCart: (state) => {
      state.cartItems = getCartItems();
    },

    clearCartState: (state) => {
      state.cartItems = [];
    },

    addToCart: (
      state,
      action: PayloadAction<CartItem>
    ) => {

      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }

      saveCart(state.cartItems);
    },

    removeFromCart: (
      state,
      action: PayloadAction<string | number>
    ) => {

      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      saveCart(state.cartItems);
    },

    clearCart: (state) => {

      state.cartItems = [];

      saveCart([]);
    },

    increaseQuantity: (
      state,
      action: PayloadAction<string | number>
    ) => {

      const item = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }

      saveCart(state.cartItems);
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<string | number>
    ) => {

      const item = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      saveCart(state.cartItems);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  clearCartState,
  loadCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;