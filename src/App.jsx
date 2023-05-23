import { Routes, Route } from "react-router-dom";

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
      {/* Navbar */}
      <Navbar />

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
    </div>
  );
}

export default App;
