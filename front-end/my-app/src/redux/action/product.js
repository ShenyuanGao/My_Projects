import axios from "axios"
import { BASE_URL } from "../constants/base-url.js"
import {
    PRODUCT_LIST_REQ,
    PRODUCT_LIST_REQ_SUCCESS,
    PRODUCT_LIST_REQ_FAIL,
    PRODUCT_DETAIL_REQ,
    PRODUCT_DETAIL_REQ_SUCCESS,
    PRODUCT_DETAIL_REQ_FAIL
} from "../constants/product.js"

export const productListAction = () => async (dispatch) => {
  // Dispatching an initial request action
  dispatch({ type: PRODUCT_LIST_REQ });

  try {
    // Fetching product data from the API
    const { data } = await axios.get(`${BASE_URL}/api/products`);

    // Dispatching a success action with the fetched data
    dispatch({
      type: PRODUCT_LIST_REQ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Dispatching a failure action with the error message
    dispatch({
      type: PRODUCT_LIST_REQ_FAIL,
      payload: error.message,
    });
  }
};

export const productAction = (id) => async (dispatch) => {
    // Dispatching an initial request action
    dispatch({ type: PRODUCT_DETAIL_REQ });
  
    try {
      // Fetching product data from the API
      const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
  
      // Dispatching a success action with the fetched data
      dispatch({
        type: PRODUCT_DETAIL_REQ_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // Dispatching a failure action with the error message
      dispatch({
        type: PRODUCT_DETAIL_REQ_FAIL,
        payload: error.message,
      });
    }
  };
