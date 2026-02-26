export function HeroShipIllustration() {
  return (
    <div className="hero-ship" aria-hidden="true">
      <svg viewBox="0 0 620 420" className="hero-ship-svg">
        <defs>
          <linearGradient id="shipSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f9fbff" />
            <stop offset="100%" stopColor="#eef4ff" />
          </linearGradient>
          <linearGradient id="shipHull" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#111111" />
            <stop offset="100%" stopColor="#2b2b2b" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="620" height="420" rx="22" fill="url(#shipSky)" />

        <g className="ship-wave ship-wave-back">
          <path
            d="M30 300 C 120 275, 190 328, 280 302 C 350 282, 420 322, 510 302 C 550 294, 570 296, 590 300"
            stroke="#d5e5ff"
            strokeWidth="9"
            fill="none"
            strokeLinecap="round"
          />
        </g>
        <g className="ship-wave ship-wave-front">
          <path
            d="M24 324 C 114 298, 184 352, 274 324 C 344 302, 414 344, 504 324 C 550 314, 572 318, 596 324"
            stroke="#b9d3ff"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        <g className="hero-ship-float">
          <path d="M130 286 L450 286 L520 250 L106 250 Z" fill="url(#shipHull)" />
          <path d="M106 250 L520 250 L520 262 L130 298 L106 286 Z" fill="#1f1f1f" />
          <line x1="282" y1="250" x2="282" y2="130" stroke="#222" strokeWidth="8" strokeLinecap="round" />
          <line x1="282" y1="130" x2="320" y2="130" stroke="#222" strokeWidth="6" strokeLinecap="round" />
          <rect x="268" y="116" width="28" height="18" rx="3" fill="#fff" stroke="#222" strokeWidth="3" />
          <path d="M286 134 L326 156 L286 156 Z" fill="#111" />
          <circle cx="282" cy="111" r="9" fill="#111" />
          <line x1="282" y1="120" x2="282" y2="142" stroke="#111" strokeWidth="4" />
          <line x1="282" y1="130" x2="270" y2="138" stroke="#111" strokeWidth="3" strokeLinecap="round" />
          <line x1="282" y1="130" x2="294" y2="138" stroke="#111" strokeWidth="3" strokeLinecap="round" />
          <line x1="282" y1="142" x2="274" y2="154" stroke="#111" strokeWidth="3" strokeLinecap="round" />
          <line x1="282" y1="142" x2="290" y2="154" stroke="#111" strokeWidth="3" strokeLinecap="round" />

          <circle cx="454" cy="240" r="9" fill="#111" />
          <line x1="454" y1="249" x2="454" y2="272" stroke="#111" strokeWidth="4" />
          <line x1="454" y1="258" x2="442" y2="266" stroke="#111" strokeWidth="3" strokeLinecap="round" />
          <line x1="454" y1="258" x2="468" y2="252" stroke="#111" strokeWidth="3" strokeLinecap="round" />
          <line x1="454" y1="272" x2="446" y2="284" stroke="#111" strokeWidth="3" strokeLinecap="round" />
          <line x1="454" y1="272" x2="462" y2="284" stroke="#111" strokeWidth="3" strokeLinecap="round" />

          <g className="ship-telescope">
            <rect x="468" y="244" width="44" height="8" rx="3" fill="#222" transform="rotate(-16 468 244)" />
            <circle cx="507" cy="236" r="5" fill="#222" />
          </g>
        </g>
      </svg>
    </div>
  );
}
