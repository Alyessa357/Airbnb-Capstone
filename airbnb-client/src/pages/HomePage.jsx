import Header from "../components/layout/Header";
import HeroBanner from "../components/home/HeroBanner";
import InspirationSection from "../components/home/InspirationSection";
import ExperienceSection from "../components/home/ExperienceSection";
import ShopAirbnbSection from "../components/home/ShopAirbnbSection";
import FutureGetaways from "../components/home/FutureGetaways";

import Footer from "../components/layout/Footer";
import CopyrightFooter from "../components/layout/CopyrightFooter";

import "./HomePage.css";

// Landing page — hero search, inspiration, experiences, and footer
const HomePage = () => {
    return (
        <>
            {/* Header and hero banner share a full-width background */}
            <div className="home-hero">
                <Header />
                <HeroBanner />
            </div>

            <InspirationSection />

            <ExperienceSection />

            <ShopAirbnbSection />

            <FutureGetaways />

            <Footer />

            <CopyrightFooter />
        </>
    );
};

export default HomePage;
