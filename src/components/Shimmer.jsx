const Shimmer = () => {
  return (
    <div className="w-full">
      <div className="w-full h-[350px] bg-slate-900 flex justify-center items-center flex-col">
        <div className="w-10 h-10 relative mb-12">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"
            alt=""
            className="w-full h-full object-cover absolute top-7 left-4 -translate-y-4"
          />
          <span className="loader"></span>
        </div>

        <h1 className="text-white/75 text-2xl font-medium tracking-tight">
          Looking for great food near you...
        </h1>
      </div>
      <div className="w-[80%] mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 flex-wrap gap-6 mt-3">
        {Array(12)
          .fill("")
          .map((data, i) => (
            <div
              key={i}
              className="w-full h-[160px] bg-[#e9e8e8] animate-pulse rounded"
            ></div>
          ))}
      </div>
    </div>
  );
};

export default Shimmer;

export const MenuShimmer = () => {
  return (
    <div className="w-[800px] mx-auto">
      <div className="w-full h-3 bg-gray-200 animate-pulse"></div>
      <div className="h-2 w-[15%] bg-gray-200 mt-6 ml-4"></div>
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array(2)
          .fill("")
          .map((data, i) => (
            <div key={i} className="mx-auto w-full max-w-full rounded-md p-4">
              <div className="w-full h-52 bg-gray-200 animate-pulse rounded"></div>
              <div className="flex animate-pulse space-x-4 justify-between items-end">
                <div className="w-full py-2">
                  <div className="h-2 w-[40%] rounded bg-gray-200 mt-2"></div>
                  <div className="h-2 w-[20%] rounded bg-gray-200 mt-2"></div>
                  <div className="h-2 w-[15%] rounded bg-gray-200 mt-2"></div>
                </div>
                <div className="h-5 w-[20%] bg-gray-200 mt-2 rounded"></div>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-10 ml-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array(2)
          .fill("")
          .map((data, i) => (
            <div
              key={i}
              className="w-full h-16 bg-gray-200 animate-pulse rounded"
            ></div>
          ))}
      </div>
      <div className="mt-10 ml-4">
        <div className="w-24 h-3 bg-gray-200 animate-pulse mb-3 mx-auto"></div>
        <div className="w-full h-12 bg-gray-200 animate-pulse rounded"></div>
      </div>
      {Array(10)
        .fill("")
        .map((data, i) => {
          return (
            <div
              key={i}
              className="mt-10 ml-4 flex justify-between items-center border px-3 py-4 rounded mb-8"
            >
              <div className="space-y-4">
                <div className="w-52 h-2 bg-gray-200 animate-pulse rounded"></div>
                <div className="w-32 h-2 bg-gray-200 animate-pulse rounded"></div>
                <div className="w-24 h-2 bg-gray-200 animate-pulse rounded"></div>
                <div className="w-52 h-2 bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="relative">
                <div className="w-40 h-40 bg-gray-200 animate-pulse rounded"></div>
                <div className="w-28 h-8 bg-white shadow-md animate-pulse rounded absolute -bottom-2 left-6"></div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
