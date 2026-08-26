import LiveTicker from '../components/home/LiveTicker';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import HackathonBanner from '../components/home/HackathonBanner';
import NoticePreview from '../components/home/NoticePreview';
import IdentityPillars from '../components/home/IdentityPillars';

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Real-time Ticker Bar */}
      <LiveTicker />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Flagship Hackathon Banner */}
      <HackathonBanner />

      {/* Latest Notice Board Teaser */}
      <NoticePreview />

      {/* Identity Pillars: Learners, Builders, Connectors */}
      <IdentityPillars />
    </div>
  );
}
