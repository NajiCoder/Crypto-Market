import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";

import { millify } from "millify";
import HTMLReactParser from "html-react-parser";
import {
  AiFillDollarCircle,
  AiOutlineNumber,
  AiOutlineThunderbolt,
  AiOutlineDollarCircle,
  AiOutlineTrophy,
  AiOutlineFund,
  AiOutlineMoneyCollect,
  AiOutlineExclamationCircle,
  AiOutlineCheck,
  AiOutlineStop,
} from "react-icons/ai";

export default function CryptoDetails() {
  const { coinId } = useParams();

  const [timePeriod, setTimePeriod] = useState("7d");

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  // Rename data to coinHistory
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });

  if (isFetching) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!data || !coinHistory) {
    return null;
  }

  const cryptoDetails = data?.data?.coin;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  console.log(cryptoDetails);
  console.log(`the time period is ${timePeriod}`);

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <AiFillDollarCircle />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <AiOutlineNumber /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])
      }`,
      icon: <AiOutlineThunderbolt />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <AiOutlineDollarCircle />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <AiOutlineTrophy />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <AiOutlineFund />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <AiOutlineMoneyCollect />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <AiOutlineCheck />
      ) : (
        <AiOutlineStop />
      ),
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <AiOutlineExclamationCircle />,
    },
  ];

  return (
    <main>
      <div className="flex items-center justify-center">
        <div>
          <h2 className="text-center">{cryptoDetails.name} Price</h2>
          <p>
            {cryptoDetails.name} live price in US dollars. View value
            statistics, market cap and supply.
          </p>
        </div>
      </div>
      <hr />
      <select
        defaultValue="7d"
        className="p-2 mb-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        onChange={(e) => setTimePeriod(e.target.value)}
      >
        {time.map((date) => (
          <option key={date}>{date}</option>
        ))}
      </select>
      {/* <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      /> */}
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col w-[50%] md:w-full sm:w-full">
          <div className="flex flex-col space-y-3">
            <h2 className="text-center font-medium ">
              {cryptoDetails.name} Value Statistics
            </h2>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center mt-5">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-600 flex items-center justify-between w-[65%] md:w-[50%] sm:w-[50%] p-4 mb-4 rounded-md shadow-md hover:bg-gray-500 hover:cursor-pointer transition duration-300 ease-in-out"
              >
                <div className="flex items-center justify-center">
                  {stat.icon} {stat.title}
                </div>
                <div className="flex items-center justify-center">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-[50%] md:w-full sm:w-full">
          <div>
            <div className="flex flex-col space-y-3 pb-6">
              <h2 className="text-center font-medium ">Other Statistics</h2>
              <p>An overview showing the statistics of all cryptocurrencies</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mt-5">
            {genericStats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-600 flex items-center justify-between p-4 w-[65%] md:w-[50%] sm:w-[50%] mb-4 rounded-md shadow-md hover:bg-gray-500 hover:cursor-pointer transition duration-300 ease-in-out"
              >
                <div className="flex items-center justify-center">
                  {stat.icon} {stat.title}
                </div>
                <div className="flex items-center justify-center">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col space-y-3 pb-6">
          <h2 className="font-medium ">What is {cryptoDetails.name} ?</h2>
          <p>{HTMLReactParser(cryptoDetails.description)}</p>
        </div>
        <div>
          <h2>{cryptoDetails.name} Links</h2>
          <div className="flex flex-col gap-2 items-center">
            {cryptoDetails.links.map((link) => (
              <div
                key={link.name}
                className="flex items-center justify-between w-[50%] p-4 mb-4 shadow-md hover:bg-gray-300 transition duration-300 ease-in-out"
              >
                <div className="flex items-center justify-center">
                  {link.type}
                </div>
                <div className="flex items-center justify-center text-blue-400 hover:underline hover:cursor-pointer">
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
