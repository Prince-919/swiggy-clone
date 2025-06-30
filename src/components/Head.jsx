import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import { IoPersonOutline, IoCartOutline } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { Coordinates } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearchBar, toggleLogin } from "../redux/toggleSlice";
import { RxCounterClockwiseClock } from "react-icons/rx";
import SignInBtn from "./SignInBtn";

const Head = () => {
  const navItems = [
    {
      id: 1,
      name: "Search",
      icon: <LuSearch />,
      path: "/search",
    },
    {
      id: 2,
      name: "Sign In",
      icon: <IoPersonOutline />,
      path: "/signin",
    },
    {
      id: 3,
      name: "Cart",
      icon: <IoCartOutline />,
      path: "/cart",
    },
  ];

  const cartData = useSelector((state) => state.cart.cartItems);
  const userData = useSelector((state) => state.auth.userData);
  const [searchResult, setSearchResult] = useState([]);
  const { setCoordinate } = useContext(Coordinates);
  const [address, setAddress] = useState("");

  const { searchBarToggle: visible, loginToggle: loginVisible } = useSelector(
    (state) => state.toggle
  );

  const dispatch = useDispatch();

  function handleVisibility() {
    dispatch(toggleSearchBar());
  }

  function handleLoginVisibility() {
    dispatch(toggleLogin());
  }

  async function fetchSearchResult(val) {
    if (val == "") return;
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/misc/place-autocomplete?input=${val}`
    );
    const data = await res.json();
    setSearchResult(data.data);
  }

  async function fetchLatAndLng(id) {
    if (id == "") return;
    handleVisibility();
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/misc/address-recommend?place_id=${id}`
    );
    const data = await res.json();
    setCoordinate({
      lat: data?.data[0]?.geometry?.location?.lat,
      lng: data?.data[0]?.geometry?.location?.lng,
    });
    setAddress(data?.data[0]?.formatted_address);
  }

  return (
    <>
      {/* Handle Search Bar */}
      <div>
        <div
          onClick={handleVisibility}
          className={
            "w-full bg-black/50 z-40 h-full absolute " +
            (visible ? "visible " : " invisible")
          }
        ></div>
        <div
          className={
            " bg-white flex justify-end w-full md:w-[37%] h-full p-5 z-50 absolute duration-500 " +
            (visible ? "left-0" : "-left-[100%]")
          }
        >
          <div className="flex flex-col gap-4 mt-3 w-[80%] lg-[50%] mr-6 pl-10">
            <IoMdClose
              onClick={handleVisibility}
              className="text-2xl my-3 cursor-pointer"
            />
            <input
              type="text"
              placeholder="Search for area, shreet name.."
              className="border py-3 px-6 focus:outline-none focus:shadow-lg input-shadow font-semibold"
              onChange={(e) => fetchSearchResult(e.target.value)}
            />
            <div className="p-5">
              <div>
                {searchResult.map((data, index) => {
                  const isLast = index === searchResult.length - 1;
                  return (
                    <div className="my-5" key={index}>
                      <div className="flex gap-4 cursor-pointer">
                        <div className="w-5 h-5">
                          <RxCounterClockwiseClock className="w-full h-full text-black/80" />
                        </div>
                        <div
                          onClick={() => fetchLatAndLng(data.place_id)}
                          className="w-full"
                        >
                          <div className="flex flex-col -mt-[2px]">
                            <span className="font-bold text-black/90 hover:text-primary">
                              {data.structured_formatting.main_text}
                            </span>
                            <span className="text-sm font-medium tracking-tight text-black/50">
                              {data.structured_formatting.secondary_text}
                            </span>
                          </div>
                          {!isLast && (
                            <div className="border-b border-dashed border-black/50 mt-4"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Handle Login */}
      <div className="w-full">
        <div
          onClick={handleLoginVisibility}
          className={
            "w-full bg-black/50 z-40 h-full absolute " +
            (loginVisible ? "visible " : " invisible")
          }
        ></div>
        <div
          className={
            " bg-white flex justify-end w-full md:w-[37%] h-full p-5 z-50 fixed duration-500 " +
            (loginVisible ? "right-0" : "-right-[100%]")
          }
        >
          <div className="w-[97%] mt-1">
            <IoMdClose
              onClick={handleLoginVisibility}
              className="text-2xl cursor-pointer text-secondary"
            />
            <div className="w-[70%] mt-5">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-3xl mb-2">Login</h2>
                  <p className="font-semibold tracking-tight text-sm mb-4">
                    or
                    <span className="text-primary"> login to your account</span>
                  </p>
                  <div className="w-8 h-[1px] bg-black"></div>
                </div>
                <div className="w-24 h-24">
                  <img
                    className="w-full h-full object-cover"
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                    alt=""
                  />
                </div>
              </div>
              <div className="mt-10">
                <SignInBtn />
              </div>
              <p className="mt-3 text-xs font-semibold">
                <span className="text-black/75">
                  By creating an account, I accept the
                </span>{" "}
                Terms & Conditions & Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white custom-shadow sticky top-0 z-30">
        <div className="w-full sm:w-[95%] px-10 lg:w-[85%] flex justify-between h-20 items-center mx-auto">
          <div className="flex items-center gap-1 md:gap-8">
            <Link to="/">
              <div className="w-20 h-20">
                <img
                  className="w-full h-full object-contain z-50"
                  src="https://static.vecteezy.com/system/resources/previews/050/816/833/non_2x/swiggy-transparent-icon-free-png.png"
                  alt="Swiggy Logo"
                />
              </div>
            </Link>
            <div
              className="flex items-center gap-2 cursor-pointer w-[260px]"
              onClick={handleVisibility}
            >
              <div className={`font-bold text-sm line-clamp-1`}>
                <span className="mr-1">Other </span>
                <span className="font-semibold text-black/70">{address}</span>
              </div>
              <div>
                <IoIosArrowDown className="text-xl text-orange-500" />
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-11">
            {navItems.map((item) => {
              return (
                <div key={item.id}>
                  {item.name == "Sign In" ? (
                    <div key={item.id} onClick={handleLoginVisibility}>
                      <div className="flex items-center gap-2 cursor-pointer">
                        {userData ? (
                          <img
                            src={userData.photo}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <p className="text-gray-800 text-lg font-semibold">
                            {item.icon}
                          </p>
                        )}
                        <p className="text-gray-800 text-lg font-semibold line-clamp-1">
                          {userData ? userData.name : item.name}
                        </p>
                        {item.name === "Cart" && cartData.length > 0 && (
                          <p>{cartData.length}</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link key={item.id} to={item.path}>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <p
                          className={`text-gray-800 text-[17px] font-semibold`}
                        >
                          {item.icon}
                        </p>
                        <p
                          className={`text-gray-800 text-[17px] font-semibold tracking-tight`}
                        >
                          {item.name}
                        </p>
                        {item.name === "Cart" && cartData.length > 0 && (
                          <p>{cartData.length}</p>
                        )}
                      </div>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center md:hidden gap-10 mr-4 md:mr-0">
            {navItems.map((item) => {
              return (
                <div key={item.id}>
                  {item.name == "Sign In" ? (
                    <div
                      onClick={handleLoginVisibility}
                      className="text-gray-800 text-lg font-semibold"
                    >
                      {item.icon}
                    </div>
                  ) : (
                    <Link to={item.path}>
                      <div className="text-gray-800 text-lg flex items-center gap-1">
                        <span>{item.icon}</span>
                        <span>{item.name == "Cart" && cartData.length}</span>
                      </div>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default Head;
