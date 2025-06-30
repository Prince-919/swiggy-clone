import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const RestaurantCard = (info) => {
  return (
    <Link to={`/restaurant-menu/${info.link.split("/").at(-1)}`}>
      <div className="hover:scale-95 duration-200 cursor-pointer">
        <div className="w-[480px] h-[280px] sm:w-[340px] sm:h-[200px] lg:w-[270px] lg:h-[170px] relative">
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${info?.cloudinaryImageId}`}
            alt=""
            className="object-cover w-full h-full rounded-2xl"
          />
          <div className="rounded-2xl w-full h-full absolute top-0 bg-gradient-to-t from-black from-1% to-transparent to-40%"></div>
          <p className="absolute bottom-0 text-white ml-2 mb-1 font-extrabold text-xl">
            {info?.aggregatedDiscountInfoV3
              ? `${info?.aggregatedDiscountInfoV3?.header} ${info?.aggregatedDiscountInfoV3?.subHeader}`
              : ""}
          </p>
        </div>
        <div className="mt-3">
          <h2 className="font-bold text-xl">{info?.name}</h2>
          <div className="flex items-center gap-2 font-semibold">
            <FaStar className="w-5 h-5 bg-green text-white p-1 rounded-full" />
            <span>{info?.avgRating}</span>
            <span>&#x2022;</span>
            <span>{info?.sla?.slaString}</span>
          </div>
          <p className="font-medium text-black/60 line-clamp-1">
            {info?.cuisines.join(", ")}
          </p>
          <p className="font-medium text-black/60 line-clamp-1">
            {info?.locality}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
