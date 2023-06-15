export const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center px-4 py-2;">
      <div className="LOGO text-center text-xl uppercase w-1/6 border border-black rounded-xl py-2">
        easy pc
      </div>
      <div className="w-1/6 flex justify-between">
        <button className="btn">login</button>
        <button className="btn">register</button>
      </div>
    </div>
  );
};
