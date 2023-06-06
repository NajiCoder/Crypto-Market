import { useParams } from "react-router-dom";
import { useGetExchangesQuery } from "../services/cryptoApi";

export default function Exchanges() {
  const { coinId } = useParams();

  const { data, isFetching } = useGetExchangesQuery(coinId);

  if (isFetching) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  console.log(data);

  return (
    <div>
      <h1>Exchanges</h1>
    </div>
  );
}
