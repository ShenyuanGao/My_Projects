import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, removeFromCartAction } from "../redux/action/cart";
import { getCount } from "./productDetail";
import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { BASE_URL } from "../redux/constants/base-url";
import { orderAction } from "../redux/action/order";
import Layout from "../layout/layout";

const Cart = () => {

  

  const [stock, setStock] = useState({});
  const [cid, setCid] = useState()
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cartReducer});
  const cartItems = cart.cartItems;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCartAction(id));
  };

  const totalPrice = (products) => {
    let total = 0;
    const len = products.length;
    for (var i = 0; i < len; i++) {
      total = total + products[i].qty * products[i].price;
    }
    return total.toFixed(2);
  };

  async function getStock(items) {
    let obj = {};
    const len = items.length;
    for (var i = 0; i < len; i++) {
      const data = await getCount(items[i].product);
      obj[items[i].product] = data;
    }
    return obj;
  }

  async function getId() {
    const ID = await axios.get(`${BASE_URL}/api/config/paypal`);
    return ID.data;
  }

  function paymentHandler(details) {
    try {
      console.log(details)
      dispatch(
        orderAction({
          orderItems: cart.cartItems,
          shippingAddress: details,
          totalPrice: Number(total_tax),
          paymentMethods: "paypal",
          price: Number(totalP),
          taxPrice: Number(tax),
          shippingPrice: Number(shippingPrice),
          is_paid: true,
          paid_at: new Date().toISOString(),
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  const totalP = totalPrice(cartItems);
  const tax = (totalPrice(cartItems) * 0.13).toFixed(2);
  const total_tax = (parseFloat(totalP) + parseFloat(tax)).toFixed(2);
  const shippingPrice = 0;

  useEffect(() => {
    //async await in useEffect for getting stock of a product, could use Promise.all
    const stockCheck = async () => {
      const data = await getStock(cartItems);
      const ID = await getId();
      setStock(data);
      setCid(ID);
    };
    stockCheck();
  }, []);

  const addToCartHandler = (id, qty) => {
    dispatch(addToCartAction(id, qty));
  };

  return (
    <Layout>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cartItems.map((product) => (
                  <div
                    key={product.product}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <a href="#" className="shrink-0 md:order-1">
                        <img
                          className="h-20 w-20 dark:hidden"
                          src={product.image}
                          alt="imac image"
                        />
                      </a>

                      <label htmlFor="counter-input" className="sr-only">
                        Choose quantity:
                      </label>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <select
                            value={product.qty}
                            onChange={(e) =>
                              addToCartHandler(
                                product.product,
                                Number(e.target.value)
                              )
                            }
                            className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                          >
                            {stock && Object.keys(stock).length !== 0 ? (
                              stock[product.product]?.map((x) => (
                                <option key={x} value={x}>
                                  {x}
                                </option>
                              ))
                            ) : (
                              <option>Sold Out</option>
                            )}
                          </select>
                        </div>

                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">
                            ${product.price}
                          </p>
                        </div>
                      </div>

                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a
                          href={`/products/${product.product}`}
                          className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                        >
                          {product.name}
                        </a>

                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            onClick={() =>
                              removeFromCartHandler(product.product)
                            }
                          >
                            <svg
                              className="me-1.5 h-5 w-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18 17.94 6M18 18 6.06 6"
                              />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                Remember to refresh when updating products
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${totalP}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Savings
                      </dt>
                      <dd className="text-base font-medium text-green-600">
                        $0
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Tax
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${tax}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Shipping
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        $0
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      ${total_tax}
                    </dd>
                  </dl>
                </div>


                {
                
                cid && (
                  <PayPalScriptProvider
                    options={{ clientId: cid, currency: "CAD" }}
                    key={total_tax}
                  >
                      <PayPalButtons
                        createOrder={async (data, actions) => {
                          return await actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  currency_code: "CAD",
                                  value: total_tax,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={async (data, actions) => {
                          try {
                            const details = await actions.order.capture();
                            console.log(data)
                            console.log(details);
                            const shippingAddress = {
                              address: details.purchase_units[0].shipping.address.address_line_1,
                              city: details.purchase_units[0].shipping.address.admin_area_2,
                              postal_code: details.purchase_units[0].shipping.address.postal_code,
                              country: details.purchase_units[0].shipping.address.country_code

                            }
                            paymentHandler(shippingAddress);
                          } catch (error) {
                            console.error("Payment approval failed:", error);
                          }
                        }}
                      />
                  </PayPalScriptProvider>
                )
              }

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {" "}
                    or{" "}
                  </span>
                  <a
                    href={`/`}
                    title=""
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    Continue Shopping
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </a>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
