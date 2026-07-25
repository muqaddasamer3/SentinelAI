import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CCTVUpload from "./pages/CCTVUpload/CCTVUpload";
import IncidentDashboard from "./components/IncidentDashboard/IncidentDashboard";
import FeedOverview from "./components/FeedOverview/FeedOverview";
import TrackingLogs from "./pages/TrackingLogs/TrackingLogs";
import Alerts from "./pages/Alerts/Alerts";
import PersonDashboard from "./pages/persons/PersonDashboard";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import Surveillance from "./pages/Surveillance/Surveillance";
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";
import UploadClip from "./pages/UploadClip";
import LiveDemo from "./pages/LiveDemo";
import RequestDemo from "./pages/RequestDemo";
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
        <Route
    path="/tracking-logs"
    element={<TrackingLogs />}
/>

<Route
path="/alerts"
element={<Alerts />}
/>

<Route
    path="/persons"
    element={<PersonDashboard />}
/>

<Route
    path="/users"
    element={<UserDashboard />}
/>

<Route 
path="/surveillance"
element={<Surveillance />}
/>

<Route 
    path="/analytics" 
    element={<Analytics />} 
/>

<Route 
    path="/settings" 
    element={<Settings />} 
/>

<Route
    path="/upload"
    element={<UploadClip />}
/>

<Route
path="/live-demo"
element={<LiveDemo />}
/>


<Route
path="/request-demo"
element={<RequestDemo />}
/>
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;