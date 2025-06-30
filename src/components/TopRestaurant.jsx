import { useState } from "react";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import RestaurantCard from "./RestaurantCard";

const TopRestaurant = ({ data, title }) => {
  const [value, setValue] = useState(0);

  function handleNext() {
    setValue((prev) => prev + 50);
  }
  function handlePrev() {
    setValue((prev) => prev - 50);
  }
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between">
        <h1 className="font-extrabold text-2xl text-gray-800">{title}</h1>
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
      <div
        className="flex gap-7 mt-4 duration-500"
        style={{
          translate: `-${value}%`,
        }}
      >
        {data.map(({ info, cta: { link } }) => {
          return <RestaurantCard {...info} key={info?.id} link={link} />;
        })}
      </div>
      <hr className="border mt-12" />
    </div>
  );
};

export default TopRestaurant;
