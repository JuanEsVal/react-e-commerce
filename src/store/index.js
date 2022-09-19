import products from './slices/products.slice'
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    products
  }
})