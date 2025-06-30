import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div className="w-full py-8">
      <div className="w-[60%] mx-auto text-center mt-16">
        <img
          src="https://img.freepik.com/premium-vector/empty-cart_701961-7086.jpg"
          alt="cart empty"
          className="w-72 h-72 object-cover mx-auto"
        />
        <h1 className="font-extrabold text-xl text-black/80">
          Your cart is empty
        </h1>
        <p className="text-sm text-black/60 font-medium mt-1">
          You can go to home page to view more restaurants
        </p>
        <Link to="/">
          <div className="mt-6 bg-primary inline-block py-2 px-4 uppercase font-bold text-white">
            See restaurants near you
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
