const PopupDiffRes = ({ handleIsDiffRes, handleClearCart }) => {
  return (
    <div className="fixed bottom-10 border bg-white w-[520px] h-[204px] inset-x-1/3 p-7 z-40">
      <div>
        <h3 className="font-extrabold text-xl text-black/90 mb-1">
          Items already in cart
        </h3>
        <p className="text-sm font-semibold text-secondary mb-6 text-justify">
          Your cart contains items from other restaurant. Would you like to
          reset your cart for adding items from this restaurant?
        </p>
        <div className="flex justify-between items-center">
          <div
            onClick={handleIsDiffRes}
            className="w-52 h-12 border-2 cursor-pointer border-green flex justify-center items-center text-green font-bold uppercase text-[16px] hover:shadow-lg"
          >
            No
          </div>
          <div
            onClick={handleClearCart}
            className="w-52 h-12 border-2 cursor-pointer border-green flex justify-center items-center bg-green font-bold uppercase text-[16px] text-white hover:shadow-lg"
          >
            Yes, Start AFresh
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupDiffRes;
