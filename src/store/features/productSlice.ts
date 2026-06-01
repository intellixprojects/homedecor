"use client";

import { createSlice } from "@reduxjs/toolkit";
import { products as staticProducts } from "@/data/products";

// ✅ FIXED: localStorage hataya — initial state sirf static products se
// Actual saved products IndexedDB se load hote hain (getProducts() via useEffect)
const initialState = {
  products: staticProducts,
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    // ✅ FIXED: localStorage.setItem hataya — saving IndexedDB mein
    // admin/products/page.tsx ke handleAddOrUpdateProduct mein
    // await saveProducts() already ho raha hai
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (item: any) => item.id !== action.payload
      );
    },
  },
});

export const { addProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;