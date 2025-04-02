import { Link } from "react-router";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

const Header = () => {
  return (
    <header className="flex justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 sm:px-6">
      <Link to="/" className="tracking-widest">
        Fast Pizza Co.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
};

export default Header;
