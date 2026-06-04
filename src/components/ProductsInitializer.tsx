// src/components/ProductsInitializer.tsx
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/store/features/productSlice";
import { AppDispatch } from "@/store/store";

export default function ProductsInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts()); // MongoDB se products load karo
  }, [dispatch]);

  return null;
}