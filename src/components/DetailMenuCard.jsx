import { useState } from "react";
import { FaCircle, FaStar } from "react-icons/fa";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";

import AddToCartButton from "./AddToCartButton";
import PopupDiffRes from "./PopupDiffRes";
import { toggleDiffRes } from "../redux/toggleSlice";

const DetailMenuCard = ({ info, resInfo }) => {
  const {
    id,
    name,
    defaultPrice,
    price,
    itemAttribute,
    ratings: {
      aggregatedRating: { rating, ratingCountV2 },
    },
    description,
    imageId,
  } = info;
  let trimDescription = description?.substring(0, 130) + "... ";
  const [isMore, setIsMore] = useState(false);

  const dispatch = useDispatch();
  const isDiffRes = useSelector((state) => state.toggle.isDiffRes);

  function handleIsDiffRes() {
    dispatch(toggleDiffRes());
  }
  function handleClearCart() {
    dispatch(clearCart());
    handleIsDiffRes();
  }

  return (
    <div key={id}>
      <div className="flex justify-between items-center mt-3 w-full">
        <div className="w-[70%]">
          {/* <p
            className={`${
              itemAttribute && itemAttribute.vegClassifier === "NONVEG"
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
          <h2 className="font-extrabold text-[18px] text-gray-800">{name}</h2>
          <p className="font-bold text-[16px] text-gray-800 mb-2">
            ₹ {price / 100 || defaultPrice / 100}
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
              <span className="line-clamp-2 md:line-clamp-none font-semibold text-gray-500 tracking-tight leading-snug text-sm">
                {isMore ? description + " " : trimDescription}
              </span>
              <button
                className="hidden md:block font-bold text-secondary"
                onClick={() => setIsMore(!isMore)}
              >
                {isMore ? "less" : "more"}
              </button>
            </div>
          ) : (
            <span className="text-justify">{description}</span>
          )}
        </div>
        <div className="w-[30%] flex justify-end">
          <div className="w-full h-full sm:md:lg:w-[156px] sm:md:lg:h-[145px]  lg:h-[145px] relative">
            <img
              className="w-full h-full rounded-2xl object-cover"
              src={`${
                imageId
                  ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`
                  : "https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-512.png"
              }`}
              alt={description}
            />

            <AddToCartButton
              info={info}
              resInfo={resInfo}
              handleIsDiffRes={handleIsDiffRes}
            />
          </div>
        </div>
      </div>
      <div className="w-full bg-light h-[2px] my-10"></div>
      {isDiffRes && (
        <PopupDiffRes
          handleIsDiffRes={handleIsDiffRes}
          handleClearCart={handleClearCart}
        />
      )}
    </div>
  );
};

export default DetailMenuCard;
