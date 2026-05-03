import { useState, useEffect, useRef } from 'react';
import SignatureBuilder from './SignatureBuilder.jsx';

const PASSWORD = 'entevate2026';
const STORAGE_KEY = 'entevate_brand_auth';

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const LOGO_SVG_WHITE = (h = '32px') => (
  <svg width="296" height="58" viewBox="0 0 296 58" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height:h, width:'auto'}}>
    <path d="M0.332092 0.332031V27.5874L5.10768 23.7746V5.10737H31.9303V12.9027L0.332092 36.2887V42.4419L5.10768 46.2546V38.7047L36.687 15.3187H36.7059V15.2998V5.10737V0.332031H0.332092Z" fill="white"/><path fillRule="evenodd" clipRule="evenodd" d="M0 0H37.0377V15.6506H36.7964L5.43956 38.8719V46.9444L0 42.6016V36.1213L31.5982 12.7353V5.43932H5.43956V23.9343L0 28.2772V0ZM31.9302 12.9027L0.331986 36.2886V42.4418L5.10758 46.2546V38.7046L36.6869 15.3186H36.7058V0.331986H0.331986V27.5873L5.10758 23.7746V5.10733H31.9302V12.9027Z" fill="white"/><path d="M10.7404 43.7659V48.1072V50.7119L18.4606 56.7707L36.6947 43.2752V37.3296L18.4606 50.7119L15.7802 48.2959V44.3888L36.6947 28.8925V22.9658L10.7404 42.1616V43.7659Z" fill="white"/><path fillRule="evenodd" clipRule="evenodd" d="M10.4084 50.8734V41.9942L37.0267 22.3074V29.0597L16.1122 44.556V48.1482L18.4821 50.2843L37.0267 36.6742V43.4425L18.4547 57.1881L10.4084 50.8734ZM18.4606 50.7119L15.7802 48.2959V44.3888L36.6947 28.8925V22.9658L10.7404 42.1616V50.7119L18.4606 56.7707L36.6947 43.2752V37.3296L18.4606 50.7119Z" fill="white"/><path d="M66.552 16.1413V22.1465H81.6637V27.9559H66.552V34.5811H83.2303V40.3905H60.0896V10.332H83.2303V16.1413H66.552Z" fill="white"/><path d="M89.4703 10.2916H95.9001L110.392 29.7432V10.3243H116.854V40.3828H110.392L95.9001 20.9312V40.3502H89.4703V10.2916Z" fill="white"/><path d="M131.968 16.1411H122.601V10.3317H147.798V16.1411H138.463V40.3903H132.001V16.1411H131.968Z" fill="white"/><path d="M159.707 16.1411V22.1463H174.819V27.9556H159.707V34.5809H176.386V40.3903H153.245V10.3317H176.386V16.1411H159.707Z" fill="white"/><path d="M211.698 10.2916L199.458 40.3502H192.245L180.006 10.2916H187.284L195.901 31.4729L204.517 10.2916H211.698Z" fill="white"/><path d="M232.641 35.6579H219.259L217.334 40.3903H210.12L222.36 10.3317H229.573L241.813 40.3903H234.534L232.641 35.6579ZM230.422 30.1749L225.95 19.1763L221.479 30.1749H230.422Z" fill="white"/><path d="M251.388 16.1411H242.021V10.3317H267.218V16.1411H257.85V40.3903H251.388V16.1411Z" fill="white"/><path d="M279.122 16.1411V22.1463H294.233V27.9556H279.122V34.5809H295.8V40.3903H272.659V10.3317H295.8V16.1411H279.122Z" fill="white"/>
  </svg>
);

const LOGO_SVG_DARK = (h = '32px') => (
  <svg width="296" height="58" viewBox="0 0 296 58" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height:h, width:'auto'}}>
    <path d="M0.332092 0.332031V27.5874L5.10768 23.7746V5.10737H31.9303V12.9027L0.332092 36.2887V42.4419L5.10768 46.2546V38.7047L36.687 15.3187H36.7059V15.2998V5.10737V0.332031H0.332092Z" fill="#181818"/><path fillRule="evenodd" clipRule="evenodd" d="M0 0H37.0377V15.6506H36.7964L5.43956 38.8719V46.9444L0 42.6016V36.1213L31.5982 12.7353V5.43932H5.43956V23.9343L0 28.2772V0ZM31.9302 12.9027L0.331986 36.2886V42.4418L5.10758 46.2546V38.7046L36.6869 15.3186H36.7058V0.331986H0.331986V27.5873L5.10758 23.7746V5.10733H31.9302V12.9027Z" fill="#181818"/><path d="M10.7404 43.7659V48.1072V50.7119L18.4606 56.7707L36.6947 43.2752V37.3296L18.4606 50.7119L15.7802 48.2959V44.3888L36.6947 28.8925V22.9658L10.7404 42.1616V43.7659Z" fill="#181818"/><path fillRule="evenodd" clipRule="evenodd" d="M10.4084 50.8734V41.9942L37.0267 22.3074V29.0597L16.1122 44.556V48.1482L18.4821 50.2843L37.0267 36.6742V43.4425L18.4547 57.1881L10.4084 50.8734ZM18.4606 50.7119L15.7802 48.2959V44.3888L36.6947 28.8925V22.9658L10.7404 42.1616V50.7119L18.4606 56.7707L36.6947 43.2752V37.3296L18.4606 50.7119Z" fill="#181818"/><path d="M66.552 16.1413V22.1465H81.6637V27.9559H66.552V34.5811H83.2303V40.3905H60.0896V10.332H83.2303V16.1413H66.552Z" fill="#181818"/><path d="M89.4703 10.2916H95.9001L110.392 29.7432V10.3243H116.854V40.3828H110.392L95.9001 20.9312V40.3502H89.4703V10.2916Z" fill="#181818"/><path d="M131.968 16.1411H122.601V10.3317H147.798V16.1411H138.463V40.3903H132.001V16.1411H131.968Z" fill="#181818"/><path d="M159.707 16.1411V22.1463H174.819V27.9556H159.707V34.5809H176.386V40.3903H153.245V10.3317H176.386V16.1411H159.707Z" fill="#181818"/><path d="M211.698 10.2916L199.458 40.3502H192.245L180.006 10.2916H187.284L195.901 31.4729L204.517 10.2916H211.698Z" fill="#181818"/><path d="M232.641 35.6579H219.259L217.334 40.3903H210.12L222.36 10.3317H229.573L241.813 40.3903H234.534L232.641 35.6579ZM230.422 30.1749L225.95 19.1763L221.479 30.1749H230.422Z" fill="#181818"/><path d="M251.388 16.1411H242.021V10.3317H267.218V16.1411H257.85V40.3903H251.388V16.1411Z" fill="#181818"/><path d="M279.122 16.1411V22.1463H294.233V27.9556H279.122V34.5809H295.8V40.3903H272.659V10.3317H295.8V16.1411H279.122Z" fill="#181818"/>
  </svg>
);

const colors = {
  primary: [
    { name: 'ENTEVATE Blue', hex: '#247b96', css: '--blue' },
    { name: 'Blue Light', hex: '#5ba8c4', css: '--blue-light' },
    { name: 'Purple', hex: '#444561', css: '--purple' },
    { name: 'Purple Light', hex: '#8e90c0', css: '--purple-light' },
  ],
  pillar: [
    { name: 'Experiential — Teal', hex: '#2bbfa8', css: '--teal', gradient: 'linear-gradient(90deg, #2bbfa8, #6dd4a0)' },
    { name: 'Experiential — Green', hex: '#3d978a', css: '--green' },
    { name: 'Operational — Orange', hex: '#e8782a', css: '--orange', gradient: 'linear-gradient(90deg, #e8782a, #f5b731)' },
    { name: 'Operational — Amber', hex: '#f5b731', css: '--orange-amber' },
    { name: 'Innovation — Purple', hex: '#6a6b9e', css: '--purple-dark', gradient: 'linear-gradient(90deg, #5b5c8c, #8e90c0)' },
    { name: 'Innovation — Lilac', hex: '#8e90c0', css: '--purple-light' },
  ],
  neutral: [
    { name: 'Black', hex: '#181818', css: '--black' },
    { name: 'Gray Mid', hex: '#6b6b6b', css: '--gray-mid' },
    { name: 'Gray Light', hex: '#a8a8a8', css: '--gray-light' },
    { name: 'Border', hex: '#dde6f0', css: '--border' },
    { name: 'Light Blue', hex: '#eef5fd', css: '--light-blue' },
    { name: 'White', hex: '#ffffff', css: '--white' },
  ],
};

const gradients = [
  { name: 'Brand Gradient', value: 'linear-gradient(90deg, #2060d8 0%, #38c6f4 100%)' },
  { name: 'Experiential', value: 'linear-gradient(90deg, #2bbfa8 0%, #6dd4a0 100%)' },
  { name: 'Operational Intelligence', value: 'linear-gradient(90deg, #e8782a 0%, #f5b731 100%)' },
  { name: 'Innovation', value: 'linear-gradient(90deg, #5b5c8c 0%, #8e90c0 100%)' },
  { name: 'CTA Overlay', value: 'linear-gradient(135deg, rgba(45,43,78,0.88), rgba(68,69,97,0.84) 45%, rgba(92,71,128,0.84))' },
];

const typeScale = [
  { name: 'Homepage Hero', size: 'clamp(51px, 6.8vw, 97px)', weight: 100, sample: 'Innovating today for a better tomorrow.', tracking: '-0.03em' },
  { name: 'Pillar Hero', size: 'clamp(40px, 7vw, 82px)', weight: 100, sample: 'From Bold Ideas to Lasting Outcomes.', tracking: '-0.03em' },
  { name: 'Section Title (H2)', size: 'clamp(30px, 4vw, 48px)', weight: 300, sample: 'A purpose-driven innovation collective.', tracking: '-0.02em' },
  { name: 'Card Heading (H3)', size: '19px', weight: 300, sample: 'Experiential Branding & Marketing', tracking: '-0.01em' },
  { name: 'Body', size: '16px', weight: 400, sample: 'We are a human-centered innovation partner for leaders ready to build what comes next.' },
  { name: 'Body Small', size: '14px', weight: 400, sample: 'From immersive brand experiences powered by Momentify to co-created innovation roadmaps.' },
  { name: 'Label / Eyebrow', size: '11px', weight: 700, sample: 'EXPERIENTIAL BRANDING', transform: 'uppercase', tracking: '0.12em' },
  { name: 'Button', size: '14px', weight: 600, sample: 'Get In Touch' },
  { name: 'Nav Link', size: '13.5px', weight: 500, sample: 'About Us' },
  { name: 'Footer Link', size: '13.5px', weight: 400, sample: 'Privacy Policy' },
];

const buttonVariants = [
  { name: 'Primary', cls: 'btn-primary', label: 'Get In Touch' },
  { name: 'Outline', cls: 'btn-outline', label: 'Learn More' },
  { name: 'Ghost', cls: 'btn-ghost', label: 'View All →' },
  { name: 'Gradient', cls: 'btn-gradient', label: 'Start Now' },
  { name: 'Orange CTA', cls: 'btn-orange', label: 'Explore' },
];

const spacingTokens = [
  { name: 'Section Padding (desktop)', value: '96px 48px' },
  { name: 'Section Padding (tablet)', value: '72px 24px' },
  { name: 'Section Padding (mobile)', value: '56px 20px' },
  { name: 'Container Max Width', value: '1160px' },
  { name: 'Nav Height', value: '70px' },
  { name: 'Card Padding', value: '36px 30px' },
  { name: 'Grid Gap (standard)', value: '24px' },
  { name: 'Border Radius', value: '6px (var(--radius))' },
  { name: 'Transition', value: '0.22s ease (var(--tr))' },
];

const ogImages = [
  { name: 'Main (Default)', path: '/images/og/main-og.png', usage: 'Homepage, fallback for all pages' },
  { name: 'Experiential Branding', path: '/images/og/ebm-og.png', usage: 'Experiential pillar pages' },
  { name: 'Operational Intelligence', path: '/images/og/oi-og.png', usage: 'Operational Intelligence pillar & sub-service pages' },
  { name: 'Innovation Roadmapping', path: '/images/og/irm-og.png', usage: 'Innovation pillar pages' },
];

const bgTextures = [
  { name: 'Hero Background 1', path: '/images/bt1.png', usage: 'Blog card thumbnails, experiential articles' },
  { name: 'Hero Background 2', path: '/images/bt2.png', usage: 'Blog card thumbnails, operational articles' },
  { name: 'Hero Background 3', path: '/images/bt3.png', usage: 'CTA banner background, innovation articles' },
  { name: 'Blue Gradient BG', path: '/images/bg-blue.png', usage: 'Pillar hero backgrounds' },
  { name: 'Mountain', path: '/images/mountain.png', usage: 'About & team sections' },
  { name: 'HEX Pattern', path: '/images/HEX.png', usage: 'Innovation-themed sections' },
];

const photography = [
  { name: 'Team Photo', path: '/images/family_shot_big.jpg', usage: 'About page, team section' },
  { name: 'Mike Binko (MD, Innovation)', path: '/images/binko.jpg', usage: 'About, leadership, IVE pillar' },
  { name: 'Jake Hamann', path: '/images/jake.png', usage: 'About, team grid' },
  { name: 'Grant', path: '/images/grant.jpg', usage: 'About, team grid' },
  { name: 'Hanah', path: '/images/hanah.jpg', usage: 'About, team grid' },
  { name: 'Harsh', path: '/images/harsh.jpg', usage: 'About, team grid' },
  { name: 'Sam', path: '/images/sam.jpeg', usage: 'About, team grid' },
  { name: 'Steven', path: '/images/steven.jpeg', usage: 'About, team grid' },
  { name: 'Trinity College', path: '/images/trinity.jpg', usage: 'Case study, innovation' },
];

const pillarImages = [
  { name: 'Experiential Branding', path: '/images/ExperientialBranding.png', usage: 'Experiential pillar hero / cards' },
  { name: 'Operational Intelligence', path: '/images/DigitalTransformation.png', usage: 'Operational Intelligence pillar hero / cards' },
  { name: 'Innovation | Ventures | Ecosystem', path: '/images/bt3.png', usage: 'Innovation pillar hero — bt3.png with purple gradient overlay (rgba(15,14,32,0.58) → rgba(50,50,82,0.42))', compositeStyle: { background: 'linear-gradient(135deg, rgba(15,14,32,0.58) 0%, rgba(32,32,58,0.5) 50%, rgba(50,50,82,0.42) 100%), url(/images/bt3.png) center/cover no-repeat' } },
];

const clientLogos = [
  { name: 'Caterpillar', path: '/logos/caterpillar.png' },
  { name: 'Mustang CAT', path: '/logos/mustang-cat.png' },
  { name: 'Trinity College', path: '/logos/trinity-college.png' },
  { name: 'Cisco', path: '/logos/cisco.png' },
  { name: 'City of Hartford', path: '/logos/city-of-hartford.png' },
  { name: 'Blanchard Machinery', path: '/logos/blanchard-machinery.png' },
  { name: 'Thompson Tractor', path: '/logos/thompson-tractor.png' },
  { name: 'State of Connecticut', path: '/logos/connecticut-logo.png' },
  { name: 'NIST', path: '/logos/nist.png' },
  { name: 'Momentify', path: '/logos/momentify-logo.svg' },
];

/* Sidebar structure */
const sidebarNav = {
  'brand-kit': {
    label: 'Brand Kit',
    sections: [
      { id: 'bk-logo', label: 'Logo & Wordmark' },
      { id: 'bk-colors', label: 'Color Palette' },
      { id: 'bk-gradients', label: 'Gradients' },
      { id: 'bk-og', label: 'OG Images' },
      { id: 'bk-backgrounds', label: 'Backgrounds & Textures' },
      { id: 'bk-pillar-imagery', label: 'Pillar Imagery' },
      { id: 'bk-client-logos', label: 'Client Logos' },
      { id: 'bk-favicon', label: 'Favicon & Icons' },
      { id: 'bk-voice', label: 'Brand Voice & Values' },
      { id: 'bk-messaging', label: 'Key Messaging' },
      { id: 'bk-signature', label: 'Email Signature' },
    ],
  },
  'design-system': {
    label: 'Design System',
    sections: [
      { id: 'ds-typography', label: 'Typography' },
      { id: 'ds-icons', label: 'Iconography' },
      { id: 'ds-buttons', label: 'Buttons' },
      { id: 'ds-tokens', label: 'Spacing & Tokens' },
      { id: 'ds-cards', label: 'Card Components' },
      { id: 'ds-grid', label: 'Layout Grid' },
      { id: 'ds-elevation', label: 'Elevation & Effects' },
      { id: 'ds-animations', label: 'Animations' },
      { id: 'ds-responsive', label: 'Responsive Breakpoints' },
      { id: 'ds-patterns', label: 'Page Patterns' },
    ],
  },
  'gtm-toolkit': {
    label: 'GTM Toolkit',
    sections: [
      { id: 'gtm-strategy', label: 'Strategy Overview' },
      { id: 'gtm-journey', label: 'Customer Journey' },
      { id: 'gtm-industries', label: 'Target Industries' },
      { id: 'gtm-companies', label: 'Target Companies' },
      { id: 'gtm-roles', label: 'Target Roles & Personas' },
      { id: 'gtm-battlecards', label: 'Battle Cards' },
      { id: 'gtm-phases', label: 'Execution Phases' },
      { id: 'gtm-outreach', label: 'Outreach Templates' },
      { id: 'gtm-onepagers', label: 'One-Pagers & Leave-Behinds' },
      { id: 'gtm-discovery', label: 'Discovery & Talk Tracks' },
      { id: 'gtm-proof', label: 'Proof Points' },
      { id: 'gtm-proposals', label: 'Proposal Framework' },
      { id: 'gtm-events', label: 'Event Toolkit' },
    ],
  },
};


/* ═══════════════════════════════════════════════
   PASSWORD GATE
   ═══════════════════════════════════════════════ */

function PasswordGate({ onAuth }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (pw === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      onAuth();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className="bp-gate">
      <div className={`bp-gate-card ${shake ? 'bp-shake' : ''}`}>
        {LOGO_SVG_DARK('28px')}
        <p className="bp-gate-label">Brand Portal</p>
        <form onSubmit={submit}>
          <input type="password" value={pw} onChange={e => { setPw(e.target.value); setError(false); }} placeholder="Enter password" autoFocus />
          {error && <span className="bp-gate-error">Incorrect password</span>}
          <button type="submit">Access</button>
        </form>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════════ */

function Swatch({ color }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }
  return (
    <div className="bp-swatch" onClick={copy} title={`Copy ${color.hex}`}>
      <div className="bp-swatch-color" style={{ background: color.gradient || color.hex }} />
      <div className="bp-swatch-info">
        <span className="bp-swatch-name">{color.name}</span>
        <span className="bp-swatch-hex">{copied ? 'Copied!' : color.hex}</span>
        {color.css && <span className="bp-swatch-var">{color.css}</span>}
      </div>
    </div>
  );
}

function ImageCard({ item, tall }) {
  const clickable = !!item.path;
  const Wrapper = clickable ? 'a' : 'div';
  const wrapperProps = clickable ? { href: item.path, target: '_blank', rel: 'noopener' } : {};

  return (
    <Wrapper className="bp-img-card" {...wrapperProps}>
      <div className={`bp-img-preview ${tall ? 'bp-img-tall' : ''}`}>
        {item.compositeStyle ? (
          <div style={{width:'100%', height:'100%', ...item.compositeStyle}} />
        ) : item.path ? (
          <img src={item.path} alt={item.name} loading="lazy" />
        ) : null}
      </div>
      <div className="bp-img-info">
        <strong>{item.name}</strong>
        {item.usage && <span>{item.usage}</span>}
        <code>{item.path || 'CSS pattern'}</code>
      </div>
    </Wrapper>
  );
}


/* ═══════════════════════════════════════════════
   BRAND KIT TAB
   ═══════════════════════════════════════════════ */

function BrandKit() {
  return (
    <div className="bp-tab-content">

      {/* Logo */}
      <section className="bp-section" id="bk-logo">
        <h2>Logo & Wordmark</h2>
        <p className="bp-desc">The ENTEVATE wordmark is our primary brand identifier. The mark consists of a custom geometric icon (the "E" glyph) paired with the ENTEVATE letterforms. Use the full lockup wherever possible. Maintain clear space equal to the height of the "E" character on all sides.</p>
        <div className="bp-logo-grid">
          <div className="bp-logo-card bp-logo-dark">
            {LOGO_SVG_WHITE('36px')}
            <span>On Dark</span>
          </div>
          <div className="bp-logo-card bp-logo-light">
            {LOGO_SVG_DARK('36px')}
            <span>On Light</span>
          </div>
          <div className="bp-logo-card" style={{background:'linear-gradient(90deg, #2060d8 0%, #38c6f4 100%)', color:'rgba(255,255,255,0.5)'}}>
            {LOGO_SVG_WHITE('36px')}
            <span>On Brand Gradient</span>
          </div>
          <div className="bp-logo-card" style={{background:'var(--light-blue)', color:'var(--gray-light)'}}>
            {LOGO_SVG_DARK('36px')}
            <span>On Light Blue</span>
          </div>
        </div>

        <h3>Icon Only</h3>
        <p className="bp-desc">The "E" glyph can be used independently as an icon or favicon at small sizes where the full wordmark would be illegible.</p>
        <div className="bp-logo-grid" style={{gridTemplateColumns:'repeat(4, 1fr)'}}>
          <div className="bp-logo-card bp-logo-dark" style={{padding:'32px'}}>
            <svg width="37" height="57" viewBox="0 0 37 57" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height:'36px', width:'auto'}}>
              <path d="M0.332092 0.332031V27.5874L5.10768 23.7746V5.10737H31.9303V12.9027L0.332092 36.2887V42.4419L5.10768 46.2546V38.7047L36.687 15.3187H36.7059V15.2998V5.10737V0.332031H0.332092Z" fill="white"/><path fillRule="evenodd" clipRule="evenodd" d="M0 0H37.0377V15.6506H36.7964L5.43956 38.8719V46.9444L0 42.6016V36.1213L31.5982 12.7353V5.43932H5.43956V23.9343L0 28.2772V0ZM31.9302 12.9027L0.331986 36.2886V42.4418L5.10758 46.2546V38.7046L36.6869 15.3186H36.7058V0.331986H0.331986V27.5873L5.10758 23.7746V5.10733H31.9302V12.9027Z" fill="white"/><path d="M10.7404 43.7659V48.1072V50.7119L18.4606 56.7707L36.6947 43.2752V37.3296L18.4606 50.7119L15.7802 48.2959V44.3888L36.6947 28.8925V22.9658L10.7404 42.1616V43.7659Z" fill="white"/><path fillRule="evenodd" clipRule="evenodd" d="M10.4084 50.8734V41.9942L37.0267 22.3074V29.0597L16.1122 44.556V48.1482L18.4821 50.2843L37.0267 36.6742V43.4425L18.4547 57.1881L10.4084 50.8734ZM18.4606 50.7119L15.7802 48.2959V44.3888L36.6947 28.8925V22.9658L10.7404 42.1616V50.7119L18.4606 56.7707L36.6947 43.2752V37.3296L18.4606 50.7119Z" fill="white"/>
            </svg>
            <span>Icon — Dark BG</span>
          </div>
          <div className="bp-logo-card bp-logo-light" style={{padding:'32px'}}>
            <svg width="37" height="57" viewBox="0 0 37 57" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height:'36px', width:'auto'}}>
              <path d="M0.332092 0.332031V27.5874L5.10768 23.7746V5.10737H31.9303V12.9027L0.332092 36.2887V42.4419L5.10768 46.2546V38.7047L36.687 15.3187H36.7059V15.2998V5.10737V0.332031H0.332092Z" fill="#181818"/><path fillRule="evenodd" clipRule="evenodd" d="M0 0H37.0377V15.6506H36.7964L5.43956 38.8719V46.9444L0 42.6016V36.1213L31.5982 12.7353V5.43932H5.43956V23.9343L0 28.2772V0ZM31.9302 12.9027L0.331986 36.2886V42.4418L5.10758 46.2546V38.7046L36.6869 15.3186H36.7058V0.331986H0.331986V27.5873L5.10758 23.7746V5.10733H31.9302V12.9027Z" fill="#181818"/><path d="M10.7404 43.7659V48.1072V50.7119L18.4606 56.7707L36.6947 43.2752V37.3296L18.4606 50.7119L15.7802 48.2959V44.3888L36.6947 28.8925V22.9658L10.7404 42.1616V43.7659Z" fill="#181818"/><path fillRule="evenodd" clipRule="evenodd" d="M10.4084 50.8734V41.9942L37.0267 22.3074V29.0597L16.1122 44.556V48.1482L18.4821 50.2843L37.0267 36.6742V43.4425L18.4547 57.1881L10.4084 50.8734ZM18.4606 50.7119L15.7802 48.2959V44.3888L36.6947 28.8925V22.9658L10.7404 42.1616V50.7119L18.4606 56.7707L36.6947 43.2752V37.3296L18.4606 50.7119Z" fill="#181818"/>
            </svg>
            <span>Icon — Light BG</span>
          </div>
          <div className="bp-logo-card bp-logo-dark" style={{padding:'32px'}}>
            <img src="/favicon.png" alt="Favicon" style={{height:'36px', width:'36px', objectFit:'contain'}} />
            <span>Favicon (PNG)</span>
          </div>
          <div className="bp-logo-card bp-logo-light" style={{padding:'32px'}}>
            <img src="/favicon.png" alt="Favicon" style={{height:'36px', width:'36px', objectFit:'contain'}} />
            <span>Favicon (PNG)</span>
          </div>
        </div>

        <div className="bp-usage-row">
          <div className="bp-usage-do">
            <h4>Do</h4>
            <ul>
              <li>Use the full ENTEVATE wordmark as the primary logo</li>
              <li>Maintain minimum clear space equal to "E" height on all sides</li>
              <li>Use white logo on dark backgrounds, black on light</li>
              <li>Use the icon-only mark for favicons, app icons, and small spaces</li>
            </ul>
          </div>
          <div className="bp-usage-dont">
            <h4>Don't</h4>
            <ul>
              <li>Stretch, rotate, or distort the logo</li>
              <li>Apply drop shadows, outlines, or effects</li>
              <li>Place on busy backgrounds without sufficient contrast</li>
              <li>Use colors other than white or black for the logo</li>
              <li>Separate the icon from the wordmark unless at small sizes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="bp-section" id="bk-colors">
        <h2>Color Palette</h2>
        <p className="bp-desc">Click any swatch to copy the hex value. Each service pillar has its own accent pair used for section headers, card accents, tags, and CTAs.</p>
        <h3>Primary Brand</h3>
        <div className="bp-swatch-grid">{colors.primary.map(c => <Swatch key={c.hex} color={c} />)}</div>
        <h3>Service Pillars</h3>
        <div className="bp-swatch-grid">{colors.pillar.map(c => <Swatch key={c.name} color={c} />)}</div>
        <h3>Neutrals</h3>
        <div className="bp-swatch-grid">{colors.neutral.map(c => <Swatch key={c.hex} color={c} />)}</div>
      </section>

      {/* Gradients */}
      <section className="bp-section" id="bk-gradients">
        <h2>Gradients</h2>
        <p className="bp-desc">Gradients are used for accent bars on service cards, eyebrow labels, CTA banners, stat numbers, and tag badges. The CTA overlay gradient is used on full-bleed banner sections.</p>
        <div className="bp-gradient-grid">
          {gradients.map(g => (
            <div key={g.name} className="bp-gradient-card">
              <div className="bp-gradient-preview" style={{ background: g.value }} />
              <span className="bp-gradient-name">{g.name}</span>
              <code className="bp-gradient-code">{g.value}</code>
            </div>
          ))}
        </div>
      </section>

      {/* OG Images */}
      <section className="bp-section" id="bk-og">
        <h2>OG Images</h2>
        <p className="bp-desc">Open Graph images are 1200x630px and used when pages are shared on social media, Slack, and messaging apps. Each pillar has a dedicated OG image.</p>
        <div className="bp-img-grid bp-img-grid-wide">
          {ogImages.map(img => <ImageCard key={img.path} item={img} />)}
        </div>
      </section>

      {/* Backgrounds */}
      <section className="bp-section" id="bk-backgrounds">
        <h2>Backgrounds & Textures</h2>
        <p className="bp-desc">Background images and textures used across hero sections, CTA banners, blog card thumbnails, and pillar pages.</p>
        <div className="bp-img-grid">
          {bgTextures.map(img => <ImageCard key={img.path} item={img} />)}
        </div>
      </section>


      {/* Pillar Imagery */}
      <section className="bp-section" id="bk-pillar-imagery">
        <h2>Pillar Imagery</h2>
        <p className="bp-desc">Full-bleed pillar hero illustrations used on service landing pages and marketing materials.</p>
        <div className="bp-img-grid bp-img-grid-wide">
          {pillarImages.map(img => <ImageCard key={img.path} item={img} />)}
        </div>
      </section>

      {/* Client Logos */}
      <section className="bp-section" id="bk-client-logos">
        <h2>Client Logos</h2>
        <p className="bp-desc">Client logos used in the scrolling trust bar. Displayed at 28px height, grayscale at 45% opacity, with hover revealing 80% opacity.</p>
        <div className="bp-client-grid">
          {clientLogos.map(l => (
            <div key={l.name} className="bp-client-card">
              <img src={l.path} alt={l.name} loading="lazy" />
              <span>{l.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Favicon */}
      <section className="bp-section" id="bk-favicon">
        <h2>Favicon & Icons</h2>
        <p className="bp-desc">The favicon uses the standalone "E" glyph from the ENTEVATE mark. It ships as a PNG at multiple sizes for broad browser compatibility.</p>
        <div className="bp-favicon-row">
          {[16, 32, 48, 64].map(s => (
            <div key={s} className="bp-favicon-card">
              <img src="/favicon.png" alt={`Favicon ${s}px`} style={{width:`${s}px`, height:`${s}px`, imageRendering: s <= 32 ? 'pixelated' : 'auto'}} />
              <span>{s}x{s}</span>
            </div>
          ))}
        </div>
        <div className="bp-msg-card" style={{marginTop:'16px'}}>
          <span className="bp-msg-label">Implementation</span>
          <code style={{fontSize:'13px', color:'var(--gray-mid)'}}>&lt;link rel="icon" type="image/png" href="/favicon.png" /&gt;</code>
        </div>
      </section>

      {/* Voice & Values */}
      <section className="bp-section" id="bk-voice">
        <h2>Brand Voice & Values</h2>
        <p className="bp-desc">ENTEVATE communicates with clarity, warmth, and purpose. Our tone is confident but never arrogant — human-centered, forward-thinking, and grounded.</p>
        <div className="bp-voice-grid">
          <div className="bp-voice-card">
            <h4>Tone</h4>
            <ul>
              <li>Confident, not arrogant</li>
              <li>Warm, not casual</li>
              <li>Forward-thinking, not jargon-heavy</li>
              <li>Precise, not clinical</li>
            </ul>
          </div>
          <div className="bp-voice-card">
            <h4>Writing Style</h4>
            <ul>
              <li>Lead with clarity, follow with depth</li>
              <li>Use active voice</li>
              <li>Short paragraphs, scannable structure</li>
              <li>Em dashes (—) for emphasis, not semicolons</li>
            </ul>
          </div>
        </div>
        <h3>Core Values</h3>
        <div className="bp-values-grid">
          {[
            { name: 'Empathy', desc: 'Lead with heart — before we recommend, we listen. Before we solve, we understand.', dot: '#2bbfa8' },
            { name: 'Authenticity', desc: 'Keep it real — we bring our full selves and encourage our clients to do the same.', dot: '#e8782a' },
            { name: 'Adaptability', desc: 'Embrace the pivot — in a world that changes fast, we stay grounded by staying flexible.', dot: '#6a6b9e' },
            { name: 'Quality', desc: "Don't cut corners — from strategy to execution, excellence is in the details.", dot: '#247b96' },
            { name: 'Responsibility', desc: "Do what's right — ethical, sustainable, and meaningful impact.", dot: '#5ba8c4' },
          ].map(v => (
            <div key={v.name} className="bp-value-pill">
              <span className="bp-value-dot" style={{ background: v.dot }} />
              <div><strong>{v.name}</strong><span>{v.desc}</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* Messaging */}
      <section className="bp-section" id="bk-messaging">
        <h2>Key Messaging</h2>
        <div className="bp-messaging-grid">
          <div className="bp-msg-card">
            <span className="bp-msg-label">Tagline</span>
            <p className="bp-msg-text">Human-centered innovation partner</p>
          </div>
          <div className="bp-msg-card">
            <span className="bp-msg-label">Positioning Statement</span>
            <p className="bp-msg-text">We partner with organizations ready to evolve — designing immersive brand experiences, aligning digital content, and building actionable roadmaps for lasting impact.</p>
          </div>
          <div className="bp-msg-card">
            <span className="bp-msg-label">Three Pillars</span>
            <p className="bp-msg-text">Experiential Branding &amp; Marketing &middot; Operational Intelligence &middot; Innovation | Ventures | Ecosystem</p>
          </div>
          <div className="bp-msg-card">
            <span className="bp-msg-label">Elevator Pitch</span>
            <p className="bp-msg-text">ENTEVATE is a human-centered innovation partner working at the intersection of experiential branding, digital transformation, and strategic roadmapping. We partner with bold leaders who believe technology should amplify humanity — not replace it.</p>
          </div>
          <div className="bp-msg-card">
            <span className="bp-msg-label">Boilerplate</span>
            <p className="bp-msg-text">Founded in 2016 and based in Frisco, Texas, ENTEVATE is a human-centered innovation partner for leaders ready to build what comes next. From immersive brand experiences powered by Momentify to co-created innovation roadmaps and applied AI frameworks like AIQUI, everything we build starts with people. Learn more at entevate.com.</p>
          </div>
        </div>
      </section>

      <section className="bp-section" id="bk-signature">
        <h2>Email Signature</h2>
        <p className="bp-desc">Build, save, and export your ENTEVATE email signature. Multiple variants are supported (e.g. Default, Conferences, External Outreach). Each ENTEVATE team member signs in with a magic link and manages their own signatures privately.</p>
        <SignatureBuilder />
      </section>
    </div>
  );
}


/* ═══════════════════════════════════════════════
   DESIGN SYSTEM TAB
   ═══════════════════════════════════════════════ */

function DesignSystem() {
  return (
    <div className="bp-tab-content">

      {/* Typography */}
      <section className="bp-section" id="ds-typography">
        <h2>Typography</h2>
        <p className="bp-desc">Archivo is our sole typeface — a technical grotesque sans-serif that balances precision with warmth. Imported via Google Fonts with weights 100-700.</p>
        <div className="bp-font-specimen">
          <span className="bp-font-name">Archivo</span>
          <span className="bp-font-sample" style={{fontWeight:100}}>Aa</span>
          <span className="bp-font-sample" style={{fontWeight:300}}>Aa</span>
          <span className="bp-font-sample" style={{fontWeight:400}}>Aa</span>
          <span className="bp-font-sample" style={{fontWeight:600}}>Aa</span>
          <span className="bp-font-sample" style={{fontWeight:700}}>Aa</span>
        </div>
        <div className="bp-msg-card" style={{marginBottom:'24px'}}>
          <span className="bp-msg-label">Font Stack</span>
          <code style={{fontSize:'13px', color:'var(--gray-mid)'}}>font-family: "Archivo", system-ui, sans-serif;</code>
        </div>
        <h3>Type Scale</h3>
        <div className="bp-type-scale">
          {typeScale.map(t => (
            <div key={t.name} className="bp-type-row">
              <div className="bp-type-meta">
                <span className="bp-type-name">{t.name}</span>
                <code>{t.size} / {t.weight}</code>
                {t.tracking && <code>letter-spacing: {t.tracking}</code>}
                {t.transform && <code>text-transform: {t.transform}</code>}
              </div>
              <p className="bp-type-sample" style={{
                fontSize: t.size,
                fontWeight: t.weight,
                textTransform: t.transform || 'none',
                letterSpacing: t.tracking || '-0.02em',
                lineHeight: 1.1,
              }}>{t.sample}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Icons */}
      <section className="bp-section" id="ds-icons">
        <h2>Iconography</h2>
        <p className="bp-desc">All icons are inline SVGs using a stroke-based design on a 24x24 viewBox. They inherit color via <code style={{fontSize:'12px'}}>stroke="currentColor"</code>, making them adaptable to any context. The style matches <a href="https://lucide.dev" target="_blank" rel="noopener" style={{color:'var(--blue)', textDecoration:'underline'}}>Lucide Icons</a> — our recommended complementary icon set.</p>

        <h3>Icon Specifications</h3>
        <table className="bp-token-table">
          <thead><tr><th>Property</th><th>Value</th></tr></thead>
          <tbody>
            <tr><td>ViewBox</td><td><code>0 0 24 24</code></td></tr>
            <tr><td>Stroke Width (standard)</td><td><code>1.6</code></td></tr>
            <tr><td>Stroke Width (nav controls)</td><td><code>1.8</code></td></tr>
            <tr><td>Fill</td><td><code>none</code></td></tr>
            <tr><td>Stroke</td><td><code>currentColor</code></td></tr>
            <tr><td>Line Cap</td><td><code>round</code></td></tr>
            <tr><td>Line Join</td><td><code>round</code></td></tr>
          </tbody>
        </table>

        <h3>Service Pillar Icons (In Use)</h3>
        <div className="bp-icon-grid">
          {[
            { name: 'Star', label: 'Experiential', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
            { name: 'Layers', label: 'Operational Intelligence', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> },
            { name: 'Lightbulb', label: 'Innovation', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17H8v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z"/></svg> },
          ].map(icon => (
            <div key={icon.name} className="bp-icon-card">
              <div className="bp-icon-preview">{icon.svg}</div>
              <strong>{icon.name}</strong>
              <span>{icon.label}</span>
            </div>
          ))}
        </div>

        <h3>Feature & Detail Icons (In Use)</h3>
        <div className="bp-icon-grid">
          {[
            { name: 'Users', label: 'Team / Collaboration', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
            { name: 'Eye', label: 'AR/VR / Visibility', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> },
            { name: 'Shield', label: 'Trust / Security', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
            { name: 'Zap', label: 'Performance / Speed', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
            { name: 'BarChart', label: 'Metrics / Impact', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg> },
            { name: 'Rocket', label: 'Growth / Launch', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg> },
          ].map(icon => (
            <div key={icon.name} className="bp-icon-card">
              <div className="bp-icon-preview">{icon.svg}</div>
              <strong>{icon.name}</strong>
              <span>{icon.label}</span>
            </div>
          ))}
        </div>

        <h3>Navigation & Social Icons (In Use)</h3>
        <div className="bp-icon-grid">
          {[
            { name: 'Menu', label: 'Hamburger', svg: <svg width="24" height="24" viewBox="0 0 22 16" fill="none"><line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><line x1="0" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
            { name: 'Close', label: 'Dismiss', svg: <svg width="24" height="24" viewBox="0 0 18 18" fill="none"><line x1="1.5" y1="1.5" x2="16.5" y2="16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><line x1="16.5" y1="1.5" x2="1.5" y2="16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
            { name: 'LinkedIn', label: 'Social', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
            { name: 'Facebook', label: 'Social', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
            { name: 'X / Twitter', label: 'Social', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg> },
          ].map(icon => (
            <div key={icon.name} className="bp-icon-card">
              <div className="bp-icon-preview">{icon.svg}</div>
              <strong>{icon.name}</strong>
              <span>{icon.label}</span>
            </div>
          ))}
        </div>

        <h3>Recommended: Lucide Icons</h3>
        <p className="bp-desc">For new icons beyond what's currently in use, we recommend <a href="https://lucide.dev" target="_blank" rel="noopener" style={{color:'var(--blue)', textDecoration:'underline'}}>Lucide</a> — an open-source icon library that matches our exact specifications (24x24, stroke 1.5-2, round caps/joins). Examples of useful additions:</p>
        <div className="bp-icon-grid">
          {[
            { name: 'Search', label: 'Search / Filter', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
            { name: 'Download', label: 'Asset Download', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> },
            { name: 'Mail', label: 'Email / Contact', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
            { name: 'Calendar', label: 'Scheduling', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
            { name: 'Settings', label: 'Configuration', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
            { name: 'CheckCircle', label: 'Success / Complete', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
            { name: 'Globe', label: 'Web / International', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
            { name: 'Brain', label: 'AI / Intelligence', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 3 1.5 5.5 4 7v4h6v-4c2.5-1.5 4-4 4-7a7 7 0 0 0-7-7z"/><line x1="9" y1="22" x2="15" y2="22"/><line x1="10" y1="2" x2="10" y2="5"/><line x1="14" y1="2" x2="14" y2="5"/></svg> },
          ].map(icon => (
            <div key={icon.name} className="bp-icon-card">
              <div className="bp-icon-preview">{icon.svg}</div>
              <strong>{icon.name}</strong>
              <span>{icon.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}
      <section className="bp-section" id="ds-buttons">
        <h2>Buttons</h2>
        <p className="bp-desc">All buttons use Archivo 600 weight, 6px border-radius, and a 0.22s ease transition. Hover states shift color and add a subtle Y-axis lift.</p>
        <div className="bp-button-grid">
          {buttonVariants.map(b => (
            <div key={b.name} className="bp-button-demo">
              <span className="bp-button-label">{b.name}</span>
              <a className={b.cls} href="#" onClick={e => e.preventDefault()}>{b.label}</a>
              <code>.{b.cls}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Tokens */}
      <section className="bp-section" id="ds-tokens">
        <h2>Spacing & Tokens</h2>
        <p className="bp-desc">Core layout values defined as CSS custom properties. These tokens ensure consistency across every page and component.</p>
        <table className="bp-token-table">
          <thead><tr><th>Token</th><th>Value</th></tr></thead>
          <tbody>
            {spacingTokens.map(s => (
              <tr key={s.name}><td>{s.name}</td><td><code>{s.value}</code></td></tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Cards */}
      <section className="bp-section" id="ds-cards">
        <h2>Card Components</h2>
        <p className="bp-desc">Service cards use a 3px gradient top-bar colored per pillar. Blog cards inherit pillar colors via tag badge variants (.card-ebm, .card-dct, .card-irm, .card-gen).</p>
        <div className="bp-card-demo-grid">
          {[
            { cls: 's1', title: 'Experiential Branding & Marketing', desc: 'Teal gradient top bar (#2bbfa8 → #6dd4a0), teal learn-more link and icon tint' },
            { cls: 's2', title: 'Operational Intelligence', desc: 'Orange gradient top bar (#e8782a → #f5b731), orange learn-more link and icon tint' },
            { cls: 's3', title: 'Innovation | Ventures | Ecosystem', desc: 'Purple gradient top bar (#5b5c8c → #8e90c0), purple learn-more link and icon tint' },
          ].map(c => (
            <div key={c.cls} className={`service-card ${c.cls}`} style={{cursor:'default'}}>
              <div className="service-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/></svg>
              </div>
              <h3>{c.title}</h3>
              <em>.service-card.{c.cls}</em>
              <p>{c.desc}</p>
              <span className="learn-more">Learn More →</span>
            </div>
          ))}
        </div>
        <h3>Blog Card Tag Variants</h3>
        <div className="bp-tag-demo">
          {[
            { cls: 'card-ebm', label: 'Experiential Branding', color: '#2bbfa8' },
            { cls: 'card-dct', label: 'Operational Intelligence', color: '#e8782a' },
            { cls: 'card-irm', label: 'Innovation', color: '#5b5c8c' },
            { cls: 'card-gen', label: 'General / Insights', color: '#3b8fe8' },
          ].map(t => (
            <div key={t.cls} className="bp-tag-pill">
              <span style={{background: t.color, width:'8px', height:'8px', borderRadius:'50%', flexShrink:0}} />
              <span><strong>.{t.cls}</strong> — {t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="bp-section" id="ds-grid">
        <h2>Layout Grid</h2>
        <p className="bp-desc">Desktop pages use a 1160px centered container with 48px side padding. The standard grid is 3 equal columns at 24px gap. Footer uses a 4-column grid (1.4fr 1fr 1fr 1.2fr).</p>
        <div className="bp-grid-demo">
          <div className="bp-grid-col">1fr</div>
          <div className="bp-grid-col">1fr</div>
          <div className="bp-grid-col">1fr</div>
        </div>
        <div className="bp-grid-info">
          <code>max-width: 1160px</code>
          <code>gap: 24px</code>
          <code>padding: 0 48px</code>
        </div>
        <h3>Footer Grid</h3>
        <div className="bp-grid-demo" style={{gridTemplateColumns:'1.4fr 1fr 1fr 1.2fr'}}>
          <div className="bp-grid-col">1.4fr</div>
          <div className="bp-grid-col">1fr</div>
          <div className="bp-grid-col">1fr</div>
          <div className="bp-grid-col">1.2fr</div>
        </div>
      </section>

      {/* Elevation */}
      <section className="bp-section" id="ds-elevation">
        <h2>Elevation & Effects</h2>
        <p className="bp-desc">Subtle shadows and Y-axis lifts communicate hover interactivity. All interactive cards use translateY(-3px) on hover.</p>
        <div className="bp-elevation-grid">
          <div className="bp-elev-card" style={{boxShadow:'none'}}>
            <span>Rest</span><code>box-shadow: none</code>
          </div>
          <div className="bp-elev-card" style={{boxShadow:'0 8px 24px rgba(0,0,0,0.08)'}}>
            <span>Dropdown</span><code>0 8px 24px rgba(0,0,0,0.08)</code>
          </div>
          <div className="bp-elev-card" style={{boxShadow:'0 10px 40px rgba(0,0,0,0.08)', transform:'translateY(-3px)'}}>
            <span>Card Hover</span><code>0 10px 40px rgba(0,0,0,0.08)</code>
          </div>
          <div className="bp-elev-card" style={{boxShadow:'-6px 0 32px rgba(0,0,0,0.16)'}}>
            <span>Mobile Drawer</span><code>-6px 0 32px rgba(0,0,0,0.16)</code>
          </div>
        </div>
      </section>

      {/* Animations */}
      <section className="bp-section" id="ds-animations">
        <h2>Animations</h2>
        <p className="bp-desc">The site uses two animation systems: scroll-triggered fade-ups via Intersection Observer, and a continuous CSS keyframe animation for the client logo carousel.</p>
        <div className="bp-animation-grid">
          <div className="bp-anim-card">
            <h4>Fade Up (Scroll Reveal)</h4>
            <div className="bp-anim-spec">
              <code>.fade-up</code>
              <span>opacity: 0 → 1, translateY(22px → 0)</span>
              <span>Duration: 0.55s ease</span>
              <span>Trigger: IntersectionObserver (threshold 0.15)</span>
              <span>Stagger: +0.1s per sibling in grids</span>
            </div>
          </div>
          <div className="bp-anim-card">
            <h4>Client Carousel</h4>
            <div className="bp-anim-spec">
              <code>@keyframes clients-scroll</code>
              <span>translateX(0) → translateX(-50%)</span>
              <span>Duration: 22s linear infinite</span>
              <span>Pauses on hover</span>
            </div>
          </div>
          <div className="bp-anim-card">
            <h4>Hero SVG Curves</h4>
            <div className="bp-anim-spec">
              <code>@keyframes drift1, drift2, drift3</code>
              <span>Gentle translateY/X oscillation with scaleY</span>
              <span>Duration: 8-12s ease-in-out infinite alternate</span>
              <span>5 curves at different speeds and phases</span>
            </div>
          </div>
          <div className="bp-anim-card">
            <h4>Micro-interactions</h4>
            <div className="bp-anim-spec">
              <code>var(--tr): 0.22s ease</code>
              <span>Applied to: hover color shifts, button lifts, link gap widening</span>
              <span>Card hover: translateY(-3px)</span>
              <span>Learn-more arrow: gap 6px → 10px on hover</span>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive */}
      <section className="bp-section" id="ds-responsive">
        <h2>Responsive Breakpoints</h2>
        <p className="bp-desc">Two primary breakpoints drive layout shifts across the site. Typography uses clamp() for fluid scaling between breakpoints.</p>
        <table className="bp-token-table">
          <thead><tr><th>Breakpoint</th><th>Behavior</th></tr></thead>
          <tbody>
            <tr><td><code>&gt; 960px</code></td><td>Desktop — full nav, 3-column grids, 4-column footer, sidebar drawer hidden</td></tr>
            <tr><td><code>&le; 960px</code></td><td>Tablet — hamburger menu, 2-column footer, reduced section padding (72px 24px)</td></tr>
            <tr><td><code>&le; 600px</code></td><td>Mobile — 1-column everything, compact padding (56px 20px), stacked stat rows</td></tr>
          </tbody>
        </table>
        <h3>Fluid Typography</h3>
        <div className="bp-msg-card">
          <span className="bp-msg-label">Hero</span>
          <code style={{fontSize:'13px', color:'var(--gray-mid)'}}>font-size: clamp(34px, 6vw, 70px) — scales from 34px (mobile) to 70px (desktop)</code>
        </div>
        <div className="bp-msg-card" style={{marginTop:'8px'}}>
          <span className="bp-msg-label">Section Titles</span>
          <code style={{fontSize:'13px', color:'var(--gray-mid)'}}>font-size: clamp(30px, 4vw, 48px) — scales from 30px (mobile) to 48px (desktop)</code>
        </div>
      </section>

      {/* Page Patterns */}
      <section className="bp-section" id="ds-patterns">
        <h2>Page Patterns</h2>
        <p className="bp-desc">Common page structures used across the site. All pages follow the same shell: Header → Content Sections → CTA Banner → Footer.</p>
        <div className="bp-pattern-grid">
          <div className="bp-pattern-card">
            <h4>Homepage</h4>
            <div className="bp-pattern-stack">
              <span className="bp-pat bp-pat-nav">Header (sticky, 70px)</span>
              <span className="bp-pat bp-pat-hero">Hero (light-blue bg, SVG curves, min-height 82vh)</span>
              <span className="bp-pat bp-pat-alt">Client Carousel (border-top/bottom)</span>
              <span className="bp-pat bp-pat-section">Services Grid (3-col)</span>
              <span className="bp-pat bp-pat-alt">About + Values (2-col split, light-blue bg)</span>
              <span className="bp-pat bp-pat-cta">CTA Banner (gradient overlay on bt3.png)</span>
              <span className="bp-pat bp-pat-section">Blog Grid (3-col)</span>
              <span className="bp-pat bp-pat-dark">Footer (4-col grid)</span>
            </div>
          </div>
          <div className="bp-pattern-card">
            <h4>Service Pillar Page</h4>
            <div className="bp-pattern-stack">
              <span className="bp-pat bp-pat-nav">Header (sticky, 70px)</span>
              <span className="bp-pat bp-pat-hero">Hero (pillar color bg, eyebrow label)</span>
              <span className="bp-pat bp-pat-section">Offerings Grid (cards)</span>
              <span className="bp-pat bp-pat-alt">Features / Details</span>
              <span className="bp-pat bp-pat-section">Case Studies</span>
              <span className="bp-pat bp-pat-cta">CTA Banner</span>
              <span className="bp-pat bp-pat-dark">Footer (4-col grid)</span>
            </div>
          </div>
          <div className="bp-pattern-card">
            <h4>Article / Insight</h4>
            <div className="bp-pattern-stack">
              <span className="bp-pat bp-pat-nav">Header (sticky, 70px)</span>
              <span className="bp-pat bp-pat-hero">Hero (pillar bg, title + meta)</span>
              <span className="bp-pat bp-pat-section">Article Body (prose, max-width 720px)</span>
              <span className="bp-pat bp-pat-alt">Related Content</span>
              <span className="bp-pat bp-pat-cta">CTA Banner</span>
              <span className="bp-pat bp-pat-dark">Footer (4-col grid)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


/* ═══════════════════════════════════════════════
   GTM TOOLKIT TAB
   ═══════════════════════════════════════════════ */

function GTMToolkit() {
  return (
    <div className="bp-tab-content">

      {/* Strategy Overview */}
      <section className="bp-section" id="gtm-strategy">
        <h2>Strategy Overview</h2>
        <p className="bp-desc">Rapidly engage high-intent prospects, build visibility across target sectors, and convert interest into qualified leads aligned to ENTEVATE's three core pillars plus Momentify.</p>

        <h3>Core Messaging by Pillar</h3>
        {[
          {
            pillar: 'Experiential Branding & Marketing',
            color: '#2bbfa8',
            anchor: 'Engagement isn\'t optional — it\'s measurable.',
            proof: 'Momentify delivers real-time ROX™ scoring across web, iOS, Android, and offline kiosks. 92% lead increase YoY.',
            offerings: 'Live Events & Activations, AR/VR & Spatial Computing, Content Production, Momentify Platform',
            ctas: ['Test Momentify at your next event.', 'See what measurable brand experiences look like.'],
          },
          {
            pillar: 'Operational Intelligence',
            color: '#e8782a',
            anchor: 'Custom AI systems, forged for how you actually operate.',
            proof: 'Concept to production with 8 middleware components in 1 week. Complete brand kits in < 2 hours. 700+ CAD variants converted. 8-figure cost savings.',
            offerings: 'AI Foundry™ (Learn | Build | Run), Operational Intelligence Assessment, Digital Transformation Strategy, CAD-to-CGI Pipeline',
            ctas: ['What\'s your path from AI pilot to production?', 'Assess your operational intelligence in 45 minutes.', 'Unlock your CAD library, build once, use everywhere.'],
          },
          {
            pillar: 'Innovation | Ventures | Ecosystem',
            color: '#6a6b9e',
            anchor: 'You don\'t need more ideas. You need the system to move them forward.',
            proof: '$24M+ capital activated. 400+ angels trained across 6 states. 225+ ventures supported. Trinity College AIQUI Sandbox deployed.',
            offerings: 'Innovation Roadmapping™ (8-Stage Rubric), Ecosystem Model (7 Core Elements™), AIQUI Framework, Angel Academy™, Innovation Sandbox™',
            ctas: ['Book your Innovation Fit Call.', 'What does your 180-day innovation roadmap look like?'],
          },
        ].map(p => (
          <div key={p.pillar} className="bp-icp-card" style={{borderLeftColor: p.color, marginBottom:'16px'}}>
            <div className="bp-icp-header" style={{borderBottom:'none', paddingBottom:'0'}}>
              <h3 style={{color: p.color, margin: 0, textTransform:'none', letterSpacing:'normal', fontSize:'15px'}}>{p.pillar}</h3>
            </div>
            <div className="bp-icp-body" style={{paddingTop:'12px'}}>
              <div className="bp-icp-messaging" style={{background:'transparent', padding:0}}>
                <h4>Anchor Message</h4>
                <p style={{fontStyle:'italic', fontSize:'15px', fontWeight:400}}>"{p.anchor}"</p>
              </div>
              <div>
                <h4>Proof Points</h4>
                <p style={{fontSize:'13px', color:'var(--gray-mid)', lineHeight:'1.6'}}>{p.proof}</p>
              </div>
              <div>
                <h4>Offerings</h4>
                <p style={{fontSize:'13px', color:'var(--gray-mid)', lineHeight:'1.6'}}>{p.offerings}</p>
              </div>
              <div>
                <h4>CTAs</h4>
                <div className="bp-icp-tags">{p.ctas.map(c => <span key={c} className="bp-icp-tag">{c}</span>)}</div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Customer Journey */}
      <section className="bp-section" id="gtm-journey">
        <h2>Customer Engagement Journey</h2>
        <p className="bp-desc">Three-touchpoint engagement flow from initial contact to Phase 0 project delivery.</p>

        <div className="bp-pattern-grid" style={{gridTemplateColumns:'1fr'}}>
          <div className="bp-pattern-card">
            <div className="bp-pattern-stack">
              <span className="bp-pat bp-pat-alt" style={{textAlign:'left', padding:'12px 16px'}}>
                <strong>Lead Sources:</strong> Website Lead Gen &middot; Social Lead Gen &middot; Events &middot; Outreach
              </span>
              <span className="bp-pat bp-pat-hero" style={{textAlign:'left', padding:'12px 16px'}}>
                <strong>Touchpoint 1:</strong> Initial Intro Call with Jake &mdash; Qualify interest, identify pillar fit
              </span>
              <span className="bp-pat bp-pat-section" style={{textAlign:'left', padding:'12px 16px'}}>
                <strong>Touchpoint 2:</strong> Discovery + Capabilities Call with Pillar Lead + Jake &mdash; Deep-dive into challenge, map to offerings
              </span>
              <span className="bp-pat bp-pat-cta" style={{textAlign:'left', padding:'12px 16px'}}>
                <strong>Touchpoint 3:</strong> Phase 0 Project SOW &mdash; Initial discovery project, 30-45 day engagement, $25k-$50k budget
              </span>
              <span className="bp-pat bp-pat-dark" style={{textAlign:'left', padding:'12px 16px'}}>
                <strong>Deliver Phase 0 &rarr;</strong> Present Findings & Full-Scale SOW &rarr; GO / STOP decision
              </span>
            </div>
          </div>
        </div>

        <h3>Pillar Discovery Paths</h3>
        <div className="bp-voice-grid" style={{gridTemplateColumns:'repeat(3, 1fr)'}}>
          <div className="bp-voice-card" style={{borderTop:'3px solid #6a6b9e'}}>
            <h4 style={{color:'#6a6b9e'}}>Innovation Roadmapping</h4>
            <ul><li>Collaborative Discovery</li><li>Phase 0 Scoping</li><li>Full-Scale Engagement</li></ul>
          </div>
          <div className="bp-voice-card" style={{borderTop:'3px solid #e8782a'}}>
            <h4 style={{color:'#e8782a'}}>Operational Intelligence Assessment</h4>
            <ul><li>Collaborative Discovery</li><li>Phase 0 Assessment</li><li>Transformation Roadmap</li></ul>
          </div>
          <div className="bp-voice-card" style={{borderTop:'3px solid #2bbfa8'}}>
            <h4 style={{color:'#2bbfa8'}}>Brand & Experiential</h4>
            <ul><li>Collaborative Discovery</li><li>Phase 0 Concept</li><li>Build + Deploy</li></ul>
          </div>
        </div>
      </section>

      {/* Industry Playbooks */}
      <section className="bp-section" id="gtm-industries">
        <h2>Industry Playbooks</h2>
        <p className="bp-desc">Vertical-specific positioning, proof points, and recommended offering bundles. Priority industries chosen for size, scale, innovation spend, and ENTEVATE's existing expertise.</p>

        <h3>Primary Targets</h3>
        <div className="bp-stat-grid" style={{gridTemplateColumns:'repeat(4, 1fr)'}}>
          {['Heavy Equipment', 'Aviation', 'Manufacturing', 'Automotive'].map(ind => (
            <div key={ind} className="bp-proof-stat" style={{borderTop:'3px solid var(--blue)'}}>
              <span className="bp-proof-label" style={{fontSize:'14px', fontWeight:600, color:'var(--black)'}}>{ind}</span>
            </div>
          ))}
        </div>

        <h3>B2B Buyer Insights</h3>
        <div className="bp-stat-grid">
          {[
            { num: '73%', label: 'of B2B buying decisions include Millennials' },
            { num: '80%', label: 'use Social Media for buying research' },
            { num: '35%', label: 'spending more time on ROI analysis since 2020' },
          ].map(s => (
            <div key={s.label} className="bp-proof-stat">
              <span className="bp-proof-num">{s.num}</span>
              <span className="bp-proof-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Target Companies */}
      <section className="bp-section" id="gtm-companies">
        <h2>Target Companies</h2>
        <p className="bp-desc">Named accounts organized by industry vertical. Choose companies with enough scale for innovation spend but not overly complex procurement processes.</p>

        {[
          { vertical: 'Automotive', color: '#247b96', companies: ['Rivian', 'Polestar', 'Cruise', 'Stellantis', 'Ford', 'Tesla', 'Navistar'] },
          { vertical: 'Heavy Equipment', color: '#e8782a', companies: ['John Deere', 'Carter Machinery', 'Caterpillar Dealer Network'] },
          { vertical: 'Aviation', color: '#6a6b9e', companies: ['Blade', 'Gulfstream', 'Pilatus', 'Boeing', 'Collins Aerospace', 'Boom Supersonic'] },
          { vertical: 'Manufacturing', color: '#2bbfa8', companies: ['Siemens', 'Schneider Electric', 'Doble Electric', 'SunRun', 'Illuminate USA'] },
        ].map(v => (
          <div key={v.vertical} className="bp-discovery-card" style={{borderLeftColor: v.color, marginBottom:'12px'}}>
            <h3 style={{color: v.color, margin:'0 0 10px', textTransform:'none', letterSpacing:'normal', fontSize:'14px'}}>{v.vertical}</h3>
            <div className="bp-icp-tags">
              {v.companies.map(c => <span key={c} className="bp-icp-tag">{c}</span>)}
            </div>
          </div>
        ))}
      </section>

      {/* Target Roles & Personas */}
      <section className="bp-section" id="gtm-roles">
        <h2>Target Roles & Personas</h2>
        <p className="bp-desc">Priority buyer personas with role context, KPIs, motivations, and buying influence. Common theme: avg age 40-45, report to COO/CEO, career advancement tied to measurable innovation impact.</p>

        {[
          {
            title: 'Director, Learning & Development',
            color: '#e8782a',
            age: '45', gender: '58% F, 42% M',
            reports: 'VP of HR → COO, CLO → CPO/CHRO → CEO',
            overview: 'Leads portfolio of training programs (e-learning, in-person, workshops, coaching). L&D can be a springboard to Ops/HR leadership.',
            kpis: ['Course completion rates', 'ROI of learning', 'Knowledge retention', 'Compliance metrics', 'Budget efficiency'],
            motivation: 'Few roles above this one — wants to make business impact to showcase innovative leadership for COO/CPO trajectory. Partnerships that handle heavy-lifting for trend analysis are valued.',
            buying: 'Decision-maker for small-to-mid L&D tech (<$75k). Heavy influencer for larger investments (>$75k).',
            events: ['ATD International', 'DevLearn', 'Learning & HR Tech Solutions Conference'],
            entryPoints: ['OI Assessment', 'Digital Strategy', 'AI Foundry'],
          },
          {
            title: 'CMO / VP of Marketing',
            color: '#2bbfa8',
            age: '40', gender: '68% M, 32% F',
            reports: 'CEO, CRO, COO',
            overview: 'Leads customer awareness, brand growth, product development, go-to-market strategies, and sales enablement.',
            kpis: ['ROMI per tactic/channel', 'Marketing Qualified Leads', 'Customer Acquisition Cost', 'Market share growth', 'Brand equity', 'Conversion rates'],
            motivation: 'Highest executive turnover (3-4 year tenure). All decisions must be data-driven and marketing-attributable. Wants the "cool" stuff but needs data infrastructure to measure it.',
            buying: 'High influence on enterprise marketing tech stack. Highly dependent on team input for channel/tactic innovations.',
            events: ['AdWeek Summits', 'The CMO Summit', 'ANA Masters of Marketing Conference'],
            entryPoints: ['Experiential Branding', 'Momentify', 'Content Production'],
          },
          {
            title: 'Director, Operations',
            color: '#247b96',
            age: '45', gender: '94% M, 6% F',
            reports: 'VP of Operations → COO',
            overview: 'Leads operational efficiency and compliance with safety regulations and industry standards. Works with Director of Training to ensure regulatory training requirements are met.',
            kpis: ['Safety incident rate', 'Production volume', 'Cycle time', 'Inventory turns', 'On-time delivery', 'Regulatory compliance', 'Quality metrics'],
            motivation: '20% turnover rate — achievement of ops metrics is critical to job success. Low barrier to change management resistance is key.',
            buying: 'Heavy influence — regulatory compliance and productivity metrics drive shareholder value directly.',
            events: ['IMTS (International Manufacturing Technology Show)', 'Manufacturing Leadership Summit'],
            entryPoints: ['CAD-to-CGI', 'AI Foundry', 'Digital Strategy'],
          },
          {
            title: 'Chief Innovation Officer (CINO)',
            color: '#6a6b9e',
            age: 'Varies', gender: 'N/A',
            reports: 'Direct to CEO, COO',
            overview: 'Guides innovation strategy, aligns with business goals, fosters culture of innovation. Many former CIO roles have been rebranded to this. Relatively new role in many organizations.',
            kpis: ['Operational efficiency', 'Digital business acceleration', 'Cost optimization', 'Growth driving', 'Customer experience', 'Risk reduction'],
            motivation: 'New role = high pressure to tie all innovations to company strategy. Must understand whether innovation is meant to expand existing business or redefine the company.',
            buying: 'Develops strategic partnerships with IT, marketing, product dev. Buying power increases when tied to strategic projects.',
            events: ['SXSW', 'Fast Company Innovation Festival', 'TechCrunch Disrupt'],
            entryPoints: ['Innovation Roadmapping', 'AIQUI Framework', 'Ecosystem Model', 'Innovation Sandbox'],
          },
          {
            title: 'Director, Customer Support/Service',
            color: '#5ba8c4',
            age: '41', gender: '57% F, 43% M',
            reports: 'LOB → CEO/COO/CRO',
            overview: 'Manages all customer relationship facets post-sale: training, cross-sell/upsell, troubleshooting, maintenance, satisfaction. Scope ranges from highly technical support to simple use cases.',
            kpis: ['Customer retention rate', 'Cross-sell/upsell', 'Downtime/uptime', 'Churn', 'CSAT', 'SLA attainment'],
            motivation: 'Scope positions them for VP/Chief role next. Leaning into innovation showcases leadership and builds credibility for promotion.',
            buying: 'High influence when AR/VR collaboration shows positive ROI, lower operating costs, and higher CSAT.',
            events: ['TBD'],
            entryPoints: ['AI Foundry', 'CAD-to-CGI'],
          },
        ].map(role => (
          <div key={role.title} className="bp-icp-card" style={{borderLeftColor: role.color}}>
            <div className="bp-icp-header">
              <h3 style={{color: role.color, margin: 0, textTransform:'none', letterSpacing:'normal', fontSize:'16px'}}>{role.title}</h3>
              <span className="bp-icp-role">Avg Age: {role.age} &middot; {role.gender} &middot; Reports to: {role.reports}</span>
            </div>
            <div className="bp-icp-body">
              <div className="bp-icp-messaging" style={{background:'transparent', padding:0}}>
                <h4>Overview</h4>
                <p style={{fontStyle:'normal'}}>{role.overview}</p>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
                <div>
                  <h4>Primary KPIs</h4>
                  <ul>{role.kpis.map((k, i) => <li key={i}>{k}</li>)}</ul>
                </div>
                <div>
                  <h4>Motivation & Goals</h4>
                  <p style={{fontSize:'13px', color:'var(--gray-mid)', lineHeight:'1.6'}}>{role.motivation}</p>
                </div>
              </div>
              <div>
                <h4>Buying Influence</h4>
                <p style={{fontSize:'13px', color:'var(--gray-mid)', lineHeight:'1.6'}}>{role.buying}</p>
              </div>
              <div style={{display:'flex', gap:'16px', flexWrap:'wrap', alignItems:'flex-start'}}>
                <div>
                  <h4>Key Events</h4>
                  <div className="bp-icp-tags">{role.events.map(e => <span key={e} className="bp-icp-tag" style={{background:'#f0f2f5', color:'var(--gray-mid)'}}>{e}</span>)}</div>
                </div>
                <div>
                  <h4>Entry Points</h4>
                  <div className="bp-icp-tags">{role.entryPoints.map(e => <span key={e} className="bp-icp-tag">{e}</span>)}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Battle Cards */}
      <section className="bp-section" id="gtm-battlecards">
        <h2>Battle Cards</h2>
        <p className="bp-desc">Quick-reference positioning cards for each service pillar.</p>

        {[
          {
            pillar: 'Experiential Branding & Marketing',
            color: '#2bbfa8',
            weAre: 'Immersive brand experience creators with proprietary Momentify platform for real-time engagement analytics.',
            weAreNot: 'A traditional agency, event management company, or AV vendor.',
            differ: ['Momentify platform: real-time ROX™ (Return on Experience) scoring', 'Multi-platform: web, iOS, Android, offline kiosk', '92% lead increase YoY for clients', 'End-to-end: strategy → design → build → deploy → measure'],
            objections: [
              { q: '"We already have an agency."', a: 'We complement agencies — we build the immersive technology layer they can\'t. We\'re the platform, not the planner.' },
              { q: '"AR/VR is a gimmick."', a: 'Our deployments drive measurable conversions. We track every interaction through Momentify analytics — ROX, not ROI theater.' },
            ],
          },
          {
            pillar: 'Operational Intelligence',
            color: '#e8782a',
            weAre: 'Builders of intelligent systems that transform how organizations operate — AI pipelines, content automation, visual asset production, and spatial field support. We co-execute, not consult.',
            weAreNot: 'A consulting firm that delivers decks and leaves. Not a pure-play AI vendor, IT integrator, or creative agency.',
            differ: [
              'AI Foundry™: concept to production in 1 week, 3 models (Learn | Build | Run)',
              'OI Assessment: assess operational foundations before investing in strategy',
              'CAD-to-CGI: 700+ machine variants converted, 8-figure cost savings',
              'Human-centered: start with people and processes, not technology',
            ],
            objections: [
              { q: '"We can build AI internally."', a: 'AI Foundry accelerates your team — we co-build the first pipeline, then you own it. Complete brand kits in < 2 hours. Websites in days, not weeks.' },
              { q: '"We already have a digital strategy."', a: 'Strategy without operational readiness fails. We assess the foundation first across people, platforms, and processes before a single dollar goes to technology.' },
              { q: '"Our CAD files are fine where they are."', a: 'They\'re locked. Build once, use everywhere — marketing, training, AR/VR, configurators. One conversion unlocks 8-figure savings.' },
            ],
          },
          {
            pillar: 'Innovation | Ventures | Ecosystem',
            color: '#6a6b9e',
            weAre: 'Innovation ecosystem architects with proprietary methodologies for self-sustaining innovation infrastructure.',
            weAreNot: 'A startup accelerator, VC fund, management consultancy, or academic program.',
            differ: ['8-Stage Waypoint Rubric (Innovation Roadmapping™)', '7 Core Elements™ for ecosystem mapping', 'AIQUI: only integrated AI + Quantum innovation curriculum', 'Angel Academy: $24M+ activated across 6 states'],
            objections: [
              { q: '"We have an innovation lab."', a: 'Labs without ecosystem connectivity stall. Our 7 Core Elements™ connects your lab to capital, talent, research, and market — systematically.' },
              { q: '"We need a consultant."', a: 'Frameworks create repeatable outcomes. Consultants leave. We build infrastructure your team runs long-term.' },
            ],
          },
        ].map(bc => (
          <div key={bc.pillar} className="bp-battlecard" style={{borderTopColor: bc.color}}>
            <h3 style={{color: bc.color, margin:'0 0 16px', textTransform:'none', letterSpacing:'normal', fontSize:'16px'}}>{bc.pillar}</h3>
            <div className="bp-bc-grid">
              <div className="bp-bc-col">
                <h4>We Are</h4><p>{bc.weAre}</p>
                <h4>We Are Not</h4><p>{bc.weAreNot}</p>
              </div>
              <div className="bp-bc-col">
                <h4>Key Differentiators</h4>
                <ul>{bc.differ.map((d, i) => <li key={i}>{d}</li>)}</ul>
              </div>
            </div>
            <h4>Objection Handling</h4>
            <div className="bp-objection-grid">
              {bc.objections.map((o, i) => (
                <div key={i} className="bp-objection">
                  <span className="bp-obj-q">{o.q}</span>
                  <span className="bp-obj-a">{o.a}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Execution Phases */}
      <section className="bp-section" id="gtm-phases">
        <h2>Execution Phases</h2>
        <p className="bp-desc">Three-phase GTM execution plan designed for rapid engagement and conversion.</p>

        {[
          {
            phase: 'Phase 1: Visibility & Engagement',
            timeline: 'Weeks 1-3',
            color: '#247b96',
            tactics: [
              { name: 'LinkedIn Thought Leadership (3x/week)', items: ['Carousel: "How Trade Shows Are Failing B2B Brands"', 'Post: "If your content isn\'t ready, your tech investments won\'t matter."', 'Post: "Innovation doesn\'t need a new idea — it needs a roadmap."'] },
              { name: 'Webinar / Live Event', items: ['"From Booths to Buy-In: How Momentify + Innovation Roadmapping Accelerate Results"'] },
              { name: 'Lead Magnet', items: ['Free downloadable audit: "Is Your Brand Content-Ready?"'] },
              { name: 'Paid LinkedIn Ads', items: ['Carousel ads → Book a 30-min Innovation Fit Call', 'Asset download → Digital Transformation Starter Kit'] },
            ],
          },
          {
            phase: 'Phase 2: Outreach & Conversion',
            timeline: 'Weeks 4-6',
            color: '#e8782a',
            tactics: [
              { name: 'Social Sequences (per persona)', items: ['"Your booth looked great. Now what?" → Download Momentify Demo Deck', '"What if you could predict which visitor would convert?" → Book Live Walkthrough', '"This is what we mean by ROX." → Video/Reel → momentifyapp.com'] },
              { name: 'Email Sequences (5-Part Flow)', items: ['1. Insight drop + relevant stat', '2. Personal story or industry use case', '3. Invite to resource (webinar, demo, checklist)', '4. Testimonial or quote', '5. Direct CTA (15-min scoping call)'] },
            ],
          },
          {
            phase: 'Phase 3: Conversion & Follow-Up',
            timeline: 'Ongoing',
            color: '#6a6b9e',
            tactics: [
              { name: 'Conversion Tools', items: ['Discovery Call Template: pre-mapped to pillar → challenge → pilot path', 'ROI Calculator / ROX Scorecard: show business impact', 'Phase 0 SOW template: 30-45 days, $25k-$50k'] },
              { name: 'Follow-Up CTAs', items: ['"Pilot with us at your next event"', '"Let\'s assess your content ecosystem in 45 mins"', '"Let\'s sketch your roadmap — 3 use cases, 30 days"'] },
            ],
          },
        ].map(phase => (
          <div key={phase.phase} className="bp-battlecard" style={{borderTopColor: phase.color}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'16px'}}>
              <h3 style={{color: phase.color, margin:0, textTransform:'none', letterSpacing:'normal', fontSize:'16px'}}>{phase.phase}</h3>
              <span style={{fontSize:'12px', fontWeight:600, color:'var(--gray-light)'}}>{phase.timeline}</span>
            </div>
            {phase.tactics.map(t => (
              <div key={t.name} style={{marginBottom:'14px'}}>
                <h4 style={{fontSize:'13px', fontWeight:600, color:'var(--black)', marginBottom:'6px'}}>{t.name}</h4>
                <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:'3px', fontSize:'13px', color:'var(--gray-mid)', lineHeight:'1.6'}}>
                  {t.items.map((item, i) => <li key={i} style={{}}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Outreach Templates */}
      <section className="bp-section" id="gtm-outreach">
        <h2>Outreach Templates</h2>
        <p className="bp-desc">Email sequences per persona. Subject lines tested for open rates across target industries.</p>

        <h3>Subject Lines by Pillar</h3>
        <div className="bp-voice-grid" style={{gridTemplateColumns:'repeat(3, 1fr)', marginBottom:'20px'}}>
          <div className="bp-voice-card">
            <h4 style={{color:'#6a6b9e'}}>Innovation / L&D / Ops</h4>
            <ul>
              <li>"Innovation isn't stuck. It's just leaderless."</li>
              <li>"Before you digitize, get content-ready."</li>
              <li>"What's your plan for pilot programs?"</li>
            </ul>
          </div>
          <div className="bp-voice-card">
            <h4 style={{color:'#2bbfa8'}}>Marketing / Events</h4>
            <ul>
              <li>"Your booth looked great. Now what?"</li>
              <li>"What if you could predict which visitor converts?"</li>
              <li>"This is what we mean by ROX."</li>
            </ul>
          </div>
          <div className="bp-voice-card">
            <h4 style={{color:'#e8782a'}}>Operations / Tech</h4>
            <ul>
              <li>"AI pipeline — concept to production in 1 week"</li>
              <li>"What happens to your CAD files after sign-off?"</li>
              <li>"Your field teams deserve better than a phone call."</li>
            </ul>
          </div>
        </div>

        <h3>5-Part Email Sequence Framework</h3>
        <div className="bp-pattern-card">
          <div className="bp-pattern-stack">
            <span className="bp-pat bp-pat-hero" style={{textAlign:'left', padding:'10px 16px'}}>1. Insight drop + relevant industry stat</span>
            <span className="bp-pat bp-pat-section" style={{textAlign:'left', padding:'10px 16px'}}>2. Personal story or industry use case</span>
            <span className="bp-pat bp-pat-alt" style={{textAlign:'left', padding:'10px 16px'}}>3. Invite to resource (webinar replay, Momentify demo, checklist)</span>
            <span className="bp-pat bp-pat-section" style={{textAlign:'left', padding:'10px 16px'}}>4. Testimonial or client quote</span>
            <span className="bp-pat bp-pat-cta" style={{textAlign:'left', padding:'10px 16px'}}>5. Direct CTA — 15-min scoping call or "reply with your challenge"</span>
          </div>
        </div>
      </section>

      {/* One-Pagers */}
      <section className="bp-section" id="gtm-onepagers">
        <h2>One-Pagers & Leave-Behinds</h2>
        <p className="bp-desc">Downloadable PDF one-pagers for each offering. Use as email attachments, conference leave-behinds, or follow-up materials.</p>
        <div className="bp-onepager-grid">
          {[
            { name: 'Angel Academy', file: 'Angel-Academy-Handout.pdf', pillar: 'Innovation', color: '#6a6b9e' },
            { name: 'Innovation Roadmapping', file: 'Innovation-Roadmapping-Handout.pdf', pillar: 'Innovation', color: '#6a6b9e' },
            { name: 'AIQUI Framework', file: 'AIQUI-Framework-Handout.pdf', pillar: 'Innovation', color: '#6a6b9e' },
            { name: 'Ecosystem Model', file: 'Ecosystem-Model-Handout.pdf', pillar: 'Innovation', color: '#6a6b9e' },
            { name: 'Innovation Sandbox', file: 'Innovation-Sandbox-Handout.pdf', pillar: 'Innovation', color: '#6a6b9e' },
            { name: 'OI Assessment', file: 'Content-Readiness-Handout.pdf', pillar: 'OI', color: '#e8782a' },
            { name: 'Digital Strategy', file: 'Digital-Strategy-Handout.pdf', pillar: 'OI', color: '#e8782a' },
            { name: 'CAD-to-CGI', file: 'CAD-to-CGI-Handout.pdf', pillar: 'OI', color: '#e8782a' },
          ].map(op => (
            <a key={op.name} className="bp-onepager-card" href={`/onepagers/${op.file}`} target="_blank" rel="noopener" style={{borderLeftColor: op.color}}>
              <strong>{op.name}</strong>
              <span>{op.pillar}</span>
              <code>{op.file}</code>
            </a>
          ))}
        </div>
      </section>

      {/* Discovery & Talk Tracks */}
      <section className="bp-section" id="gtm-discovery">
        <h2>Discovery & Talk Tracks</h2>
        <p className="bp-desc">Structured discovery questions mapped to the Phase 0 qualification flow.</p>

        {[
          {
            pillar: 'Innovation',
            color: '#6a6b9e',
            questions: [
              { q: 'What does your innovation pipeline look like today?', why: 'Reveals structured vs. ad hoc — opens Roadmapping' },
              { q: 'How are you measuring innovation outcomes?', why: 'Entry for metric-driven 8-Stage Waypoint Rubric' },
              { q: 'Is angel/venture capital active in your region, or sitting on the sidelines?', why: 'Direct Angel Academy entry' },
              { q: 'Have you mapped the stakeholders in your ecosystem?', why: 'Surfaces Ecosystem Model need' },
              { q: 'How are students/researchers connecting work to market outcomes?', why: 'AIQUI and Innovation Sandbox entry' },
            ],
          },
          {
            pillar: 'Operational Intelligence',
            color: '#e8782a',
            questions: [
              { q: 'Where is your biggest operational bottleneck right now?', why: 'Listen for content, process, or technology gaps' },
              { q: 'How many AI pilots have you run vs. deployed to production?', why: 'POC-to-production gap — AI Foundry entry' },
              { q: 'If I asked 5 people where to find [key content], would they all know?', why: 'OI Assessment pain point' },
              { q: 'What happens to your CAD files after engineering signs off?', why: 'CAD-to-CGI — locked digital assets' },
            ],
          },
          {
            pillar: 'Experiential Branding',
            color: '#2bbfa8',
            questions: [
              { q: 'How are you measuring trade show ROI today?', why: 'Opens Momentify and ROX™ conversation' },
              { q: 'What does your trade show follow-up process look like?', why: 'Reveals leaky lead capture' },
              { q: 'Have you explored spatial computing for product demos?', why: 'AR/VR immersive experience entry' },
              { q: 'What brand experience truly surprised you as a consumer?', why: 'Gets them thinking aspirationally — bridge to what ENTEVATE builds' },
            ],
          },
        ].map(track => (
          <div key={track.pillar} className="bp-discovery-card" style={{borderLeftColor: track.color}}>
            <h3 style={{color: track.color, margin:'0 0 12px', textTransform:'none', letterSpacing:'normal', fontSize:'15px'}}>{track.pillar}</h3>
            {track.questions.map((q, i) => (
              <div key={i} className="bp-discovery-row">
                <span className="bp-disc-q">"{q.q}"</span>
                <span className="bp-disc-why">{q.why}</span>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Proof Points */}
      <section className="bp-section" id="gtm-proof">
        <h2>Proof Points</h2>
        <p className="bp-desc">Key statistics and case study summaries for proposals, decks, and outreach.</p>

        <h3>Key Statistics</h3>
        <div className="bp-stat-grid">
          {[
            { num: '6+', label: 'Fortune 500 clients served' },
            { num: '$24M+', label: 'Capital activated (Angel Academy)' },
            { num: '400+', label: 'Angels trained across 6 states' },
            { num: '225+', label: 'Ventures supported' },
            { num: '700+', label: 'Machine variants converted' },
            { num: '800+', label: 'Engine variants processed' },
            { num: '8-Figure', label: 'Client cost savings (CAD-to-CGI)' },
            { num: '92%', label: 'Lead increase YoY (Momentify)' },
            { num: '< 2 Hrs', label: 'Complete brand kits (AI Foundry)' },
            { num: '1 Week', label: 'Concept to production (AI Foundry)' },
          ].map(s => (
            <div key={s.label} className="bp-proof-stat">
              <span className="bp-proof-num">{s.num}</span>
              <span className="bp-proof-label">{s.label}</span>
            </div>
          ))}
        </div>

        <h3>Case Studies</h3>
        <div className="bp-messaging-grid">
          <div className="bp-msg-card">
            <span className="bp-msg-label">Trinity College AIQUI Sandbox</span>
            <p className="bp-msg-text">Deployed the AIQUI Framework at Trinity College with 9 inaugural seniors. Bridges AI and quantum innovation through 7 experiential basecamps — a replicable model for higher education.</p>
          </div>
          <div className="bp-msg-card">
            <span className="bp-msg-label">Fortune 500 Trade Show Activation</span>
            <p className="bp-msg-text">Immersive brand activation using Momentify for a Fortune 500 client. Real-time engagement analytics delivered a 92% year-over-year lead increase.</p>
          </div>
          <div className="bp-msg-card">
            <span className="bp-msg-label">CAD-to-CGI Pipeline (Heavy Equipment)</span>
            <p className="bp-msg-text">700+ machine variants, 800+ engines converted from legacy CAD to photorealistic CGI. Multi-channel reuse across marketing, training, AR/VR, and configurators — 8-figure cost savings.</p>
          </div>
        </div>
      </section>

      {/* Proposal Framework */}
      <section className="bp-section" id="gtm-proposals">
        <h2>Proposal Framework</h2>
        <p className="bp-desc">Phase 0 engagement structure based on ENTEVATE's proven 5-step delivery model. Typical engagement: 6-8 weeks, fixed-fee with 50/50 billing terms. Pricing scoped per engagement.</p>

        <h3>Phase 0 SOW Structure</h3>
        <div className="bp-pattern-card">
          <div className="bp-pattern-stack">
            <span className="bp-pat bp-pat-hero" style={{textAlign:'left', padding:'12px 16px'}}><strong>Executive Summary</strong> — Client challenge + ENTEVATE's unique fit. Frame the missed opportunity and business case.</span>
            <span className="bp-pat bp-pat-section" style={{textAlign:'left', padding:'12px 16px'}}><strong>Business Case</strong> — Two workstreams: (1) End-to-end journey mapping, (2) Offering/strategy design. Quantify the opportunity.</span>
            <span className="bp-pat bp-pat-alt" style={{textAlign:'left', padding:'12px 16px'}}><strong>Goals & Objectives</strong> — Map full journey, design repeatable offering & marketing strategy, build operational foundation for scale.</span>
            <span className="bp-pat bp-pat-section" style={{textAlign:'left', padding:'12px 16px'}}><strong>Our Approach (5 Steps)</strong> — Discovery & Alignment, Journey Mapping, Offering & Marketing Strategy, Operational Model & Tech, Documentation & Handoff</span>
            <span className="bp-pat bp-pat-alt" style={{textAlign:'left', padding:'12px 16px'}}><strong>Deliverables</strong> — Per-step deliverable table with concrete outputs</span>
            <span className="bp-pat bp-pat-section" style={{textAlign:'left', padding:'12px 16px'}}><strong>Roles & Responsibilities</strong> — Client leadership, operations team, ENTEVATE strategy team, ENTEVATE project lead</span>
            <span className="bp-pat bp-pat-cta" style={{textAlign:'left', padding:'12px 16px'}}><strong>Cost & Schedule</strong> — Step-by-step cost ranges with cumulative totals. Timeline, billing, and terms.</span>
            <span className="bp-pat bp-pat-dark" style={{textAlign:'left', padding:'12px 16px'}}><strong>Next Steps</strong> — Approve SOW, 50% payment, schedule kickoff, gather materials</span>
          </div>
        </div>

        <h3>5-Step Delivery Model</h3>
        <table className="bp-token-table">
          <thead><tr><th>Step</th><th>Deliverable</th></tr></thead>
          <tbody>
            <tr><td><strong>1. Discovery & Alignment</strong></td><td>Working sessions with leadership, review of operations, alignment on success criteria</td></tr>
            <tr><td><strong>2. Customer Journey Mapping</strong></td><td>Current-state and future-state journey maps, pivot point defined, data capture process</td></tr>
            <tr><td><strong>3. Offering & Marketing Strategy</strong></td><td>Written offering (tiers, scope, pricing), personas, messaging, campaigns, re-engagement plan</td></tr>
            <tr><td><strong>4. Ops Model & Tech Integration</strong></td><td>Roles & responsibilities, ERP/CRM integration view, touchpoints, key metrics</td></tr>
            <tr><td><strong>5. Documentation & Handoff</strong></td><td>Final package, presentation deck, working session with leadership</td></tr>
          </tbody>
        </table>

        <h3>Engagement Terms</h3>
        <div className="bp-voice-grid">
          <div className="bp-voice-card">
            <h4>Standard Terms</h4>
            <ul>
              <li>Timeline: 6-8 weeks from signed engagement</li>
              <li>Billing: Fixed-fee based on scope alignment</li>
              <li>Terms: 50% due upon approval, 50% upon completion</li>
              <li>Phase 2 implementation optional (asset creation, training, tech config)</li>
            </ul>
          </div>
          <div className="bp-voice-card">
            <h4>Scope Boundaries</h4>
            <ul>
              <li>Strategy and concepts — not finished collateral</li>
              <li>Technology guidance — not ERP/CRM implementation</li>
              <li>Strategic direction — not copywriting or graphic design</li>
              <li>No legal review, financial modeling, or direct campaign execution</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Event Toolkit */}
      <section className="bp-section" id="gtm-events">
        <h2>Event Toolkit</h2>
        <p className="bp-desc">Assets and talking points for conferences, speaking engagements, and networking events.</p>

        <h3>Speaker Bio</h3>
        <div className="bp-msg-card">
          <span className="bp-msg-label">Jake Hamann — Founder</span>
          <p className="bp-msg-text">Jake Hamann is the Founder of ENTEVATE, a human-centered innovation partner at the intersection of experiential branding, operational intelligence, and strategic innovation roadmapping. Since founding ENTEVATE in 2016, Jake has partnered with Fortune 500 companies, government agencies, and universities to build innovation ecosystems, deploy applied AI frameworks, and create immersive brand experiences powered by Momentify.</p>
        </div>
        <div className="bp-msg-card">
          <span className="bp-msg-label">Mike Binko — Managing Director, Innovation | Ventures | Ecosystem</span>
          <p className="bp-msg-text">Mike Binko is the Managing Director of ENTEVATE's Innovation | Ventures | Ecosystem pillar. Mike leads the firm's innovation practice including the AIQUI Framework (AI & Quantum Innovation), the Angel Academy program ($24M+ in capital activated across 6 states), and the Ecosystem Model (7 Core Elements). He partners with economic development agencies, universities, and regional leaders to build self-sustaining innovation infrastructure.</p>
        </div>

        <h3>Conference Talking Points</h3>
        <div className="bp-voice-grid">
          <div className="bp-voice-card">
            <h4>Innovation & Ecosystems</h4>
            <ul>
              <li>Why 80% of innovation labs fail — and how ecosystem thinking changes the math</li>
              <li>The 7 Core Elements every innovation district needs</li>
              <li>Activating sideline capital: lessons from Angel Academy</li>
              <li>AI & Quantum readiness for non-technical leaders</li>
            </ul>
          </div>
          <div className="bp-voice-card">
            <h4>Operational Intelligence & Experiential</h4>
            <ul>
              <li>The operational intelligence gap nobody talks about</li>
              <li>From POC to production: why enterprise AI stalls</li>
              <li>Build Once, Use Everywhere: the CAD-to-CGI business case</li>
              <li>Measuring brand experiences: ROX vs. ROI</li>
            </ul>
          </div>
        </div>

        <h3>Priority Events by Persona</h3>
        <table className="bp-token-table">
          <thead><tr><th>Persona</th><th>Events</th></tr></thead>
          <tbody>
            <tr><td>Director, L&D</td><td>ATD International &middot; DevLearn &middot; Learning & HR Tech Solutions</td></tr>
            <tr><td>CMO / VP Marketing</td><td>AdWeek Summits &middot; The CMO Summit &middot; ANA Masters of Marketing</td></tr>
            <tr><td>Director, Ops</td><td>IMTS &middot; Manufacturing Leadership Summit</td></tr>
            <tr><td>CINO</td><td>SXSW &middot; Fast Company Innovation Festival &middot; TechCrunch Disrupt</td></tr>
          </tbody>
        </table>

        <h3>Booth / Networking Essentials</h3>
        <table className="bp-token-table">
          <thead><tr><th>Asset</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>One-pager PDFs (9 offerings)</td><td><code style={{background:'#eef9f4', color:'#2a9d5c'}}>Ready</code></td></tr>
            <tr><td>OG images (4 pillar)</td><td><code style={{background:'#eef9f4', color:'#2a9d5c'}}>Ready</code></td></tr>
            <tr><td>Business cards</td><td><code>Template needed</code></td></tr>
            <tr><td>Momentify demo (tablet)</td><td><code>Contact Mike</code></td></tr>
            <tr><td>Roll-up banner design</td><td><code>Template needed</code></td></tr>
            <tr><td>QR code to contact page</td><td><code>Generate per event</code></td></tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}



/* ═══════════════════════════════════════════════
   SIDEBAR NAV SECTION
   ═══════════════════════════════════════════════ */

function SidebarSection({ tabId, section, activeTab, openSections, toggleSection, scrollTo, activeSection }) {
  const isOpen = openSections.has(tabId);
  const isActiveTab = activeTab === tabId;

  return (
    <div className="bp-nav-group">
      <button
        className={`bp-nav-parent ${isActiveTab ? 'active' : ''}`}
        onClick={() => toggleSection(tabId)}
      >
        <span>{section.label}</span>
        <span className={`bp-nav-chevron ${isOpen ? 'open' : ''}`}>&#9662;</span>
      </button>
      {isOpen && (
        <div className="bp-nav-children">
          {section.sections.map(sub => (
            <button
              key={sub.id}
              className={`bp-nav-child ${activeSection === sub.id ? 'active' : ''}`}
              onClick={() => scrollTo(tabId, sub.id)}
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════════
   MAIN PORTAL
   ═══════════════════════════════════════════════ */

export default function BrandPortal() {
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState('brand-kit');
  const [openSections, setOpenSections] = useState(new Set(['brand-kit', 'design-system', 'gtm-toolkit']));
  const [activeSection, setActiveSection] = useState(null);
  const mainRef = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === '1') setAuthed(true);
  }, []);

  // Scroll-spy: observe all bp-section elements and highlight the one in view
  useEffect(() => {
    if (!authed) return;
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('.bp-section[id]');
      if (!sections.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          // Find the entry closest to the top that is intersecting
          const visible = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible.length > 0) {
            setActiveSection(visible[0].target.id);
          }
        },
        { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
      );

      sections.forEach(s => observer.observe(s));
      return () => observer.disconnect();
    }, 200);
    return () => clearTimeout(timer);
  }, [authed, activeTab]);

  function toggleSection(tabId) {
    setActiveTab(tabId);
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(tabId)) {
        next.delete(tabId);
      } else {
        next.add(tabId);
      }
      return next;
    });
  }

  function scrollTo(tabId, sectionId) {
    if (activeTab !== tabId) setActiveTab(tabId);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  const tabs = Object.entries(sidebarNav);

  return (
    <div className="bp-portal">
      {/* Sidebar */}
      <aside className="bp-sidebar">
        <div className="bp-sidebar-head">
          {LOGO_SVG_WHITE('26px')}
          <span className="bp-sidebar-badge">Brand Portal</span>
        </div>
        <div className="bp-sidebar-nav" role="navigation" aria-label="Brand portal tabs">
          {tabs.map(([id, section]) => (
            <SidebarSection
              key={id}
              tabId={id}
              section={section}
              activeTab={activeTab}
              openSections={openSections}
              toggleSection={toggleSection}
              scrollTo={scrollTo}
              activeSection={activeSection}
            />
          ))}
        </div>
        <div className="bp-sidebar-foot">
          <button className="bp-logout" onClick={() => { sessionStorage.removeItem(STORAGE_KEY); setAuthed(false); }}>Sign Out</button>
        </div>
      </aside>

      {/* Mobile Tab Bar */}
      <div className="bp-mobile-tabs">
        {tabs.map(([id, section]) => (
          <button
            key={id}
            className={`bp-mob-tab ${activeTab === id ? 'active' : ''}`}
            onClick={() => { setActiveTab(id); setOpenSections(prev => new Set([...prev, id])); }}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="bp-main" ref={mainRef}>
        <header className="bp-header">
          <div>
            <h1>{sidebarNav[activeTab]?.label}</h1>
            <p>ENTEVATE Brand Resources</p>
          </div>
          <button className="bp-logout-mobile" onClick={() => { sessionStorage.removeItem(STORAGE_KEY); setAuthed(false); }}>Sign Out</button>
        </header>
        {activeTab === 'brand-kit' && <BrandKit />}
        {activeTab === 'design-system' && <DesignSystem />}
        {activeTab === 'gtm-toolkit' && <GTMToolkit />}
      </main>
    </div>
  );
}
