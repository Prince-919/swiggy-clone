import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import toast from "react-hot-toast";

const AddToCartButton = ({ info, resInfo, handleIsDiffRes }) => {
  const cartData = useSelector((state) => state.cart.cartItems);
  const getResInfoFromLocalStorage = useSelector((state) => state.cart.resInfo);
  const dispatch = useDispatch();

  function handleAddToCart() {
    const isAdded = cartData.find((data) => data.id === info.id);

    if (!isAdded) {
      if (
        getResInfoFromLocalStorage.name === resInfo.name ||
        getResInfoFromLocalStorage.length === 0
      ) {
        dispatch(addToCart({ info, resInfo }));
        toast.success("Food added to the cart!");
      } else {
        handleIsDiffRes();
        // toast.error(
        //   "Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?"
        // );
      }
    } else {
      toast.error("Alreay added!");
    }
  }
  return (
    <button
      onClick={handleAddToCart}
      className="absolute inset-x-0 -bottom-4 sm:md:lg:-bottom-4 btn-shadow uppercase bg-white w-[90%] md:w-[120px] lg:w-[120px] mx-auto p-2 text-green font-bold rounded-md border-none outline-none "
    >
      Add
    </button>
  );
};

export default AddToCartButton;
