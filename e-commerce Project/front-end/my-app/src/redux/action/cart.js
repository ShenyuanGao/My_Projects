import axios from "axios";
import {
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    SAVE_PAYMENT_METHOD,
  } from "../constants/cart";
import { BASE_URL } from "../constants/base-url";

export const addToCartAction = (id, qty) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
  
      dispatch({
        type: ADD_ITEM_TO_CART,
        payload: {
          product: data.id,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.count_in_stock,
          qty,
        },
      });
  
      // Optional: Save the cart to local storage
      localStorage.setItem("cartItems", JSON.stringify(getState().cartReducer.cartItems));
    } catch (error) {
      console.log(error);
    }
  };

export const removeFromCartAction = (id) => (dispatch, getState) => {
    dispatch({
      type: REMOVE_ITEM_FROM_CART,
      payload: id,
    });
  
    // Update the cart in local storage
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartReducer.cartItems)
    );
  };

  
export const savePaymentMethodAction = (data) => (dispatch) => {
    dispatch({
      type: SAVE_PAYMENT_METHOD,
      payload: data,
    });
  
    // Save payment method to local storage
    localStorage.setItem("paymentMethod", JSON.stringify(data));
  };
  