import { MdOutlineStarPurple500 } from "react-icons/md";
import { HiArrowSmallRight } from "react-icons/hi2";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiCircleFill } from "react-icons/ri";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import AddToCartButton from "./AddToCartButton";
import { useDispatch, useSelector } from "react-redux";
import PopupDiffRes from "./PopupDiffRes";
import { clearCart } from "../redux/cartSlice";
import { setSimilarResDish, toggleDiffRes } from "../redux/toggleSlice";
import { Link } from "react-router-dom";

const Dishes = ({ dishes }) => {
  const isDiffRes = useSelector((state) => state.toggle.isDiffRes);
  const { id: cartResId } = useSelector((state) => state.cart.resInfo);
  const dispatch = useDispatch();

  const { id: itemId, name, imageId = "", price, isVeg = 0 } = dishes?.info;
  const {
    id,
    name: resName,
    avgRating,
    sla: { slaString },
    avgRatingString,
    slugs: { city, restaurant: resLocation },
  } = dishes?.restaurant?.info;
  const hideRestaurantDetails = dishes?.hideRestaurantDetails;

  function handleIsDiffRes() {
    dispatch(toggleDiffRes());
  }
  function handleClearCart() {
    dispatch(clearCart());
    handleIsDiffRes();
  }

  function handleSameRes() {
    if (cartResId == id || !cartResId) {
      dispatch(
        setSimilarResDish({
          isSimilarResDishes: true,
          city,
          resLocation,
          resId: id,
          itemId,
        })
      );
    }
  }

  return (
    <>
      <div className="bg-white rounded-3xl px-4 pb-4">
        {!hideRestaurantDetails && (
          <>
            <Link to={`/restaurant-menu/${resLocation}-rest${id}`}>
              <div className="pt-5 pb-3">
                <div className="flex justify-between items-center cursor-pointer">
                  <div>
                    <h4 className="font-bold text-sm text-black/75 tracking-tight">
                      {resName}
                    </h4>
                    <div className="flex items-center font-semibold text-black/65 gap-1 tracking-tight">
                      <MdOutlineStarPurple500 className="text-sm" />
                      <span className="text-xs">
                        {avgRating || avgRatingString}
                      </span>
                      <span>&#183;</span>
                      <span className="text-xs">{slaString}</span>
                    </div>
                  </div>

                  <HiArrowSmallRight className="text-black/55 text-2xl" />
                </div>
              </div>
            </Link>
            <div className="border border-dashed"></div>
          </>
        )}

        <div className="flex justify-between my-6">
          <div className="flex-1">
            <div>
              {isVeg ? (
                <div className="text-green border-2 border-green inline-block text-xs p-[1px] rounded-[5px]">
                  <RiCircleFill />
                </div>
              ) : (
                <div className="text-red-500 border-2 border-red-500  inline-block text-xs p-[1px] rounded-[5px]">
                  <TbTriangleInvertedFilled />
                </div>
              )}
            </div>
            <h3 className="font-bold text-black/75 tracking-tight leading-5">
              {name}
            </h3>
            <p className="font-semibold">
              ₹{price / 100 || defaultPrice / 100}
            </p>
            <div className="flex items-center justify-center w-24 h-[26px] border mt-3 rounded-2xl text-xs font-semibold text-black/65 tracking-tight cursor-pointer">
              <span className="mr-[2px]">More Details</span>
              <RiArrowRightSLine />
            </div>
          </div>
          <div className="w-36 h-32 ml-7 relative">
            <img
              className="w-full h-full object-cover rounded-xl"
              src={`${
                imageId
                  ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`
                  : "https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-512.png"
              }`}
              alt="images load"
            />

            <div onClick={handleSameRes}>
              <AddToCartButton
                info={dishes?.info}
                resInfo={dishes?.restaurant?.info}
                handleIsDiffRes={handleIsDiffRes}
              />
            </div>
          </div>
        </div>
      </div>

      {isDiffRes && (
        <PopupDiffRes
          handleIsDiffRes={handleIsDiffRes}
          handleClearCart={handleClearCart}
        />
      )}
    </>
  );
};

export default Dishes;
