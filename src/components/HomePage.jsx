import { millify } from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";

export default function HomePage() {
  const { data, isFetching } = useGetCryptosQuery(10); // 10 is the count of cryptocurrencies to be fetched from the api
  const coinsStats = data?.data?.stats;

  if (isFetching)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-3xl font-semibold text-gray-700">Loading...</p>
      </div>
    );

  return (
    <main className="flex flex-col gap-4">
      {/* header part */}
      <div>
        <h1 className="text-gray-700 mb-2 font-bold text-lg">
          Global Crypto Stats
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3>Total Cryptocurrencies</h3>
            <p>{coinsStats.total}</p>
          </div>
          <div>
            <h3>Total Exchanges</h3>
            <p>{coinsStats.totalExchanges}</p>
          </div>
          <div>
            <h3>Total Market Cap</h3>
            <p>{millify(parseInt(coinsStats.totalMarketCap))}</p>
          </div>
          <div>
            <h3>Total 24h Volume</h3>
            <p>{millify(parseInt(coinsStats.total24hVolume))}</p>
          </div>
          <div>
            <h3>Total Markets</h3>
            <p>{millify(parseInt(coinsStats.totalMarkets))}</p>
          </div>
        </div>
      </div>
      {/* top 10 cryptocurrencies */}
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold text-gray-600">
          Top 10 Cryptocurrencies
        </h2>
        <h3>
          <Link to="/cryptocurrencies">Show more</Link>
        </h3>
      </div>
      <Cryptocurrencies simplified />
      {/* latest crypto news */}
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold text-gray-600">
          Latest Crypto News
        </h2>
        <h3>
          <Link to="/news">Show more</Link>
        </h3>
      </div>
      <News simplified />
    </main>
  );
}
