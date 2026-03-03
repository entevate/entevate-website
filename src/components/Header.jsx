import { useEffect } from 'react';

const Header = () => {
  useEffect(() => {
    // Mobile drawer functionality
    const overlay = document.getElementById('mobOverlay');
    const drawer = document.getElementById('mobDrawer');
    const hamburger = document.querySelector('.hamburger');
    const closeBtn = document.getElementById('mobClose');
    const servBtn = document.getElementById('mobServicesBtn');
    const servSub = document.getElementById('mobServicesSub');
    
    function openDrawer() {
      overlay?.classList.add('open');
      drawer?.classList.add('open');
      drawer?.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    
    function closeDrawer() {
      overlay?.classList.remove('open');
      drawer?.classList.remove('open');
      drawer?.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    
    function handleKeydown(e) {
      if (e.key === 'Escape') closeDrawer();
    }
    
    function handleServicesClick() {
      const isOpen = servSub?.classList.toggle('open');
      servBtn?.classList.toggle('open', isOpen);
      servBtn?.setAttribute('aria-expanded', String(isOpen));
    }
    
    // Add event listeners
    hamburger?.addEventListener('click', openDrawer);
    closeBtn?.addEventListener('click', closeDrawer);
    overlay?.addEventListener('click', closeDrawer);
    servBtn?.addEventListener('click', handleServicesClick);
    document.addEventListener('keydown', handleKeydown);
    
    // Cleanup function
    return () => {
      hamburger?.removeEventListener('click', openDrawer);
      closeBtn?.removeEventListener('click', closeDrawer);
      overlay?.removeEventListener('click', closeDrawer);
      servBtn?.removeEventListener('click', handleServicesClick);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <>
      {/* Mobile Drawer */}
      <div className="mob-overlay" id="mobOverlay"></div>
      <div className="mob-drawer" id="mobDrawer" role="dialog" aria-label="Navigation menu" aria-hidden="true">
        <div className="mob-head">
          <a href="/" aria-label="ENTEVATE Home">
            <svg width="296" height="58" viewBox="0 0 296 58" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height:"20px", width:"auto"}} aria-hidden="true">
              <path d="M0.332092 0.332031V27.5874L5.10768 23.7746V5.10737H31.9303V12.9027L0.332092 36.2887V42.4419L5.10768 46.2546V38.7047L36.687 15.3187H36.7059V15.2998V5.10737V0.332031H0.332092Z" fill="#181818"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0H37.0377V15.6506H36.7964L5.43956 38.8719V46.9444L0 42.6016V36.1213L31.5982 12.7353V5.43932H5.43956V23.9343L0 28.2772V0ZM31.9302 12.9027L0.331986 36.2886V42.4418L5.10758 46.2546V38.7046L36.6869 15.3186H36.7058V0.331986H0.331986V27.5873L5.10758 23.7746V5.10733H31.9302V12.9027Z" fill="#181818"/>
              <path d="M10.7404 43.7659V48.1072V50.7119L18.4606 56.7707L36.6947 43.2752V37.3296L18.4606 50.7119L15.7802 48.2959V44.3888L36.6947 28.8925V22.9658L10.7404 42.1616V43.7659Z" fill="#181818"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M10.4084 50.8734V41.9942L37.0267 22.3074V29.0597L16.1122 44.556V48.1482L18.4821 50.2843L37.0267 36.6742V43.4425L18.4547 57.1881L10.4084 50.8734ZM18.4606 50.7119L15.7802 48.2959V44.3888L36.6947 28.8925V22.9658L10.7404 42.1616V50.7119L18.4606 56.7707L36.6947 43.2752V37.3296L18.4606 50.7119Z" fill="#181818"/>
              <path d="M66.552 16.1413V22.1465H81.6637V27.9559H66.552V34.5811H83.2303V40.3905H60.0896V10.332H83.2303V16.1413H66.552Z" fill="#181818"/>
              <path d="M89.4703 10.2916H95.9001L110.392 29.7432V10.3243H116.854V40.3828H110.392L95.9001 20.9312V40.3502H89.4703V10.2916Z" fill="#181818"/>
              <path d="M131.968 16.1411H122.601V10.3317H147.798V16.1411H138.463V40.3903H132.001V16.1411H131.968Z" fill="#181818"/>
              <path d="M159.707 16.1411V22.1463H174.819V27.9556H159.707V34.5809H176.386V40.3903H153.245V10.3317H176.386V16.1411H159.707Z" fill="#181818"/>
              <path d="M211.698 10.2916L199.458 40.3502H192.245L180.006 10.2916H187.284L195.901 31.4729L204.517 10.2916H211.698Z" fill="#181818"/>
              <path d="M232.641 35.6579H219.259L217.334 40.3903H210.12L222.36 10.3317H229.573L241.813 40.3903H234.534L232.641 35.6579ZM230.422 30.1749L225.95 19.1763L221.479 30.1749H230.422Z" fill="#181818"/>
              <path d="M251.388 16.1411H242.021V10.3317H267.218V16.1411H257.85V40.3903H251.388V16.1411Z" fill="#181818"/>
              <path d="M279.122 16.1411V22.1463H294.233V27.9556H279.122V34.5809H295.8V40.3903H272.659V10.3317H295.8V16.1411H279.122Z" fill="#181818"/>
            </svg>
          </a>
          <button className="mob-close" id="mobClose" aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <line x1="1.5" y1="1.5" x2="16.5" y2="16.5" stroke="#181818" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="16.5" y1="1.5" x2="1.5" y2="16.5" stroke="#181818" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <nav className="mob-nav" aria-label="Mobile navigation">
          <button className="mob-services-btn" id="mobServicesBtn" aria-expanded="false">
            <span className="mob-item-inner">Services</span><span className="mob-chevron">▾</span>
          </button>
          <div className="mob-services-sub" id="mobServicesSub">
            <a href="/experiential">Experiential Branding &amp; Marketing</a>
            <a href="/transformation">Digital &amp; Content Transformation</a>
            <a href="/innovation">Innovation | Ventures | Ecosystem</a>
          </div>
          <a href="/about" className="mob-link">About Us</a>
          <a href="/our-work" className="mob-link">Our Work</a>
          <a href="https://www.momentifyapp.com/" className="mob-link" target="_blank" rel="noopener">Momentify ↗</a>
        </nav>
        <div className="mob-footer">
          <a href="/contact" className="mob-cta-btn">Get In Touch</a>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav>
        <a href="/" className="nav-logo">
          <svg width="296" height="58" viewBox="0 0 296 58" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height:"22px", width:"auto", filter:"invert(1)"}} aria-label="ENTEVATE">
            <path d="M0.332092 0.332031V27.5874L5.10768 23.7746V5.10737H31.9303V12.9027L0.332092 36.2887V42.4419L5.10768 46.2546V38.7047L36.687 15.3187H36.7059V15.2998V5.10737V0.332031H0.332092Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0H37.0377V15.6506H36.7964L5.43956 38.8719V46.9444L0 42.6016V36.1213L31.5982 12.7353V5.43932H5.43956V23.9343L0 28.2772V0ZM31.9302 12.9027L0.331986 36.2886V42.4418L5.10758 46.2546V38.7046L36.6869 15.3186H36.7058V0.331986H0.331986V27.5873L5.10758 23.7746V5.10733H31.9302V12.9027Z" fill="white"/>
            <path d="M10.7404 43.7659V48.1072V50.7119L18.4606 56.7707L36.6947 43.2752V37.3296L18.4606 50.7119L15.7802 48.2959V44.3888L36.6947 28.8925V22.9658L10.7404 42.1616V43.7659Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M10.4084 50.8734V41.9942L37.0267 22.3074V29.0597L16.1122 44.556V48.1482L18.4821 50.2843L37.0267 36.6742V43.4425L18.4547 57.1881L10.4084 50.8734ZM18.4606 50.7119L15.7802 48.2959V44.3888L36.6947 28.8925V22.9658L10.7404 42.1616V50.7119L18.4606 56.7707L36.6947 43.2752V37.3296L18.4606 50.7119Z" fill="white"/>
            <path d="M66.552 16.1413V22.1465H81.6637V27.9559H66.552V34.5811H83.2303V40.3905H60.0896V10.332H83.2303V16.1413H66.552Z" fill="white"/>
            <path d="M89.4703 10.2916H95.9001L110.392 29.7432V10.3243H116.854V40.3828H110.392L95.9001 20.9312V40.3502H89.4703V10.2916Z" fill="white"/>
            <path d="M131.968 16.1411H122.601V10.3317H147.798V16.1411H138.463V40.3903H132.001V16.1411H131.968Z" fill="white"/>
            <path d="M159.707 16.1411V22.1463H174.819V27.9556H159.707V34.5809H176.386V40.3903H153.245V10.3317H176.386V16.1411H159.707Z" fill="white"/>
            <path d="M211.698 10.2916L199.458 40.3502H192.245L180.006 10.2916H187.284L195.901 31.4729L204.517 10.2916H211.698Z" fill="white"/>
            <path d="M232.641 35.6579H219.259L217.334 40.3903H210.12L222.36 10.3317H229.573L241.813 40.3903H234.534L232.641 35.6579ZM230.422 30.1749L225.95 19.1763L221.479 30.1749H230.422Z" fill="white"/>
            <path d="M251.388 16.1411H242.021V10.3317H267.218V16.1411H257.85V40.3903H251.388V16.1411Z" fill="white"/>
            <path d="M279.122 16.1411V22.1463H294.233V27.9556H279.122V34.5809H295.8V40.3903H272.659V10.3317H295.8V16.1411H279.122Z" fill="white"/>
          </svg>
        </a>

        <ul className="nav-center">
          <li className="has-drop">
            <a href="#">Services ▾</a>
            <div className="dropdown">
              <a href="/experiential">Experiential Branding &amp; Marketing</a>
              <a href="/transformation">Digital &amp; Content Transformation</a>
              <a href="/innovation">Innovation | Ventures | Ecosystem</a>
            </div>
          </li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/our-work">Our Work</a></li>
          <li><a href="https://www.momentifyapp.com/" target="_blank">Momentify ↗</a></li>
        </ul>

        <div className="nav-right">
          <a href="/contact" className="btn-outline">Get In Touch</a>
          <button className="hamburger" aria-label="Open menu">
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <line x1="0" y1="1" x2="22" y2="1" stroke="#181818" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="0" y1="8" x2="22" y2="8" stroke="#181818" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="0" y1="15" x2="22" y2="15" stroke="#181818" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;