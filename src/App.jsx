import { useState, useEffect, useRef } from 'react';

import abiEncepImg from './assets/abi-encep.jpg';
import umiNupusImg from './assets/umi-nupus.jpg';
import gusIrsyadImg from './assets/gus-irsyad.jpg';
import hjLuluImg from './assets/hj-lulu.jpg';


// ========================================================
// STYLES (Dipertahankan dalam satu file agar self-contained)
// ========================================================
const CSS_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Amiri&family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');


:root {
  --c-cream:       #FBF5DD;
  --c-sand:        #E7E1B1;
  --c-sand-dark:   #d4cd94;
  --c-green:       #306D29;
  --c-green-dark:  #0D530E;
  --c-green-light: #3d8635;
  --c-green-pale:  rgba(48,109,41,0.07);
  --c-green-mid:   rgba(48,109,41,0.15);
  --c-ink:         #141f14;
  --c-text:        #2a3a2a;
  --c-muted:       #5a6e5a;
  --c-lighter:     #8a9e8a;
  --c-white:       #ffffff;
  --c-border:      rgba(48,109,41,0.12);
  --c-border-dark: rgba(48,109,41,0.22);
  --shadow-xs:  0 1px 4px rgba(13,83,14,0.07);
  --shadow-sm:  0 4px 16px rgba(13,83,14,0.09);
  --shadow-md:  0 8px 32px rgba(13,83,14,0.12);
  --shadow-lg:  0 20px 60px rgba(13,83,14,0.15);
  --shadow-xl:  0 32px 80px rgba(13,83,14,0.18);
  --radius-sm:  8px;
  --radius-md:  14px;
  --radius-lg:  20px;
  --radius-xl:  28px;
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body:    'Outfit', sans-serif;
  --font-arabic:  'Amiri', serif;
  --nav-h: 76px;
  --ease:  cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; font-size:16px; }
body {
  font-family: var(--font-body);
  background: var(--c-cream);
  color: var(--c-text);
  overflow-x: hidden;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
::-webkit-scrollbar { width:5px; }
::-webkit-scrollbar-track { background:var(--c-cream); }
::-webkit-scrollbar-thumb { background:var(--c-green); border-radius:3px; }
.icon { display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; }
.icon svg { display:block; }
#navbar {
  position:fixed; top:0; left:0; right:0; z-index:1000;
  height:var(--nav-h);
  background:rgba(251,245,221,0.92);
  backdrop-filter:blur(20px) saturate(1.8);
  -webkit-backdrop-filter:blur(20px) saturate(1.8);
  border-bottom:1px solid var(--c-border);
  transition:box-shadow 0.3s var(--ease), background 0.3s var(--ease);
}
#navbar.scrolled {
  box-shadow:var(--shadow-md);
  background:rgba(251,245,221,0.97);
}
.nav-wrap {
  max-width:1320px; margin:0 auto; height:100%;
  padding:0 2.5rem;
  display:flex; align-items:center; justify-content:space-between; gap:1rem;
}
.nav-brand {
  display:flex; align-items:center; gap:14px;
  text-decoration:none; color:inherit; cursor:pointer;
}
.nav-emblem {
  width:46px; height:46px; flex-shrink:0;
  background:transparent;
  border-radius:0;
  display:flex; align-items:center; justify-content:center;
  box-shadow:none;
  transition:transform 0.3s var(--ease-spring);
}
.nav-brand:hover .nav-emblem { transform:none; }


.nav-emblem-img{
  width:100%;
  height:100%;
  object-fit:contain;
  border-radius:0;
  display:block;
}

.nav-title { line-height:1.2; }
.nav-title strong {
  display:block; font-family:var(--font-display); font-size:1.05rem; font-weight:700;
  color:var(--c-green-dark); letter-spacing:0.01em;
}
.nav-title span {
  font-size:0.68rem; font-weight:400; color:var(--c-lighter);
  letter-spacing:0.12em; text-transform:uppercase;
}
.nav-links { display:flex; align-items:center; gap:0.1rem; list-style:none; }
.nav-links > li { position:relative; }
.nav-links > li > a, .nav-links > li > button {
  display:flex; align-items:center; gap:5px; padding:9px 13px;
  font-size:0.855rem; font-weight:500; color:var(--c-text); text-decoration:none;
  border:none; background:none; cursor:pointer; border-radius:var(--radius-sm);
  transition:all 0.2s var(--ease); white-space:nowrap; letter-spacing:0.01em;
}
.nav-links > li > a:hover, .nav-links > li > button:hover {
  background:var(--c-green-pale); color:var(--c-green);
}
.chevron-icon { transition:transform 0.25s var(--ease); opacity:0.5; }
.nav-links > li:hover .chevron-icon { transform:rotate(180deg); }
.nav-drop {
  position:absolute; top:calc(100% + 10px); left:0; min-width:230px;
  background:var(--c-white); border:1px solid var(--c-border); border-radius:var(--radius-md);
  box-shadow:var(--shadow-lg); padding:6px; list-style:none;
  opacity:0; pointer-events:none; transform:translateY(-8px) scale(0.985);
  transform-origin:top left; transition:opacity 0.18s var(--ease), transform 0.18s var(--ease);
}
.nav-drop.open {
  opacity:1; pointer-events:all; transform:translateY(0) scale(1);
}
.nav-links > li:hover .nav-drop {
  opacity:1; pointer-events:all; transform:translateY(0) scale(1);
}

.nav-active > a,
.nav-active > button {
  background:var(--c-green-pale);
  color:var(--c-green);
  box-shadow:0 1px 0 rgba(48,109,41,0.08);
}

.nav-active > a,
.nav-active > button {
  border:1px solid rgba(48,109,41,0.18);
}

.nav-drop li a {
  display:flex; align-items:center; gap:10px; padding:10px 14px;
  font-size:0.845rem; font-weight:400; color:var(--c-text); text-decoration:none;
  border-radius:9px; transition:all 0.15s var(--ease);
}
.nav-drop li a:hover { background:var(--c-green-pale); color:var(--c-green); padding-left:18px; }
.nav-drop-dot { width:6px; height:6px; border-radius:50%; background:var(--c-green); opacity:0.4; flex-shrink:0; }
.nav-cta {
  background:var(--c-green) !important; color:var(--c-cream) !important;
  padding:10px 22px !important; border-radius:10px !important; font-weight:600 !important;
  font-size:0.855rem !important; box-shadow:0 3px 14px rgba(48,109,41,0.3) !important;
  letter-spacing:0.02em !important;
}
.nav-cta:hover {
  background:var(--c-green-dark) !important; transform:translateY(-1px) !important;
  box-shadow:0 6px 20px rgba(13,83,14,0.38) !important;
}
.hamburger {
  display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:8px;
}
.hamburger span {
  display:block; width:22px; height:2px; background:var(--c-green-dark);
  border-radius:2px; transition:all 0.3s var(--ease);
}
.hamburger.open span:nth-child(1) { transform:rotate(45deg) translate(5px,5px); }
.hamburger.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
.hamburger.open span:nth-child(3) { transform:rotate(-45deg) translate(5px,-5px); }
.nav-backdrop {
  display:none;
  position:fixed;
  inset:0;
  background:rgba(20,31,20,0.28);
  backdrop-filter:blur(6px);
  -webkit-backdrop-filter:blur(6px);
  opacity:0;
  transition:opacity 0.25s var(--ease);
  z-index:998;
}
.nav-backdrop.open {
  display:block;
  opacity:1;
}
.mobile-nav {
  display:none;
  position:fixed; top:var(--nav-h); left:0; right:0; bottom:0;
  background:var(--c-cream); overflow-y:auto; z-index:999;
  transform:translateX(100%); transition:transform 0.35s var(--ease);
  padding:1.5rem 2rem 5rem;
}
.mobile-nav.open { transform:translateX(0); }
.mobile-nav.open, .mobile-nav { display:block; }

.mobile-nav a {
  display:block; padding:13px 0; font-size:1rem; font-weight:500;
  color:var(--c-text); text-decoration:none; border-bottom:1px solid var(--c-border);
  transition:color 0.2s; cursor:pointer;
}
.mobile-nav a:hover { color:var(--c-green); }
.mobile-nav .m-sub { padding-left:1.5rem; font-size:0.9rem !important; color:var(--c-muted) !important; font-weight:400 !important; }
.mobile-nav .m-label {
  font-size:0.7rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase;
  color:var(--c-green); padding:16px 0 6px; display:block; border-bottom:none !important;
}
.announce {
  background:var(--c-green-dark); color:var(--c-sand); text-align:center;
  padding:11px 1.5rem; font-size:0.82rem; font-weight:400; letter-spacing:0.02em; margin-top:var(--nav-h);
}
.announce strong { font-weight:700; color:var(--c-cream); }
.announce a { color:var(--c-sand); font-weight:600; text-decoration:none; border-bottom:1px solid rgba(231,225,177,0.5); transition:color 0.2s; margin-left:6px; }
.announce a:hover { color:var(--c-cream); }
.hero { background:linear-gradient(160deg, #f5efc8 0%, #eae6a8 40%, #daeac5 100%); position:relative; overflow:hidden; }
.hero-geo { position:absolute; inset:0; pointer-events:none; background-image: radial-gradient(ellipse 900px 700px at 90% 30%, rgba(48,109,41,0.05) 0%, transparent 70%), radial-gradient(ellipse 600px 500px at 10% 80%, rgba(13,83,14,0.04) 0%, transparent 60%); }
.hero-pattern { position:absolute; inset:0; pointer-events:none; opacity:0.025; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z' fill='none' stroke='%23306D29' stroke-width='1'/%3E%3Cpath d='M40 10 L70 40 L40 70 L10 40 Z' fill='none' stroke='%23306D29' stroke-width='0.5'/%3E%3C/svg%3E"); }
.hero-inner { max-width:1320px; margin:0 auto; padding:5rem 2.5rem 4rem; display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:center; position:relative; z-index:1; }
.hero-eyebrow { display:inline-flex; align-items:center; gap:10px; margin-bottom:1.8rem; animation:fadeUp 0.7s both; }
.hero-eyebrow-line { width:32px; height:1.5px; background:var(--c-green); border-radius:1px; }
.hero-eyebrow-text { font-size:0.73rem; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:var(--c-green); }
.hero-h1 { font-family:var(--font-display); font-size:clamp(3rem, 5.5vw, 4.6rem); font-weight:600; line-height:1.05; color:var(--c-ink); margin-bottom:0.4rem; animation:fadeUp 0.7s 0.08s both; }
.hero-h1 em { font-style:italic; color:var(--c-green); }
.hero-arabic { font-family:var(--font-arabic); font-size:1.35rem; color:var(--c-green); direction:rtl; margin:1.2rem 0 1.8rem; animation:fadeUp 0.7s 0.15s both; opacity:0.85; }
.hero-desc { font-size:1rem; line-height:1.8; color:var(--c-muted); max-width:480px; margin-bottom:2.8rem; font-weight:300; animation:fadeUp 0.7s 0.22s both; }
.hero-desc strong { color:var(--c-text); font-weight:500; }
.hero-btns { display:flex; gap:1rem; flex-wrap:wrap; animation:fadeUp 0.7s 0.3s both; }
.btn { display:inline-flex; align-items:center; gap:9px; padding:14px 28px; border-radius:10px; font-family:var(--font-body); font-size:0.9rem; font-weight:600; text-decoration:none; cursor:pointer; border:none; transition:all 0.25s var(--ease); letter-spacing:0.02em; }
.btn-green { background:var(--c-green); color:var(--c-cream); box-shadow:0 4px 20px rgba(48,109,41,0.35); }
.btn-green:hover { background:var(--c-green-dark); transform:translateY(-2px); box-shadow:0 8px 28px rgba(13,83,14,0.42); }
.btn-stroke { background:transparent; color:var(--c-green); border:1.5px solid var(--c-green); }
.btn-stroke:hover { background:var(--c-green); color:var(--c-cream); transform:translateY(-2px); box-shadow:0 6px 20px rgba(48,109,41,0.25); }
.btn-light { background:var(--c-cream); color:var(--c-green-dark); box-shadow:0 2px 12px rgba(0,0,0,0.1); }
.btn-light:hover { background:var(--c-white); transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,0,0,0.15); }
.btn-ghost { background:transparent; color:var(--c-cream); border:1.5px solid rgba(251,245,221,0.45); }
.btn-ghost:hover { background:rgba(251,245,221,0.1); border-color:var(--c-cream); transform:translateY(-2px); }
.hero-stats { display:flex; gap:2.5rem; margin-top:3rem; padding-top:2rem; border-top:1px solid var(--c-border-dark); animation:fadeUp 0.7s 0.38s both; }
.stat-num { font-family:var(--font-display); font-size:2.2rem; font-weight:700; color:var(--c-green-dark); line-height:1; display:block; }
.stat-label { font-size:0.72rem; font-weight:500; color:var(--c-lighter); letter-spacing:0.09em; text-transform:uppercase; margin-top:4px; display:block; }
.hero-right { display:flex; flex-direction:column; gap:1rem; animation:fadeUp 0.7s 0.18s both; }
.hero-video-main { border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-xl); aspect-ratio:16/9; background:var(--c-ink); border:1px solid var(--c-border); }
.hero-video-main iframe { width:100%; height:100%; border:none; display:block; }
.hero-video-row { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
.hero-video-sm { border-radius:var(--radius-md); overflow:hidden; box-shadow:var(--shadow-md); aspect-ratio:16/9; background:var(--c-ink); border:1px solid var(--c-border); }
.hero-video-sm iframe { width:100%; height:100%; border:none; display:block; }
.hero-cta-card { background:linear-gradient(145deg, var(--c-green-dark), var(--c-green)); border-radius:var(--radius-md); padding:1.5rem; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; gap:0.6rem; cursor:pointer; transition:all 0.25s var(--ease); box-shadow:var(--shadow-md); }
.hero-cta-card:hover { transform:translateY(-3px); box-shadow:var(--shadow-lg); }
.hero-cta-card .cta-icon { width:36px; height:36px; background:rgba(251,245,221,0.15); border-radius:8px; display:flex; align-items:center; justify-content:center; }
.hero-cta-card .cta-title { font-family:var(--font-display); font-size:1.1rem; font-weight:700; color:var(--c-cream); line-height:1.2; }
.hero-cta-card .cta-sub { font-size:0.72rem; color:rgba(251,245,221,0.65); font-weight:300; letter-spacing:0.05em; }
@keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
.info-band { background:var(--c-green-dark); padding:2.8rem 2.5rem; }
.info-band-inner { max-width:1320px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:2rem; }
.info-band-item { color:var(--c-sand); }
.info-band-item .ib-icon { width:40px; height:40px; background:rgba(231,225,177,0.1); border-radius:10px; display:flex; align-items:center; justify-content:center; margin-bottom:0.8rem; color:var(--c-sand); }
.info-band-item .ib-label { font-size:0.68rem; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:rgba(231,225,177,0.5); margin-bottom:0.3rem; }
.info-band-item .ib-val { font-size:0.875rem; font-weight:400; color:var(--c-cream); line-height:1.45; }
.section { max-width:1320px; margin:0 auto; padding:6rem 2.5rem; }
.section-sm { padding:4rem 2.5rem; }
.section-full { padding:6rem 2.5rem; }
.section-bg { background:linear-gradient(180deg, rgba(48,109,41,0.04) 0%, transparent 100%); }
.sec-tag { display:inline-flex; align-items:center; gap:8px; font-size:0.7rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:var(--c-green); margin-bottom:0.9rem; }
.sec-tag::before { content:''; width:20px; height:1.5px; background:var(--c-green); border-radius:1px; }
.sec-h2 { font-family:var(--font-display); font-size:clamp(2rem, 4vw, 3rem); font-weight:600; line-height:1.1; color:var(--c-ink); margin-bottom:1rem; }
.sec-h2 em { font-style:italic; color:var(--c-green); }
.sec-body { font-size:1rem; line-height:1.8; color:var(--c-muted); max-width:580px; font-weight:300; }
.sec-header-center { text-align:center; margin-bottom:4rem; }
.sec-header-center .sec-body { margin:0 auto; }
.sec-rule { width:48px; height:2px; background:var(--c-green); border-radius:2px; margin:1rem 0; }
.sec-header-center .sec-rule { margin:1rem auto; }
.grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; }
.grid-4 { display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem; }
.grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:2rem; }
.feature-card { background:var(--c-white); border:1px solid var(--c-border); border-radius:var(--radius-lg); padding:2.2rem; transition:all 0.3s var(--ease); position:relative; overflow:hidden; }
.feature-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:linear-gradient(90deg, var(--c-green), var(--c-green-dark)); transform:scaleX(0); transform-origin:left; transition:transform 0.35s var(--ease); }
.feature-card:hover { transform:translateY(-5px); box-shadow:var(--shadow-lg); border-color:var(--c-green-mid); }
.feature-card:hover::after { transform:scaleX(1); }
.fc-icon { width:52px; height:52px; background:var(--c-green-pale); border-radius:12px; display:flex; align-items:center; justify-content:center; color:var(--c-green); margin-bottom:1.4rem; transition:all 0.3s var(--ease); }
.feature-card:hover .fc-icon { background:var(--c-green); color:var(--c-cream); transform:scale(1.08); }
.fc-h { font-family:var(--font-display); font-size:1.2rem; font-weight:600; color:var(--c-ink); margin-bottom:0.5rem; }
.fc-p { font-size:0.88rem; line-height:1.75; color:var(--c-muted); font-weight:300; }
.jenjang-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; }
.jenjang-card { background:var(--c-white); border:1px solid var(--c-border); border-radius:var(--radius-lg); padding:2.5rem 2rem; cursor:pointer; transition:all 0.3s var(--ease); text-decoration:none; color:inherit; position:relative; overflow:hidden; }
.jenjang-card::before { content:''; position:absolute; top:0; left:0; right:0; height:4px; background:linear-gradient(90deg, var(--c-green), var(--c-green-dark)); transform:scaleX(0); transform-origin:left; transition:transform 0.35s var(--ease); }
.jenjang-card:hover { background:var(--c-green-dark); border-color:transparent; transform:translateY(-5px); box-shadow:var(--shadow-xl); }
.jenjang-card:hover::before { transform:scaleX(0); }
.jenjang-card:hover .jc-icon-wrap { background:rgba(251,245,221,0.15); color:var(--c-cream); }
.jenjang-card:hover .jc-h { color:var(--c-cream); }
.jenjang-card:hover .jc-sub { color:rgba(251,245,221,0.6); }
.jenjang-card:hover .jc-arrow { color:var(--c-sand); opacity:1; }
.jc-icon-wrap { width:54px; height:54px; background:var(--c-green-pale); border-radius:14px; display:flex; align-items:center; justify-content:center; color:var(--c-green); margin-bottom:1.5rem; transition:all 0.3s; }
.jc-h { font-family:var(--font-display); font-size:1.35rem; font-weight:600; color:var(--c-ink); margin-bottom:0.3rem; }
.jc-sub { font-size:0.8rem; color:var(--c-lighter); font-weight:300; letter-spacing:0.03em; margin-bottom:1.5rem; }
.jc-arrow { opacity:0.25; color:var(--c-green); transition:all 0.3s; }
.page-banner { background:linear-gradient(160deg, var(--c-green-dark) 0%, var(--c-green) 100%); padding:calc(var(--nav-h) + 3.5rem) 2.5rem 3.5rem; position:relative; overflow:hidden; }
.page-banner::before { content:''; position:absolute; inset:0; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect x='0' y='0' width='100' height='100' fill='none' stroke='white' stroke-width='0.4' stroke-opacity='0.06'/%3E%3Cline x1='0' y1='50' x2='100' y2='50' stroke='white' stroke-width='0.3' stroke-opacity='0.04'/%3E%3Cline x1='50' y1='0' x2='50' y2='100' stroke='white' stroke-width='0.3' stroke-opacity='0.04'/%3E%3C/svg%3E"); pointer-events:none; }
.page-banner-inner { max-width:1320px; margin:0 auto; position:relative; }
.page-banner h1 { font-family:var(--font-display); font-size:clamp(2.2rem, 5vw, 3.5rem); font-weight:600; color:var(--c-cream); line-height:1.1; margin-bottom:0.8rem; }
.page-banner p { font-size:1rem; color:rgba(251,245,221,0.72); max-width:520px; font-weight:300; line-height:1.7; }
.breadcrumb { display:flex; align-items:center; gap:8px; font-size:0.77rem; color:rgba(251,245,221,0.55); margin-bottom:1.5rem; }
.breadcrumb a { color:rgba(251,245,221,0.75); text-decoration:none; transition:color 0.2s; cursor:pointer; }
.breadcrumb a:hover { color:var(--c-cream); }
.breadcrumb svg { opacity:0.4; }
.vm-grid { display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; }
.vm-box { background:var(--c-white); border:1px solid var(--c-border); border-radius:var(--radius-lg); padding:2.5rem; position:relative; overflow:hidden; }
.vm-box.vm-visi { background:linear-gradient(150deg, var(--c-green-dark), var(--c-green)); border-color:transparent; }
.vm-box-label { font-size:0.7rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; margin-bottom:1rem; display:flex; align-items:center; gap:8px; }
.vm-box.vm-visi .vm-box-label { color:rgba(251,245,221,0.6); }
.vm-box:not(.vm-visi) .vm-box-label { color:var(--c-green); }
.vm-box-label::before { content:''; width:16px; height:1.5px; border-radius:1px; flex-shrink:0; }
.vm-box.vm-visi .vm-box-label::before { background:rgba(251,245,221,0.4); }
.vm-box:not(.vm-visi) .vm-box-label::before { background:var(--c-green); }
.vm-text { font-family:var(--font-display); font-size:1.25rem; font-weight:500; line-height:1.55; }
.vm-box.vm-visi .vm-text { color:var(--c-cream); }
.vm-box:not(.vm-visi) .vm-text { color:var(--c-ink); }
.vm-list { list-style:none; margin-top:0.5rem; display:flex; flex-direction:column; gap:0.9rem; }
.vm-list li { display:flex; gap:12px; align-items:flex-start; font-size:0.88rem; line-height:1.65; color:var(--c-muted); font-weight:300; }
.vm-list-dot { width:6px; height:6px; border-radius:50%; background:var(--c-green); flex-shrink:0; margin-top:7px; }
.fasilitas-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(260px,1fr)); gap:1.5rem; }
.fasilitas-item { background:var(--c-white); border:1px solid var(--c-border); border-radius:var(--radius-lg); overflow:hidden; transition:all 0.3s var(--ease); }
.fasilitas-item:hover { transform:translateY(-4px); box-shadow:var(--shadow-lg); border-color:var(--c-green-mid); }
.fasilitas-thumb { aspect-ratio:16/10; background:linear-gradient(135deg, var(--c-sand) 0%, var(--c-cream) 100%); display:flex; align-items:center; justify-content:center; color:var(--c-green); transition:background 0.3s; position:relative; overflow:hidden; }
.fasilitas-thumb img { width:100%; height:100%; object-fit:cover; display:block; transform:scale(1.01); filter:saturate(1.05) contrast(1.03); }

.fasilitas-thumb::after { content:''; position:absolute; inset:0; background:linear-gradient(to bottom, transparent 50%, rgba(13,83,14,0.06) 100%); }
.fasilitas-item:hover .fasilitas-thumb { background:linear-gradient(135deg, var(--c-green-mid) 0%, var(--c-sand) 100%); }
.fasilitas-body { padding:1.2rem 1.5rem 1.4rem; border-top:1px solid var(--c-border); }
.fasilitas-body h3 { font-family:var(--font-display); font-size:1.05rem; font-weight:600; color:var(--c-ink); }
.guru-leaders { display:grid; grid-template-columns:repeat(auto-fill, minmax(240px,1fr)); gap:1.5rem; margin-bottom:2.5rem; }
.guru-leader-card { background:linear-gradient(150deg, var(--c-green-dark), var(--c-green-light)); border-radius:var(--radius-lg); padding:2.2rem; text-align:center; box-shadow:var(--shadow-lg); transition:all 0.3s var(--ease); }
.guru-leader-card:hover { transform:translateY(-5px); box-shadow:var(--shadow-xl); }
.guru-avatar { width:68px; height:68px; border-radius:50%; background:rgba(255,255,255,0.12); border:2px solid rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; margin:0 auto 1.2rem; color:var(--c-cream); overflow:hidden; }

.guru-leader-card h3 { font-family:var(--font-display); font-size:1rem; font-weight:600; color:var(--c-cream); margin-bottom:0.35rem; line-height:1.35; }
.guru-role { font-size:0.77rem; color:rgba(251,245,221,0.65); font-weight:300; letter-spacing:0.02em; }
.guru-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(210px,1fr)); gap:1.2rem; }
.guru-card { background:var(--c-white); border:1px solid var(--c-border); border-radius:var(--radius-md); padding:1.8rem 1.5rem; text-align:center; transition:all 0.3s var(--ease); }
.guru-card:hover { border-color:var(--c-green-mid); box-shadow:var(--shadow-md); transform:translateY(-3px); }
.guru-card-avatar { width:54px; height:54px; border-radius:50%; background:var(--c-green-pale); border:2px solid var(--c-border); display:flex; align-items:center; justify-content:center; margin:0 auto 1rem; color:var(--c-green); }
.guru-card h3 { font-family:var(--font-display); font-size:0.95rem; font-weight:600; color:var(--c-ink); margin-bottom:0.3rem; line-height:1.35; }
.guru-card .g-role { font-size:0.77rem; color:var(--c-lighter); font-weight:300; }
.timeline { position:relative; max-width:780px; padding-left:2.5rem; }
.timeline::before { content:''; position:absolute; left:0; top:6px; bottom:0; width:1.5px; background:linear-gradient(to bottom, var(--c-green), rgba(48,109,41,0.1)); }
.tl-item { position:relative; margin-bottom:3rem; }
.tl-item:last-child { margin-bottom:0; }
.tl-dot { position:absolute; left:-2.92rem; top:5px; width:13px; height:13px; border-radius:50%; background:var(--c-green); border:3px solid var(--c-cream); box-shadow:0 0 0 1.5px var(--c-green); }
.tl-year { font-size:0.7rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:var(--c-green); margin-bottom:0.4rem; }
.tl-title { font-family:var(--font-display); font-size:1.2rem; font-weight:600; color:var(--c-ink); margin-bottom:0.5rem; }
.tl-body { font-size:0.88rem; line-height:1.75; color:var(--c-muted); font-weight:300; }
.about-split { display:grid; grid-template-columns:5fr 4fr; gap:5rem; align-items:start; }
.about-body h2 { font-family:var(--font-display); font-size:2.2rem; font-weight:600; color:var(--c-ink); margin-bottom:1.5rem; line-height:1.2; }
.about-body p { font-size:0.92rem; line-height:1.85; color:var(--c-muted); margin-bottom:1.1rem; font-weight:300; }
.about-body p strong { color:var(--c-text); font-weight:500; }
.pullquote { background:var(--c-white); border-left:3px solid var(--c-green); border-radius:0 var(--radius-md) var(--radius-md) 0; padding:1.8rem 2rem; margin-top:2rem; box-shadow:var(--shadow-sm); }
.pullquote p { font-family:var(--font-display); font-style:italic; font-size:1.1rem; color:var(--c-ink); line-height:1.6; margin:0; }
.about-sidebar { display:flex; flex-direction:column; gap:1.2rem; }
.about-contact-card { background:var(--c-white); border:1px solid var(--c-border); border-radius:var(--radius-lg); padding:2rem; box-shadow:var(--shadow-sm); }
.about-contact-card h4 { font-family:var(--font-display); font-size:1.1rem; font-weight:600; color:var(--c-ink); margin-bottom:1.3rem; }
.contact-row { display:flex; gap:12px; align-items:flex-start; margin-bottom:1rem; }
.contact-row:last-child { margin-bottom:0; }
.contact-icon { width:36px; height:36px; flex-shrink:0; background:var(--c-green-pale); border-radius:9px; display:flex; align-items:center; justify-content:center; color:var(--c-green); }
.contact-lbl { font-size:0.67rem; color:var(--c-lighter); font-weight:600; letter-spacing:0.1em; text-transform:uppercase; }
.contact-val { font-size:0.875rem; color:var(--c-text); font-weight:400; margin-top:2px; line-height:1.45; }
.social-row { display:flex; flex-wrap:wrap; gap:0.6rem; margin-top:1.5rem; }
.soc-btn { display:inline-flex; align-items:center; gap:7px; padding:8px 14px; border-radius:8px; font-size:0.78rem; font-weight:600; text-decoration:none; transition:all 0.2s; }
.soc-btn:hover { transform:translateY(-2px); filter:brightness(1.1); box-shadow:0 4px 12px rgba(0,0,0,0.15); }
.s-fb  { background:#1877F2; color:#fff; }
.s-ig  { background:linear-gradient(135deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); color:#fff; }
.s-yt  { background:#FF0000; color:#fff; }
.s-tk  { background:#111; color:#fff; }
.s-wa  { background:#25D366; color:#fff; }
.map-card { border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-xl); aspect-ratio:4/3; border:1px solid var(--c-border); }
.map-card iframe { width:100%; height:100%; border:none; display:block; }
.reg-hero { background:linear-gradient(150deg, var(--c-green-dark), var(--c-green)); border-radius:var(--radius-xl); padding:3.5rem; text-align:center; box-shadow:var(--shadow-xl); position:relative; overflow:hidden; margin-bottom:3.5rem; }
.reg-hero::before { content:''; position:absolute; inset:0; background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='none' stroke='white' stroke-width='0.4' stroke-opacity='0.07'/%3E%3C/svg%3E") center/60px; pointer-events:none; }
.reg-hero h2 { font-family:var(--font-display); font-size:clamp(1.8rem, 4vw, 2.6rem); color:var(--c-cream); font-weight:600; margin-bottom:0.6rem; }
.reg-hero p { color:rgba(251,245,221,0.75); font-size:1rem; font-weight:300; margin-bottom:2rem; }
.reg-btns { display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; }
.steps-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; margin-top:3.5rem; }
.step-card { background:var(--c-white); border:1px solid var(--c-border); border-radius:var(--radius-lg); padding:2.2rem; position:relative; overflow:hidden; transition:all 0.3s var(--ease); }
.step-card:hover { transform:translateY(-4px); box-shadow:var(--shadow-lg); }
.step-num { font-family:var(--font-display); font-size:4rem; font-weight:700; line-height:1; color:var(--c-sand); position:absolute; top:1rem; right:1.5rem; letter-spacing:-0.02em; }
.step-icon { width:46px; height:46px; background:var(--c-green-pale); border-radius:11px; display:flex; align-items:center; justify-content:center; color:var(--c-green); margin-bottom:1.2rem; }
.step-card h3 { font-family:var(--font-display); font-size:1.15rem; font-weight:600; color:var(--c-ink); margin-bottom:0.5rem; }
.step-card p { font-size:0.87rem; line-height:1.75; color:var(--c-muted); font-weight:300; }
.brosur-grid { display:grid; grid-template-columns:1fr 1fr; gap:2rem; margin-bottom:2.5rem; }
.brosur-card { background:var(--c-white); border:1px solid var(--c-border); border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-sm); }
.brosur-card .brosur-visual { padding:0.9rem; }
.brosur-card .brosur-visual img { border-radius:14px; background:rgba(251,245,221,0.25); }
.brosur-card .brosur-label { padding:0.85rem 1.1rem; font-weight:700; }
.brosur-visual { aspect-ratio:3/4; background:linear-gradient(160deg, var(--c-sand) 0%, var(--c-cream) 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1.2rem; color:var(--c-green); position:relative; }
.brosur-landscape { aspect-ratio:4/3; }
.brosur-visual span { font-size:0.85rem; color:var(--c-muted); font-weight:400; }
.brosur-label { padding:1rem 1.5rem; text-align:center; font-size:0.8rem; font-weight:600; color:var(--c-muted); border-top:1px solid var(--c-border); letter-spacing:0.05em; text-transform:uppercase; }
.faq-wrap { max-width:800px; margin:0 auto; display:flex; flex-direction:column; gap:0.8rem; }
.faq-item { background:var(--c-white); border:1px solid var(--c-border); border-radius:var(--radius-md); overflow:hidden; transition:border-color 0.2s; }
.faq-item.open { border-color:var(--c-green-mid); }
.faq-q { display:flex; align-items:center; justify-content:space-between; padding:1.3rem 1.7rem; cursor:pointer; transition:background 0.2s; gap:1rem; }
.faq-q:hover { background:var(--c-green-pale); }
.faq-q h4 { font-family:var(--font-display); font-size:1.05rem; font-weight:600; color:var(--c-ink); flex:1; }
.faq-icon { width:30px; height:30px; flex-shrink:0; border-radius:50%; background:var(--c-green-pale); display:flex; align-items:center; justify-content:center; color:var(--c-green); transition:all 0.3s var(--ease); }
.faq-item.open .faq-icon { background:var(--c-green); color:var(--c-cream); transform:rotate(45deg); }
.faq-a { max-height:0; overflow:hidden; padding:0 1.7rem; font-size:0.88rem; line-height:1.8; color:var(--c-muted); font-weight:300; transition:max-height 0.35s var(--ease), padding 0.35s var(--ease); }
.faq-item.open .faq-a { max-height:400px; padding:0 1.7rem 1.4rem; }
.cta-box { background:var(--c-green-pale); border:1px solid var(--c-green-mid); border-radius:var(--radius-lg); padding:3rem; text-align:center; margin-top:3.5rem; }
.cta-box h3 { font-family:var(--font-display); font-size:1.6rem; font-weight:600; color:var(--c-ink); margin-bottom:0.6rem; }
.cta-box p { font-size:0.9rem; color:var(--c-muted); margin-bottom:1.8rem; font-weight:300; line-height:1.7; }
.cta-box-btns { display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; }
.jd-wrap { background:var(--c-white); border:1px solid var(--c-border); border-radius:var(--radius-xl); overflow:hidden; box-shadow:var(--shadow-lg); }
.jd-head { background:linear-gradient(160deg, var(--c-green-dark), var(--c-green)); padding:3.5rem; color:var(--c-cream); }
.jd-head h2 { font-family:var(--font-display); font-size:clamp(1.8rem, 4vw, 2.8rem); font-weight:600; margin-bottom:0.5rem; }
.jd-head p { color:rgba(251,245,221,0.72); font-size:1rem; font-weight:300; max-width:520px; }
.jd-body { padding:3.5rem; }
.jd-section { margin-bottom:2.5rem; }
.jd-section:last-child { margin-bottom:0; }
.jd-section-title { display:flex; align-items:center; gap:12px; font-family:var(--font-display); font-size:1.2rem; font-weight:600; color:var(--c-ink); margin-bottom:0.9rem; }
.jd-rule { width:4px; height:20px; border-radius:2px; background:linear-gradient(to bottom, var(--c-green), var(--c-green-dark)); flex-shrink:0; }
.jd-section p { font-size:0.9rem; line-height:1.85; color:var(--c-muted); font-weight:300; }
.jd-ol { list-style:none; padding:0; margin-top:0.6rem; display:flex; flex-direction:column; gap:0.7rem; counter-reset:misi; }
.jd-ol li { display:flex; gap:12px; align-items:flex-start; font-size:0.88rem; line-height:1.7; color:var(--c-muted); font-weight:300; counter-increment:misi; }
.jd-ol li::before { content:counter(misi); width:22px; height:22px; flex-shrink:0; background:var(--c-green-pale); border-radius:50%; font-size:0.7rem; font-weight:700; color:var(--c-green); display:flex; align-items:center; justify-content:center; margin-top:2px; }
.galeri-notice { background:var(--c-white); border:1px solid var(--c-border); border-radius:var(--radius-lg); padding:2rem 2.5rem; display:flex; align-items:center; gap:1.5rem; margin-bottom:3rem; box-shadow:var(--shadow-sm); }
.galeri-notice-icon { width:46px; height:46px; flex-shrink:0; background:var(--c-green-pale); border-radius:12px; display:flex; align-items:center; justify-content:center; color:var(--c-green); }
.galeri-notice p { font-size:0.88rem; line-height:1.75; color:var(--c-muted); font-weight:300; }
.galeri-notice a { color:var(--c-green); font-weight:500; text-decoration:none; }
.galeri-notice a:hover { text-decoration:underline; }
.galeri-ph { display:grid; grid-template-columns:repeat(auto-fill, minmax(240px,1fr)); gap:1.2rem; }
.galeri-ph-item { aspect-ratio:4/3; background:linear-gradient(135deg, var(--c-sand), var(--c-cream)); border-radius:var(--radius-md); border:1px solid var(--c-border); display:flex; align-items:center; justify-content:center; color:var(--c-green); transition:all 0.3s var(--ease); }
.galeri-ph-item:hover { transform:scale(1.02); box-shadow:var(--shadow-md); }
.video-grid { display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-bottom:3.5rem; }
.vid-wrap { border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-lg); aspect-ratio:16/9; border:1px solid var(--c-border); }
.vid-wrap iframe { width:100%; height:100%; border:none; display:block; }
footer { background:var(--c-green-dark); padding:5rem 2.5rem 2.5rem; }
.foot-inner { max-width:1320px; margin:0 auto; }
.foot-top { display:grid; grid-template-columns:1.6fr 1fr 1fr 1fr; gap:3rem; padding-bottom:3rem; border-bottom:1px solid rgba(231,225,177,0.12); margin-bottom:2rem; }
.foot-brand { }
.foot-logo-row { display:flex; align-items:center; gap:12px; margin-bottom:1.2rem; }
.foot-emblem { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; color:var(--c-sand); }
.foot-name { font-family:var(--font-display); font-size:1.15rem; font-weight:600; color:var(--c-cream); }
.foot-brand p { font-size:0.845rem; line-height:1.75; color:rgba(231,225,177,0.55); margin-bottom:1.5rem; font-weight:300; }
.foot-social { display:flex; gap:0.6rem; flex-wrap:wrap; }
.foot-soc { width:34px; height:34px; background:rgba(231,225,177,0.1); border-radius:8px; display:flex; align-items:center; justify-content:center; color:rgba(231,225,177,0.6); text-decoration:none; transition:all 0.2s; }
.foot-soc:hover { background:rgba(231,225,177,0.2); color:var(--c-cream); }
.foot-col h4 { font-size:0.68rem; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; color:rgba(231,225,177,0.5); margin-bottom:1.2rem; }
.foot-col ul { list-style:none; display:flex; flex-direction:column; gap:0.7rem; }
.foot-col ul li a { font-size:0.845rem; color:rgba(231,225,177,0.6); text-decoration:none; cursor:pointer; transition:color 0.2s; font-weight:300; }
.foot-col ul li a:hover { color:var(--c-cream); }
.foot-bottom { display:flex; align-items:center; justify-content:space-between; font-size:0.78rem; color:rgba(231,225,177,0.4); flex-wrap:wrap; gap:0.8rem; }
.smait-box { background:var(--c-white); border:1px solid var(--c-border); border-radius:var(--radius-xl); overflow:hidden; box-shadow:var(--shadow-lg); }
.smait-box-head { background:linear-gradient(160deg, var(--c-green-dark), var(--c-green)); padding:3.5rem; }
.smait-box-head h2 { font-family:var(--font-display); font-size:2.2rem; font-weight:600; color:var(--c-cream); margin-bottom:0.5rem; }
.smait-box-head p { color:rgba(251,245,221,0.72); font-weight:300; }
.smait-box-body { padding:3rem; }
.info-notice { background:var(--c-green-pale); border:1px solid var(--c-green-mid); border-radius:var(--radius-md); padding:2rem; text-align:center; margin-top:1.5rem; }
.info-notice h3 { font-family:var(--font-display); font-size:1.35rem; font-weight:600; color:var(--c-ink); margin-bottom:0.7rem; }
.info-notice p { font-size:0.88rem; color:var(--c-muted); line-height:1.75; font-weight:300; margin-bottom:1.5rem; }
.info-notice-btns { display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; }
.reveal { opacity:0; transform:translateY(24px); transition:opacity 0.65s var(--ease), transform 0.65s var(--ease); }
.reveal.vis { opacity:1; transform:translateY(0); }
.reveal-d1 { transition-delay:0.1s; }
.reveal-d2 { transition-delay:0.2s; }
.reveal-d3 { transition-delay:0.3s; }
@media(max-width:1100px) {
  .hero-inner { grid-template-columns:1fr; gap:3.5rem; padding:4rem 2rem 3.5rem; }
  .foot-top { grid-template-columns:1fr 1fr; }
  .about-split { grid-template-columns:1fr; gap:3rem; }
}
@media(max-width:900px) {
  .grid-3, .jenjang-cards { grid-template-columns:1fr 1fr; }
  .grid-4 { grid-template-columns:1fr 1fr; }
  .vm-grid { grid-template-columns:1fr; }
  .info-band-inner { grid-template-columns:1fr 1fr; }
  .steps-grid { grid-template-columns:1fr 1fr; }
  .brosur-grid { grid-template-columns:1fr; }
  .video-grid { grid-template-columns:1fr; }
}
@media(max-width:768px) {
  .nav-links, .nav-cta { display:none !important; }
  .hamburger { display:flex; }
  .nav-backdrop { display:none; }
  .mobile-nav { display:block; }

  .jd-head, .jd-body, .smait-box-head, .smait-box-body { padding:2rem; }
  .reg-hero { padding:2.5rem 2rem; }
  .hero-btns { flex-direction:column; align-items:flex-start; }
  .hero-inner { padding:3rem 1.5rem; }
  .section { padding:4rem 1.5rem; }
}
@media(max-width:600px) {
  .grid-3, .jenjang-cards, .grid-2, .steps-grid { grid-template-columns:1fr; }
  .guru-leaders { grid-template-columns:1fr 1fr; }
  .foot-top { grid-template-columns:1fr; gap:2rem; }
  .info-band-inner { grid-template-columns:1fr; }
  .reg-btns, .cta-box-btns, .info-notice-btns { flex-direction:column; align-items:center; }
}
`;

export default function App() {
  const [page, setPage] = useState('beranda');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [openFaqs, setOpenFaqs] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null); // 'jenjang' | 'profil'

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('vis');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    // Delay slightly to ensure DOM is painted after page change
    const timer = setTimeout(() => {
      const reveals = document.querySelectorAll('.reveal:not(.vis)');
      reveals.forEach((el, i) => {
        el.style.transitionDelay = `${i < 8 ? i * 0.06 : 0}s`;
        observer.observe(el);
      });
    }, 50);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [page]);

  const navigate = (id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileOpen(false);
    setActiveDropdown(null);
  };
  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => {
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  const onNavKeyDown = (e, dropdownKey) => {
    const key = e.key;
    if (key === 'Enter' || key === ' ') {
      e.preventDefault();
      setActiveDropdown((prev) => (prev === dropdownKey ? null : dropdownKey));
      return;
    }
    if (key === 'Escape') {
      e.preventDefault();
      setActiveDropdown(null);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const timeoutRef = useRef(null);

  const handleMouseEnter = (dropdownName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    // Memberikan delay 300ms sebelum dropdown menutup
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // Anda bisa mengubah angka 300 (milidetik) sesuai kenyamanan
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS_STYLES }} />
      <nav id="navbar" className={navScrolled ? 'scrolled' : ''}>
        <div className="nav-wrap">
          <div
            style={{ display: 'none' }}
            aria-hidden="true"
          />

          <div
            className="nav-brand"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate('beranda');
              }
            }}
            onClick={() => navigate('beranda')}
          >
            <div className="nav-emblem">
              <img
                src="/favicon.png"
                alt="Nur Antika favicon"
                className="nav-emblem-img"
                draggable={false}
              />
            </div>
            <div className="nav-title">
              <strong>Pondok Pesantren Nur Antika</strong>
              <span>Kec. Tigaraksa · Tangerang, Banten</span>
            </div>
          </div>
          <ul className="nav-links">
            <li className={page === 'beranda' ? 'nav-active' : ''}>
              <a onClick={() => navigate('beranda')}>Beranda</a>
            </li>

            <li
              className={page === 'smpit' || page === 'smkit' || page === 'smait' ? 'nav-active' : ''}
              onMouseEnter={() => handleMouseEnter('jenjang')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                aria-expanded={activeDropdown === 'jenjang'}
                onClick={() => setActiveDropdown((prev) => (prev === 'jenjang' ? null : 'jenjang'))}
                onKeyDown={(e) => onNavKeyDown(e, 'jenjang')}
              >
                Jenjang Pendidikan
                <svg className="chevron-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              <ul className={`nav-drop ${activeDropdown === 'jenjang' ? 'open' : ''}`}>
                <li><a onClick={() => navigate('smpit')}><span className="nav-drop-dot"></span>SMPIT Nur Antika</a></li>
                <li><a onClick={() => navigate('smkit')}><span className="nav-drop-dot"></span>SMKIT Nur Antika</a></li>
                <li><a onClick={() => navigate('smait')}><span className="nav-drop-dot"></span>SMA IT Nur Antika</a></li>
              </ul>
            </li>

            <li
              className={page === 'tentang' || page === 'sejarah' || page === 'galeri' ? 'nav-active' : ''}
              onMouseEnter={() => handleMouseEnter('profil')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                aria-expanded={activeDropdown === 'profil'}
                onClick={() => setActiveDropdown((prev) => (prev === 'profil' ? null : 'profil'))}
                onKeyDown={(e) => onNavKeyDown(e, 'profil')}
              >
                Profil
                <svg className="chevron-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              <ul className={`nav-drop ${activeDropdown === 'profil' ? 'open' : ''}`}>
                <li><a onClick={() => navigate('tentang')}><span className="nav-drop-dot"></span>Tentang Pesantren</a></li>
                <li><a onClick={() => navigate('sejarah')}><span className="nav-drop-dot"></span>Sejarah</a></li>
                <li><a onClick={() => navigate('galeri')}><span className="nav-drop-dot"></span>Galeri Kegiatan</a></li>
              </ul>
            </li>

            <li className={page === 'fasilitas' ? 'nav-active' : ''}>
              <a onClick={() => navigate('fasilitas')}>Fasilitas</a>
            </li>
            <li className={page === 'guru' ? 'nav-active' : ''}>
              <a onClick={() => navigate('guru')}>Dewan Guru</a>
            </li>
            <li className={page === 'tanya' ? 'nav-active' : ''}>
              <a onClick={() => navigate('tanya')}>Tanya Jawab</a>
            </li>

          </ul>
          <button className="hamburger" id="hamBtn" onClick={toggleMobile} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div
        className={`nav-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={closeMobile}
        aria-hidden={!mobileOpen}
      />
      <nav className={`mobile-nav ${mobileOpen ? 'open' : ''}`} id="mobileNav">
        <a onClick={() => navigate('beranda')}>Beranda</a>

        <span className="m-label">Jenjang Pendidikan</span>
        <a className="m-sub" onClick={() => navigate('smpit')}>SMPIT Nur Antika</a>
        <a className="m-sub" onClick={() => navigate('smkit')}>SMKIT Nur Antika</a>
        <a className="m-sub" onClick={() => navigate('smait')}>SMA IT Nur Antika</a>
        <span className="m-label">Profil</span>
        <a className="m-sub" onClick={() => navigate('tentang')}>Tentang Pesantren</a>
        <a className="m-sub" onClick={() => navigate('sejarah')}>Sejarah</a>
        <a className="m-sub" onClick={() => navigate('galeri')}>Galeri Kegiatan</a>
        <a onClick={() => navigate('fasilitas')}>Fasilitas</a>
        <a onClick={() => navigate('guru')}>Dewan Guru</a>
        <a onClick={() => navigate('tanya')}>Tanya Jawab</a>

        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfnR9pMQaZ_7KntvSpAcv5D1j0MB7F7kJHF6XNt2_H-RnstQA/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-green)', fontWeight: 600, marginTop: '0.5rem' }}>Daftar Online Sekarang →</a>
      </nav>

      {page === 'beranda' && <BerandaPage navigate={navigate} />}
      {page === 'tentang' && <TentangPage navigate={navigate} />}
      {page === 'sejarah' && <SejarahPage navigate={navigate} />}
      {page === 'galeri' && <GaleriPage navigate={navigate} />}
      {page === 'fasilitas' && <FasilitasPage navigate={navigate} />}
      {page === 'guru' && <GuruPage navigate={navigate} />}
      {page === 'smpit' && <SmpitPage navigate={navigate} />}
      {page === 'smkit' && <SmkitPage navigate={navigate} />}
      {page === 'smait' && <SmaItPage navigate={navigate} />}
      {page === 'jenjang' && <JenjangPage navigate={navigate} />}
      {page === 'tanya' && <TanyaPage navigate={navigate} toggleFaq={toggleFaq} openFaqs={openFaqs} />}


      <Footer navigate={navigate} />
    </>
  );
}

// ==================== PAGE COMPONENTS ====================
function BerandaPage({ navigate }) {
  return (
    <div id="page-beranda" className="page active">
      <div className="announce">
        Penerimaan Santri Baru Tahun Ajaran 2026/2027 Telah Dibuka &mdash;
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfnR9pMQaZ_7KntvSpAcv5D1j0MB7F7kJHF6XNt2_H-RnstQA/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">Daftar Online Sekarang &rarr;</a>
      </div>
      <section className="hero">
        <div className="hero-geo"></div>
        <div className="hero-pattern"></div>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <div className="hero-eyebrow-line"></div>
              <span className="hero-eyebrow-text">Pesantren Terpadu · Berdiri Sejak 2012</span>
            </div>
            <h1 className="hero-h1">Pondok Pesantren<br /><em>Nur Antika</em></h1>
            <p className="hero-arabic">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
            <p className="hero-desc">
              Lembaga pendidikan Islam yang mengintegrasikan ilmu agama dan ilmu pengetahuan umum dalam suasana pesantren yang kondusif, membentuk generasi yang <strong>berakhlakul karimah, cerdas, dan berdaya saing tinggi.</strong>
            </p>
            <div className="hero-btns">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfnR9pMQaZ_7KntvSpAcv5D1j0MB7F7kJHF6XNt2_H-RnstQA/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer" className="btn btn-green">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
                Daftar Sekarang
              </a>
              <button className="btn btn-stroke" onClick={() => navigate('tentang')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                Profil Pesantren
              </button>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-video-main">
              <iframe src="https://www.youtube.com/embed/W9N34xCZfCc" title="Nur Antika" allowFullScreen loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </section>
      <div className="info-band">
        <div className="info-band-inner">
          <div className="info-band-item">
            <div className="ib-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg></div>
            <div className="ib-label">Alamat</div>
            <div className="ib-val">Kp. Kadu Ds. Pete, Kec. Tigaraksa, Kab. Tangerang - Banten 15720</div>
          </div>
          <div className="info-band-item">
            <div className="ib-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg></div>
            <div className="ib-label">Telepon / WhatsApp</div>
            <div className="ib-val">082113463606</div>
          </div>
          <div className="info-band-item">
            <div className="ib-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></div>
            <div className="ib-label">E-Mail</div>
            <div className="ib-val">pondokpesantrennurantika@gmail.com</div>
          </div>
          <div className="info-band-item">
            <div className="ib-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></div>
            <div className="ib-label">Pendiri</div>
            <div className="ib-val">KH. Encep Subandi &amp; Nyai Hj. Hayati Nufus</div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="sec-header-center reveal">
          <div className="sec-tag">Tentang Kami</div>
          <h2 className="sec-h2">Profil <em>Singkat</em> Pesantren</h2>
          <div className="sec-rule"></div>
          <p className="sec-body">Pondok Pesantren Nur Antika memadukan nilai-nilai pesantren tradisional dengan metode pendidikan modern untuk mencetak generasi yang siap mengabdi kepada agama, masyarakat, dan bangsa.</p>
        </div>
        <div className="grid-3 reveal">
          <div className="feature-card"><div className="fc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg></div><div className="fc-h">Pendidikan Terpadu</div><div className="fc-p">Mengintegrasikan pendidikan agama Islam dengan ilmu pengetahuan umum dalam satu lingkungan pesantren yang kondusif dan penuh inspirasi.</div></div>
          <div className="feature-card"><div className="fc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg></div><div className="fc-h">Al-Qur'an &amp; IPTEK</div><div className="fc-p">Mendidik santri memahami dan mengamalkan Al-Qur'an, sekaligus membekali mereka dengan penguasaan IPTEK dan keterampilan hidup.</div></div>
          <div className="feature-card"><div className="fc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg></div><div className="fc-h">Karakter Unggul</div><div className="fc-p">Mencetak generasi penerus bangsa yang tangguh, berkarakter, dan berakhlakul karimah sebagai landasan utama kehidupan.</div></div>
          <div className="feature-card reveal-d1"><div className="fc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></div><div className="fc-h">Kontribusi Sosial</div><div className="fc-p">Aktif dalam kegiatan bakti sosial, pengabdian masyarakat, dan program kepedulian sosial di lingkungan sekitar pesantren.</div></div>
          <div className="feature-card reveal-d2"><div className="fc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg></div><div className="fc-h">3 Jenjang Sekolah</div><div className="fc-p">SMPIT, SMKIT, dan SMA IT sebagai jenjang pendidikan formal yang terintegrasi penuh dengan program pesantren.</div></div>
          <div className="feature-card reveal-d3"><div className="fc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></div><div className="fc-h">Fasilitas Modern</div><div className="fc-p">Ruang kelas, lab komputer, asrama santri putra-putri, mushola, lapangan, gedung BLK, dan berbagai fasilitas pendukung lainnya.</div></div>
        </div>
      </div>
      <div style={{ background: 'linear-gradient(180deg, rgba(48,109,41,0.04) 0%, transparent 100%)', padding: '6rem 2.5rem' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div className="sec-header-center reveal">
            <div className="sec-tag">Jenjang Pendidikan</div>
            <h2 className="sec-h2">Program <em>Sekolah</em> Kami</h2>
            <div className="sec-rule"></div>
            <p className="sec-body">Tiga jenjang pendidikan formal berbasis Islam terpadu untuk menyiapkan santri yang kompeten dan berintegritas.</p>
          </div>
          <div className="jenjang-cards reveal">
            <div className="jenjang-card" onClick={() => navigate('smpit')}>
              <div className="jc-icon-wrap"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg></div>
              <div className="jc-h">SMPIT Nur Antika</div><div className="jc-sub">SMP Islam Terpadu · Jenjang Menengah Pertama</div>
              <div className="jc-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></div>
            </div>
            <div className="jenjang-card" onClick={() => navigate('smkit')}>
              <div className="jc-icon-wrap"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg></div>
              <div className="jc-h">SMKIT Nur Antika</div><div className="jc-sub">SMK Islam Terpadu · Pendidikan Vokasional</div>
              <div className="jc-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></div>
            </div>
            <div className="jenjang-card" onClick={() => navigate('smait')}>
              <div className="jc-icon-wrap"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg></div>
              <div className="jc-h">SMA IT Nur Antika</div><div className="jc-sub">SMA Islam Terpadu · Jenjang Menengah Atas</div>
              <div className="jc-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></div>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="sec-header-center reveal">
          <div className="sec-tag">Lokasi &amp; Kontak</div>
          <h2 className="sec-h2">Temukan <em>Kami</em></h2>
          <div className="sec-rule"></div>
        </div>
        <div className="grid-2 reveal">
          <div>
            <div className="about-contact-card" style={{ marginBottom: '1.5rem' }}>
              <h4>Informasi Kontak</h4>
              <div className="contact-row"><div className="contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg></div><div><div className="contact-lbl">Alamat</div><div className="contact-val">Kp. Kadu Ds. Pete, Kec. Tigaraksa,<br />Kab. Tangerang - Banten 15720</div></div></div>
              <div className="contact-row"><div className="contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg></div><div><div className="contact-lbl">Telepon / WhatsApp</div><div className="contact-val">082113463606</div></div></div>
              <div className="contact-row"><div className="contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></div><div><div className="contact-lbl">E-Mail</div><div className="contact-val">pondokpesantrennurantika@gmail.com</div></div></div>
            </div>
            <div style={{
              background: 'var(--c-white, #ffffff)',
              border: '1px solid var(--c-border, #e5e7eb)',
              borderRadius: 'var(--radius-lg, 12px)',
              padding: '1.5rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
            }}>
              {/* Bagian Judul */}
              <div className="contact-lbl" style={{
                fontSize: '0.95rem',
                fontWeight: '600',
                color: 'var(--c-text-main, #1f2937)',
                letterSpacing: '0.5px'
              }}>
                Media Sosial Resmi
              </div>

              {/* Bagian Ikon Sosial Media */}
              <div className="foot-social" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>

                {/* Style inline helper untuk menghindari duplikasi kode transisi */}
                {/* Anda bisa memindahkan style hover ini ke file CSS global menggunakan class .foot-soc jika ingin lebih rapi */}

                {/* Facebook */}
                <a href="https://www.facebook.com/ponpes.nurantika.5?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="foot-soc" title="Facebook"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: '#f0f2f5', color: '#1877f2',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#1877f2'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#f0f2f5'; e.currentTarget.style.color = '#1877f2'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>

                {/* Instagram */}
                <a href="https://www.instagram.com/ponpes_nurantika/" target="_blank" rel="noopener noreferrer" className="foot-soc" title="Instagram"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: '#fdf0f5', color: '#e1306c',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#fdf0f5'; e.currentTarget.style.color = '#e1306c'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                </a>

                {/* YouTube */}
                <a href="https://www.youtube.com/@pondokpesantrennurantika2489/featured" target="_blank" rel="noopener noreferrer" className="foot-soc" title="YouTube"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: '#fff1f1', color: '#ff0000',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#ff0000';
                    e.currentTarget.style.color = '#ff0000'; // Menjaga base logo tetap merah asli
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fff1f1';
                    e.currentTarget.style.color = '#ff0000';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    {/* Bentuk luar/Background Logo YouTube */}
                    <path
                      d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"
                      fill="currentColor"
                    />
                    {/* Segitiga Play di Tengah - Di-lock warna putih susu (#fff) agar tidak rusak saat hover */}
                    <polygon
                      points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
                      fill="#ffffff"
                    />
                  </svg>
                </a>

                {/* TikTok */}
                <a href="https://www.tiktok.com/@official_nurantika" target="_blank" rel="noopener noreferrer" className="foot-soc" title="TikTok"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: '#f1f1f1', color: '#010101',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#010101'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f1f1'; e.currentTarget.style.color = '#010101'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" /></svg>
                </a>

                {/* WhatsApp */}
                <a href="https://wa.me/6282113463606" target="_blank" rel="noopener noreferrer" className="foot-soc" title="WhatsApp"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: '#e8f7f0', color: '#25d366',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#25d366'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#e8f7f0'; e.currentTarget.style.color = '#25d366'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                </a>

              </div>
            </div>
          </div>
          <div className="map-card">
            <iframe src="https://maps.google.com/maps?hl=en-US&ll=-6.257364,106.460516&output=embed&q=PFV6+362,+Jl.+Cibalentung+-+Babakan,+Pete,+Kec.+Tigaraksa,+Kabupaten+Tangerang,+Banten+15720,+Indonesia+(Pondok+Pesantren+Nur+Antika)&z=17" title="Lokasi Nur Antika" allowFullScreen loading="lazy"></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

function TentangPage({ navigate }) {
  return (
    <div id="page-tentang" className="page active">
      <div className="page-banner">
        <div className="page-banner-inner">
          <div className="breadcrumb"><a onClick={() => navigate('beranda')}>Beranda</a><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg><span>Profil</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg><span>Tentang Pesantren</span></div>
          <h1>Tentang Pesantren</h1>
          <p>Profil lengkap Pondok Pesantren Nur Antika - lembaga pendidikan Islam terpadu sejak 2012.</p>
        </div>
      </div>
      <div className="section">
        <div className="about-split reveal">
          <div className="about-body">
            <h2>Profil Pondok Pesantren<br /><em>Nur Antika</em></h2>
            <p>Selamat datang di Pondok Pesantren Nur Antika, sebuah lembaga pendidikan Islam yang berfokus pada pengembangan spiritual, akademik, dan sosial para santrinya.</p>
            <p>Pondok Pesantren Nur Antika adalah salah satu lembaga Pendidikan Islam, tempat mendidik pemuda/i belajar ilmu agama dan ilmu pengetahuan umum. Pondok ini didirikan oleh <strong>KH. Encep Subandi</strong> dan <strong>Nyai Hj. Hayati Nufus</strong> pada tahun 2012.</p>
            <p>Kami menggabungkan pendekatan tradisional pesantren dengan metode modern, menghargai nilai-nilai luhur sambil mengintegrasikan teknologi dan pengetahuan kontemporer dalam proses pembelajaran. Selain pendidikan, pesantren ini juga aktif dalam kegiatan bakti sosial dan pengabdian masyarakat.</p>
            <div className="pullquote"><p>"Pondok Pesantren Nur Antika berkomitmen untuk terus menghasilkan generasi yang berakhlak, berpengetahuan, dan berdaya saing tinggi dalam berbagai bidang."</p></div>
            <div className="vm-grid" style={{ marginTop: '2.5rem' }}>
              <div className="vm-box vm-visi"><div className="vm-box-label">Visi</div><div className="vm-text">Mencetak insan religius yang unggul dalam IMTAQ dan IPTEK, serta berakhlaqul karimah.</div></div>
              <div className="vm-box"><div className="vm-box-label">Misi</div><ul className="vm-list"><li><span className="vm-list-dot"></span>Mendidik santri agar memahami dan mengamalkan Al-Qur'an.</li><li><span className="vm-list-dot"></span>Membekali santri agar menguasai IPTEK dan keterampilan sebagai bekal hidup di masyarakat.</li><li><span className="vm-list-dot"></span>Mencetak generasi penerus dan pelurus bangsa yang tangguh, unggul, dan berkarakter.</li></ul></div>
            </div>
          </div>
          <div className="about-sidebar">
            <div className="about-contact-card">
              <h4>Informasi Kontak</h4>
              <div className="contact-row"><div className="contact-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg></div><div><div className="contact-lbl">Alamat</div><div className="contact-val">Kp. Kadu Ds. Pete, Kec. Tigaraksa, Kab. Tangerang - Banten 15720</div></div></div>
              <div className="contact-row"><div className="contact-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg></div><div><div className="contact-lbl">Telepon / WhatsApp</div><div className="contact-val">082113463606</div></div></div>
              <div className="contact-row"><div className="contact-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></div><div><div className="contact-lbl">E-Mail</div><div className="contact-val">pondokpesantrennurantika@gmail.com</div></div></div>
            </div>
            <div className="map-card" style={{ aspectRatio: 'unset', height: 280 }}>
              <iframe src="https://maps.google.com/maps?hl=en-US&ll=-6.257364,106.460516&output=embed&q=Pondok+Pesantren+Nur+Antika&z=16" allowFullScreen loading="lazy"></iframe>
            </div>
            <div style={{
              background: 'var(--c-white, #ffffff)',
              border: '1px solid var(--c-border, #e5e7eb)',
              borderRadius: 'var(--radius-lg, 12px)',
              padding: '1.5rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
            }}>
              {/* Bagian Judul */}
              <div className="contact-lbl" style={{
                fontSize: '0.95rem',
                fontWeight: '600',
                color: 'var(--c-text-main, #1f2937)',
                letterSpacing: '0.5px'
              }}>
                Media Sosial Resmi
              </div>

              {/* Bagian Ikon Sosial Media */}
              <div className="foot-social" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>

                {/* Style inline helper untuk menghindari duplikasi kode transisi */}
                {/* Anda bisa memindahkan style hover ini ke file CSS global menggunakan class .foot-soc jika ingin lebih rapi */}

                {/* Facebook */}
                <a href="https://www.facebook.com/ponpes.nurantika.5?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="foot-soc" title="Facebook"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: '#f0f2f5', color: '#1877f2',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#1877f2'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#f0f2f5'; e.currentTarget.style.color = '#1877f2'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>

                {/* Instagram */}
                <a href="https://www.instagram.com/ponpes_nurantika/" target="_blank" rel="noopener noreferrer" className="foot-soc" title="Instagram"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: '#fdf0f5', color: '#e1306c',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#fdf0f5'; e.currentTarget.style.color = '#e1306c'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                </a>

                {/* YouTube */}
                <a href="https://www.youtube.com/@pondokpesantrennurantika2489/featured" target="_blank" rel="noopener noreferrer" className="foot-soc" title="YouTube"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: '#fff1f1', color: '#ff0000',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#ff0000';
                    e.currentTarget.style.color = '#ff0000'; // Menjaga base logo tetap merah asli
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fff1f1';
                    e.currentTarget.style.color = '#ff0000';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    {/* Bentuk luar/Background Logo YouTube */}
                    <path
                      d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"
                      fill="currentColor"
                    />
                    {/* Segitiga Play di Tengah - Di-lock warna putih susu (#fff) agar tidak rusak saat hover */}
                    <polygon
                      points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
                      fill="#ffffff"
                    />
                  </svg>
                </a>

                {/* TikTok */}
                <a href="https://www.tiktok.com/@official_nurantika" target="_blank" rel="noopener noreferrer" className="foot-soc" title="TikTok"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: '#f1f1f1', color: '#010101',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#010101'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f1f1'; e.currentTarget.style.color = '#010101'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" /></svg>
                </a>

                {/* WhatsApp */}
                <a href="https://wa.me/6282113463606" target="_blank" rel="noopener noreferrer" className="foot-soc" title="WhatsApp"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: '#e8f7f0', color: '#25d366',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#25d366'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#e8f7f0'; e.currentTarget.style.color = '#25d366'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SejarahPage({ navigate }) {
  return (
    <div id="page-sejarah">
      <div className="page-banner">
        <div className="page-banner-inner">
          <div className="breadcrumb">
            <a onClick={() => navigate('beranda')}>Beranda</a>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            <span>Profil</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            <span>Sejarah</span>
          </div>
          <h1>Sejarah</h1>
          <p>Perjalanan Pondok Pesantren Nur Antika dari masa pendirian hingga kini.</p>
        </div>
      </div>
      <div className="section">
        <div className="grid-2 reveal" style={{ alignItems: 'start' }}>
          <div>
            <div className="sec-tag">Sejarah Pesantren</div>
            <h2 className="sec-h2" style={{ marginBottom: '1.5rem' }}>Jejak Perjalanan<br /><em>Nur Antika</em></h2>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: 'var(--c-muted)', fontWeight: 300, marginBottom: '1.2rem' }}>
              Pondok Pesantren Nur Antika didirikan pada tahun <strong style={{ color: 'var(--c-text)', fontWeight: 500 }}>2012</strong> oleh <strong style={{ color: 'var(--c-text)', fontWeight: 500 }}>KH. Encep Subandi</strong> dan <strong style={{ color: 'var(--c-text)', fontWeight: 500 }}>Nyai Hj. Hayati Nufus</strong>, seorang ulama dan pendidik yang berkomitmen untuk memberikan pendidikan yang holistik kepada generasi muda.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: 'var(--c-muted)', fontWeight: 300, marginBottom: '2rem' }}>
              Sejak berdiri, pondok pesantren ini telah tumbuh menjadi pusat pembelajaran yang berpengaruh di tingkat regional, dengan terus mengembangkan fasilitas, program pendidikan, dan jumlah santri dari tahun ke tahun.
            </p>
            <div className="pullquote">
              <p>"Dengan dukungan para ulama, pendidik berkualitas, dan lingkungan yang penuh inspirasi, kami berusaha menjadi wadah tumbuhnya insan-insan unggul yang siap mengabdi kepada agama, masyarakat, dan bangsa."</p>
            </div>
          </div>
          <div className="timeline">
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-year">2012</div><div className="tl-title">Pendirian Pesantren</div><div className="tl-body">Pondok Pesantren Nur Antika didirikan oleh KH. Encep Subandi dan Nyai Hj. Hayati Nufus di Kp. Kadu, Ds. Pete, Kec. Tigaraksa, Kab. Tangerang - Banten.</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-year">Awal Berdiri</div><div className="tl-title">Pembukaan SMPIT</div><div className="tl-body">Dibuka jenjang pendidikan pertama yaitu SMPIT (SMP Islam Terpadu) Nur Antika untuk memulai program pendidikan formal berbasis pesantren.</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-year">Berkembang</div><div className="tl-title">Pembukaan SMKIT</div><div className="tl-body">Dibuka SMKIT (SMK Islam Terpadu) Nur Antika dengan Umi Hj. Hayati Nupus, M.Pd.i sebagai Kepala Sekolah, memperluas pilihan jenjang pendidikan kejuruan.</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-year">Bertumbuh</div><div className="tl-title">Pertumbuhan Regional</div><div className="tl-body">Pesantren terus berkembang menjadi pusat pembelajaran berpengaruh di tingkat regional dengan fasilitas yang semakin lengkap dan jumlah santri yang terus meningkat.</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-year">2026</div><div className="tl-title">Penerimaan Santri Baru 2026/2027</div><div className="tl-body">Membuka pendaftaran santri baru tahun ajaran 2026/2027, melanjutkan misi mencetak generasi yang berakhlak, berpengetahuan, dan berdaya saing tinggi.</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

import kegiatan1Img from './assets/kegiatan1.jpg';
import kegiatan2Img from './assets/kegiatan2.jpg';
import kegiatan3Img from './assets/kegiatan3.jpg';
import kegiatan4Img from './assets/kegiatan4.jpg';
import kegiatan5Img from './assets/kegiatan5.jpg';
import kegiatan6Img from './assets/kegiatan6.jpg';
import kegiatan7Img from './assets/kegiatan7.jpg';
import kegiatan8Img from './assets/kegiatan8.jpg';

function GaleriPage({ navigate }) {
  const galleryItems = [
    { src: kegiatan1Img, alt: 'Dokumentasi kegiatan santri 1' },
    { src: kegiatan2Img, alt: 'Dokumentasi kegiatan santri 2' },
    { src: kegiatan3Img, alt: 'Dokumentasi kegiatan santri 3' },
    { src: kegiatan4Img, alt: 'Dokumentasi kegiatan santri 4' },
    { src: kegiatan5Img, alt: 'Dokumentasi kegiatan santri 5' },
    { src: kegiatan6Img, alt: 'Dokumentasi kegiatan santri 6' },
    { src: kegiatan7Img, alt: 'Dokumentasi kegiatan santri 7' },
    { src: kegiatan8Img, alt: 'Dokumentasi kegiatan santri 8' }
  ];
  return (
    <div id="page-galeri">
      <div className="page-banner">
        <div className="page-banner-inner">
          <div className="breadcrumb">
            <a onClick={() => navigate('beranda')}>Beranda</a><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg><span>Profil</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg><span>Galeri Kegiatan</span>
          </div>
          <h1>Galeri Kegiatan</h1>
          <p>Dokumentasi kegiatan dan kehidupan santri Pondok Pesantren Nur Antika.</p>
        </div>
      </div>
      <div className="section">
        <div className="galeri-notice reveal">
          <div className="galeri-notice-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg></div>
          <p>Ikuti media sosial kami untuk melihat foto dan video terbaru kegiatan pesantren. &mdash; <a href="https://www.instagram.com/ponpes_nurantika/" target="_blank" rel="noopener noreferrer">@ponpes_nurantika</a> &nbsp;&middot;&nbsp; <a href="https://www.youtube.com/@pondokpesantrennurantika2489/featured" target="_blank" rel="noopener noreferrer">YouTube Nur Antika</a> &nbsp;&middot;&nbsp; <a href="https://www.tiktok.com/@official_nurantika" target="_blank" rel="noopener noreferrer">@official_nurantika</a></p>
        </div>
        <div className="sec-header-center reveal"><div className="sec-tag">Video</div><h2 className="sec-h2">Video <em>Kegiatan</em></h2><div className="sec-rule"></div></div>
        <div className="video-grid reveal">
          <div className="vid-wrap"><iframe src="https://www.youtube.com/embed/W9N34xCZfCc" title="Nur Antika 1" allowFullScreen loading="lazy"></iframe></div>
          <div className="vid-wrap"><iframe src="https://www.youtube.com/embed/-JshqK6p_hU" title="Nur Antika 2" allowFullScreen loading="lazy"></iframe></div>
        </div>
        <div className="sec-header-center reveal"><div className="sec-tag">Dokumentasi</div><h2 className="sec-h2">Kegiatan <em>Santri</em></h2><div className="sec-rule"></div></div>
        <div className="galeri-ph reveal">
          {galleryItems.map((item, i) => (
            <div className="galeri-ph-item" key={i}>
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import ruangKelasImg from './assets/ruangkelas.jpg';
import kamarPutraImg from './assets/kamarputra.jpg';
import kamarPutriImg from './assets/kmputri.jpg';

import labKomputerImg from './assets/labkom.jpg';
import kantorDinasImg from './assets/kantordinas.jpg';
import kantorPondokImg from './assets/kantorpondok.jpg';
import kamarMandiPutraImg from './assets/kmputra.jpg';
import kamarMandiPutriImg from './assets/kmputri.jpg';
import gedungSekolahImg from './assets/gedungsekolah.jpg';
import gedungBlkImg from './assets/gedungblk.jpg';
import lapanganImg from './assets/lapangan.jpg';
import musholaImg from './assets/mushola.jpg';

function FasilitasPage({ navigate }) {

  const facilities = [
    { title: "Ruang Kelas", imageSrc: ruangKelasImg, imageAlt: "Ruang kelas" },
    { title: "Kamar Santri Putra", imageSrc: kamarPutraImg, imageAlt: "Kamar santri putra" },
    { title: "Kamar Santri Putri", imageSrc: kamarPutriImg, imageAlt: "Kamar santri putri" },
    { title: "Lab Komputer", imageSrc: labKomputerImg, imageAlt: "Lab komputer" },
    { title: "Kantor Dinas", imageSrc: kantorDinasImg, imageAlt: "Kantor dinas" },
    { title: "Kantor Pondok", imageSrc: kantorPondokImg, imageAlt: "Kantor pondok" },
    { title: "Kamar Mandi Putra", imageSrc: kamarMandiPutraImg, imageAlt: "Kamar mandi putra" },
    { title: "Kamar Mandi Putri", imageSrc: kamarMandiPutriImg, imageAlt: "Kamar mandi putri" },
    { title: "Gedung Sekolah", imageSrc: gedungSekolahImg, imageAlt: "Gedung sekolah" },
    { title: "Gedung BLK", imageSrc: gedungBlkImg, imageAlt: "Gedung BLK" },
    { title: "Lapangan", imageSrc: lapanganImg, imageAlt: "Lapangan" },
    { title: "Mushola", imageSrc: musholaImg, imageAlt: "Mushola" }
  ];

  return (
    <div id="page-fasilitas">
      <div className="page-banner">
        <div className="page-banner-inner">
          <div className="breadcrumb"><a onClick={() => navigate('beranda')}>Beranda</a><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg><span>Fasilitas</span></div>
          <h1>Fasilitas</h1>
          <p>Fasilitas lengkap yang mendukung kegiatan belajar mengajar dan kehidupan para santri.</p>
        </div>
      </div>
      <div className="section">
        <div className="sec-header-center reveal"><div className="sec-tag">Fasilitas</div><h2 className="sec-h2">Fasilitas <em>Nur Antika</em></h2><div className="sec-rule"></div><p className="sec-body">Pondok Pesantren Nur Antika dilengkapi berbagai fasilitas modern yang menunjang kegiatan belajar dan kehidupan para santri secara menyeluruh.</p></div>
        <div className="fasilitas-grid reveal">
          {facilities.map((f, i) => (
            <div className="fasilitas-item" key={i}>
              <div className="fasilitas-thumb">
                <img src={f.imageSrc} alt={f.imageAlt} loading="lazy" />
              </div>
              <div className="fasilitas-body"><h3>{f.title}</h3></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function GuruPage({ navigate }) {
  const leaders = [
    {
      name: "Abi KH. Encep Subandi",
      role: "Pimpinan Pondok Pesantren Nur Antika",
      imageSrc: abiEncepImg,
      imageAlt: "Abi KH. Encep Subandi"
    },
    {
      name: "Umi Hj. Hayati Nupus, M.Pd.i",
      role: "Kepala Sekolah SMKIT Nur Antika",
      imageSrc: umiNupusImg,
      imageAlt: "Umi Hj. Hayati Nupus, M.Pd.i"
    },
    {
      name: "Gus Ahmad Irsyad Al Faruq, M.Ag",
      role: "Kepala Sekolah SMPIT Nur Antika",
      imageSrc: gusIrsyadImg,
      imageAlt: "Gus Ahmad Irsyad Al Faruq, M.Ag"
    },
    {
      name: "Hj. Lulu Zakiyatun Nufus, M.Ag",
      role: "Pengasuh Putri",
      imageSrc: hjLuluImg,
      imageAlt: "Hj. Lulu Zakiyatun Nufus, M.Ag"
    }
  ];
  const teachers = [
    { name: "H. Ibnu Abi Hatim Arrozi, S.Sos", role: "Ustadz PP Nur Antika" },
    { name: "Denia Aulia Gustami, S.H", role: "Ustadzah PP Nur Antika" },
    { name: "Hj. Diba Nahdliyatunn Nufus, S.Pd", role: "Ustadzah PP Nur Antika" },
    { name: "Misrina, S.Ag", role: "Ustadzah PP Nur Antika" },
    { name: "Melani Hayatun Nufus, S.Pd", role: "Guru SMPIT/SMKIT Nur Antika" },
    { name: "St. Solihah, S.Ag", role: "Guru SMPIT/SMKIT Nur Antika" },
    { name: "Husni Supriyana, S.Pd.i", role: "Kurikulum SMPIT/SMKIT" },
    { name: "Sry Ratna", role: "Guru SMPIT Nur Antika" },
    { name: "Moch. Deni Supiyani, S.H", role: "Guru SMPIT/SMKIT & Ustadz" },
    { name: "Rais Fitra Ramadhan, S.H", role: "Guru SMPIT/SMKIT & Ustadz" },
    { name: "Heriyana Jaenudin", role: "Guru SMPIT/SMKIT & Ustadz" },
    { name: "Cipto Purwo Utomo, S.Pd", role: "Guru SMPIT & Ustadz" },
    { name: "Fahmi Juniawan Padmadinata", role: "Ustadz Nur Antika" },
    { name: "Yuli Yuliana", role: "Ustadzah Nur Antika" },
    { name: "Siti Suhaibah, S.H", role: "Ustadzah Nur Antika" },
    { name: "Firdaus Al Ayyubi", role: "Ustadz Nur Antika" },
    { name: "Ardi Rohmana, S.Kom", role: "Ustadz Nur Antika" },
    { name: "Firdaus Al Ayyubi, S.Kom", role: "Ustadz Nur Antika" }
  ];
  return (
    <div id="page-guru">
      <div className="page-banner">
        <div className="page-banner-inner">
          <div className="breadcrumb"><a onClick={() => navigate('beranda')}>Beranda</a><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg><span>Dewan Guru</span></div>
          <h1>Dewan Guru</h1>
          <p>Dewan Asatidz Pondok Pesantren Nur Antika yang berdedikasi membimbing para santri.</p>
        </div>
      </div>
      <div className="section">
        <div className="sec-header-center reveal"><div className="sec-tag">Dewan Asatidz</div><h2 className="sec-h2">Pimpinan & <em>Pengajar</em></h2><div className="sec-rule"></div><p className="sec-body">Para pendidik berdedikasi yang membimbing santri dalam perjalanan menuntut ilmu agama dan pengetahuan umum.</p></div>
        <div style={{ marginBottom: '0.7rem' }}><div className="sec-tag" style={{ marginBottom: '1rem' }}>Pimpinan & Kepala Sekolah</div></div>
        <div className="guru-leaders reveal">{leaders.map((l, i) => (
          <div className="guru-leader-card" key={i}>
            <div className="guru-avatar" aria-hidden="true">
              <img src={l.imageSrc} alt={l.imageAlt} loading="lazy" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
            </div>
            <h3>{l.name}</h3>
            <div className="guru-role">{l.role}</div>
          </div>
        ))}</div>

        <div style={{ marginBottom: '1.2rem', marginTop: '1rem' }}><div className="sec-tag">Ustadz, Ustadzah & Guru</div></div>
        <div className="guru-grid reveal">{teachers.map((t, i) => (<div className="guru-card" key={i}><div className="guru-card-avatar"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg></div><h3>{t.name}</h3><div className="g-role">{t.role}</div></div>))}</div>
      </div>
    </div>
  );
}

function JenjangCard({ title, sub, icon, onClick }) {
  return (
    <div className="jenjang-card" onClick={onClick}>
      <div className="jc-icon-wrap">{icon}</div>
      <div className="jc-h">{title}</div>
      <div className="jc-sub">{sub}</div>
      <div className="jc-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></div>
    </div>
  );
}

function JenjangPage({ navigate }) {
  return (
    <div id="page-jenjang">
      <div className="page-banner">
        <div className="page-banner-inner">
          <div className="breadcrumb"><a onClick={() => navigate('beranda')}>Beranda</a><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg><span>Jenjang Pendidikan</span></div>
          <h1>Jenjang Pendidikan</h1>
          <p>Program pendidikan formal terintegrasi di Pondok Pesantren Nur Antika.</p>
        </div>
      </div>
      <div className="section">
        <div className="jenjang-cards reveal">
          <JenjangCard title="SMPIT Nur Antika" sub="SMP Islam Terpadu · Jenjang Menengah Pertama" onClick={() => navigate('smpit')} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>} />
          <JenjangCard title="SMKIT Nur Antika" sub="SMK Islam Terpadu · Pendidikan Vokasional" onClick={() => navigate('smkit')} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>} />
          <JenjangCard title="SMA IT Nur Antika" sub="SMA Islam Terpadu · Jenjang Menengah Atas" onClick={() => navigate('smait')} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>} />
        </div>
      </div>
    </div>
  );
}

function SmpitPage({ navigate }) {
  return (
    <div id="page-smpit">
      <div className="page-banner">
        <div className="page-banner-inner">
          <div className="breadcrumb"><a onClick={() => navigate('beranda')}>Beranda</a><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg><a onClick={() => navigate('jenjang')}>Jenjang Pendidikan</a><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg><span>SMPIT</span></div>
          <h1>SMPIT Nur Antika</h1>
          <p>SMP Islam Terpadu berbasis pesantren - pendidikan berkualitas dengan pendekatan holistik.</p>
        </div>
      </div>
      <div className="section">
        <div className="jd-wrap reveal">
          <div className="jd-head"><h2 style={{ color: 'var(--c-cream)' }}>SMPIT Nur Antika</h2><p>Kepala Sekolah: <strong>Gus Ahmad Irsyad Al Faruq, M.Ag</strong></p></div>
          <div className="jd-body">
            <JdSection title="Tentang SMPIT" content="Selamat datang di SMP Nur Antika, sebuah lembaga pendidikan yang berkomitmen untuk menyediakan pendidikan berkualitas dengan pendekatan holistik yang memadukan nilai keislaman, akademik, dan pengembangan karakter secara menyeluruh." />
            <JdSection title="Visi" content="Menjadi lembaga pendidikan yang unggul dalam mengembangkan potensi akademik, karakter, dan kreativitas siswa untuk menghadapi tantangan global." />
            <JdSection title="Misi" items={["Memberikan pendidikan berkualitas yang mengedepankan nilai-nilai agama, kejujuran, dan kepedulian sosial.", "Mengembangkan potensi akademik siswa melalui kurikulum yang inovatif dan komprehensif.", "Mendorong pengembangan karakter siswa yang berintegritas, mandiri, dan bertanggung jawab.", "Memberikan lingkungan yang kondusif untuk pengembangan kreativitas dan minat siswa dalam berbagai bidang."]} />
            <JdSection title="Kurikulum" content="SMP Nur Antika menawarkan kurikulum yang seimbang antara mata pelajaran akademik dan pengembangan karakter. Kami menyelaraskan materi pelajaran dengan standar nasional sambil menambahkan elemen-elemen inovatif untuk mempersiapkan siswa menghadapi tantangan masa depan." />
            <JdSection title="Pembelajaran" content="Kami menerapkan metode pembelajaran aktif dan kolaboratif untuk mendorong partisipasi aktif siswa dalam proses belajar. Guru kami berkomitmen untuk memberikan bimbingan yang tepat dan mendukung setiap langkah perkembangan siswa." />
            <JdSection title="Fasilitas" content="SMP Nur Antika dilengkapi dengan fasilitas modern yang mencakup ruang kelas interaktif, perpustakaan, laboratorium sains, lapangan olahraga, dan fasilitas teknologi pendidikan." />
            <JdSection title="Ekstrakurikuler" content="Kami memberikan beragam pilihan kegiatan ekstrakurikuler untuk mendukung perkembangan minat dan bakat siswa di berbagai bidang, seperti seni, olahraga, sains, dan lingkungan." />
            <JdSection title="Kontribusi Sosial" content="SMP Nur Antika juga mendorong siswa untuk berpartisipasi dalam kegiatan sosial, seperti bakti sosial dan program kepedulian terhadap lingkungan sekitar." />
            <div style={{ marginTop: '2.5rem' }}>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfnR9pMQaZ_7KntvSpAcv5D1j0MB7F7kJHF6XNt2_H-RnstQA/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer" className="btn btn-green"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>Daftar SMPIT Sekarang</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SmkitPage({ navigate }) {
  return (
    <div id="page-smkit">
      <div className="page-banner">
        <div className="page-banner-inner">
          <div className="breadcrumb"><a onClick={() => navigate('beranda')}>Beranda</a><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg><a onClick={() => navigate('jenjang')}>Jenjang Pendidikan</a><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg><span>SMKIT</span></div>
          <h1>SMKIT Nur Antika</h1>
          <p>SMK Islam Terpadu - pendidikan vokasional berkualitas tinggi berorientasi dunia kerja.</p>
        </div>
      </div>
      <div className="section">
        <div className="jd-wrap reveal">
          <div className="jd-head"><h2 style={{ color: 'var(--c-cream)' }}>SMKIT Nur Antika</h2><p>Kepala Sekolah: <strong>Umi Hj. Hayati Nupus, M.Pd.i</strong></p></div>
          <div className="jd-body">
            <JdSection title="Tentang SMKIT" content="Selamat datang di SMK Nur Antika, sekolah menengah kejuruan yang berdedikasi untuk memberikan pendidikan vokasional berkualitas tinggi dengan pendekatan yang berorientasi pada dunia kerja." />
            <JdSection title="Visi" content="Menjadi lembaga pendidikan kejuruan terkemuka yang menghasilkan lulusan yang kompeten dan siap menghadapi tantangan industri global." />
            <JdSection title="Misi" items={["Menyediakan pendidikan vokasional berkualitas yang mengikuti perkembangan industri terkini.", "Mengembangkan keterampilan teknis dan soft skills siswa untuk memenuhi tuntutan dunia kerja.", "Memberikan pengalaman praktik langsung melalui kolaborasi dengan industri dan program magang.", "Mendorong sikap etika, tanggung jawab, dan profesionalisme di kalangan siswa."]} />
            <JdSection title="Kurikulum" content="SMK Nur Antika menyediakan program pembelajaran yang berfokus pada keterampilan praktis dan pengetahuan teknis yang relevan dengan berbagai industri. Kurikulum kami dirancang dengan menggabungkan pembelajaran kelas dengan pelatihan praktik langsung." />
            <JdSection title="Program Kejuruan" content="Kami menawarkan beragam program kejuruan yang mencakup sektor-sektor seperti teknologi informasi, otomotif, kuliner, desain grafis, dan lainnya. Setiap program dirancang untuk mempersiapkan siswa dengan keterampilan yang dibutuhkan di dunia kerja." />
            <JdSection title="Pengalaman Industri" content="SMK Nur Antika menjalin kemitraan dengan berbagai perusahaan dan industri untuk memberikan pengalaman praktik langsung kepada siswa. Program magang dan kunjungan lapangan merupakan bagian integral dari pendidikan di SMK kami." />
            <JdSection title="Fasilitas" content="Kami memiliki fasilitas lengkap, termasuk ruang kelas khusus, laboratorium teknis, perpustakaan, dan ruang praktik yang modern dan sesuai dengan kebutuhan program kejuruan." />
            <JdSection title="Pengembangan Karir" content="Selain keterampilan teknis, kami juga memberikan perhatian pada pengembangan soft skills dan persiapan untuk menghadapi dunia kerja. Konselor karir kami membantu siswa dalam mempersiapkan diri untuk melanjutkan studi atau memasuki dunia kerja." />
            <div style={{ marginTop: '2.5rem' }}>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfnR9pMQaZ_7KntvSpAcv5D1j0MB7F7kJHF6XNt2_H-RnstQA/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer" className="btn btn-green"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>Daftar SMKIT Sekarang</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SmaItPage({ navigate }) {
  return (
    <div id="page-smait">
      <div className="page-banner">
        <div className="page-banner-inner">
          <div className="breadcrumb"><a onClick={() => navigate('beranda')}>Beranda</a><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg><a onClick={() => navigate('jenjang')}>Jenjang Pendidikan</a><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg><span>SMA IT</span></div>
          <h1>SMA IT Nur Antika</h1>
          <p>SMA Islam Terpadu - jenjang menengah atas berbasis pesantren.</p>
        </div>
      </div>
      <div className="section">
        <div className="smait-box reveal">
          <div className="smait-box-head"><h2>SMA IT Nur Antika</h2><p>SMA Islam Terpadu Nur Antika - Jenjang Menengah Atas</p></div>
          <div className="smait-box-body">
            <p style={{ fontSize: '0.92rem', lineHeight: 1.85, color: 'var(--c-muted)', fontWeight: 300, marginBottom: '1.5rem' }}>
              SMA IT Nur Antika merupakan jenjang pendidikan menengah atas yang terintegrasi dengan program Pondok Pesantren Nur Antika, menyiapkan santri dengan landasan akademik yang kuat, nilai-nilai keislaman yang mendalam, dan karakter yang siap menghadapi dunia.
            </p>
            <div className="info-notice">
              <h3>Informasi Lebih Lanjut</h3>
              <p>Untuk informasi lengkap mengenai program SMA IT Nur Antika, silakan hubungi kami langsung atau kunjungi halaman pendaftaran untuk mendapatkan informasi terkini.</p>
              <div className="info-notice-btns">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfnR9pMQaZ_7KntvSpAcv5D1j0MB7F7kJHF6XNt2_H-RnstQA/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer" className="btn btn-green">Daftar Sekarang</a>
                <a href="https://wa.me/6282113463606" target="_blank" rel="noopener noreferrer" className="btn btn-stroke">Tanya via WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



function JdSection({ title, content, items }) {
  return (
    <div className="jd-section">
      <div className="jd-section-title"><div className="jd-rule"></div>{title}</div>
      {content && <p>{content}</p>}
      {items && <ol className="jd-ol">{items.map((item, i) => <li key={i}>{item}</li>)}</ol>}
    </div>
  );
}

function TanyaPage({ navigate, toggleFaq, openFaqs }) {
  const faqs = [
    { q: "Apa itu Pondok Pesantren Nur Antika?", a: "Pondok Pesantren Nur Antika adalah lembaga pendidikan Islam yang berfokus pada pengembangan spiritual, akademik, dan sosial para santrinya. Didirikan pada tahun 2012 oleh KH. Encep Subandi dan Nyai Hj. Hayati Nufus, berlokasi di Kp. Kadu Ds. Pete, Kec. Tigaraksa, Kab. Tangerang - Banten." },
    { q: "Jenjang pendidikan apa saja yang tersedia?", a: "Pondok Pesantren Nur Antika memiliki tiga jenjang pendidikan formal: SMPIT (SMP Islam Terpadu), SMKIT (SMK Islam Terpadu), dan SMA IT Nur Antika. Semua jenjang terintegrasi penuh dengan program pendidikan pesantren." },
    { q: "Bagaimana cara mendaftar sebagai santri baru?", a: "Pendaftaran dapat dilakukan secara online melalui Google Forms yang tersedia di halaman Pendaftaran. Anda juga dapat mengunduh brosur untuk informasi lengkap mengenai syarat dan prosedur. Untuk informasi lebih lanjut, hubungi 082113463606." },
    { q: "Apakah pendaftaran tahun ajaran 2026/2027 sudah dibuka?", a: "Ya. Penerimaan Santri Baru Tahun Ajaran 2026/2027 telah resmi dibuka. Segera daftarkan diri melalui formulir online yang tersedia di halaman Pendaftaran atau hubungi kami untuk informasi lebih lanjut." },
    { q: "Di mana lokasi Pondok Pesantren Nur Antika?", a: "Pondok Pesantren Nur Antika berlokasi di Kp. Kadu Ds. Pete, Kec. Tigaraksa, Kabupaten Tangerang - Banten 15720. Peta lokasi tersedia di halaman Beranda dan halaman Tentang Pesantren." },
    { q: "Apa visi dan misi Pondok Pesantren Nur Antika?", a: "Visi: Mencetak insan religius yang unggul dalam IMTAQ dan IPTEK, serta berakhlaqul karimah. Misi: Mendidik santri agar memahami dan mengamalkan Al-Qur'an; membekali santri dengan IPTEK dan keterampilan hidup; serta mencetak generasi penerus bangsa yang tangguh, unggul, dan berkarakter." },
    { q: "Bagaimana cara menghubungi Pondok Pesantren Nur Antika?", a: "Telepon/WhatsApp: 082113463606 · Email: pondokpesantrennurantika@gmail.com · Instagram: @ponpes_nurantika · YouTube: Pondok Pesantren Nur Antika · TikTok: @official_nurantika · Facebook: ponpes.nurantika.5" },
    { q: "Fasilitas apa saja yang tersedia di pesantren?", a: "Fasilitas yang tersedia: Ruang Kelas, Kamar Santri Putra dan Putri, Lab Komputer, Kantor Dinas, Kantor Pondok, Kamar Mandi Putra dan Putri, Gedung Sekolah, Gedung BLK, Lapangan, dan Mushola." }
  ];
  return (
    <div id="page-tanya">
      <div className="page-banner">
        <div className="page-banner-inner">
          <div className="breadcrumb"><a onClick={() => navigate('beranda')}>Beranda</a><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg><span>Tanya Jawab</span></div>
          <h1>Tanya Jawab</h1>
          <p>Pertanyaan yang sering diajukan tentang Pondok Pesantren Nur Antika.</p>
        </div>
      </div>
      <div className="section">
        <div className="sec-header-center reveal"><div className="sec-tag">FAQ</div><h2 className="sec-h2">Pertanyaan yang Sering <em>Diajukan</em></h2><div className="sec-rule"></div><p className="sec-body">Temukan jawaban atas pertanyaan umum seputar Pondok Pesantren Nur Antika, program pendidikan, dan proses pendaftaran.</p></div>
        <div className="faq-wrap reveal">{faqs.map((f, i) => (<div className={`faq-item ${openFaqs[i] ? 'open' : ''}`} key={i}><div className="faq-q" onClick={() => toggleFaq(i)}><h4>{f.q}</h4><div className="faq-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg></div></div><div className="faq-a">{f.a}</div></div>))}</div>
        <div className="cta-box reveal"><h3>Masih Ada Pertanyaan?</h3><p>Jangan ragu menghubungi kami langsung. Tim Pondok Pesantren Nur Antika siap memberikan informasi yang Anda butuhkan.</p><div className="cta-box-btns"><a href="https://wa.me/6282113463606" target="_blank" rel="noopener noreferrer" className="btn btn-green"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>Chat WhatsApp</a><a href="mailto:pondokpesantrennurantika@gmail.com" className="btn btn-stroke">Kirim Email</a></div></div>
      </div>
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer>
      <div className="foot-inner">
        <div className="foot-top">
          <div className="foot-brand">
            <div className="foot-logo-row">
              <div className="foot-emblem">
                <img
                  src="/favicon.png"
                  alt="Nur Antika favicon"
                  draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 0, display: 'block' }}
                />
              </div>
              <div className="foot-name">Pondok Pesantren Nur Antika</div>
            </div>
            <p>Lembaga pendidikan Islam yang mendidik pemuda/i belajar ilmu agama dan ilmu pengetahuan umum. Didirikan oleh KH. Encep Subandi dan Nyai Hj. Hayati Nufus sejak 2012.</p>
            <div className="foot-social">
              <a href="https://www.facebook.com/ponpes.nurantika.5?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="foot-soc" title="Facebook"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
              <a href="https://www.instagram.com/ponpes_nurantika/" target="_blank" rel="noopener noreferrer" className="foot-soc" title="Instagram"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg></a>
              <a href="https://www.youtube.com/@pondokpesantrennurantika2489/featured" target="_blank" rel="noopener noreferrer" className="foot-soc" title="YouTube"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" /></svg></a>
              <a href="https://www.tiktok.com/@official_nurantika" target="_blank" rel="noopener noreferrer" className="foot-soc" title="TikTok"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" /></svg></a>
              <a href="https://wa.me/6282113463606" target="_blank" rel="noopener noreferrer" className="foot-soc" title="WhatsApp"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg></a>
            </div>
          </div>
          <div className="foot-col">
            <h4>Navigasi</h4>
            <ul><li><a onClick={() => navigate('beranda')}>Beranda</a></li><li><a onClick={() => navigate('tentang')}>Tentang Pesantren</a></li><li><a onClick={() => navigate('sejarah')}>Sejarah</a></li><li><a onClick={() => navigate('galeri')}>Galeri Kegiatan</a></li><li><a onClick={() => navigate('fasilitas')}>Fasilitas</a></li></ul>
          </div>
          <div className="foot-col">
            <h4>Jenjang Pendidikan</h4>
            <ul><li><a onClick={() => navigate('smpit')}>SMPIT Nur Antika</a></li><li><a onClick={() => navigate('smkit')}>SMKIT Nur Antika</a></li><li><a onClick={() => navigate('smait')}>SMA IT Nur Antika</a></li></ul>
            <h4 style={{ marginTop: '1.5rem' }}>Informasi</h4>
            <ul><li><a onClick={() => navigate('guru')}>Dewan Guru</a></li><li><a onClick={() => navigate('tanya')}>Tanya Jawab</a></li></ul>

          </div>
          <div className="foot-col">
            <h4>Kontak</h4>
            <ul><li><a style={{ cursor: 'default', lineHeight: 1.6 }}>Kp. Kadu Ds. Pete, Kec. Tigaraksa, Kab. Tangerang - Banten 15720</a></li><li><a href="tel:082113463606">082113463606</a></li><li><a href="mailto:pondokpesantrennurantika@gmail.com" style={{ fontSize: '0.78rem' }}>pondokpesantrennurantika@gmail.com</a></li></ul>
            <div style={{ marginTop: '1.5rem' }}><a href="https://docs.google.com/forms/d/e/1FAIpQLSfnR9pMQaZ_7KntvSpAcv5D1j0MB7F7kJHF6XNt2_H-RnstQA/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer" className="btn btn-green" style={{ fontSize: '0.8rem', padding: '10px 18px' }}>Daftar Sekarang</a></div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>&copy; 2026 NUKA MEDIA &middot; Pondok Pesantren Nur Antika. All rights reserved.</span>
          <span>Kec. Tigaraksa, Kab. Tangerang - Banten</span>
        </div>
      </div>
    </footer>
  );
}
