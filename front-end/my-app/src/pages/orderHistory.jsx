import { useDispatch, useSelector } from "react-redux";
import Layout from "../layout/layout";
import { useEffect } from "react";
import { orderListAction } from "../redux/action/order";

const Orderhistory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderListAction());
  }, [dispatch]);

  const orderListReducer = useSelector((state) => {
    return state.orderListReducer;
  });

  const { orders, loading } = orderListReducer;
  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Layout>
          <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <div className="mx-auto max-w-5xl">
                <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                    My orders
                  </h2>

                </div>

                <div className="mt-6 flow-root sm:mt-8">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {orders &&
                      orders.map((order) => {
                        return (
                          <div
                            key={order.id}
                            className="flex flex-wrap items-center gap-y-4 py-6"
                          >
                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                Order ID:
                              </dt>
                              <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                <a href="#" className="hover:underline">
                                  {order.id}
                                </a>
                              </dd>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                Date:
                              </dt>
                              <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                {order.paid_at.slice(0, 10)}
                              </dd>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                Price:
                              </dt>
                              <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                {order.total_price}
                              </dd>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                Status:
                              </dt>
                              {order.is_paid ? (
                                <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                  <svg
                                    className="me-1 h-3 w-3"
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
                                      d="M5 11.917 9.724 16.5 19 7.5"
                                    />
                                  </svg>
                                  Payment recieved
                                </dd>
                              ) : (
                                <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                                  <svg
                                    className="me-1 h-3 w-3"
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
                                  Not payed
                                </dd>
                              )}
                            </dl>

                            <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                              <button
                                type="button"
                                className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                              >
                                Cancel order
                              </button>
                              <a
                                href="#"
                                className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                              >
                                View details
                              </a>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      )}
    </>
  );
};

export default Orderhistory;
