

import React from 'react';

const whiteIconProps = {
  className: "w-10 h-10 text-white",
  strokeWidth: 2,
};

const purpleIconProps = {
  className: "w-10 h-10 text-prospera-purple",
  strokeWidth: 2,
};

export const CheckIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className || whiteIconProps.className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const WhatsAppIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || whiteIconProps.className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.056 3 11.625c0 2.22.89 4.224 2.362 5.788l-1.353 4.87a.75.75 0 00.916.916l4.87-1.353A9.01 9.01 0 0012 20.25z" />
    </svg>
);

export const StoryIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || whiteIconProps.className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

export const HeartIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || whiteIconProps.className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

export const SeedlingIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || whiteIconProps.className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 15a4 4 0 004 4h2a4 4 0 004-4v-1a2 2 0 00-2-2H9a2 2 0 00-2 2v1zM12 11V3m0 0L9.5 5.5M12 3l2.5 2.5" />
    </svg>
);

export const SparklesIcon: React.FC<{className?: string}> = ({className}) => (
     <svg className={className || whiteIconProps.className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 00-1.635-1.634l-1.188-.648 1.188-.648a2.25 2.25 0 001.635-1.634L16.25 15l.648 1.188a2.25 2.25 0 001.634 1.634l1.188.648-1.188.648a2.25 2.25 0 00-1.634 1.635z" />
    </svg>
);

export const BrainIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || whiteIconProps.className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.87 7.14C4.32 8.41 4 9.8 4 11.25c0 4.42 3.58 8 8 8s8-3.58 8-8c0-1.45-.32-2.84-.87-4.11M12 4.25v2.5m0 0c-1.35.676-2.923 1-4.5 1s-3.15-.324-4.5-1m9 0c1.35.676 2.923 1 4.5 1s3.15-.324 4.5-1m-4.5-2.5C12 2.72 10.48 2 8.75 2 6.42 2 4.5 3.92 4.5 6.25c0 .61.13 1.19.36 1.72m14.28 0c.23-.53.36-1.11.36-1.72 0-2.33-1.92-4.25-4.25-4.25-1.73 0-3.25.72-3.75 1.75" />
    </svg>
);

export const UsersIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || whiteIconProps.className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

export const SunIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || whiteIconProps.className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

export const MoonIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || whiteIconProps.className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);

export const TextSizeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || whiteIconProps.className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
    </svg>
);

export const GiftIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || whiteIconProps.className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15.667h-1.5a.75.75 0 00-.75.75v3.333c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-3.333a.75.75 0 00-.75-.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15.667H6.75a.75.75 0 00-.75.75v3.333c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-3.333a.75.75 0 00-.75-.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 15.667h-1.5a.75.75 0 00-.75.75v3.333c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-3.333a.75.75 0 00-.75-.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5v4.5H3.75v-4.5zM3.75 8.25A2.25 2.25 0 016 6h12a2.25 2.25 0 012.25 2.25v.75H3.75v-.75zM12 6V4.5" />
    </svg>
);

export const ShieldIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || whiteIconProps.className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75l-4.25-3.4a5.25 5.25 0 01-2.25-4.1V7.5a2.25 2.25 0 012.25-2.25h9a2.25 2.25 0 012.25 2.25v6.75c0 1.7-.95 3.2-2.25 4.1L12 21.75z" />
    </svg>
);

export const ArrowLeftIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className || "w-8 h-8 text-white"} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const ArrowRightIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className || "w-8 h-8 text-white"} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const CheckCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const XCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const ChevronDownIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className || "w-6 h-6"} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export const InstagramIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"} aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.441c-3.171 0-3.535.012-4.762.069-2.731.124-3.922 1.31-4.045 4.045-.057 1.227-.069 1.591-.069 4.762s.012 3.535.069 4.762c.124 2.731 1.31 3.922 4.045 4.045 1.227.057 1.591.069 4.762.069s3.535-.012 4.762-.069c2.731-.124 3.922-1.31 4.045-4.045.057-1.227.069-1.591.069-4.762s-.012-3.535-.069-4.762c-.124-2.731-1.31-3.922-4.045-4.045-1.227-.057-1.591-.069-4.762-.069zM12 6.883c-2.825 0-5.117 2.292-5.117 5.117s2.292 5.117 5.117 5.117 5.117-2.292 5.117-5.117S14.825 6.883 12 6.883zm0 8.792c-2.032 0-3.675-1.643-3.675-3.675s1.643-3.675 3.675-3.675 3.675 1.643 3.675 3.675-1.643 3.675-3.675 3.675zm5.225-6.932c0 .546-.443.989-.989.989s-.989-.443-.989-.989.443-.989.989-.989.989.443.989.989z" />
  </svg>
);

export const FacebookIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"} aria-hidden="true">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89H8.169v-2.903h2.269V9.54c0-2.242 1.352-3.475 3.384-3.475.966 0 1.932.172 1.932.172v2.46h-1.238c-1.124 0-1.5.704-1.5 1.43v1.69h2.775l-.443 2.903H13.63V21.878A10.001 10.001 0 0022 12z" />
  </svg>
);

export const YouTubeIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"} aria-hidden="true">
    <path fillRule="evenodd" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" clipRule="evenodd" />
  </svg>
);

export const CreditCardIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3.75M3.75 19.5h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
  </svg>
);

export const ClockIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const PencilIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
  </svg>
);

export const HeroIllustration: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} viewBox="0 0 520 440" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="hero-illustration-title">
    <title id="hero-illustration-title">Ilustração de uma criança lendo um livro embaixo de uma árvore</title>
    <defs>
      <linearGradient id="bg-gradient" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#BFDBFE"/>
      </linearGradient>
    </defs>
    <rect width="520" height="440" fill="url(#bg-gradient)"/>
    <circle cx="450" cy="80" r="40" fill="#F4A63B" fillOpacity="0.5"/>
    <circle cx="450" cy="80" r="25" fill="#F4A63B" fillOpacity="0.7"/>
    <path d="M-20 440V300C80 260, 200 320, 320 290C440 260, 540 310, 540 310V440H-20Z" fill="#A5D63F" fillOpacity="0.7"/>
    <path d="M-20 440V340C100 310, 220 380, 350 340C480 300, 540 350, 540 350V440H-20Z" fill="#A5D63F"/>
    <path d="M220 360C210 250, 230 180, 260 140L280 140C310 180, 330 250, 320 360" fill="#8D5B29"/>
    <circle cx="270" cy="150" r="110" fill="#A5D63F"/>
    <circle cx="190" cy="180" r="80" fill="#84CC16"/>
    <circle cx="350" cy="190" r="70" fill="#84CC16"/>
    <g transform="translate(140, 280)">
      <path d="M15 80C15 60, 45 60, 45 80Z" fill="#1E40AF"/>
      <path d="M5 45 C-5 65, 25 85, 30 70 L55 70 C60 85, 90 65, 80 45 L5 45Z" fill="#1E40AF"/>
      <rect x="10" y="20" width="60" height="40" rx="20" fill="#F47AA8"/>
      <circle cx="40" cy="10" r="30" fill="#FDE68A"/>
      <path d="M15,5 a1,1 0 0,1 50,0" fill="#4A2C2A"/>
      <circle cx="30" cy="12" r="3" fill="#374151"/>
      <path d="M35 22 q5 5 10 0" stroke="#374151" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <g transform="translate(60 40) rotate(15)">
        <rect x="-35" y="0" width="50" height="40" rx="4" fill="#5BC4E2"/>
        <rect x="-32" y="3" width="44" height="34" fill="#FFFFFF"/>
        <path d="M-13 10 l2.5 5 l5 1 l-4 3.5 l1 5.5 l-4.5 -3 l-4.5 3 l1 -5.5 l-4 -3.5 l5 -1 Z" fill="#F4A63B"/>
      </g>
    </g>
    <g opacity="0.8">
      <path d="M80 100 C 90 70, 130 70, 140 100 S 110 150, 110 120" stroke="#F47AA8" strokeWidth="6" fill="none" strokeLinecap="round"/>
      <circle cx="420" cy="250" r="15" fill="#5BC4E2"/>
      <rect x="50" y="220" width="20" height="20" rx="5" fill="#F4A63B" transform="rotate(-30, 50, 220)"/>
      <path d="M400 320 l10 10 l-10 10" stroke="#762C83" strokeWidth="5" fill="none" strokeLinecap="round"/>
    </g>
  </svg>
);

export const SearchIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const TrashIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.036-2.134H8.716c-1.126 0-2.036.954-2.036 2.134v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

export const BookOpenIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const NewspaperIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
  </svg>
);


export const LockIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

export const MenuIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const XIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const HomeIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

export const UserCircleIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const MusicNoteIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V7.5A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.75" />
  </svg>
);

export const UploadIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

export const DownloadIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const PlayIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
  </svg>
);

export const PauseIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
  </svg>
);
