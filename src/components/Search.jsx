import { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Dishes from "./Dishes";
import RestaurantsData from "./RestaurantsData";
import { Coordinates } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { resetSimilarResDish } from "../redux/toggleSlice";
import withSearchReatuarantHoc from "./withSearchReatuarantHoc";

const Search = () => {
  const [isActiveBtn, setIsActiveBtn] = useState("Dishes");
  const [searchQuery, setSearchQuery] = useState("");
  const [dishesData, setDishesData] = useState([]);
  const [restautantsData, setRestaurantsData] = useState([]);
  const [selectedResDish, setSelectedResDish] = useState(null);
  const [similarResDishes, setSimilarResDishes] = useState([]);
  const { isSimilarResDishes, city, resLocation, resId, itemId } = useSelector(
    (state) => state.toggle.similarResDish
  );

  const dispatch = useDispatch();
  const {
    coordinate: { lat, lng },
  } = useContext(Coordinates);

  const PromotedRestaurant = withSearchReatuarantHoc(RestaurantsData);

  const filterOptions = [
    {
      filterName: "Restaurants",
    },
    {
      filterName: "Dishes",
    },
  ];
  function handleFilterBtn(filterName) {
    setIsActiveBtn(isActiveBtn === filterName ? isActiveBtn : filterName);
  }
  useEffect(() => {
    if (isSimilarResDishes) {
      fetchSimilarResDishes();
    }
  }, [isSimilarResDishes]);

  async function fetchSimilarResDishes() {
    let pathname = `/city/${city}/${resLocation}`;
    let encodedPath = encodeURIComponent(pathname);

    const data = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest${resId}%3Fquery%3D${searchQuery}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`
    );
    const res = await data.json();
    setSelectedResDish(res?.data?.cards[1]);
    setSimilarResDishes(res?.data?.cards[2]?.card?.card?.cards);
    dispatch(resetSimilarResDish());
  }

  async function fetchDishes() {
    const data = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0`
    );

    const res = await data.json();
    const finalData =
      (res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter(
        (data) => data?.card?.card?.info
      );
    setDishesData(finalData);
  }
  async function fetchRestaurants() {
    const data = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0&selectedPLTab=RESTAURANT`
    );

    const res = await data.json();
    const finalData =
      (res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter(
        (data) => data?.card?.card?.info
      );
    setRestaurantsData(finalData);
  }
  function handleSearchQuery(e) {
    let val = e.target.value;
    if (e.keyCode == 13) {
      setSearchQuery(val);
      setSelectedResDish(null);
      setDishesData([]);
    }
  }

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }
    // setSearchQuery("");
    fetchDishes();
    fetchRestaurants();
  }, [searchQuery]);

  return (
    <div className="w-[95%] md:lg:w-[852px] mx-auto">
      <div className="border w-full mt-12 py-3 px-4 rounded border-black/30 flex items-center">
        <input
          onKeyDown={handleSearchQuery}
          type="text"
          placeholder="Search for restaurants and food"
          className="focus:outline-none font-bold w-full placeholder:text-black/50"
        />
        <FiSearch className="ml-2 text-xl text-black/70" />
      </div>
      {!selectedResDish && (
        <div className="pt-4 flex items-center gap-3 flex-wrap">
          {filterOptions.map((data, i) => {
            return (
              <div
                key={i}
                className={`py-[6px] border px-[12px] rounded-full flex items-center gap-2 cursor-pointer shadow-sm ${
                  isActiveBtn === data.filterName ? "active" : ""
                }`}
                onClick={() => handleFilterBtn(data.filterName)}
              >
                <div className={`font-semibold text-black/75 tracking-tighter`}>
                  {data.filterName}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {selectedResDish ? (
        <div className="bg-[#f2f3f5] w-full mt-4">
          <div className=" bg-[#edf0f5] pt-4 pb-2 pl-4 font-bold tracking-tight">
            Item added to cart
          </div>
          <div className="w-[50%] px-4 mt-5">
            <Dishes dishes={selectedResDish.card?.card} />
          </div>
          <div className="mt-6 font-semibold text-black/75 tracking-tight text-lg pl-4">
            More dishes from this restaurant
          </div>
          <div className="w-full grid grid-cols-2 gap-x-3 gap-y-5 py-8 px-4">
            {similarResDishes.map((data, i) => {
              return (
                <Dishes
                  dishes={{
                    ...data.card,
                    restaurant: selectedResDish.card?.card.restaurant,
                  }}
                  key={i}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="w-full mt-5">
          {isActiveBtn === "Dishes" ? (
            <div className="w-full bg-[#f2f3f5] grid grid-cols-2 gap-x-3 gap-y-5 py-8 px-4">
              {dishesData?.map((dishes) => {
                return (
                  <Dishes
                    dishes={dishes?.card?.card}
                    key={dishes?.card?.card?.info?.id}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full bg-[#f2f3f5] grid grid-cols-2 gap-4 py-8 px-4">
              {restautantsData?.map((restaurant) => {
                return restaurant?.card?.card?.info?.promoted ? (
                  <PromotedRestaurant
                    restaurant={restaurant}
                    key={restaurant?.card?.card?.info.id}
                  />
                ) : (
                  <RestaurantsData
                    restaurant={restaurant}
                    key={restaurant?.card?.card?.info.id}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
