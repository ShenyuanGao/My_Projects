import { combineReducers, createStore, applyMiddleware } from "redux"
import storage from "redux-persist/lib/storage"
import { thunk } from "redux-thunk"
import { persistStore, persistReducer } from "redux-persist"
import { productListReducer, productReducer } from "./reducers/product"
import { userLoginReducer, userRegisterReducer } from "./reducers/user"
import { cartReducer } from "./reducers/cart"
import { orderReducer, orderDetailReducer, orderListReducer, orderPaymentReducer } from "./reducers/order"


const persistConfig = {
    key: "root",
    storage,
    version: 1
}

const rootReducer = combineReducers({
    productListReducer,
    productReducer,
    userLoginReducer,
    userRegisterReducer,
    cartReducer,
    orderReducer,
    orderDetailReducer,
    orderListReducer,
    orderPaymentReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = createStore(persistedReducer, applyMiddleware(thunk))

export let persistor = persistStore(store)
