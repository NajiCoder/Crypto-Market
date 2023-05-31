import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetCryptoDetailsQuery } from "../services/cryptoApi";
import { millify } from "millify";
import {
  AiFillDollarCircle,
  AiOutlineNumber,
  AiOutlineThunderbolt,
  AiOutlineDollarCircle,
  AiOutlineTrophy,
  AiOutlineFund,
  AiOutlineMoneyCollect,
  AiOutlineExclamationCircle,
} from "react-icons/ai";

export default function CryptoDetails() {
  const { coinId } = useParams();

  const { timePeriod, setTimePeriod } = useState("7d");

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

  const cryptoDetails = data?.data?.coin;

  const time = ["24h", "7d", "30d", "1y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <AiFillDollarCircle />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <AiOutlineNumber /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
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
        <CheckOutlined />
      ) : (
        <StopOutlined />
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

  console.log(data);

  return (
    <div>
      <h1>Crypto {coinId}</h1>
    </div>
  );
}
