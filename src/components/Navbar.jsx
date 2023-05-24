import { Link, useMatch } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { RiExchangeBoxLine } from "react-icons/ri";
import { MdOutlineSsidChart } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";

export default function Navbar() {
  const homeMatch = useMatch({ path: "/", exact: true });
  const cryptocurrenciesMatch = useMatch("/cryptocurrencies");
  const exchangesMatch = useMatch("/exchanges");
  const newsMatch = useMatch("/news");

  return (
    <div className="navbar bg-black flex flex-col h-screen gap-10 w-full items-center">
      <div className="flex items-center justify-center p-2">
        <div className="w-24 rounded-full">
          <img
            src="/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="Avatar"
          />
        </div>
        <Link to="/" className="text-2xl font-bold text-white ml-2">
          CryptoVerse
        </Link>
      </div>
      <div>
        <ul className="menu bg-black rounded-box">
          <li>
            <Link
              to="/"
              className={`text-white text-xl flex items-center justify-center p-2 ${
                homeMatch ? "text-rose-500" : ""
              }`}
            >
              <AiOutlineHome />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/cryptocurrencies"
              className={`text-white text-xl flex items-center justify-center p-2 ${
                cryptocurrenciesMatch ? "text-rose-500" : ""
              }`}
            >
              <MdOutlineSsidChart />
              Cryptocurrencies
            </Link>
          </li>
          <li>
            <Link
              to="/exchanges"
              className={`text-white text-xl flex items-center justify-center p-2 ${
                exchangesMatch ? "text-rose-500" : "text-blue-700"
              }`}
            >
              <RiExchangeBoxLine />
              Exchanges
            </Link>
          </li>
          <li>
            <Link
              to="/news"
              className={`text-white text-xl flex items-center justify-center p-2 ${
                newsMatch ? "text-rose-500" : ""
              }`}
            >
              <IoNewspaperOutline />
              News
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
