import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistItem {
  id: string | number;
  title: string;
  category: string;
  price: number;
  oldPrice: number;
  image: string;
}

interface WishlistState {
  wishlistItems: WishlistItem[];
}

const getWishlistItems = () => {

  if (typeof window === "undefined") return [];

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  if (!currentUser) return [];

  return JSON.parse(
    localStorage.getItem(
      `wishlist_${currentUser.email}`
    ) || "[]"
  );
};

const initialState: WishlistState = {
  wishlistItems: getWishlistItems(),
};

const saveWishlist = (
  wishlistItems: WishlistItem[]
) => {

  if (typeof window === "undefined") return;

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  if (!currentUser) return;

  localStorage.setItem(
    `wishlist_${currentUser.email}`,
    JSON.stringify(wishlistItems)
  );
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {

    loadWishlist: (state) => {
      state.wishlistItems = getWishlistItems();
    },

    clearWishlistState: (state) => {
      state.wishlistItems = [];
    },

    addToWishlist: (
      state,
      action: PayloadAction<WishlistItem>
    ) => {

      const existingItem = state.wishlistItems.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) {
        state.wishlistItems.push(action.payload);
      }

      saveWishlist(state.wishlistItems);
    },

    removeFromWishlist: (
      state,
      action: PayloadAction<string | number>
    ) => {

      state.wishlistItems =
        state.wishlistItems.filter(
          (item) => item.id !== action.payload
        );

      saveWishlist(state.wishlistItems);
    },

    clearWishlist: (state) => {

      state.wishlistItems = [];

      saveWishlist([]);
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  clearWishlistState,
  loadWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;