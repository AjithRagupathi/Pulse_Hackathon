import { useState, useEffect, useRef } from "react";

// ─── STYLES ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0F1B2D;
    --charcoal: #1E2A3A;
    --blue: #2D7FF9;
    --teal: #00D4AA;
    --white: #F0F4FF;
    --muted: #8A9BB5;
    --card: rgba(30,42,58,0.7);
    --border: rgba(45,127,249,0.15);
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--navy);
    color: var(--white);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* ── NOISE OVERLAY ── */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.4;
  }

  /* ── NAV ── */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 4rem;
    background: rgba(15,27,45,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    transition: padding 0.3s;
  }
  nav.scrolled { padding: 0.8rem 4rem; }
  .nav-logo {
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--white);
  }
  .nav-logo span { color: var(--blue); }
  .nav-links { display: flex; gap: 2.5rem; align-items: center; }
  .nav-links a {
    color: var(--muted);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--white); }
  .btn-nav {
    background: var(--blue);
    color: #fff;
    border: none;
    padding: 0.6rem 1.4rem;
    border-radius: 6px;
    font-family: var(--font-body);
    font-weight: 500;
    font-size: 0.9rem;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s;
  }
  .btn-nav:hover { opacity: 0.85; transform: translateY(-1px); }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 8rem 2rem 4rem;
    position: relative;
    overflow: hidden;
  }
  .hero-glow {
    position: absolute;
    width: 700px; height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(45,127,249,0.18) 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%, -60%);
    pointer-events: none;
  }
  .hero-glow-teal {
    position: absolute;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,170,0.1) 0%, transparent 70%);
    bottom: 10%; right: 10%;
    pointer-events: none;
  }
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(45,127,249,0.12);
    border: 1px solid rgba(45,127,249,0.3);
    border-radius: 100px;
    padding: 0.4rem 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--blue);
    margin-bottom: 2rem;
    letter-spacing: 0.04em;
  }
  .hero-badge-dot {
    width: 6px; height: 6px;
    background: var(--teal);
    border-radius: 50%;
    animation: pulse-dot 1.5s infinite;
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }
  .hero h1 {
    font-family: var(--font-display);
    font-size: clamp(3rem, 7vw, 6rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin-bottom: 1.5rem;
    max-width: 900px;
  }
  .hero h1 .accent { color: var(--blue); }
  .hero h1 .accent-teal { color: var(--teal); }
  .hero-sub {
    font-size: 1.15rem;
    color: var(--muted);
    max-width: 560px;
    margin: 0 auto 2.5rem;
    font-weight: 300;
    line-height: 1.7;
  }
  .hero-cta {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 4rem;
  }
  .btn-primary {
    background: var(--blue);
    color: #fff;
    border: none;
    padding: 0.9rem 2rem;
    border-radius: 8px;
    font-family: var(--font-body);
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
  .btn-primary:hover { opacity: 0.85; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(45,127,249,0.35); }
  .btn-ghost {
    background: transparent;
    color: var(--white);
    border: 1px solid rgba(240,244,255,0.2);
    padding: 0.9rem 2rem;
    border-radius: 8px;
    font-family: var(--font-body);
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-ghost:hover { border-color: rgba(240,244,255,0.5); background: rgba(240,244,255,0.05); transform: translateY(-2px); }

  /* ── STATS STRIP ── */
  .stats-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
  }
  .stat-item {
    background: var(--card);
    padding: 1.5rem;
    text-align: center;
    backdrop-filter: blur(10px);
  }
  .stat-num {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 800;
    color: var(--blue);
    display: block;
  }
  .stat-label {
    font-size: 0.78rem;
    color: var(--muted);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-top: 0.25rem;
  }

  /* ── SECTION COMMON ── */
  section { padding: 6rem 4rem; }
  .section-label {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 1rem;
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
  }
  .section-sub {
    color: var(--muted);
    font-size: 1.05rem;
    max-width: 540px;
    line-height: 1.7;
    font-weight: 300;
  }
  .section-header { margin-bottom: 3.5rem; }

  /* ── FEATURES ── */
  .features { background: var(--charcoal); }
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  .feature-card {
    background: rgba(15,27,45,0.6);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2rem;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }
  .feature-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--blue), var(--teal));
    opacity: 0;
    transition: opacity 0.3s;
  }
  .feature-card:hover { transform: translateY(-4px); border-color: rgba(45,127,249,0.3); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
  .feature-card:hover::before { opacity: 1; }
  .feature-icon {
    width: 48px; height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
  }
  .feature-card h3 {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    letter-spacing: -0.01em;
  }
  .feature-card p { color: var(--muted); font-size: 0.9rem; line-height: 1.65; font-weight: 300; }

  /* ── REBOOT APP ── */
  .reboot { position: relative; overflow: hidden; }
  .reboot-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
  .reboot-mockup {
    background: var(--charcoal);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 1.5rem;
    position: relative;
  }
  .mockup-bar {
    display: flex;
    gap: 6px;
    margin-bottom: 1.2rem;
  }
  .mockup-dot { width: 10px; height: 10px; border-radius: 50%; }
  .mockup-screen {
    background: var(--navy);
    border-radius: 12px;
    padding: 1.5rem;
    min-height: 300px;
  }
  .mock-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  .mock-title { font-family: var(--font-display); font-size: 0.95rem; font-weight: 700; }
  .mock-badge {
    background: rgba(0,212,170,0.15);
    color: var(--teal);
    border: 1px solid rgba(0,212,170,0.3);
    border-radius: 100px;
    padding: 0.2rem 0.7rem;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.04em;
  }
  .mock-stat-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    margin-bottom: 1.2rem;
  }
  .mock-stat {
    background: var(--charcoal);
    border-radius: 10px;
    padding: 0.85rem;
    border: 1px solid var(--border);
  }
  .mock-stat-n {
    font-family: var(--font-display);
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--blue);
  }
  .mock-stat-l { font-size: 0.68rem; color: var(--muted); margin-top: 2px; }
  .mock-bar-row { display: flex; flex-direction: column; gap: 0.6rem; }
  .mock-bar-item { display: flex; align-items: center; gap: 0.75rem; }
  .mock-bar-label { font-size: 0.75rem; color: var(--muted); width: 60px; flex-shrink: 0; }
  .mock-bar-track {
    flex: 1;
    height: 6px;
    background: rgba(255,255,255,0.06);
    border-radius: 100px;
    overflow: hidden;
  }
  .mock-bar-fill {
    height: 100%;
    border-radius: 100px;
    background: linear-gradient(90deg, var(--blue), var(--teal));
    transition: width 1.5s ease;
  }
  .mock-bar-val { font-size: 0.75rem; color: var(--white); width: 35px; text-align: right; }
  .reboot-features { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 2rem; }
  .reboot-feat {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }
  .reboot-feat-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(45,127,249,0.12);
    border: 1px solid rgba(45,127,249,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .reboot-feat h4 { font-family: var(--font-display); font-size: 0.95rem; font-weight: 700; margin-bottom: 0.3rem; }
  .reboot-feat p { color: var(--muted); font-size: 0.85rem; line-height: 1.6; font-weight: 300; }

  /* ── TESTIMONIALS ── */
  .testimonials { background: var(--charcoal); }
  .testi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  .testi-card {
    background: rgba(15,27,45,0.7);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2rem;
    position: relative;
  }
  .testi-quote {
    font-size: 3rem;
    line-height: 1;
    color: var(--blue);
    opacity: 0.3;
    font-family: Georgia, serif;
    margin-bottom: 0.5rem;
  }
  .testi-text {
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    font-style: italic;
    font-weight: 300;
  }
  .testi-author { display: flex; align-items: center; gap: 0.75rem; }
  .testi-avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
    flex-shrink: 0;
  }
  .testi-name { font-weight: 600; font-size: 0.9rem; }
  .testi-role { color: var(--muted); font-size: 0.78rem; }
  .stars { color: #F59E0B; font-size: 0.8rem; margin-bottom: 0.75rem; }

  /* ── PRICING ── */
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    max-width: 960px;
    margin: 0 auto;
  }
  .pricing-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 2.5rem 2rem;
    position: relative;
    transition: transform 0.3s;
  }
  .pricing-card:hover { transform: translateY(-4px); }
  .pricing-card.featured {
    border-color: var(--blue);
    background: linear-gradient(160deg, rgba(45,127,249,0.12), rgba(0,212,170,0.06));
  }
  .featured-badge {
    position: absolute;
    top: -14px; left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(90deg, var(--blue), var(--teal));
    color: #fff;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.3rem 1rem;
    border-radius: 100px;
  }
  .pricing-tier {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0.75rem;
  }
  .pricing-price {
    font-family: var(--font-display);
    font-size: 2.5rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    margin-bottom: 0.25rem;
  }
  .pricing-price span { font-size: 1rem; font-weight: 400; color: var(--muted); }
  .pricing-desc { color: var(--muted); font-size: 0.85rem; margin-bottom: 1.5rem; font-weight: 300; }
  .pricing-divider { height: 1px; background: var(--border); margin-bottom: 1.5rem; }
  .pricing-features { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; }
  .pricing-features li { display: flex; align-items: center; gap: 0.6rem; font-size: 0.88rem; color: var(--muted); }
  .pricing-features li .check { color: var(--teal); font-size: 0.9rem; }
  .btn-pricing {
    width: 100%;
    padding: 0.85rem;
    border-radius: 8px;
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid var(--blue);
    background: transparent;
    color: var(--blue);
  }
  .btn-pricing:hover { background: var(--blue); color: #fff; }
  .btn-pricing.featured-btn { background: var(--blue); color: #fff; }
  .btn-pricing.featured-btn:hover { opacity: 0.85; }

  /* ── DEMO / PRODUCT TOUR ── */
  .demo-section { background: var(--charcoal); }
  .demo-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }
  .demo-tab {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--muted);
    padding: 0.6rem 1.2rem;
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .demo-tab.active {
    background: var(--blue);
    border-color: var(--blue);
    color: #fff;
  }
  .demo-tab:hover:not(.active) { border-color: rgba(45,127,249,0.4); color: var(--white); }
  .demo-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }
  .demo-info h3 {
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: 800;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }
  .demo-info p { color: var(--muted); line-height: 1.7; font-weight: 300; margin-bottom: 1.5rem; }
  .demo-points { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
  .demo-points li { display: flex; align-items: center; gap: 0.6rem; font-size: 0.9rem; color: var(--muted); }
  .demo-points li::before { content: '→'; color: var(--teal); font-weight: 700; }
  .demo-visual {
    background: var(--navy);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 2rem;
    min-height: 320px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .demo-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: var(--charcoal);
    border-radius: 10px;
    padding: 0.9rem 1rem;
    border: 1px solid var(--border);
    font-size: 0.85rem;
    transition: border-color 0.2s;
  }
  .demo-row:hover { border-color: rgba(45,127,249,0.3); }
  .demo-row-icon {
    width: 32px; height: 32px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.9rem;
    flex-shrink: 0;
  }
  .demo-row-info { flex: 1; }
  .demo-row-name { font-weight: 500; font-size: 0.85rem; }
  .demo-row-meta { font-size: 0.72rem; color: var(--muted); }
  .demo-row-status {
    padding: 0.2rem 0.6rem;
    border-radius: 100px;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  /* ── FAQ ── */
  .faq-list { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
  .faq-item {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.2s;
  }
  .faq-item.open { border-color: rgba(45,127,249,0.3); }
  .faq-q {
    width: 100%;
    background: transparent;
    border: none;
    color: var(--white);
    font-family: var(--font-body);
    font-size: 0.95rem;
    font-weight: 500;
    padding: 1.25rem 1.5rem;
    text-align: left;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
  .faq-chevron {
    color: var(--blue);
    font-size: 1.2rem;
    transition: transform 0.3s;
    flex-shrink: 0;
  }
  .faq-item.open .faq-chevron { transform: rotate(45deg); }
  .faq-a {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s ease, padding 0.35s;
    padding: 0 1.5rem;
    color: var(--muted);
    font-size: 0.9rem;
    line-height: 1.7;
    font-weight: 300;
  }
  .faq-item.open .faq-a { max-height: 200px; padding: 0 1.5rem 1.25rem; }

  /* ── PARTNERS ── */
  .partners { background: var(--charcoal); }
  .partners-strip {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }
  .partner-pill {
    background: rgba(15,27,45,0.7);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1rem 2rem;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--muted);
    letter-spacing: 0.02em;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .partner-pill:hover { border-color: rgba(45,127,249,0.3); color: var(--white); }

  /* ── BLOG TEASER ── */
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;
  }
  .blog-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.3s, border-color 0.3s;
  }
  .blog-card:hover { transform: translateY(-4px); border-color: rgba(45,127,249,0.3); }
  .blog-thumb {
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    position: relative;
    overflow: hidden;
  }
  .blog-body { padding: 1.5rem; }
  .blog-tag {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--blue);
    margin-bottom: 0.6rem;
  }
  .blog-title {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.4;
    margin-bottom: 0.75rem;
    letter-spacing: -0.01em;
  }
  .blog-meta { font-size: 0.78rem; color: var(--muted); }

  /* ── CTA ── */
  .cta-section {
    text-align: center;
    padding: 8rem 4rem;
    position: relative;
    overflow: hidden;
  }
  .cta-section::before {
    content: '';
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(45,127,249,0.15) 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .cta-section h2 {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    max-width: 700px;
    margin: 0 auto 1.5rem;
    line-height: 1.1;
  }
  .cta-section p { color: var(--muted); font-size: 1.05rem; margin-bottom: 2.5rem; font-weight: 300; }
  .cta-form {
    display: flex;
    gap: 1rem;
    justify-content: center;
    max-width: 480px;
    margin: 0 auto;
    flex-wrap: wrap;
  }
  .cta-input {
    flex: 1;
    min-width: 200px;
    background: rgba(30,42,58,0.8);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.9rem 1.2rem;
    color: var(--white);
    font-family: var(--font-body);
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s;
  }
  .cta-input:focus { border-color: var(--blue); }
  .cta-input::placeholder { color: var(--muted); }

  /* ── FOOTER ── */
  footer {
    background: var(--charcoal);
    border-top: 1px solid var(--border);
    padding: 3rem 4rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .footer-logo { font-family: var(--font-display); font-size: 1.3rem; font-weight: 800; }
  .footer-logo span { color: var(--blue); }
  .footer-copy { color: var(--muted); font-size: 0.82rem; }
  .footer-links { display: flex; gap: 1.5rem; }
  .footer-links a { color: var(--muted); text-decoration: none; font-size: 0.82rem; transition: color 0.2s; }
  .footer-links a:hover { color: var(--white); }

  /* ── SCROLL ANIMATE ── */
  .fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-up.visible { opacity: 1; transform: translateY(0); }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    nav { padding: 1rem 1.5rem; }
    nav.scrolled { padding: 0.7rem 1.5rem; }
    .nav-links { display: none; }
    section { padding: 4rem 1.5rem; }
    .hero { padding: 7rem 1.5rem 3rem; }
    .stats-strip { grid-template-columns: repeat(2, 1fr); }
    .features-grid { grid-template-columns: 1fr; }
    .reboot-grid { grid-template-columns: 1fr; }
    .demo-content { grid-template-columns: 1fr; }
    .pricing-grid { grid-template-columns: 1fr; max-width: 400px; }
    .blog-grid { grid-template-columns: 1fr; }
    footer { flex-direction: column; text-align: center; }
    .cta-section { padding: 5rem 1.5rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: "👤",
    color: "rgba(45,127,249,0.15)",
    title: "Member Management",
    desc: "Digital onboarding, plan assignments, health forms, and multi-location support — all in one place.",
  },
  {
    icon: "🚪",
    color: "rgba(0,212,170,0.12)",
    title: "Attendance & Access",
    desc: "QR code and biometric check-ins with real-time dashboards, alerts, and hardware integrations.",
  },
  {
    icon: "📅",
    color: "rgba(99,102,241,0.15)",
    title: "Scheduling & Classes",
    desc: "Drag-and-drop timetable builder, trainer conflict detection, waitlists, and recurring templates.",
  },
  {
    icon: "💳",
    color: "rgba(245,158,11,0.12)",
    title: "Payments & Billing",
    desc: "Razorpay / Stripe support, GST-compliant invoices, and automated WhatsApp/SMS reminders.",
  },
  {
    icon: "🏋️",
    color: "rgba(239,68,68,0.12)",
    title: "Trainer & Staff",
    desc: "Role-based permissions, commission tracking, shift scheduling, and leave management.",
  },
  {
    icon: "📊",
    color: "rgba(45,127,249,0.15)",
    title: "Analytics & Reporting",
    desc: "Revenue trends, class occupancy rates, member LTV, and cohort retention dashboards.",
  },
  {
    icon: "📣",
    color: "rgba(0,212,170,0.12)",
    title: "Communication & Marketing",
    desc: "Bulk campaigns, birthday flows, win-back sequences, and lead management for prospects.",
  },
  {
    icon: "📦",
    color: "rgba(245,158,11,0.12)",
    title: "Inventory & Equipment",
    desc: "Supplement POS, merchandise tracking, low-stock alerts, and maintenance schedules.",
  },
];

const testimonials = [
  {
    quote:
      "PULSE replaced three separate tools for us. Attendance, billing, and member comms — all in one dashboard. Our front desk team saved 2 hours a day.",
    name: "Rajesh Kumar",
    role: "Owner, IronEdge Fitness, Chennai",
    initials: "RK",
    color: "#2D7FF9",
  },
  {
    quote:
      "The WhatsApp automation alone brought back 40 dormant members in the first month. The ROI was immediate and obvious.",
    name: "Priya Nair",
    role: "Director, FlexZone Studios, Chennai",
    initials: "PN",
    color: "#00D4AA",
  },
  {
    quote:
      "As a chain with 3 locations, multi-location membership was a game changer. Members can walk into any branch and check in seamlessly.",
    name: "Arun Selvam",
    role: "MD, PeakFit Chain, Tamil Nadu",
    initials: "AS",
    color: "#6366F1",
  },
];

const faqs = [
  {
    q: "How quickly can we go live on PULSE?",
    a: "Most gyms are fully onboarded within 3–5 business days. Our team handles data migration, hardware setup, and staff training as part of the onboarding package.",
  },
  {
    q: "Does PULSE work for multi-location gym chains?",
    a: "Yes. PULSE natively supports multi-location membership, meaning members can access any branch under your chain, with unified billing and reporting across all locations.",
  },
  {
    q: "Which payment gateways are supported?",
    a: "PULSE integrates with Razorpay and Stripe out of the box. Both support UPI, credit/debit cards, net banking, and EMI options relevant to the Indian market.",
  },
  {
    q: "Is PULSE compliant with GST requirements?",
    a: "Absolutely. PULSE generates GST-compliant invoices automatically and provides tax summary reports ready for your accountant or CA.",
  },
  {
    q: "Can we import our existing member data?",
    a: "Yes. We support CSV imports and provide a dedicated onboarding specialist to ensure your member database, plans, and payment history migrate cleanly.",
  },
  {
    q: "What kind of hardware does PULSE support for access control?",
    a: "PULSE integrates with QR code scanners, biometric readers (fingerprint and face recognition), and standard turnstile/door access controllers.",
  },
];

const demoTabs = [
  {
    label: "Member Check-in",
    title: "Real-Time Member Tracking",
    desc: "Watch your front desk transform. Members scan in via QR or biometric — staff see live attendance instantly, with late alerts and no-show flags handled automatically.",
    points: [
      "Biometric & QR dual check-in",
      "Live front desk dashboard",
      "Automated no-show alerts",
      "Hardware turnstile integration",
    ],
    rows: [
      {
        icon: "👤",
        name: "Ananya Krishnan",
        meta: "Platinum · 3 visits this week",
        status: "Checked In",
        statusColor: "rgba(0,212,170,0.15)",
        statusText: "#00D4AA",
        iconBg: "rgba(45,127,249,0.15)",
      },
      {
        icon: "👤",
        name: "Siddharth Rao",
        meta: "Gold · Last visit 3 days ago",
        status: "Due Today",
        statusColor: "rgba(245,158,11,0.15)",
        statusText: "#F59E0B",
        iconBg: "rgba(0,212,170,0.12)",
      },
      {
        icon: "👤",
        name: "Meera Suresh",
        meta: "Silver · Renewal in 5 days",
        status: "Active",
        statusColor: "rgba(45,127,249,0.15)",
        statusText: "#2D7FF9",
        iconBg: "rgba(99,102,241,0.15)",
      },
    ],
  },
  {
    label: "Class Scheduling",
    title: "Drag-and-Drop Timetable",
    desc: "Build your weekly programme in minutes. Set trainer availability, capacity limits, booking windows, and let PULSE handle waitlists and conflict detection automatically.",
    points: [
      "Visual drag-and-drop builder",
      "Trainer conflict detection",
      "Capacity & waitlist management",
      "Recurring weekly templates",
    ],
    rows: [
      {
        icon: "🏃",
        name: "Morning HIIT — 7:00 AM",
        meta: "Trainer: Coach Deepak · 18/20 booked",
        status: "Full",
        statusColor: "rgba(239,68,68,0.15)",
        statusText: "#EF4444",
        iconBg: "rgba(239,68,68,0.12)",
      },
      {
        icon: "🧘",
        name: "Yoga Flow — 9:00 AM",
        meta: "Trainer: Preethi · 10/15 booked",
        status: "Open",
        statusColor: "rgba(0,212,170,0.15)",
        statusText: "#00D4AA",
        iconBg: "rgba(0,212,170,0.12)",
      },
      {
        icon: "💪",
        name: "Strength Circuit — 6:00 PM",
        meta: "Trainer: Coach Arjun · 14/20 booked",
        status: "Open",
        statusColor: "rgba(0,212,170,0.15)",
        statusText: "#00D4AA",
        iconBg: "rgba(45,127,249,0.15)",
      },
    ],
  },
  {
    label: "Revenue Analytics",
    title: "Business Intelligence Dashboard",
    desc: "Know your numbers at a glance. Track revenue trends, membership growth, churn, class occupancy, and member LTV — all updated in real time.",
    points: [
      "Revenue trends & forecasting",
      "Churn analysis & cohorts",
      "Class occupancy heatmaps",
      "Member lifetime value (LTV)",
    ],
    rows: [
      {
        icon: "📈",
        name: "Monthly Revenue",
        meta: "₹4,82,000 · ↑ 12% vs last month",
        status: "Growing",
        statusColor: "rgba(0,212,170,0.15)",
        statusText: "#00D4AA",
        iconBg: "rgba(0,212,170,0.12)",
      },
      {
        icon: "👥",
        name: "Active Members",
        meta: "342 members · 8 new this week",
        status: "+8 New",
        statusColor: "rgba(45,127,249,0.15)",
        statusText: "#2D7FF9",
        iconBg: "rgba(45,127,249,0.15)",
      },
      {
        icon: "⚠️",
        name: "Churn Risk",
        meta: "14 members inactive 14+ days",
        status: "Alert",
        statusColor: "rgba(245,158,11,0.15)",
        statusText: "#F59E0B",
        iconBg: "rgba(245,158,11,0.12)",
      },
    ],
  },
];

const blogPosts = [
  {
    tag: "Operations",
    title: "How Chennai Gyms Are Cutting Admin Time by 60% with Smart Software",
    date: "Mar 2026",
    bg: "linear-gradient(135deg, rgba(45,127,249,0.2), rgba(0,212,170,0.1))",
    emoji: "⚙️",
  },
  {
    tag: "Revenue",
    title:
      "The WhatsApp Win-Back Strategy That Recovered ₹1.2L in Dormant Revenue",
    date: "Feb 2026",
    bg: "linear-gradient(135deg, rgba(0,212,170,0.2), rgba(45,127,249,0.1))",
    emoji: "💬",
  },
  {
    tag: "Growth",
    title:
      "5 Metrics Every Gym Owner Should Review Weekly (and How PULSE Makes It Easy)",
    date: "Jan 2026",
    bg: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(45,127,249,0.1))",
    emoji: "📊",
  },
];

const partners = [
  { name: "Razorpay", icon: "💳" },
  { name: "Stripe", icon: "⚡" },
  { name: "WhatsApp Business", icon: "💬" },
  { name: "Twilio SMS", icon: "📱" },
  { name: "Google Calendar", icon: "📅" },
  { name: "Tally / Zoho", icon: "🧾" },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      className={`fade-up${visible ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

function CountUp({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function PulseLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSubmit = () => {
    if (email.includes("@")) {
      setSubmitted(true);
      setEmail("");
    }
  };

  const tab = demoTabs[activeTab];

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo">
          PULSE<span>.</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#platform">Platform</a>
          <a href="#pricing">Pricing</a>
          <a href="#resources">Resources</a>
          <button
            className="btn-nav"
            onClick={() =>
              document
                .getElementById("cta")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Book a Demo
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-glow" />
        <div className="hero-glow-teal" />
        <FadeUp>
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Live & serving gyms in Chennai
          </div>
        </FadeUp>
        <FadeUp delay={80}>
          <h1>
            Run your gym
            <br />
            like a <span className="accent">modern</span>
            <br />
            <span className="accent-teal">business.</span>
          </h1>
        </FadeUp>
        <FadeUp delay={160}>
          <p className="hero-sub">
            PULSE is the all-in-one gym management platform that handles
            everything — from member check-ins to revenue analytics — so you can
            focus on growing, not administrating.
          </p>
        </FadeUp>
        <FadeUp delay={240}>
          <div className="hero-cta">
            <button
              className="btn-primary"
              onClick={() =>
                document
                  .getElementById("cta")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Book a Free Demo →
            </button>
            <button
              className="btn-ghost"
              onClick={() =>
                document
                  .getElementById("platform")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              See the Platform
            </button>
          </div>
        </FadeUp>
        <FadeUp delay={320} style={{ width: "100%" }}>
          <div className="stats-strip">
            <div className="stat-item">
              <span className="stat-num">
                <CountUp target={8} suffix="+" />
              </span>
              <span className="stat-label">Core Modules</span>
            </div>
            <div className="stat-item">
              <span className="stat-num" style={{ color: "var(--teal)" }}>
                <CountUp target={100} suffix="%" />
              </span>
              <span className="stat-label">End-to-End</span>
            </div>
            <div className="stat-item">
              <span className="stat-num" style={{ color: "var(--teal)" }}>
                <CountUp target={342} suffix="+" />
              </span>
              <span className="stat-label">Active Members</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">
                <CountUp target={60} suffix="%" />
              </span>
              <span className="stat-label">Admin Time Saved</span>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <FadeUp>
          <div className="section-header">
            <div className="section-label">Platform Features</div>
            <h2 className="section-title">
              Everything your gym needs,
              <br />
              nothing it doesn't.
            </h2>
            <p className="section-sub">
              Eight deeply integrated modules designed to remove operational
              friction and give you full visibility over your business.
            </p>
          </div>
        </FadeUp>
        <div className="features-grid">
          {features.map((f, i) => (
            <FadeUp key={i} delay={i * 60}>
              <div className="feature-card">
                <div className="feature-icon" style={{ background: f.color }}>
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* REBOOT APP SHOWCASE */}
      <section id="platform">
        <FadeUp>
          <div className="section-header">
            <div className="section-label">App Showcase</div>
            <h2 className="section-title">
              A dashboard that actually
              <br />
              tells you what's happening.
            </h2>
            <p className="section-sub">
              Clean, fast, and built for the chaos of a real gym floor — not for
              a product demo.
            </p>
          </div>
        </FadeUp>
        <div className="reboot-grid">
          <FadeUp>
            <div className="reboot-mockup">
              <div className="mockup-bar">
                <div className="mockup-dot" style={{ background: "#EF4444" }} />
                <div className="mockup-dot" style={{ background: "#F59E0B" }} />
                <div className="mockup-dot" style={{ background: "#10B981" }} />
              </div>
              <div className="mockup-screen">
                <div className="mock-header">
                  <span className="mock-title">Today's Overview</span>
                  <span className="mock-badge">● LIVE</span>
                </div>
                <div className="mock-stat-row">
                  <div className="mock-stat">
                    <div className="mock-stat-n">127</div>
                    <div className="mock-stat-l">Check-ins today</div>
                  </div>
                  <div className="mock-stat">
                    <div
                      className="mock-stat-n"
                      style={{ color: "var(--teal)" }}
                    >
                      ₹48K
                    </div>
                    <div className="mock-stat-l">Revenue today</div>
                  </div>
                  <div className="mock-stat">
                    <div className="mock-stat-n" style={{ color: "#F59E0B" }}>
                      14
                    </div>
                    <div className="mock-stat-l">At-risk members</div>
                  </div>
                </div>
                <div className="mock-bar-row">
                  {[
                    { l: "Mon", v: 78 },
                    { l: "Tue", v: 92 },
                    { l: "Wed", v: 65 },
                    { l: "Thu", v: 88 },
                    { l: "Fri", v: 95 },
                    { l: "Sat", v: 100 },
                    { l: "Sun", v: 55 },
                  ].map((b, i) => (
                    <div key={i} className="mock-bar-item">
                      <span className="mock-bar-label">{b.l}</span>
                      <div className="mock-bar-track">
                        <div
                          className="mock-bar-fill"
                          style={{ width: `${b.v}%` }}
                        />
                      </div>
                      <span className="mock-bar-val">{b.v}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={150}>
            <div>
              <p
                style={{
                  color: "var(--muted)",
                  marginBottom: "0.5rem",
                  fontSize: "0.85rem",
                }}
              >
                Built for gym owners, not IT teams.
              </p>
              <h3 className="section-title">
                Real numbers.
                <br />
                Real decisions.
              </h3>
              <div className="reboot-features">
                {[
                  {
                    icon: "⚡",
                    title: "Instant Visibility",
                    desc: "See today's check-ins, revenue, and alerts the moment you open the dashboard.",
                  },
                  {
                    icon: "🔔",
                    title: "Smart Alerts",
                    desc: "PULSE flags at-risk members, overdue payments, and equipment issues before they become problems.",
                  },
                  {
                    icon: "📱",
                    title: "Mobile-First",
                    desc: "Full access from your phone. Run your gym from anywhere — floor, office, or home.",
                  },
                ].map((f, i) => (
                  <div key={i} className="reboot-feat">
                    <div className="reboot-feat-icon">{f.icon}</div>
                    <div>
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="testimonials">
        <FadeUp>
          <div className="section-header">
            <div className="section-label">Social Proof</div>
            <h2 className="section-title">
              Gym owners in Chennai
              <br />
              already see the difference.
            </h2>
          </div>
        </FadeUp>
        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <FadeUp key={i} delay={i * 100}>
              <div className="testi-card">
                <div className="stars">★★★★★</div>
                <div className="testi-quote">"</div>
                <p className="testi-text">{t.quote}</p>
                <div className="testi-author">
                  <div
                    className="testi-avatar"
                    style={{ background: `${t.color}22`, color: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing">
        <FadeUp>
          <div className="section-header" style={{ textAlign: "center" }}>
            <div className="section-label">Pricing</div>
            <h2 className="section-title">
              Simple, transparent pricing.
              <br />
              No surprises.
            </h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Every plan includes onboarding support, WhatsApp automation, and
              our core 8 modules.
            </p>
          </div>
        </FadeUp>
        <div className="pricing-grid">
          {[
            {
              tier: "Starter",
              price: "₹2,999",
              period: "/mo",
              desc: "Perfect for independent gyms getting started.",
              featured: false,
              features: [
                "Up to 150 members",
                "Member & attendance modules",
                "Payments & billing",
                "WhatsApp reminders",
                "Email support",
              ],
            },
            {
              tier: "Growth",
              price: "₹5,999",
              period: "/mo",
              desc: "For growing gyms that need the full picture.",
              featured: true,
              features: [
                "Up to 500 members",
                "All 8 core modules",
                "Analytics & reporting",
                "Staff management",
                "Priority support + onboarding",
              ],
            },
            {
              tier: "Enterprise",
              price: "Custom",
              period: "",
              desc: "For multi-location chains and large studios.",
              featured: false,
              features: [
                "Unlimited members",
                "Multi-location support",
                "Custom integrations",
                "Dedicated account manager",
                "SLA-backed support",
              ],
            },
          ].map((p, i) => (
            <FadeUp key={i} delay={i * 100}>
              <div className={`pricing-card${p.featured ? " featured" : ""}`}>
                {p.featured && (
                  <div className="featured-badge">Most Popular</div>
                )}
                <div className="pricing-tier">{p.tier}</div>
                <div className="pricing-price">
                  {p.price}
                  {p.period && <span>{p.period}</span>}
                </div>
                <p className="pricing-desc">{p.desc}</p>
                <div className="pricing-divider" />
                <ul className="pricing-features">
                  {p.features.map((f, j) => (
                    <li key={j}>
                      <span className="check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`btn-pricing${p.featured ? " featured-btn" : ""}`}
                  onClick={() =>
                    document
                      .getElementById("cta")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {p.tier === "Enterprise"
                    ? "Contact Sales"
                    : "Start Free Trial"}
                </button>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* DEMO / PRODUCT TOUR */}
      <section className="demo-section" id="demo">
        <FadeUp>
          <div className="section-header">
            <div className="section-label">Product Tour</div>
            <h2 className="section-title">See PULSE in action.</h2>
            <p className="section-sub">
              Explore the core workflows that your team will use every single
              day.
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={100}>
          <div className="demo-tabs">
            {demoTabs.map((t, i) => (
              <button
                key={i}
                className={`demo-tab${activeTab === i ? " active" : ""}`}
                onClick={() => setActiveTab(i)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </FadeUp>
        <div className="demo-content">
          <FadeUp>
            <div className="demo-info">
              <h3>{tab.title}</h3>
              <p>{tab.desc}</p>
              <ul className="demo-points">
                {tab.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          </FadeUp>
          <FadeUp delay={150}>
            <div className="demo-visual">
              {tab.rows.map((r, i) => (
                <div key={i} className="demo-row">
                  <div
                    className="demo-row-icon"
                    style={{ background: r.iconBg }}
                  >
                    {r.icon}
                  </div>
                  <div className="demo-row-info">
                    <div className="demo-row-name">{r.name}</div>
                    <div className="demo-row-meta">{r.meta}</div>
                  </div>
                  <div
                    className="demo-row-status"
                    style={{ background: r.statusColor, color: r.statusText }}
                  >
                    {r.status}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <FadeUp>
          <div className="section-header" style={{ textAlign: "center" }}>
            <div className="section-label">FAQ</div>
            <h2 className="section-title">
              Questions gym owners
              <br />
              actually ask us.
            </h2>
          </div>
        </FadeUp>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <FadeUp key={i} delay={i * 50}>
              <div className={`faq-item${openFaq === i ? " open" : ""}`}>
                <button
                  className="faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {f.q}
                  <span className="faq-chevron">+</span>
                </button>
                <div className="faq-a">{f.a}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="partners" id="partners">
        <FadeUp>
          <div className="section-header" style={{ textAlign: "center" }}>
            <div className="section-label">Integrations</div>
            <h2 className="section-title">
              Works with the tools
              <br />
              you already trust.
            </h2>
          </div>
        </FadeUp>
        <FadeUp delay={100}>
          <div className="partners-strip">
            {partners.map((p, i) => (
              <div key={i} className="partner-pill">
                <span>{p.icon}</span>
                {p.name}
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* BLOG TEASER */}
      <section id="resources">
        <FadeUp>
          <div className="section-header">
            <div className="section-label">Resources</div>
            <h2 className="section-title">
              Insights for gym owners
              <br />
              who mean business.
            </h2>
          </div>
        </FadeUp>
        <div className="blog-grid">
          {blogPosts.map((b, i) => (
            <FadeUp key={i} delay={i * 100}>
              <div className="blog-card">
                <div className="blog-thumb" style={{ background: b.bg }}>
                  {b.emoji}
                </div>
                <div className="blog-body">
                  <div className="blog-tag">{b.tag}</div>
                  <div className="blog-title">{b.title}</div>
                  <div className="blog-meta">{b.date} · 5 min read</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="cta">
        <FadeUp>
          <h2>
            Ready to give your gym
            <br />
            an <span style={{ color: "var(--blue)" }}>unfair advantage?</span>
          </h2>
          <p>
            Book a free 30-minute demo. We'll show you PULSE live, configured
            for your gym type.
          </p>
          <div className="cta-form">
            {submitted ? (
              <div
                style={{
                  color: "var(--teal)",
                  fontWeight: 600,
                  fontSize: "1rem",
                  padding: "1rem",
                }}
              >
                ✓ We'll be in touch within 24 hours.
              </div>
            ) : (
              <>
                <input
                  className="cta-input"
                  type="email"
                  placeholder="your@gym.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  aria-label="Email address"
                />
                <button className="btn-primary" onClick={handleSubmit}>
                  Book Demo →
                </button>
              </>
            )}
          </div>
        </FadeUp>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">
          PULSE<span>.</span>{" "}
          <span
            style={{
              fontWeight: 300,
              fontSize: "0.85rem",
              color: "var(--muted)",
              marginLeft: "0.5rem",
            }}
          >
            by Gentize Innovations
          </span>
        </div>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#cta">Contact</a>
        </div>
        <div className="footer-copy">
          © 2026 Gentize Innovations · Chennai, India
        </div>
      </footer>
    </>
  );
}
