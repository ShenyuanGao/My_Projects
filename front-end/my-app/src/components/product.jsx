import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../redux/action/product";
import { Link } from "react-router-dom";

const Product = () => {
  const dispatch = useDispatch();
  const productListReducer = useSelector((state) => {
    return state.productListReducer});
  const { loading, error, products=[] } = productListReducer;

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <section className="text-gray-600 body-font">
            <div className="container px-5 mx-auto">
              <div className="flex flex-wrap -m-4">
                {products.map((product) => {
                  return (
                    <div className="lg:w-1/4 md:w-1/2 p-4" key={product.id}>
                      <div className="bg-white">
                        <div className="max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                          <div className="mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            <div className="group relative">
                              <img
                                src={product.image}
                                alt="Front of men&#039;s Basic Tee in black."
                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                              />
                              <div className="mt-4 flex justify-between">
                                <div>
                                  <h3 className="text-sm text-gray-700">
                                    <Link to={`/products/${product.id}`}>
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0"
                                      ></span>
                                      {product.name}
                                    </Link>
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Customer Reviews: {product.num_review}
                                  </p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                  {product.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Product;
