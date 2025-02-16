import axios from "axios";
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    try {
      if (!newProduct.name || !newProduct.price || !newProduct.image) {
        return { success: false, message: "Please fill in all fields." };
      }

      const data = await axios.post("/api/products", newProduct);
      set((state) => ({ products: [...state.products, data.data] }));

      return { success: true, message: "Product created successfully." };
    } catch (error) {
      console.error(error);
    }
  },
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error(error);
    }
  },

  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }

    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await axios.put(`/api/products/${pid}`, updatedProduct);
      const data = res.data;

      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error(error);
    }
  },
}));
