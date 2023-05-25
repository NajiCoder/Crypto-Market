// import { millify } from "millify";

import { useGetCryptosQuery } from "../services/cryptoApi";

export default function HomePage() {
  const { data, isFetching } = useGetCryptosQuery();

  if (isFetching)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-3xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  console.log(data);

  return (
    <main>
      <h1 className="text-gray-700 mb-2 font-semibold">Global Crypto Stats</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3>Total Cryptocurrencies</h3>
          <p>5</p>
        </div>
        <div>
          <h3>Total Exchanges</h3>
          <p>5</p>
        </div>
        <div>
          <h3>Total Market Cap</h3>
          <p>$5</p>
        </div>
        <div>
          <h3>Total 24h Volume</h3>
          <p>$5</p>
        </div>
        <div>
          <h3>Total Markets</h3>
          <p>$5</p>
        </div>
      </div>
    </main>
  );
}
