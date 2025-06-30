import FilterCard from "./FilterCard";
import RestaurantCard from "./RestaurantCard";

const Restaurants = ({ data, title }) => {
  return (
    <div className="mt-8">
      <h1 className="font-extrabold text-2xl text-gray-800 mb-4">{title}</h1>
      <FilterCard />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data.map(({ info, cta: { link } }) => {
          return <RestaurantCard {...info} key={info?.id} link={link} />;
        })}
      </div>
    </div>
  );
};

export default Restaurants;
