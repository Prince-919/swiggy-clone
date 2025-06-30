import { useContext, useEffect, useState } from "react";
import { Coordinates } from "../context/contextApi";

function useRestaurantsData() {
  const [onYourMindData, setOnYourMindData] = useState([]);
  const [topRestaurantData, setTopRestaurantData] = useState([]);
  const [onYourMindTitle, setOnYourMindTitle] = useState("");
  const [onlineTitle, setOnlineTitle] = useState("");
  const [topRestaurantTitle, setTopRestaurantTitle] = useState("");
  const [resData, setResData] = useState({});
  const [popularCities, setPopularCities] = useState([]);
  const [popularCitiesTitle, setPopularCitiesTitle] = useState("");
  const {
    coordinate: { lat, lng },
  } = useContext(Coordinates);

  const fetchData = async () => {
    const res = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const data = await res.json();
    setResData(data?.data);

    setOnYourMindTitle(data?.data?.cards[0]?.card?.card?.header?.title);
    setTopRestaurantTitle(data?.data?.cards[1]?.card?.card?.header?.title);
    setOnlineTitle(data?.data?.cards[2]?.card?.card.title);

    let onYourMindResData = data?.data?.cards.find(
      (data) => data?.card?.card?.id == "whats_on_your_mind"
    ).card?.card?.imageGridCards?.info;
    setOnYourMindData(onYourMindResData);

    let topResData = data?.data?.cards.find(
      (data) => data?.card?.card?.id == "top_brands_for_you"
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    let minScreenTopResData = data?.data?.cards.find(
      (data) => data?.card?.card?.id == "restaurant_grid_listing"
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    setTopRestaurantData(topResData || minScreenTopResData);

    setPopularCities(data?.data?.cards[1]?.card?.card?.cities);
    setPopularCitiesTitle(data?.data?.cards[1]?.card?.card?.title);
  };

  useEffect(() => {
    fetchData();
  }, [lat, lng]);

  return [
    onYourMindData,
    topRestaurantData,
    onYourMindTitle,
    onlineTitle,
    topRestaurantTitle,
    resData,
    popularCities,
    popularCitiesTitle,
  ];
}
export default useRestaurantsData;
