import { useDispatch } from "react-redux";
import { ORDER_RESET } from "../redux/Constants/Order";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../redux/constants/base-url";
import { useEffect, useState } from "react";

const Confirmation = () => {
  const [detail, setDetail] = useState(null);

  async function getOrderDetail(id, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/api/orders/${id}`, config);

    return data;
  }

  const dispatch = useDispatch();

  const resetHandler = () => {
    dispatch({ type: ORDER_RESET });
  };

  const userLoginReducer = useSelector((state) => {
    return state.userLoginReducer;
  });

  const orderReducer = useSelector((state) => {
    return state.orderReducer;
  });
  const { order } = orderReducer;
  const { userInfo } = userLoginReducer;

  useEffect(() => {
    const getOrder = async () => {
      const countData = await getOrderDetail(order.orderId, userInfo.token);
      if (countData) {
        setDetail(countData); 
      }
    };
    getOrder();
  }, []);

  //todo
  return (
    <>
      {detail && (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto max-w-2xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
              <strong>{detail.user.name}</strong> thanks for your order!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
              Your order{" "}
              <a
                href="#"
                className="font-medium text-gray-900 dark:text-white hover:underline"
              >
                #{order.orderId}
              </a>{" "}
              will be processed within 24 hours during working days. We will
              notify you by email once your order has been shipped.
            </p>
            <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                  Date
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                  {detail.created_at.slice(0,10)}
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                  Payment Method
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                  {detail.payment_method}
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                  Name
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                  {detail.user.name}
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                  Address
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                  {detail.shipping_address.address + ", " + detail.shipping_address.city + ", " + detail.shipping_address.postal_code + ", " + detail.shipping_address.country} 
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                  Email
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                  {detail.user.email}
                </dd>
              </dl>
            </div>
            <div className="flex items-center space-x-4">
              <a
                onClick={resetHandler}
                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Return to cart
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Confirmation;
