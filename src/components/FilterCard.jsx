import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setFilterValue } from "../redux/filterSlice";

const FilterCard = () => {
  const [isActiveBtn, setIsActiveBtn] = useState(null);
  const dispatch = useDispatch();
  const filterOptions = [
    {
      filterName: "Ratings 4.0+",
    },
    {
      filterName: "Offers",
    },
    {
      filterName: "Rs. 300-Rs. 600",
    },
    {
      filterName: "Less than Rs. 300",
    },
  ];

  function handleFilterBtn(filterName) {
    setIsActiveBtn(isActiveBtn === filterName ? null : filterName);
  }

  dispatch(setFilterValue(isActiveBtn));

  return (
    <div className="pb-10 flex items-center gap-2 flex-wrap">
      {filterOptions.map((data, i) => {
        return (
          <div
            key={i}
            className={`py-[6px] border px-[12px] rounded-full flex items-center gap-2 cursor-pointer shadow-sm ${
              isActiveBtn === data.filterName ? "active" : ""
            }`}
            onClick={() => handleFilterBtn(data.filterName)}
          >
            <div className="font-semibold text-black/80 tracking-tighter">
              {data.filterName}
            </div>
            <div className="hidden">
              <IoMdClose />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FilterCard;
