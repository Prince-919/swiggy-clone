const LocationUnserviceable = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-96 flex flex-col items-center justify-center mt-24">
        <div className="w-60 h-60">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="font-extrabold text-xl mt-10">Location Unserviceable</h1>
        <p className="text-center mt-2 text-black/60 font-semibold">
          We don’t have any services here till now. Try changing location.
        </p>
      </div>
    </div>
  );
};

export default LocationUnserviceable;
