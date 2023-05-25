import { Routes, Route, Link } from "react-router-dom";
// import axios from "axios";

import {
  Navbar,
  Exchanges,
  HomePage,
  Cryptocurrencies,
  CryptoDetails,
  News,
} from "./components";

function App() {
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await axios.request(options);
  //     console.log(response.data.data.stats);
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className="flex min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <div className="sm:w-2/3 w-3/4 flex flex-col">
        <div className="bg-purple-300 h-full">
          {/* Routes */}
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </div>

        {/* Footer */}

        <div className="bg-yellow-700 mt-auto flex items-center justify-between h-20">
          <div className="flex space-x-6 p-4">
            <h1>CryptoVerse</h1>
            <p>All rights reserved</p>
          </div>
          <div className="space-x-4 p-2">
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            <Link to="/news">News</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
