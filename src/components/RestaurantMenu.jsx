import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import { useParams, Link } from "react-router-dom";
import DiscountCard from "./DiscountCard";
import { MdRestaurantMenu } from "react-icons/md";
import { LuSearch } from "react-icons/lu";
import MenuCard from "./MenuCard";
import { Coordinates } from "../context/contextApi";
import { MenuShimmer } from "./Shimmer";

const RestaurantMenu = () => {
  const { id } = useParams();
  let mainId = id.split("-").at(-1);
  const [restaurantInfoData, setRestaurantInfoData] = useState([]);
  const [restaurantMenuData, setRestaurantMenuData] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [topPicksData, setTopPicksData] = useState({});
  const [value, setValue] = useState(0);
  const {
    coordinate: { lat, lng },
  } = useContext(Coordinates);

  async function fetchRestaurantMenu() {
    const res = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${
        mainId.split("rest")[1]
      }&catalog_qa=undefined&submitAction=ENTER`
    );
    const data = await res.json();

    let resInfo = data?.data?.cards.find(
      (data) =>
        data?.card?.card?.["@type"] ==
        "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
    )?.card?.card?.info;
    let resDiscountData = data?.data?.cards.find(
      (data) =>
        data?.card?.card?.["@type"] ==
        "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget"
    )?.card?.card?.gridElements?.infoWithStyle?.offers;

    setRestaurantInfoData(resInfo);
    setDiscountData(resDiscountData);

    let actualMenu = data?.data?.cards.find((data) => data?.groupedCard);

    setRestaurantMenuData(
      actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
        (data) => data?.card?.card?.itemCards
      )
    );
    setTopPicksData(
      actualMenu.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
        (data) => data?.card?.card.title == "Top Picks"
      )[0]
    );
  }

  useEffect(() => {
    fetchRestaurantMenu();
  }, []);

  function handleNext() {}
  function handlePrev() {}

  return (
    <div className="w-full">
      {restaurantMenuData.length ? (
        <div className="w-[78%] lg:w-[800px] mx-auto mt-6">
          <div className="text-[12px] font-semibold">
            <Link to="/">
              <span className="text-black/50 hover:text-gray-800 hover:cursor-pointer">
                Home
              </span>
            </Link>{" "}
            /{" "}
            <Link to={"/"}>
              <span className="text-black/50 hover:text-gray-800 hover:cursor-pointer">
                {restaurantInfoData?.city}
              </span>
            </Link>{" "}
            /{" "}
            <span className="font-semibold text-gray-800">
              {restaurantInfoData?.name}
            </span>
          </div>
          <h1 className="font-extrabold pt-10 ml-2 text-gray-900 text-3xl">
            {restaurantInfoData?.name}
          </h1>
          <div className="w-full h-56 bg-gradient-to-t p-4 from-slate-200/70 mt-4 rounded-[30px]">
            <div className="bg-white w-full h-full border border-r-slate-200/70 rounded-3xl">
              <div className="p-4">
                <div className="flex items-center">
                  <FaStar className="w-5 h-5 bg-green text-white p-1 rounded-full" />
                  <span className="ml-2 font-bold">
                    {restaurantInfoData?.avgRating}
                  </span>
                  <span className="ml-1 font-bold">
                    ({restaurantInfoData?.totalRatingsString})
                  </span>
                  <span className="ml-2 font-bold text-slate-400 mt-[2px]">
                    &#x2022;
                  </span>
                  <span className="ml-2 font-bold">
                    {restaurantInfoData?.costForTwoMessage}
                  </span>
                </div>
                <p className="underline font-extrabold text-primary text-sm my-1">
                  {restaurantInfoData?.cuisines?.join(", ")}
                </p>
                <div className="flex gap-2 mt-3">
                  <div className="w-2 flex flex-col justify-center items-center">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <div className="w-[1.5px] h-7 bg-gray-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  </div>
                  <div className="ml-2">
                    <div className="font-bold text-sm">
                      Outlet{" "}
                      <span className="font-medium text-secondary ml-2 text-sm">
                        {restaurantInfoData?.locality}
                      </span>
                    </div>
                    <p className="text-sm font-bold mt-4">
                      {restaurantInfoData?.sla?.slaString}
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex p-4 items-center ">
                <img
                  className="object-cover w-12 -mt-1 mr-2"
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_86,h_30/v1634558776/swiggy_one/OneLogo_3x.png"
                  alt="logo"
                />
                <h2 className="text-primary font-bold text-sm -mt-1">
                  Free delivery on orders above ₹199
                </h2>
              </div>
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <div className="flex items-center justify-between mt-8 ml-2">
              <h1 className="font-extrabold text-xl">Deals for you</h1>
              <div className="flex gap-3">
                <div
                  onClick={handlePrev}
                  className={`bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
                    value <= 0 ? "text-gray-100" : "bg-gray-200"
                  }`}
                >
                  <HiOutlineArrowSmLeft
                    className={`text-2xl ${
                      value <= 0 ? "text-gray-300" : "text-gray-800"
                    }`}
                  />
                </div>
                <div
                  onClick={handleNext}
                  className={`bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
                    value >= 138 ? "text-gray-100" : "bg-gray-200"
                  }`}
                >
                  <HiOutlineArrowSmRight
                    className={`text-2xl ${
                      value >= 138 ? "text-gray-300" : "text-gray-800"
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4 my-3">
              {discountData.map((item, i) => {
                return <DiscountCard data={item} key={i} />;
              })}
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 mt-8">
            <div className="">
              <MdRestaurantMenu className="text-secondary" />
            </div>
            <span className="mt-[2px] uppercase font-bold text-secondary text-sm tracking-[0.2rem]">
              Menu
            </span>
            <div>
              <MdRestaurantMenu className="text-secondary" />
            </div>
          </div>

          <div className="w-full mt-4 flex relative cursor-pointer">
            <div className="text-secondary font-bold w-full p-3 border-none outline-none bg-light text-center rounded-xl">
              Search for dishes
            </div>
            <LuSearch className="absolute right-4 top-4" />
          </div>

          {topPicksData && (
            <div className="w-full overflow-hidden">
              <div className="flex items-center justify-between mt-8 ml-2">
                <h1 className="font-extrabold text-xl text-gray-800">
                  {topPicksData?.card?.card?.title}
                </h1>
                <div className="flex gap-3">
                  <div
                    onClick={handlePrev}
                    className={`bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
                      value <= 0 ? "text-gray-100" : "bg-gray-200"
                    }`}
                  >
                    <HiOutlineArrowSmLeft
                      className={`text-2xl ${
                        value <= 0 ? "text-gray-300" : "text-gray-800"
                      }`}
                    />
                  </div>
                  <div
                    onClick={handleNext}
                    className={`bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
                      value >= 138 ? "text-gray-100" : "bg-gray-200"
                    }`}
                  >
                    <HiOutlineArrowSmRight
                      className={`text-2xl ${
                        value >= 138 ? "text-gray-300" : "text-gray-800"
                      }`}
                    />
                  </div>
                </div>
              </div>
              <div className="flex my-3">
                {topPicksData?.card?.card?.carousel.map(
                  (
                    {
                      creativeId,
                      dish: {
                        info: { finalPrice, price, defaultPrice },
                      },
                      title,
                    },
                    i
                  ) => {
                    return (
                      <div key={i} className="mr-1">
                        <div className="w-80 h-80">
                          <img
                            className="w-full h-full object-contain"
                            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${creativeId}`}
                            alt={title}
                          />
                        </div>
                        <div className="flex justify-between items-center relative">
                          <div className="flex flex-col absolute bottom-[1.35rem] left-[1.25rem] font-semibold text-white">
                            <span className="line-through">
                              ₹ {price / 100 || defaultPrice / 100}
                            </span>
                            <span>
                              ₹ {finalPrice ? finalPrice / 100 : price / 100}
                            </span>
                          </div>
                          <button className="absolute bottom-[1.5rem] right-[1.35rem] uppercase btn-shadow  bg-white w-[120px] mx-auto p-2 text-green font-bold rounded-md border-none outline-none ">
                            Add
                          </button>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}
          <div className="mt-8">
            {restaurantMenuData?.map(
              (
                {
                  card: {
                    card: { itemCards, title },
                  },
                },
                i
              ) => {
                return (
                  <MenuCard
                    title={title}
                    itemCards={itemCards}
                    resInfo={restaurantInfoData}
                    key={i}
                  />
                );
              }
            )}
          </div>
        </div>
      ) : (
        <MenuShimmer />
      )}
    </div>
  );
};

export default RestaurantMenu;
