import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineSsidChart } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(true);

  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    function handleResize() {
      setScreenSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 640) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="navbar bg-black flex flex-col h-screen gap-10 sm:w-1/4 w-1/5 items-center p-4">
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
      {activeMenu && (
        <div className="items-center">
          <ul className="menu bg-black rounded-box">
            <li>
              <Link
                to="/"
                className={`text-white text-xl flex items-center justify-center p-2`}
              >
                <AiOutlineHome />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/cryptocurrencies"
                className={`text-white text-xl flex items-center justify-center p-2`}
              >
                <MdOutlineSsidChart />
                Cryptocurrencies
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                className={`text-white text-xl flex items-center justify-center p-2 `}
              >
                <IoNewspaperOutline />
                News
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
