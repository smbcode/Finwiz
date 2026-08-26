import { LIVE_TICKER_DATA } from '../../services/mockData';
import { Activity } from 'lucide-react';

export default function LiveTicker() {
  return (
    <aside className="ticker-container" aria-label="Financial and Club Announcements Ticker">
      <div className="ticker-label">
        <Activity size={14} /> LIVE MARKETS
      </div>
      <div className="ticker-track-wrapper">
        <div className="ticker-track">
          {[...LIVE_TICKER_DATA, ...LIVE_TICKER_DATA].map((item, idx) => (
            <div key={idx} className="ticker-item">
              <span className="ticker-symbol">{item.symbol}</span>
              <span>{item.price}</span>
              <span className={`ticker-change ${item.isPositive ? 'pos' : 'neg'}`}>
                {item.isPositive ? '+' : ''}{item.change}
              </span>
              <span className="ticker-dot">•</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
