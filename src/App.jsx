import "@qpokychuk/gilroy/index.css";
import "@qpokychuk/gilroy/normal.css";
import "@qpokychuk/gilroy/italic.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Coordinates } from "./context/contextApi";
import { useSelector } from "react-redux";
import Head from "./components/Head";
import Body from "./components/Body";
import Cart from "./components/Cart";
import Search from "./components/Search";
import RestaurantMenu from "./components/RestaurantMenu";

const App = () => {
  const [coordinate, setCoordinate] = useState({
    lat: 25.5940947,
    lng: 85.1375645,
  });
  const { searchBarToggle: visible, loginToggle: loginVisible } = useSelector(
    (state) => state.toggle
  );

  return (
    <Coordinates.Provider value={{ coordinate, setCoordinate }}>
      <div
        className={`${
          visible || loginVisible ? "max-h-screen overflow-hidden" : ""
        }`}
      >
        <Routes>
          <Route path="/" element={<Head />}>
            <Route path="/" element={<Body />} />
            <Route path="/restaurant-menu/:id" element={<RestaurantMenu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<h1>Coming soon...</h1>} />
          </Route>
        </Routes>
      </div>
    </Coordinates.Provider>
  );
};
export default App;
