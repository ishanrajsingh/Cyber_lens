import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import History from "./pages/History";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Analytics from "./pages/Analytics";

import Login from "../../../contributors/MK-codes365/pages/Login";
import Signup from "../../../contributors/MK-codes365/pages/Signup";
import VerifyEmail from "../../../contributors/MK-codes365/pages/VerifyEmail";

/* ---------- Shared Layout (Navbar + Footer) ---------- */
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* -------- App Pages (with Navbar & Footer) -------- */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>

        {/* -------- Auth Pages (NO Navbar / Footer) -------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
