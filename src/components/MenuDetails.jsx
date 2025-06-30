import { useState } from "react";
import { FaStar, FaCircle } from "react-icons/fa";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import DetailMenuCard from "./DetailMenuCard";

const MenuDetails = ({ itemCards, resInfo }) => {
  return (
    <div>
      {itemCards.map(({ card: { info } }) => {
        return <DetailMenuCard info={info} resInfo={resInfo} key={info.id} />;
      })}
    </div>
  );
};

export default MenuDetails;
