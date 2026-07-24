import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CCTVUpload from "./pages/CCTVUpload/CCTVUpload";
import IncidentDashboard from "./components/IncidentDashboard/IncidentDashboard";
import FeedOverview from "./components/FeedOverview/FeedOverview";
// import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<CCTVUpload />} />
        <Route path="/feed-overview" element={<FeedOverview />} />
        <Route
          path="/incident-dashboard"
          element={<IncidentDashboard />}
        />
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;