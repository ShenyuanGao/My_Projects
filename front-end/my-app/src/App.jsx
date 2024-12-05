import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProductDetail from "./pages/productDetail";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { useSelector } from "react-redux";
import Cart from "./pages/checkout";
import Confirmation from "./pages/confirmation";
import Orderhistory from "./pages/orderHistory";
//when user info updated, can be in login or register, go to main page
function App() {

  const userLoginReducer = useSelector((state) => state.userLoginReducer)
  const {userInfo} = userLoginReducer

  const userOrderReducer = useSelector((state) => {
    return state.orderReducer})
  const {success} = userOrderReducer
  return (
    <>
      <Router>
      <Routes>
        <Route exact path="/" element={userInfo ? <Home /> : <Navigate to="/login"></Navigate>}></Route>
        <Route exact path="/products/:id" element={!userInfo ? <Navigate to="/login" ></Navigate> : <ProductDetail />}></Route>
        <Route exact path="/login" element={userInfo ? <Navigate to="/" ></Navigate> : <Login />}></Route>
        <Route exact path="/register" element={userInfo ? <Navigate to="/" ></Navigate> : <Register />}></Route>
        <Route exact path="/cart" element={userInfo ? (success ? <Confirmation /> : <Cart />) : <Navigate to="/"></Navigate>}></Route>
        <Route exact path="/order_history" element={userInfo ? <Orderhistory /> : <Navigate to="/"></Navigate>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
