import OnYourMind from "./OnYourMind";
import TopRestaurant from "./TopRestaurant";
import Restaurants from "./Restaurants";
import LocationUnserviceable from "./LocationUnserviceable";
import PopularCitiesCard from "./PopularCitiesCard";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer";
import { useRestaurantsData } from "../hooks";

const Body = () => {
  const [
    onYourMindData,
    topRestaurantData,
    onYourMindTitle,
    onlineTitle,
    topRestaurantTitle,
    resData,
    popularCities,
    popularCitiesTitle,
  ] = useRestaurantsData();

  const filterVal = useSelector((state) => state.filter.filterVal);

  const filteredRestaurantData = topRestaurantData.filter((item) => {
    if (!filterVal) return;
    switch (filterVal) {
      case "Ratings 4.0+":
        return item?.info?.avgRating > 4;
      case "Offers":
        return;
      case "Rs. 300-Rs. 600":
        return (
          item?.info?.costForTwo.slice(1, 4) >= "300" &&
          item?.info?.costForTwo.slice(1, 4) <= "600"
        );
      case "Less than Rs. 300":
        return item?.info?.costForTwo.slice(1, 4) < "300";
      default:
        return true;
    }
  });

  if (resData.communication) {
    return (
      <>
        <LocationUnserviceable />
        <PopularCitiesCard data={popularCities} title={popularCitiesTitle} />
      </>
    );
  }
  return (
    <div className="w-full">
      {topRestaurantData.length ? (
        <div className="w-full sm:w-[95%] px-10 lg:w-[80%] mx-auto mt-6 overflow-hidden">
          {onYourMindData.length ? (
            <>
              <OnYourMind data={onYourMindData} title={onYourMindTitle} />
              <TopRestaurant
                data={topRestaurantData}
                title={topRestaurantTitle}
              />
            </>
          ) : (
            ""
          )}
          <Restaurants
            data={filterVal ? filteredRestaurantData : topRestaurantData}
            title={onlineTitle}
          />
        </div>
      ) : (
        <Shimmer />
      )}
    </div>
  );
};

export default Body;
