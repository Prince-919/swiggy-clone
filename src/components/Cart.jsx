import { useDispatch, useSelector } from "react-redux";
import CartEmpty from "./CartEmpty";
import { clearCart, removeFromCart } from "../redux/cartSlice";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { toggleLogin } from "../redux/toggleSlice";

const Cart = () => {
  const cartData = useSelector((state) => state.cart.cartItems);
  const resInfo = useSelector((state) => state.cart.resInfo);

  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const [isMore, setIsMore] = useState(false);

  let totalPrice = cartData.reduce((acc, curVal) => {
    return acc + curVal.price / 100 || curVal.defaultPrice / 100;
  }, 0);

  function handleRemoveFromCart(i) {
    if (cartData.length > 1) {
      let newArr = [...cartData];
      newArr.splice(i, 1);
      dispatch(removeFromCart(newArr));
      toast.success("Food removed!");
    } else {
      handleClearCart();
    }
  }

  function handleClearCart() {
    dispatch(clearCart());
    toast.success("Cart is cleared!");
  }

  function handlePlaceOrder() {
    if (!userData) {
      toast.error("Please login!");
      dispatch(toggleLogin());
      return;
    } else {
      toast.success("Order placed!");
    }
  }

  if (cartData.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="w-full min-h-screen bg-[#E9ECEE] py-8">
      <div className="w-[95%] md:w-[800px] mx-auto bg-white ">
        <div className="p-10 flex gap-6">
          <div className="w-64 h-64">
            <img
              className="w-full h-full object-cover rounded-xl"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${resInfo?.cloudinaryImageId}`}
              alt=""
            />
          </div>
          <div className="w-[60%]">
            <h2 className="font-bold text-3xl text-black/85 mb-3 tracking-tight">
              {resInfo?.name}
            </h2>
            {resInfo?.avgRating && (
              <div className="flex items-center mb-3">
                <FaStar className="text-green text-xs mr-2" />
                <div className="mt-[2px] text-sm font-semibold">
                  {resInfo?.avgRating}
                </div>
              </div>
            )}
            <p className="font-semibold tracking-tight text-black/85 leading-5 mb-1">
              <span>Address</span>:{" "}
              <span className="text-black/65 text-sm">
                {resInfo?.labels?.[1]?.message || resInfo?.address}
              </span>
            </p>
            <p className="font-semibold tracking-tight text-black/85 mt-1">
              Area:{" "}
              <span className="text-black/65 text-sm">{resInfo?.areaName}</span>
            </p>
            <p className="font-semibold tracking-tight text-black/85">
              City:{" "}
              <span className="text-black/65 text-sm">{resInfo?.locality}</span>
            </p>
          </div>
        </div>

        {cartData.map(
          (
            {
              name,
              defaultPrice,
              price,
              itemAttribute,
              ratings: {
                aggregatedRating: { rating, ratingCountV2 },
              },
              description,
              imageId,
            },
            i
          ) => {
            let trimDescription = description?.substring(0, 130) + "... ";
            return (
              <div key={i} className="px-10">
                <div className="w-full h-[1px] bg-black/30"></div>
                <div className="py-10">
                  <div className="flex justify-between items-center mt-3 w-full">
                    <div className="w-[60%] md:w-[70%]">
                      {/* <p
                        className={`${
                          itemAttribute !== "undefined" &&
                          itemAttribute.vegClassifier == "NONVEG"
                            ? "text-red-500 border-2 border-red-500  inline-block text-xs p-[1px] rounded-[5px]"
                            : "text-green border-2 border-green inline-block text-xs p-[1px] rounded-[5px]"
                        }`}
                      >
                        {vegClassifier === "NONVEG" ? (
                          <TbTriangleInvertedFilled />
                        ) : (
                          <FaCircle />
                        )}
                      </p> */}
                      <h2 className="font-extrabold text-[18px] text-gray-800">
                        {name}
                      </h2>
                      <p className="font-bold text-[16px] text-gray-800 mb-2">
                        ₹{" "}
                        {(price / 100).toFixed(2) ||
                          (defaultPrice / 100).toFixed(2)}
                      </p>
                      {rating && (
                        <div className="flex items-center mb-2">
                          <FaStar className="text-green text-xs mr-1" />
                          <div className="mt-[2px] text-sm font-semibold">
                            {rating}({ratingCountV2})
                          </div>
                        </div>
                      )}
                      {description?.length > 130 ? (
                        <div>
                          <span className="font-medium text-gray-500 tracking-tight leading-snug">
                            {isMore ? description + " " : trimDescription}
                          </span>
                          <button
                            className="font-bold text-secondary"
                            onClick={() => setIsMore(!isMore)}
                          >
                            {isMore ? "less" : "more"}
                          </button>
                        </div>
                      ) : (
                        <span className="text-justify">{description}</span>
                      )}
                    </div>
                    <div className="w-[30%] md:w-[30%] flex justify-end">
                      <div className="w-[156px] h-[145px] relative">
                        <img
                          className="w-full h-full rounded-2xl object-cover"
                          src={`${
                            imageId
                              ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`
                              : "https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-512.png"
                          }`}
                          alt={description}
                        />
                        <button
                          onClick={handleRemoveFromCart}
                          className="absolute inset-x-0 -bottom-4 btn-shadow uppercase bg-white w-[120px] mx-auto p-2 text-green font-bold rounded-md border-none outline-none "
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
        <div className="p-10">
          <div className="w-full h-[1px] bg-black/30 mb-10"></div>
          <div className="text-2xl font-bold tracking-tight">
            Total:{" "}
            <span className="font-medium tracking-tight">
              ₹ {totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <div
              onClick={handlePlaceOrder}
              className="bg-green inline-block px-4 py-2 mt-4 rounded text-white text-sm uppercase font-semibold cursor-pointer"
            >
              Place order
            </div>
            <div
              onClick={handleClearCart}
              className="bg-red-500 inline-block px-4 py-2 mt-4 rounded text-white text-sm uppercase font-semibold cursor-pointer"
            >
              Clear Cart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
