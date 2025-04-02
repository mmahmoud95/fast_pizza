import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

const SearchOrder = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
    };

  return (
    <form onSubmit={handleSubmit} className="">
      <input
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:ring focus:ring-yellow-500 focus:outline-0 sm:w-64 sm:focus:w-72"
        name="search"
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchOrder;
