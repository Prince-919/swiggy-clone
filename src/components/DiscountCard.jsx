const DiscountCard = ({ data: { info } }) => {
  const { header, offerLogo, couponCode, description } = info;
  return (
    <div className="flex min-w-80 h-20 border rounded-3xl gap-3 p-4">
      <img
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${offerLogo}`}
        alt=""
        className="w-12 h-12"
      />
      <div>
        <h2 className="font-extrabold text-[18px]">{header}</h2>
        <p className="font-extrabold text-[#8D8F91] text-sm">
          {couponCode ? couponCode : description}
        </p>
      </div>
    </div>
  );
};

export default DiscountCard;
