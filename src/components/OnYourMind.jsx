import { useState } from "react";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import { useSelector } from "react-redux";

const OnYourMind = ({ data, title }) => {
  const [value, setValue] = useState(0);
  const userData = useSelector((state) => state.auth.userData);

  function handleNext() {
    value >= 138 ? "" : setValue((prev) => prev + 34.5);
  }
  function handlePrev() {
    value <= 0 ? "" : setValue((prev) => prev - 34.5);
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="font-extrabold text-2xl">
          {userData ? (
            <h2>
              <span className="uppercase">{userData?.name.split(" ")[0]}</span>
              <span className="lowercase">, {title}</span>
            </h2>
          ) : (
            <h2>{title}</h2>
          )}
        </div>
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
        style={{
          translate: `-${value}%`,
        }}
        className="flex duration-500"
      >
        {data?.map((item) => {
          return (
            <img
              key={item?.id}
              className="w-36"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item?.imageId}`}
              alt={item?.accessibility?.altText}
            />
          );
        })}
      </div>
      <hr className="border mt-12" />
    </div>
  );
};

export default OnYourMind;
