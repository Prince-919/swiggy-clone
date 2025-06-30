const PopularCitiesCard = ({ data, title }) => {
  return (
    <div className="w-[98%] mx-auto mt-10">
      <h1 className="font-extrabold text-2xl mb-3">{title}</h1>
      <div className="grid grid-cols-4 gap-y-4 gap-x-8">
        {data.map((city) => {
          return (
            <div className="border p-4 rounded-xl cursor-pointer">
              <div className="flex items-center justify-center font-semibold text-black/80">
                {city.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCitiesCard;
