import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

// LineChart.propTypes = {
//   coinHistory: PropTypes.object,
//   currentPrice: PropTypes.number,
//   coinName: PropTypes.string,
// };

export default function LineChart({ coinHistory, currentPrice, coinName }) {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory.data.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <main>
      <div className="flex justify-between">
        <h2>{coinName} Price Chart</h2>
        <div className="flex space-x-2">
          <p>Current Price: $ {currentPrice}</p>

          <p>price-change : {coinHistory?.data?.change}%</p>
        </div>
      </div>
      <Line data={data} options={options} />
    </main>
  );
}
