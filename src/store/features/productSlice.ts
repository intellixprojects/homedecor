// src/store/features/productSlice.ts
"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// MongoDB API se products fetch karne ka thunk
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const res = await fetch("/api/products", { cache: "no-store" });
    const data = await res.json();
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [] as any[],
    loading: false,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (item: any) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      });
  },
});

export const { addProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;