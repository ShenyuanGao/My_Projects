import axios from "axios";
import { USER_LOGIN_REQ, USER_LOGIN_REQ_SUCCESS, USER_LOGIN_REQ_FAIL, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS, USER_REGISTER_REQ } from "../constants/user";
import { BASE_URL } from "../constants/base-url";
import { CART_ITEM_CLEAR } from "../constants/cart";

export const userLoginAction = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQ });
  
      const { data } = await axios.post(
        `${BASE_URL}/api/user/login`,
        { email, password }
      );
        dispatch({ type: USER_LOGIN_REQ_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
        console.log(err)
      dispatch({
        type: USER_LOGIN_REQ_FAIL,
        payload: err.response.data.message
      })
    }
  };

  export const userLogoutAction = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems")
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: CART_ITEM_CLEAR })
  };
  
  
  export const userRegisterAction = (name, email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQ });
      
      const { data } = await axios.post(
        `${BASE_URL}/api/user/register`,
        { name, email, password }
      );
  
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_REQ_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error);
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response.data.message
      })
    }
  };
  