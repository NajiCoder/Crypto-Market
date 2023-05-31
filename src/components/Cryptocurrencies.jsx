import { Link } from "react-router-dom";
import { millify } from "millify";
import PropTypes from "prop-types";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { useEffect, useState } from "react";

Cryptocurrencies.propTypes = {
  simplified: PropTypes.bool,
};

export default function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [searchTerm, setSearchTerm] = useState("");

  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-3xl font-semibold text-gray-700">Loading...</p>
      </div>
    );

  // console.log(cryptos);

  return (
    <main className="p-2">
      {!simplified && (
        <div className="mb-4 rounded-md ">
          <input
            type="text"
            placeholder="search"
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
        {cryptos?.map((crypto) => (
          <div key={crypto.uuid} className="bg-slate-300">
            <Link to={`/crypto/${crypto.uuid}`}>
              <div className="flex items-center p-2 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                <div className="flex w-full flex-col items-center ">
                  <div className="flex w-full items-center justify-between ">
                    <h1 className="text-gray-700 font-semibold">
                      {crypto.rank}. {crypto.name}
                    </h1>
                    <img
                      src={crypto.iconUrl}
                      alt={crypto.name}
                      className="w-6 h-6"
                    />
                  </div>

                  <div className="flex flex-col w-full justify-start">
                    <p className="text-gray-400 font-semibold">
                      {crypto.symbol}
                    </p>

                    <p className="text-gray-400 font-semibold">
                      price : {millify(crypto.price)}
                    </p>

                    <p className="text-gray-400 font-semibold">
                      marketCap {millify(crypto.marketCap)}
                    </p>

                    <p className="text-gray-400 font-semibold">
                      change : {millify(crypto.change)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
