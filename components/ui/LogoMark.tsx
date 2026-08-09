export function LogoMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      style={{ filter: "drop-shadow(0 6px 18px rgba(109,76,255,.45))" }}
    >
      <defs>
        <linearGradient id="pz-grad" x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a992ff" />
          <stop offset=".5" stopColor="#6d4cff" />
          <stop offset="1" stopColor="#3216a8" />
        </linearGradient>
        <linearGradient id="pz-bolt" x1="14" y1="7" x2="27" y2="33" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#c8f7e9" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="13" fill="url(#pz-grad)" />
      <rect x="1" y="1" width="38" height="38" rx="13" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="1" />
      <path
        d="M23.1 6.6 11.6 22.1a.9.9 0 0 0 .72 1.44h5.1l-1.6 9.06a.62.62 0 0 0 1.1.5l11.6-15.6a.9.9 0 0 0-.72-1.44h-5.2l1.6-8.36a.62.62 0 0 0-1.1-.5Z"
        fill="url(#pz-bolt)"
      />
      <circle cx="31.4" cy="9.2" r="2.5" fill="#39e5b6" />
    </svg>
  );
}
