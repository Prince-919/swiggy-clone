import { useState } from "react";
import MenuDetails from "./MenuDetails";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const MenuCard = ({ title, itemCards, resInfo }) => {
  const [isOpen, setIsOpen] = useState(true);

  function toggleDorpDown() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div>
      <div className="w-full h-4 bg-light"></div>
      <div className="p-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={toggleDorpDown}
        >
          <h1 className="font-extrabold text-[18px]">
            {title} ({itemCards?.length})
          </h1>
          {isOpen ? (
            <IoIosArrowUp className="text-xl" />
          ) : (
            <IoIosArrowDown className="text-xl" />
          )}
        </div>

        {isOpen && <MenuDetails itemCards={itemCards} resInfo={resInfo} />}
      </div>
    </div>
  );
};

export default MenuCard;
