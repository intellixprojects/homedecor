"use client";

import { useEffect } from "react";
import { products as staticProducts } from "@/data/products";

export default function ProductsInitializer() {

  useEffect(() => {

    const existingProducts =
      localStorage.getItem("products");

    if (!existingProducts) {

      localStorage.setItem(
        "products",
        JSON.stringify(staticProducts)
      );
    }

  }, []);

  return null;
}