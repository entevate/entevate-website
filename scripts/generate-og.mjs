import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'images', 'og');
const imgDir = path.join(__dirname, '..', 'public', 'images');

// Convert images to base64 data URIs so they work in setContent
function toDataUri(filePath) {
  const ext = path.extname(filePath).slice(1);
  const mime = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;
  const data = readFileSync(filePath).toString('base64');
  return `data:${mime};base64,${data}`;
}

const bgBlue = toDataUri(path.join(imgDir, 'bg-blue.png'));
const bt1 = toDataUri(path.join(imgDir, 'bt1.png'));
const bt2 = toDataUri(path.join(imgDir, 'bt2.png'));
const bt3 = toDataUri(path.join(imgDir, 'bt3.png'));

const LOGO_SVG = `<svg width="296" height="58" viewBox="0 0 296 58" fill="none" xmlns="http://www.w3.org/2000/svg" style="height:32px;width:auto;">
  <path d="M0.332092 0.332031V27.5874L5.10768 23.7746V5.10737H31.9303V12.9027L0.332092 36.2887V42.4419L5.10768 46.2546V38.7047L36.687 15.3187H36.7059V15.2998V5.10737V0.332031H0.332092Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H37.0377V15.6506H36.7964L5.43956 38.8719V46.9444L0 42.6016V36.1213L31.5982 12.7353V5.43932H5.43956V23.9343L0 28.2772V0ZM31.9302 12.9027L0.331986 36.2886V42.4418L5.10758 46.2546V38.7046L36.6869 15.3186H36.7058V0.331986H0.331986V27.5873L5.10758 23.7746V5.10733H31.9302V12.9027Z" fill="white"/>
  <path d="M10.7404 43.7659V48.1072V50.7119L18.4606 56.7707L36.6947 43.2752V37.3296L18.4606 50.7119L15.7802 48.2959V44.3888L36.6947 28.8925V22.9658L10.7404 42.1616V43.7659Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4084 50.8734V41.9942L37.0267 22.3074V29.0597L16.1122 44.556V48.1482L18.4821 50.2843L37.0267 36.6742V43.4425L18.4547 57.1881L10.4084 50.8734ZM18.4606 50.7119L15.7802 48.2959V44.3888L36.6947 28.8925V22.9658L10.7404 42.1616V50.7119L18.4606 56.7707L36.6947 43.2752V37.3296L18.4606 50.7119Z" fill="white"/>
  <path d="M66.552 16.1413V22.1465H81.6637V27.9559H66.552V34.5811H83.2303V40.3905H60.0896V10.332H83.2303V16.1413H66.552Z" fill="white"/>
  <path d="M89.4703 10.2916H95.9001L110.392 29.7432V10.3243H116.854V40.3828H110.392L95.9001 20.9312V40.3502H89.4703V10.2916Z" fill="white"/>
  <path d="M131.968 16.1411H122.601V10.3317H147.798V16.1411H138.463V40.3903H132.001V16.1411H131.968Z" fill="white"/>
  <path d="M159.707 16.1411V22.1463H174.819V27.9556H159.707V34.5809H176.386V40.3903H153.245V10.3317H176.386V16.1411H159.707Z" fill="white"/>
  <path d="M211.698 10.2916L199.458 40.3502H192.245L180.006 10.2916H187.284L195.901 31.4729L204.517 10.2916H211.698Z" fill="white"/>
  <path d="M232.641 35.6579H219.259L217.334 40.3903H210.12L222.36 10.3317H229.573L241.813 40.3903H234.534L232.641 35.6579ZM230.422 30.1749L225.95 19.1763L221.479 30.1749H230.422Z" fill="white"/>
  <path d="M251.388 16.1411H242.021V10.3317H267.218V16.1411H257.85V40.3903H251.388V16.1411Z" fill="white"/>
  <path d="M279.122 16.1411V22.1463H294.233V27.9556H279.122V34.5809H295.8V40.3903H272.659V10.3317H295.8V16.1411H279.122Z" fill="white"/>
</svg>`;

function makeOG({ bgImage, title, subtitle, tagline }) {
  const lines = title.split('\n');

  return `<!DOCTYPE html>
<html><head>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@100;300;400;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
    font-family: 'Archivo', system-ui, sans-serif;
  }
  .og {
    width: 1200px;
    height: 630px;
    background: url('${bgImage}') center/cover no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 80px 70px;
    position: relative;
  }
  .logo {
    position: absolute;
    top: 60px;
    left: 80px;
  }
  .title {
    font-size: 72px;
    font-weight: 300;
    color: white;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 16px;
  }
  .subtitle {
    font-size: 22px;
    font-weight: 400;
    color: rgba(255,255,255,0.6);
    margin-bottom: 8px;
  }
  .tagline {
    font-size: 18px;
    font-weight: 400;
    color: rgba(255,255,255,0.4);
  }
</style>
</head>
<body>
  <div class="og">
    <div class="logo">${LOGO_SVG}</div>
    <div class="title">${lines.join('<br>')}</div>
    ${subtitle ? `<div class="subtitle">${subtitle}</div>` : ''}
    ${tagline ? `<div class="tagline">${tagline}</div>` : ''}
  </div>
</body>
</html>`;
}

const images = [
  {
    file: 'main-og.png',
    bgImage: bgBlue,
    title: 'Innovating today for\na better tomorrow.',
    subtitle: 'Human-centered innovation partner',
    tagline: 'entevate.com',
  },
  {
    file: 'ebm-og.png',
    bgImage: bt1,
    title: 'Experiential Branding\n& Marketing',
    subtitle: 'Immersive brand experiences that resonate, engage, and drive action.',
    tagline: 'entevate.com',
  },
  {
    file: 'oi-og.png',
    bgImage: bt2,
    title: 'Operational\nIntelligence',
    subtitle: 'AI-powered systems, content readiness, and digital transformation.',
    tagline: 'entevate.com',
  },
  {
    file: 'irm-og.png',
    bgImage: bt3,
    title: 'Innovation | Ventures\n| Ecosystem',
    subtitle: 'From bold ideas to lasting outcomes — roadmaps, ventures, and ecosystems.',
    tagline: 'entevate.com',
  },
];

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

for (const img of images) {
  const html = makeOG(img);
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({
    path: path.join(outDir, img.file),
    type: 'png',
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });
  console.log(`Created: ${img.file}`);
}

await browser.close();
console.log('\nAll 4 OG images generated.');
