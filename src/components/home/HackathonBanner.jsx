import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HACKATHON_DETAILS } from '../../services/mockData';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function HackathonBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 29,
    hours: 23,
    mins: 45,
    secs: 30,
  });

  useEffect(() => {
    const targetDate = new Date(HACKATHON_DETAILS.targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft((prev) => {
          let { days, hours, mins, secs } = prev;
          if (secs > 0) secs--;
          else {
            secs = 59;
            if (mins > 0) mins--;
            else {
              mins = 59;
              if (hours > 0) hours--;
              else {
                hours = 23;
                days = days > 0 ? days - 1 : 30;
              }
            }
          }
          return { days, hours, mins, secs };
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, mins, secs });
    };

    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hackathon-banner-section" aria-labelledby="finhack-banner-title">
      <div className="container">
        <div className="hackathon-banner-card">
          <div className="section-subtitle-tag">
            FLAGSHIP NATIONAL HACKATHON · PRIZE POOL {HACKATHON_DETAILS.prizePool}
          </div>

          <h2 id="finhack-banner-title" className="hackathon-title">
            FINHACK <span className="text-brand">2026</span>
          </h2>

          <p className="hackathon-desc">
            Assemble your team to build high-performance quant strategies, AI credit models, or DeFi protocols. Compete against top engineering colleges across India for cash prizes and mentorship.
          </p>

          {/* LIVE COUNTDOWN DISPLAY */}
          <div className="countdown-grid" role="timer" aria-label="Hackathon Registration Countdown">
            <div className="countdown-box">
              <span className="countdown-val">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="countdown-unit">Days</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-box">
              <span className="countdown-val">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="countdown-unit">Hours</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-box">
              <span className="countdown-val">{String(timeLeft.mins).padStart(2, '0')}</span>
              <span className="countdown-unit">Mins</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-box">
              <span className="countdown-val">{String(timeLeft.secs).padStart(2, '0')}</span>
              <span className="countdown-unit">Secs</span>
            </div>
          </div>

          <div className="hackathon-actions-row">
            <Link to="/hackathon" className="btn-primary hackathon-primary-btn">
              <Sparkles size={16} />
              <span>Go to Hackathon Page</span>
            </Link>

            <Link to="/hackathon" className="btn-secondary hackathon-secondary-btn">
              <span>View Tracks & Register</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
