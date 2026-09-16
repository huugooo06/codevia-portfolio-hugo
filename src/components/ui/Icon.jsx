const PATHS = {
  bolt: <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />,
  team: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M3 19c0-3.1 2.7-5 6-5s6 1.9 6 5M16 14.2c2.9.2 5 2 5 4.8" />
    </>
  ),
  learn: (
    <>
      <path d="M12 3a9 9 0 1 0 9 9" />
      <path d="M12 7.5v5l3.2 2" />
      <path d="M17 3.2 21 4l-.8 4" />
    </>
  ),
  teach: (
    <>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v13.5H6.5A2.5 2.5 0 0 0 4 20V6.5Z" />
      <path d="M9 9h7M9 12.5h5" />
    </>
  ),
  arrow: <path d="M5 12h13M13 6l6 6-6 6" />,
  external: <path d="M7 17 17 7M9 7h8v8" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6M5.3 5.3l1.9 1.9M16.8 16.8l1.9 1.9M18.7 5.3l-1.9 1.9M7.2 16.8l-1.9 1.9" />
    </>
  ),
  moon: <path d="M20.5 14.4A8.6 8.6 0 0 1 9.6 3.5a8.7 8.7 0 1 0 10.9 10.9Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  down: <path d="M12 5v13M6 13l6 6 6-6" />,
}

export function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.6 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}
