import AnimatedBackground from "../../components/AnimatedBackground/AnimatedBackground";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import LiveMonitoring from "../../components/LiveMonitoring/LiveMonitoring";

export default function Home() {
    return (
        <>
            <AnimatedBackground />

            <Navbar />

            <Hero />
            <Features />
            <LiveMonitoring />
        </>
    );
}