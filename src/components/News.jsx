import moment from "moment";
import PropTypes from "prop-types";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

News.propTypes = {
  simplified: PropTypes.bool,
};

export default function News({ simplified }) {
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: simplified ? 4 : 12,
  });

  if (!cryptoNews?.value)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-3xl font-semibold text-gray-700">Loading...</p>
      </div>
    );

  return (
    <main className="p-2">
      <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cryptoNews.value.map((news, index) => (
          <div key={index} className="bg-slate-300 flex flex-col">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="flex items-center p-2 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                <div className="flex flex-col w-full items-center justify-between ">
                  <div className="flex items-center justify-between">
                    <h1 className="text-gray-700 font-semibold">{news.name}</h1>
                    <img
                      src={news?.image?.thumbnail?.contentUrl || ""}
                      alt={news.name}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-400 font-semibold">
                      {news.description > 100
                        ? `${news.description.substring(0, 100)}...`
                        : news.description}
                    </p>

                    <p className="text-gray-700">{news.provider[0]?.name}</p>

                    <p className="text-gray-400 font-semibold">
                      {moment(news.datePublished).startOf("ss").fromNow()}
                    </p>
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
