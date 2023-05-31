import moment from "moment";
import PropTypes from "prop-types";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";

News.propTypes = {
  simplified: PropTypes.bool,
};

export default function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const { data } = useGetCryptosQuery(100);

  const [filteredOptions, setFilteredOptions] = useState(data?.data?.coins);

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 4 : 12,
  });

  function handeleCategoryChange(e) {
    const selectedCategory = e.target.value;
    setNewsCategory(selectedCategory);

    if (selectedCategory === "Cryptocurrency") {
      setFilteredOptions(data?.data?.coins);
    } else {
      const filtered = data?.data?.coins.filter(
        (coin) => coin.name === selectedCategory
      );
      setFilteredOptions(filtered);
    }
  }

  if (!cryptoNews?.value)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-3xl font-semibold text-gray-700">Loading...</p>
      </div>
    );

  return (
    <main className="p-2">
      {!simplified && (
        <select
          className="p-2 mb-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          style={{ width: 200 }}
          placeholder="Select a Crypto"
          onChange={handeleCategoryChange}
          value={newsCategory}
        >
          <option value="Cryptocurrency">Cryptocurrency</option>
          {filteredOptions?.map((coin, index) => (
            <option key={index} value={coin.name}>
              {coin.name}
            </option>
          ))}
        </select>
      )}
      <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cryptoNews.value.map((news, index) => (
          <div key={index} className="bg-slate-300 flex flex-col h-full">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="flex flex-grow items-center p-2 rounded-md shadow-md hover:shadow-lg transition duration-300 ">
                <div className="flex flex-col w-full items-center justify-between ">
                  <div className="flex items-center justify-between">
                    <h1 className="text-gray-700 font-semibold">{news.name}</h1>
                    <img
                      src={news?.image?.thumbnail?.contentUrl || ""}
                      alt={news.name}
                      className="w-12 h-10"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <p className="text-gray-400 font-semibold">
                      {news.description > 100
                        ? `${news.description.substring(0, 100)}...`
                        : news.description}
                    </p>

                    <div className="flex items-center mt-3 space-x-3 justify-between">
                      <div className="avatar items-center space-x-2">
                        <div className="w-10 rounded-full">
                          <img
                            src={
                              news.provider[0]?.image?.thumbnail?.contentUrl ||
                              ""
                            }
                            alt={news.provider[0]?.name}
                          />
                        </div>
                        <h2>{news.provider[0]?.name || " News by Unknown"}</h2>
                      </div>
                      <div>
                        <h2>
                          {moment(news.datePublished).startOf("ss").fromNow()}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
