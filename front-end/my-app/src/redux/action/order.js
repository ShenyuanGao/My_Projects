import {
    ORDER_REQ,
    ORDER_SUCCESS,
    ORDER_FAIL,
    
    ORDER_DETAIL_REQ,
    ORDER_DETAIL_REQ_FAIL,
    ORDER_DETAIL_REQ_SUCCESS,
    
    ORDER_PAYMENT_REQ,
    ORDER_PAYMENT_REQ_FAIL,
    ORDER_PAYMENT_REQ_SUCCESS,
    
    ORDER_LIST_REQ,
    ORDER_LIST_REQ_FAIL,
    ORDER_LIST_REQ_SUCCESS,
  } from "../Constants/Order";
  import { BASE_URL } from "../constants/base-url";
import { CART_ITEM_CLEAR } from "../constants/cart";
import axios from "axios";

  export const orderAction = (order) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_REQ });
  
      const userInfo = getState().userLoginReducer.userInfo;
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        },
      };

      console.log(order)
  
      const { data } = await axios.post(
        `${BASE_URL}/api/orders`,
        order,
        config
      );

      dispatch({
        type: ORDER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: CART_ITEM_CLEAR,
        payload: data
      })

    } catch (error) {
      console.log(error)
      dispatch({
        type: ORDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const orderPaymentAction = (orderID, payment_result) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAYMENT_REQ });
  
      const userInfo = getState().userLoginReducer.userInfo;
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(
        `${BASE_URL}/api/orders/${orderID}/payment`,
        payment_result,
        config
      );
  
      dispatch({
        type: ORDER_PAYMENT_REQ_SUCCESS,
        payload: data,
      });

      dispatch(orderDetailAction(orderID))


    } catch (error) {
      dispatch({
        type: ORDER_PAYMENT_REQ_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });

}};




export const orderDetailAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DETAIL_REQ });
  
      const userInfo = getState().userLoginReducer.userInfo;
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(
        `${BASE_URL}/api/orders/${id}`,
        config
      );
  
      dispatch({
        type: ORDER_DETAIL_REQ_SUCCESS,
        payload: data,
      });



    } catch (error) {
      dispatch({
        type: ORDER_DETAIL_REQ_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });

}};


export const orderListAction = () => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_REQ });
  
      const userInfo = getState().userLoginReducer.userInfo;
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        },
      };
  
      const { data } = await axios.get(
        `${BASE_URL}/api/orders`,
        config
      );
  
      dispatch({
        type: ORDER_LIST_REQ_SUCCESS,
        payload: data,
      });



    } catch (error) {
      dispatch({
        type: ORDER_LIST_REQ_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });

}};