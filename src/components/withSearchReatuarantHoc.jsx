const withSearchReatuarantHoc = (WrappedComponent) => {
  return (props) => {
    return (
      <div className="relative">
        <div className="bg-slate-700/90 inline-block pt-[2.5px]  absolute top-6 left-3 z-10 text-white/70 text-xs rounded font-bold tracking-tight px-1">
          Ad
        </div>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withSearchReatuarantHoc;
