import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./redux/CartReducer";
import Userreducer from "./redux/Userreducer";
import FavoriteReducer from "./redux/FavoriteSlice"

export default configureStore({
  reducer: {
    cart: CartReducer,
    user: Userreducer,
    favorite: FavoriteReducer
  },
});