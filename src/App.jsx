import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  // ==========================================
  // MOCK DATABASE (Replace with Node API later)
  // ==========================================

  const statsData = [
    { id: 1, count: "500+", label: "Members" },
    { id: 2, count: "40+", label: "Events Hosted" },
    { id: 3, count: "15+", label: "FinTalks Episodes" },
    { id: 4, count: "3", label: "Years Running" },
  ];

  const noticesData = [
    {
      id: 1,
      date: "AUG 28",
      title: "Warangal Trading Ring - Registrations Open",
      desc: "Sign up now to compete in our flagship simulated trading event. Limited seats available.",
    },
    {
      id: 2,
      date: "SEP 05",
      title: "FinTalks Guest Session",
      desc: "An industry expert joins us to discuss careers in investment banking. Open to all members.",
    },
    {
      id: 3,
      date: "SEP 15",
      title: "New Core Team Applications",
      desc: "Applications open for the next core committee. Apply through the club portal.",
    },
  ];

  const identityData = [
    {
      id: 1,
      letter: "L",
      title: "Learners",
      desc: "A community of students exploring stocks, economics, and business through real discussion and practice.",
    },
    {
      id: 2,
      letter: "B",
      title: "Builders",
      desc: "We host trading rings, hackathons, and FinTalks that turn theory into practical, hands-on experience.",
    },
    {
      id: 3,
      letter: "C",
      title: "Connectors",
      desc: "We bring together students, mentors, and industry voices who share a passion for finance.",
    },
  ];

  const fintalksData = [
    {
      id: 1,
      num: "01",
      category: "MARKETS",
      title: "Decoding the Stock Market",
      desc: "A beginner-friendly breakdown of how equity markets actually work.",
    },
    {
      id: 2,
      num: "02",
      category: "CAREERS",
      title: "Breaking into Finance",
      desc: "Alumni share how they landed roles in banking and consulting.",
    },
    {
      id: 3,
      num: "03",
      category: "STARTUPS",
      title: "Valuing a Startup",
      desc: "A practical look at how investors think about early-stage valuation.",
    },
  ];

  // ==========================================
  // FUNCTIONAL LOGIC (Hackathon Timer)
  // ==========================================
  const [timeLeft, setTimeLeft] = useState({
    days: 29,
    hours: 23,
    mins: 25,
    secs: 45,
  });

  useEffect(() => {
    // This makes the timer actually tick down on the screen
    const timer = setInterval(() => {
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
              days--;
            }
          }
        }
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ==========================================
  // RENDER UI (Exactly matching home_page_fw_3.pdf)
  // ==========================================
  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="main-header">
        <div className="logo">
          FINWIZ <br />
          <span>FinWiz- Finance Club</span>
        </div>
        <nav>
          <a href="#">Login / SignUp</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section">
        <h1>Welcome To FinWiz!</h1>
        <p>
          Have an interest in Finance & Business? You are at the right place. We
          are the official Finance Club, bringing together curious minds who
          want to learn markets, money, and everything in between.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">Join the Club</button>
          <button className="btn-secondary">Explore Events</button>
        </div>
        <div className="hero-stats">
          {statsData.map((stat) => (
            <div key={stat.id} className="stat-item">
              <h3>{stat.count}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT US */}
      <section className="standard-section">
        <h5 className="section-subtitle">ABOUT US</h5>
        <h2 className="section-title">What is FinWiz?</h2>
        <p>
          FinWiz is a student-run finance club dedicated to building financial
          literacy and market awareness on campus. Through trading rings,
          workshops, talks, and hands-on events, we help members understand how
          money, markets, and business really work no prior finance background
          needed.[cite: 3]
        </p>
      </section>

      {/* NOTICE BOARD */}
      <section className="standard-section">
        <h5 className="section-subtitle">NOTICE BOARD</h5>
        <h2 className="section-title">Latest Announcements</h2>
        <div className="notice-container">
          {noticesData.map((notice) => (
            <div key={notice.id} className="notice-row">
              <div className="notice-date">{notice.date}</div>
              <div className="notice-details">
                <h4>{notice.title}</h4>
                <p>{notice.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINHACK 2026 */}
      <section className="standard-section center-align">
        <h5 className="section-subtitle">FINHACK 2026</h5>
        <h2 className="section-title">Our Flagship Finance Hackathon</h2>
        <p>
          Teams compete to build real trading strategies, pitch startup
          valuations, and solve live case studies for cash prizes and
          mentorship.[cite: 3]
        </p>

        <div className="timer-display">
          <div className="time-block">
            <h2>{timeLeft.days}</h2>
            <span>Days</span>
          </div>{" "}
          <span className="divider">|</span>
          <div className="time-block">
            <h2>{timeLeft.hours}</h2>
            <span>Hours</span>
          </div>{" "}
          <span className="divider">|</span>
          <div className="time-block">
            <h2>{timeLeft.mins}</h2>
            <span>Mins</span>
          </div>{" "}
          <span className="divider">|</span>
          <div className="time-block">
            <h2>{timeLeft.secs}</h2>
            <span>Secs</span>
          </div>
        </div>
        <button className="btn-primary">Register Now</button>
      </section>

      {/* OUR IDENTITY */}
      <section className="standard-section">
        <h5 className="section-subtitle">OUR IDENTITY</h5>
        <h2 className="section-title">Who We Are</h2>
        <div className="three-col-grid">
          {identityData.map((item) => (
            <div key={item.id} className="card-item">
              <div className="card-icon">{item.letter}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINTALKS */}
      <section className="standard-section">
        <h5 className="section-subtitle">FINTALKS</h5>
        <h2 className="section-title">Recent Episodes</h2>
        <div className="three-col-grid">
          {fintalksData.map((episode) => (
            <div key={episode.id} className="card-item">
              <div className="episode-number">{episode.num}</div>
              <h5 className="category-title">{episode.category}</h5>
              <h4>{episode.title}</h4>
              <p>{episode.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="main-footer">
        <div className="footer-top">
          <div className="newsletter">
            <h2>Stay in the Loop</h2>
            <p>
              Get notified about new events, trading rings, and FinTalks
              episodes.[cite: 3]
            </p>
            <div className="subscribe-form">
              <input type="email" placeholder="Enter your email" />
              <button className="btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-col">
            <h4>Fin Wiz</h4>
            <p>
              The official finance club, helping students learn and grow in the
              world of finance and business.[cite: 3]
            </p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>Notice</li>
              <li>Hackathon</li>
              <li>FinTalks</li>
              <li>About Us</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Us</h4>
            <p>Phone: +91 98765 43210[cite: 3]</p>
            <p>Email: finwiz@club.com[cite: 3]</p>
            <p>Warangal, Telangana[cite: 3]</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
