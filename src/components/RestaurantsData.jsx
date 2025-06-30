import { MdOutlineStarPurple500 } from "react-icons/md";

const RestaurantsData = ({ restaurant }) => {
  const {
    name,
    cloudinaryImageId,
    avgRating,
    sla: { slaString },
    costForTwoMessage,
    cuisines,
    promoted = false,
    aggregatedDiscountInfoV3,
  } = restaurant?.card?.card?.info;
  return (
    <div className="bg-white px-4 pt-5 pb-8 flex items-center cursor-pointer">
      <div className="w-[27%] relative">
        <div className="w-[85%] h-[85%] ">
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${cloudinaryImageId}`}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        {/* {promoted && (
          <div className="bg-slate-700/80 inline-block  absolute top-[2px] -left-[2px] text-white/70 text-xs rounded font-semibold px-[3px] py-[0.5px]">
            Ad
          </div>
        )} */}
        {aggregatedDiscountInfoV3 && (
          <div className="bg-white border flex flex-col items-center w-16 absolute rounded-lg font-extrabold text-primary leading-[10px] px-1 py-1 -bottom-2 right-[25.5px]">
            <span className="text-xs">
              {aggregatedDiscountInfoV3 && aggregatedDiscountInfoV3?.header}
            </span>
            <span className="text-[8px]">
              {aggregatedDiscountInfoV3 && aggregatedDiscountInfoV3?.subHeader}
            </span>
          </div>
        )}
      </div>
      <div className="w-[73%]">
        <h3 className="font-bold text-black/75 tracking-tight text-sm">
          {name}
        </h3>
        <div className="flex items-center font-semibold text-black/65 gap-1 tracking-tight -ml-[2px]">
          <MdOutlineStarPurple500 className="text-sm" />
          <span className="text-xs">{avgRating}</span>
          <span>&#183;</span>
          <span className="text-xs">{slaString}</span>
          <span>&#183;</span>
          <span className="text-xs">{costForTwoMessage}</span>
        </div>
        <p className="capitalize text-xs line-clamp-1 text-black/50 font-semibold tracking-tight">
          {cuisines.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default RestaurantsData;
