import { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    // Newsletter form submission to HubSpot
    const forms = document.querySelectorAll('#newsletterForm');
    
    function handleFormSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const btn = form.querySelector('button');
      const msg = form.querySelector('.newsletter-msg');
      const nameInput = form.querySelector('input[name="firstname"]');
      const emailInput = form.querySelector('input[name="email"]');
      const honeypot = form.querySelector('input[name="website_url"]');
      
      // Honeypot spam protection
      if (honeypot && honeypot.value) {
        form.innerHTML = '<p style="font-size:13px;color:rgba(255,255,255,0.7);">Thanks for subscribing!</p>';
        return;
      }
      
      if (!emailInput.value.trim()) {
        emailInput.style.borderColor = '#CB632F';
        return;
      }
      
      btn.disabled = true;
      btn.textContent = 'Sending…';
      
      const payload = {
        fields: [
          { name: 'firstname', value: nameInput.value },
          { name: 'email', value: emailInput.value }
        ],
        context: { 
          pageUri: window.location.href, 
          pageName: document.title 
        }
      };
      
      fetch('https://api.hsforms.com/submissions/v3/integration/submit/44191993/45cdf0bb-1463-4bd9-acce-11775f0ad863', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (r) {
        if (r.ok) {
          form.innerHTML = '<p style="font-size:13px;color:rgba(255,255,255,0.7);">Thanks for subscribing!</p>';
        } else {
          btn.disabled = false;
          btn.textContent = 'Subscribe →';
          msg.style.display = 'block';
          msg.textContent = 'Something went wrong. Try again.';
        }
      }).catch(function () {
        btn.disabled = false;
        btn.textContent = 'Subscribe →';
        msg.style.display = 'block';
        msg.textContent = 'Something went wrong. Try again.';
      });
    }
    
    forms.forEach(function (form) {
      form.addEventListener('submit', handleFormSubmit);
    });
    
    // Cleanup function
    return () => {
      forms.forEach(function (form) {
        form.removeEventListener('submit', handleFormSubmit);
      });
    };
  }, []);

  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/">
              <svg width="296" height="58" viewBox="0 0 296 58" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height:"22px", width:"auto", marginBottom:"18px", display:"block"}} aria-label="ENTEVATE">
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
            <p>A human-centered innovation partner for leaders building what comes next.</p>
            <div className="footer-address">
              5 Cowboys Way, Ste 300<br/>
              Frisco, Texas 75034<br/>
              (972) 200-3445
            </div>
          </div>

          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li><a href="/experiential">Experiential Branding &amp; Marketing</a></li>
              <li><a href="/transformation">Digital &amp; Content Transformation</a></li>
              <li><a href="/innovation">Innovation | Ventures | Ecosystem</a></li>
              <li><a href="https://www.momentifyapp.com/" target="_blank">Momentify App ↗</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/our-work">Our Work</a></li>
              <li><a href="/contact">Get In Touch</a></li>
              <li><a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=b5c58f21-00f2-4ee2-9391-79a13199d76c" target="_blank">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-col footer-newsletter">
            <h5>Get Updates</h5>
            <p>Innovation insights and perspectives, straight to your inbox.</p>
            <form className="newsletter-form" id="newsletterForm">
              <input type="text" name="firstname" placeholder="Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <div style={{position:"absolute", left:"-9999px"}} aria-hidden="true">
                <input type="text" name="website_url" tabIndex="-1" autoComplete="off" />
              </div>
              <button type="submit">Subscribe →</button>
              <p className="newsletter-msg" style={{fontSize:"12px", marginTop:"6px", color:"rgba(255,255,255,0.5)", display:"none"}}></p>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span>©2026 | ENTEVATE | All Rights Reserved</span>
          <div className="footer-socials">
            <a href="https://facebook.com/entevate" target="_blank" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="https://twitter.com/entevate" target="_blank" aria-label="Twitter/X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="https://linkedin.com/company/entevate" target="_blank" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;