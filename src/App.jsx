import { Routes, Route, Link } from "react-router-dom";

import {
  Navbar,
  Exchanges,
  HomePage,
  Cryptocurrencies,
  CryptoDetails,
  News,
} from "./components";

function App() {
  return (
    <div className="flex">
      <div className="w-1/4">
        {/* Navbar */}
        <Navbar />
      </div>

      {/* Main */}
      <div className="flex flex-col flex-1">
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

      <footer>
        <div>
          <h1>CryptoVerse</h1>
          <p> All rights reserved</p>
        </div>
        <div>
          <Link to="/">Home</Link>
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          <Link to="/news">News</Link>
        </div>
      </footer>
    </div>
  );
}

export default App;
