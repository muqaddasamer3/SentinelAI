import AnimatedBackground from "../../components/AnimatedBackground/AnimatedBackground";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import LiveMonitoring from "../../components/LiveMonitoring/LiveMonitoring";
import FeedOverview from "../../components/FeedOverview/FeedOverview";
import IncidentDashboard from "../../components/IncidentDashboard/IncidentDashboard";
// import Footer from "../../components/Footer/Footer";
export default function Home() {
    return (
        <>
            <AnimatedBackground />

            <Navbar />

            <Hero />
            <FeedOverview />
            <Features />
            <LiveMonitoring />
            {/* <Footer /> */}
        </>
    );
}