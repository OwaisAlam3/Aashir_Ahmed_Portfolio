'use client';

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

/* ═══════════════════════════════════════════════
   TOKENS
═══════════════════════════════════════════════ */
const C = {
  bg:      '#0D0D0F',
  surface: '#131316',
  card:    '#1A1A1F',
  cardHov: '#202026',
  violet:  '#7C5CFC',
  violet2: '#9B80FF',
  coral:   '#FF5C57',
  mint:    '#00E5A0',
  amber:   '#FFB830',
  text:    '#F2F0FF',
  muted:   'rgba(242,240,255,0.5)',
  faint:   'rgba(242,240,255,0.08)',
  border:  'rgba(242,240,255,0.07)',
};

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const NAV = ['About', 'Services', 'Work', 'Experience', 'Contact'];

const SERVICES = [
  { num:'01', icon:'◈', title:'WordPress Development',    desc:'Custom themes, plugins, and ACF-powered dynamic content. Built to rank, load fast, and convert.',                                                                  tags:['Custom Themes','Plugin Dev','ACF','WooCommerce','PHP'],        color:C.violet },
  { num:'02', icon:'◉', title:'Shopify & eCommerce',      desc:'Conversion-optimized storefronts on Shopify, Wix, and Squarespace. Payment integrations that turn visitors into buyers.',                                          tags:['Shopify','Wix','Squarespace','Custom Checkout','UX'],          color:C.coral  },
  { num:'03', icon:'⬡', title:'API & Backend Integrations',desc:'CRMs, payment gateways, booking systems — seamlessly wired in. Connecting your platform to every tool your business depends on.',                                tags:['REST APIs','JSON','Payment Gateways','CRM','MySQL'],           color:C.mint   },
  { num:'04', icon:'◎', title:'SEO & Performance',        desc:'Technical SEO, schema markup, Core Web Vitals. Consistently achieving 90+ PageSpeed scores that rank where your customers are searching.',                        tags:['Technical SEO','Schema','PageSpeed 90+','CDN','Caching'],     color:C.violet2},
  { num:'05', icon:'◫', title:'Frontend Development',     desc:'Responsive, pixel-perfect interfaces from Figma, PSD, or XD. Clean HTML5/CSS3/JS that works flawlessly across every device.',                                    tags:['HTML5','CSS3','JavaScript','jQuery','React'],                  color:C.coral  },
  { num:'06', icon:'⬢', title:'Security & Scaling',       desc:'Hardening sites against threats and preparing for serious growth. Security audits and performance infrastructure for high traffic.',                              tags:['Security Audits','SSL','Scalability','Backups','Monitoring'],  color:C.mint   },
];

const PROJECTS = [
  { title:'DangerWorks TV',         category:'Media & Entertainment',        year:'2024', desc:'High-performance media platform for a fast-moving entertainment brand. Custom WordPress architecture, optimized video delivery, immersive responsive design.', url:'https://www.dangerworks.tv/',                img:'/projects/dangerworks.jpg',  tags:['WordPress','Media','Custom Theme'],           color:C.coral,   num:'01' },
  { title:'My Patio Life',          category:'Home & Lifestyle eCommerce',   year:'2024', desc:'Lifestyle brand and eCommerce store with rich product pages, optimized checkout flows, and full SEO implementation targeting outdoor living audiences.',       url:'https://mypatiolife.com/',                   img:'/projects/mypatiolife.jpg',  tags:['eCommerce','SEO','WordPress'],                color:C.mint,    num:'02' },
  { title:'InShapeMD Texas',        category:'Healthcare & Medical',         year:'2024', desc:'Conversion-focused medical website with ACF dynamic content, HIPAA-conscious design, schema markup, and load times consistently under 2 seconds.',            url:'https://inshapemdtx.com/',                   img:'/projects/inshapemdtx.jpg',   tags:['WordPress','ACF','Healthcare SEO'],           color:C.violet,  num:'03' },
  { title:'Redline Digital Media',  category:'Digital Agency',               year:'2023', desc:'Sleek agency website built for speed and visual impact. Integrated lead capture and CRM API connections for a high-conversion experience.',                   url:'https://redlinedigitalmedia.com/',           img:'/projects/redlinedigitalmedia.jpg',     tags:['WordPress','Agency','API Integration'],       color:C.coral,   num:'04' },
  { title:'Savannah Granite',       category:'Home Improvement',             year:'2023', desc:'Local business site with strong local SEO, gallery integration, and quote request flows. Ranks competitively for countertop searches.',                        url:'https://savannahgranite.net/',               img:'/projects/savannahgranite.jpg',    tags:['Local SEO','WordPress','Lead Gen'],           color:C.amber,   num:'05' },
  { title:'FHR Roofers',            category:'Construction & Roofing',       year:'2023', desc:'High-converting contractor website with service pages, review integration, click-to-call CTA system, and Google Business SEO optimization.',                   url:'https://fhroofers.com/',                     img:'/projects/fhr.jpg',         tags:['Contractor','WordPress','Local SEO'],         color:C.violet,  num:'06' },
  { title:'J&J Construction Group', category:'Construction & Development',   year:'2023', desc:'Professional construction site with project portfolio, custom post types for case studies, and a fully mobile-responsive build from the ground up.',           url:'https://jandjconstructiongroup.com/',        img:'/projects/jandjcg.jpg',          tags:['Construction','Portfolio','ACF'],             color:C.mint,    num:'07' },
  { title:'Julie Waas',             category:'Personal Brand · Portfolio',   year:'2023', desc:'Elegant personal brand website for a creative professional. Custom WordPress theme with booking integration and polished portfolio showcase.',                  url:'https://juliewaas.com/',                     img:'/projects/juliewaqas.jpg',       tags:['Personal Brand','Booking','WordPress'],       color:C.coral,   num:'08' },
];

const EXPERIENCE = [
  { role:'Senior Executive Web Developer', company:'Logicose',                  location:'Karachi, Pakistan · On-site', period:'Apr 2023 – Present', current:true,  desc:'Leading end-to-end development of 100+ WordPress websites. Custom theme/plugin creation, ACF structuring, advanced API integrations, and enterprise security hardening. Consistently achieving 90+ PageSpeed scores.', color:C.violet },
  { role:'Junior Software Engineer',       company:'HashOne Digital (Pvt.) Ltd', location:'Karachi, Pakistan',          period:'Sep 2022 – Mar 2023', current:false, desc:'Developed pixel-perfect HTML5/CSS3 templates from PSD, XD, and Figma designs. Built and customized 50+ WordPress websites with optimized responsiveness and high client satisfaction.',                              color:C.coral  },
  { role:'Associate Frontend Developer',   company:'Tafsol Technologies',        location:'Karachi, Pakistan',          period:'Dec 2021 – Jun 2022', current:false, desc:'Created responsive, SEO-friendly websites for local and international clients. Customized WordPress themes and plugins, integrated ACF for dynamic content, and implemented caching/CDN solutions.',                   color:C.mint   },
];

const SKILLS = ['WordPress','PHP','JavaScript','jQuery','React','HTML5 / CSS3','MySQL','REST APIs','ACF','Shopify','Technical SEO','Git','Figma → Code','WooCommerce','PageSpeed 90+'];

/* ═══════════════════════════════════════════════
   CURSOR HOOK
═══════════════════════════════════════════════ */
function useCursor() {
  const mx = useMotionValue(-200), my = useMotionValue(-200);
  const dotX  = useSpring(mx, { stiffness: 800, damping: 50 });
  const dotY  = useSpring(my, { stiffness: 800, damping: 50 });
  const ringX = useSpring(mx, { stiffness: 150, damping: 28 });
  const ringY = useSpring(my, { stiffness: 150, damping: 28 });
  const [hovered,  setHovered]  = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible,  setVisible]  = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const move  = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); setVisible(true); };
    const down  = () => setClicking(true);
    const up    = () => setClicking(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup',   up);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup',   up);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, [isDesktop, mx, my]);

  return { dotX, dotY, ringX, ringY, hovered, setHovered, clicking, visible, isDesktop };
}

/* ═══════════════════════════════════════════════
   MINI COMPONENTS
═══════════════════════════════════════════════ */
function Tag({ children, color = C.violet }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ display:'inline-block', padding:'5px 11px', borderRadius:5, fontSize:10, fontWeight:600, fontFamily:"'JetBrains Mono', monospace", letterSpacing:'0.04em', background:color+'18', border:`1px solid ${color}35`, color }}>
      {children}
    </span>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
      <div style={{ width:28, height:2, borderRadius:2, background:C.violet }} />
      <span style={{ fontSize:11, fontWeight:600, fontFamily:"'JetBrains Mono', monospace", letterSpacing:'0.22em', textTransform:'uppercase' as const, color:C.violet }}>{children}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════ */
export default function Page() {
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [hoveredProj,  setHoveredProj]  = useState<number | null>(null);
  const [formData,     setFormData]     = useState({ name:'', email:'', service:'', message:'' });
  const [formStatus,   setFormStatus]   = useState<'idle'|'loading'|'sent'|'error'>('idle');
  const [scrolled,     setScrolled]     = useState(false);
  const { dotX, dotY, ringX, ringY, hovered, setHovered, clicking, visible, isDesktop } = useCursor();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setFormStatus('loading');
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', { method:'POST', headers:{ 'Content-Type':'application/json', Accept:'application/json' }, body:JSON.stringify(formData) });
      if (res.ok) { setFormStatus('sent'); setFormData({ name:'', email:'', service:'', message:'' }); setTimeout(() => setFormStatus('idle'), 6000); }
      else { setFormStatus('error'); setTimeout(() => setFormStatus('idle'), 4000); }
    } catch { setFormStatus('error'); setTimeout(() => setFormStatus('idle'), 4000); }
  };

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY   = useTransform(scrollYProgress, [0,1], [0, 80]);
  const textY  = useTransform(scrollYProgress, [0,1], [0, 40]);

  const onEnter = () => setHovered(true);
  const onLeave = () => setHovered(false);

  return (
    <main style={{ background:C.bg, color:C.text, fontFamily:"'Plus Jakarta Sans', sans-serif", overflowX:'hidden', cursor: isDesktop ? 'none' : 'auto' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{-webkit-font-smoothing:antialiased;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:${C.bg};}
        ::-webkit-scrollbar-thumb{background:${C.violet}66;border-radius:2px;}
        ::selection{background:${C.violet}30;color:${C.violet2};}

        .nav-link{color:${C.muted};text-decoration:none;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;transition:color .25s;position:relative;padding-bottom:3px;}
        .nav-link::after{content:'';position:absolute;bottom:-1px;left:0;width:0;height:1.5px;background:${C.violet};transition:width .3s ease;border-radius:2px;}
        .nav-link:hover{color:${C.text};}
        .nav-link:hover::after{width:100%;}

        .btn-primary{display:inline-flex;align-items:center;gap:8px;padding:14px 30px;border-radius:8px;background:${C.violet};color:#fff;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:all .3s;position:relative;overflow:hidden;}
        .btn-primary::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,${C.violet2},${C.violet});opacity:0;transition:opacity .3s;}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 16px 40px ${C.violet}40;}
        .btn-primary:hover::before{opacity:1;}
        .btn-primary span{position:relative;z-index:1;display:flex;align-items:center;gap:8px;}
        .btn-primary:disabled{opacity:.5;cursor:not-allowed;transform:none!important;box-shadow:none!important;}

        .btn-ghost{display:inline-flex;align-items:center;gap:8px;padding:13px 26px;border-radius:8px;background:transparent;color:${C.text};font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;border:1px solid ${C.border};cursor:pointer;transition:all .3s;}
        .btn-ghost:hover{border-color:${C.violet}55;color:${C.violet2};}

        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .marquee-t{display:flex;width:max-content;animation:marquee 28s linear infinite;}
        .marquee-t:hover{animation-play-state:paused;}

        @keyframes pulse-glow{0%,100%{opacity:.6}50%{opacity:1}}
        @keyframes float-badge{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes drift{0%,100%{transform:translate(0,0) rotate(0deg)}33%{transform:translate(6px,-4px) rotate(1deg)}66%{transform:translate(-4px,6px) rotate(-1deg)}}

        .svc-card{transition:all .4s cubic-bezier(.16,1,.3,1);cursor:default;}
        .svc-card:hover{transform:translateY(-4px);background:${C.cardHov}!important;}

        /* ─ proj row hover ─ */
        .proj-row{transition:all .3s cubic-bezier(.16,1,.3,1);}
        .proj-row:hover .proj-row-num{color:${C.violet}!important;}
        .proj-row:hover .proj-row-title{letter-spacing:-.01em;}

        input,textarea,select{background:${C.card}!important;border:1px solid ${C.border}!important;color:${C.text}!important;font-family:'Plus Jakarta Sans',sans-serif!important;font-size:15px!important;outline:none;transition:border-color .3s,background .3s;width:100%;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:10px;}
        input:focus,textarea:focus,select:focus{border-color:${C.violet}!important;background:${C.cardHov}!important;}
        input::placeholder,textarea::placeholder{color:${C.muted}!important;}
        select option{background:${C.card};color:${C.text};}

        @media(max-width:900px){
          .desktop-only{display:none!important;}
          .mobile-toggle{display:flex!important;}
          .hero-layout{grid-template-columns:1fr!important;min-height:auto!important;}
          .hero-right{display:none!important;}
          .stats-grid{grid-template-columns:1fr 1fr!important;}
          .svc-grid{grid-template-columns:1fr 1fr!important;}
          .exp-grid{grid-template-columns:1fr!important;}
          .contact-grid{grid-template-columns:1fr!important;}
          .footer-grid{grid-template-columns:1fr!important;}
          .form-2col{grid-template-columns:1fr!important;}
          .proj-preview{display:none!important;}
        }
        @media(max-width:600px){
          .svc-grid{grid-template-columns:1fr!important;}
        }
        @media(min-width:901px){
          .mobile-toggle{display:none!important;}
        }
      `}</style>

      {/* ── AMBIENT ── */}
      <div aria-hidden style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'-5%', right:'-8%', width:700, height:700, borderRadius:'50%', background:`radial-gradient(circle, ${C.violet}0d 0%, transparent 65%)` }} />
        <div style={{ position:'absolute', top:'45%', left:'-12%', width:600, height:600, borderRadius:'50%', background:`radial-gradient(circle, ${C.coral}08 0%, transparent 65%)` }} />
        <div style={{ position:'absolute', bottom:'5%', right:'20%', width:500, height:500, borderRadius:'50%', background:`radial-gradient(circle, ${C.mint}06 0%, transparent 65%)` }} />
        <div style={{ position:'absolute', inset:0, opacity:.025, backgroundImage:`linear-gradient(${C.text}40 1px,transparent 1px),linear-gradient(90deg,${C.text}40 1px,transparent 1px)`, backgroundSize:'64px 64px' }} />
      </div>

      {/* ── CURSOR ── */}
      {isDesktop && (<>
        <motion.div style={{ position:'fixed', top:0, left:0, zIndex:9999, x:dotX, y:dotY, translateX:'-50%', translateY:'-50%', pointerEvents:'none', mixBlendMode:'difference' }}>
          <motion.div animate={{ width: hovered?10:clicking?5:8, height: hovered?10:clicking?5:8, background: hovered?C.violet:C.text, boxShadow: hovered?`0 0 20px ${C.violet}`:'none' }} transition={{ duration:.15 }} style={{ borderRadius:'50%' }} />
        </motion.div>
        <motion.div style={{ position:'fixed', top:0, left:0, zIndex:9998, x:ringX, y:ringY, translateX:'-50%', translateY:'-50%', pointerEvents:'none' }}>
          <motion.div animate={{ width:hovered?50:clicking?26:36, height:hovered?50:clicking?26:36, borderColor:hovered?C.violet:visible?`${C.text}44`:'transparent', borderRadius:hovered?'8px':'50%', rotate:hovered?45:0 }} transition={{ duration:.25 }} style={{ border:'1.5px solid' }} />
        </motion.div>
      </>)}

      {/* ══════════════════════════════════════
          NAV
      ══════════════════════════════════════ */}
      <motion.header initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.7 }}
        style={{ position:'fixed', top:0, left:0, right:0, zIndex:500, background:scrolled?`${C.bg}dd`:'transparent', backdropFilter:scrolled?'blur(24px)':'none', WebkitBackdropFilter:scrolled?'blur(24px)':'none', borderBottom:scrolled?`1px solid ${C.border}`:'1px solid transparent', transition:'all .4s' }}>
        <div style={{ maxWidth:1300, margin:'0 auto', padding:'0 clamp(20px,4vw,56px)', height:72, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <a href="#top" style={{ textDecoration:'none' }} onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <div style={{ display:'flex', alignItems:'center', gap:1 }}>
              <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:22, fontWeight:800, color:C.text, letterSpacing:'-0.05em' }}>aashir</span>
              <span style={{ fontFamily:"'Fraunces', serif", fontStyle:'italic', fontSize:26, color:C.violet }}>.</span>
            </div>
          </a>
          <nav className="desktop-only" style={{ display:'flex', gap:36, alignItems:'center' }}>
            {NAV.map(n => <a key={n} href={`#${n.toLowerCase()}`} className="nav-link" onMouseEnter={onEnter} onMouseLeave={onLeave}>{n}</a>)}
          </nav>
          <a href="#contact" className="btn-primary desktop-only" style={{ padding:'11px 22px', fontSize:10 }} onMouseEnter={onEnter} onMouseLeave={onLeave}><span>Hire Me ↗</span></a>
          <button onClick={() => setMobileOpen(o=>!o)} className="mobile-toggle" style={{ background:'none', border:'none', cursor:'pointer', padding:8, flexDirection:'column', gap:5, alignItems:'flex-end' }}>
            <div style={{ width:22, height:2, background:C.text, transition:'all .3s', transform:mobileOpen?'rotate(45deg) translate(5px,7px)':'none' }} />
            <div style={{ width:14, height:2, background:C.violet, opacity:mobileOpen?0:1, transition:'opacity .3s' }} />
            <div style={{ width:22, height:2, background:C.text, transition:'all .3s', transform:mobileOpen?'rotate(-45deg) translate(5px,-7px)':'none' }} />
          </button>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
              style={{ overflow:'hidden', background:C.surface, borderTop:`1px solid ${C.border}` }}>
              <div style={{ padding:'28px clamp(20px,4vw,56px)', display:'flex', flexDirection:'column', gap:0 }}>
                {NAV.map((n,i) => (
                  <motion.a key={n} href={`#${n.toLowerCase()}`} initial={{ opacity:0, x:-14 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*.05 }}
                    onClick={() => setMobileOpen(false)} style={{ padding:'14px 0', borderBottom:`1px solid ${C.border}`, color:C.muted, textDecoration:'none', fontFamily:"'JetBrains Mono', monospace", fontSize:14, letterSpacing:'.1em' }}>{n}</motion.a>
                ))}
                <a href="#contact" onClick={() => setMobileOpen(false)} className="btn-primary" style={{ marginTop:24 }}><span>Hire Me ↗</span></a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ══════════════════════════════════════
          HERO  — split diagonal layout
      ══════════════════════════════════════ */}
      <section id="top" ref={heroRef} style={{ position:'relative', zIndex:1, minHeight:'100vh', paddingTop:72, overflow:'hidden' }}>

        {/* ── TWO-COLUMN GRID ── */}
        <div className="hero-layout" style={{ display:'grid', gridTemplateColumns:'1fr 420px', minHeight:'calc(100vh - 72px)', maxWidth:1300, margin:'0 auto', padding:'0 clamp(24px,5vw,80px)' }}>

          {/* LEFT — text content */}
          <motion.div style={{ y: textY, display:'flex', flexDirection:'column', justifyContent:'center', paddingTop:'clamp(40px,5vh,60px)', paddingBottom:'clamp(60px,7vh,80px)', paddingRight:40 }}>

            {/* Top row: status + location */}
            <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:.05, duration:.7 }}
              style={{ display:'flex', alignItems:'center', gap:12, marginBottom:40, flexWrap:'wrap' }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'7px 16px', borderRadius:100, background:`${C.mint}12`, border:`1px solid ${C.mint}28` }}>
                <div style={{ width:7, height:7, borderRadius:'50%', background:C.mint, boxShadow:`0 0 10px ${C.mint}`, animation:'pulse-glow 2s ease-in-out infinite' }} />
                <span style={{ fontSize:10, fontFamily:"'JetBrains Mono', monospace", letterSpacing:'.16em', color:C.mint, fontWeight:600 }}>AVAILABLE NOW</span>
              </div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'7px 14px', borderRadius:100, background:C.faint, border:`1px solid ${C.border}` }}>
                <span style={{ fontSize:12 }}>📍</span>
                <span style={{ fontSize:10, fontFamily:"'JetBrains Mono', monospace", letterSpacing:'.1em', color:C.muted }}>KARACHI, PAKISTAN</span>
              </div>
            </motion.div>

            {/* Big headline */}
            <div style={{ marginBottom:28 }}>
              {[
                { t:'Senior',       f:"'Plus Jakarta Sans', sans-serif", w:800, c:C.text,    fs:'clamp(56px,8vw,120px)', ls:'-0.05em', fi:'normal'  as const },
                { t:'Web Dev.',     f:"'Fraunces', serif",               w:600, c:C.violet2, fs:'clamp(56px,8vw,120px)', ls:'-0.03em', fi:'italic'  as const },
              ].map((line, i) => (
                <div key={i} style={{ overflow:'hidden' }}>
                  <motion.div initial={{ y:'110%' }} animate={{ y:0 }} transition={{ delay:.15+i*.12, duration:.95, ease:[.16,1,.3,1] }}
                    style={{ fontFamily:line.f, fontWeight:line.w, color:line.c, fontSize:line.fs, letterSpacing:line.ls, fontStyle:line.fi, lineHeight:0.9, display:'block' }}>
                    {line.t}
                  </motion.div>
                </div>
              ))}
              {/* "who delivers." smaller, with animated underline */}
              <div style={{ overflow:'hidden', marginTop:10 }}>
                <motion.div initial={{ y:'110%' }} animate={{ y:0 }} transition={{ delay:.38, duration:.95, ease:[.16,1,.3,1] }}
                  style={{ display:'inline-flex', alignItems:'baseline', gap:10, fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:800, color:C.text, fontSize:'clamp(22px,3vw,48px)', letterSpacing:'-0.04em', lineHeight:1 }}>
                  who delivers
                  <span style={{ fontFamily:"'Fraunces', serif", fontStyle:'italic', fontWeight:300, fontSize:'1.1em', color:C.coral }}>.</span>
                </motion.div>
              </div>
            </div>

            {/* Bio */}
            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.56, duration:.7 }}
              style={{ fontSize:'clamp(15px,1.3vw,17px)', color:C.muted, lineHeight:1.85, maxWidth:500, marginBottom:44, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
              I'm <strong style={{ color:C.text, fontWeight:700 }}>Aashir Ahmed</strong> — 3+ years,{' '}
              <strong style={{ color:C.violet2, fontWeight:700 }}>400+ websites delivered</strong>.{' '}
              WordPress, Shopify, custom frontend — sites that rank, load fast, and convert.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.68, duration:.6 }}
              style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:60 }}>
              <a href="#work"    className="btn-primary" onMouseEnter={onEnter} onMouseLeave={onLeave}><span>View My Work ↓</span></a>
              <a href="#contact" className="btn-ghost"   onMouseEnter={onEnter} onMouseLeave={onLeave}>Let's Talk</a>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.8, duration:.7 }}
              className="stats-grid"
              style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderTop:`1px solid ${C.border}`, paddingTop:32, maxWidth:520, gap:20 }}>
              {[
                { num:'3+',   lbl:'Years Exp.' },
                { num:'400+', lbl:'Sites Built' },
                { num:'90+',  lbl:'PageSpeed'  },
                { num:'3',    lbl:'Countries'  },
              ].map((s,i) => (
                <div key={i}>
                  <div style={{ fontFamily:"'Fraunces', serif", fontStyle:'italic', fontSize:'clamp(28px,3vw,44px)', fontWeight:700, color:C.violet2, letterSpacing:'-0.04em', lineHeight:1 }}>{s.num}</div>
                  <div style={{ fontSize:10, color:C.muted, fontFamily:"'JetBrains Mono', monospace", letterSpacing:'.08em', marginTop:5 }}>{s.lbl}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Stacked / layered photo with geometric shapes */}
          <motion.div className="hero-right"
            initial={{ opacity:0, x:50 }} animate={{ opacity:1, x:0 }} transition={{ delay:.25, duration:1.0, ease:[.16,1,.3,1] }}
            style={{ y: imgY, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', paddingTop:40, paddingBottom:40 }}>

            {/* Big violet circle behind */}
            <motion.div
              initial={{ scale:.8, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ delay:.4, duration:1.2 }}
              style={{ position:'absolute', width:320, height:320, borderRadius:'50%', background:`radial-gradient(circle, ${C.violet}22 0%, transparent 70%)`, border:`1px solid ${C.violet}20`, top:'50%', left:'50%', transform:'translate(-50%,-50%)', animation:'drift 8s ease-in-out infinite' }} />

            {/* Rotating dashed ring */}
            <div style={{ position:'absolute', width:380, height:380, borderRadius:'50%', border:`1.5px dashed ${C.violet}25`, top:'50%', left:'50%', transform:'translate(-50%,-50%)', animation:'spin-slow 30s linear infinite', pointerEvents:'none' }}>
              {/* dot markers on the ring */}
              {[0,90,180,270].map(deg => (
                <div key={deg} style={{ position:'absolute', width:6, height:6, borderRadius:'50%', background:C.violet, boxShadow:`0 0 10px ${C.violet}`, top:'50%', left:'50%', transformOrigin:'0 0', transform:`rotate(${deg}deg) translateX(189px) translateY(-3px)` }} />
              ))}
            </div>
            
<motion.div
  initial={{ scale: .9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ delay: .5, duration: 1.1, ease: [.16, 1, .3, 1] }}
  style={{ position: 'relative', zIndex: 3, width: 320, height: 380 }} // Made it slightly taller for a better portrait feel
>
  {/* Modern Architectural Frame */}
  <div style={{
    width: '100%',
    height: '100%',
    borderRadius: '80px 20px 80px 20px', // Asymmetric "leaf" shape
    background: C.card,
    position: 'relative',
    overflow: 'hidden',
    border: `1px solid ${C.border}`,
    boxShadow: `0 40px 100px rgba(0,0,0,0.5)`,
  }}>
    <Image 
      src="/Ashir.jpg" 
      alt="Aashir Ahmed" 
      fill 
      sizes="320px" 
      style={{ objectFit: 'cover', objectPosition: 'center top' }} 
      priority 
    />
    
    {/* Subtle Vignette */}
    <div style={{ 
      position: 'absolute', 
      inset: 0, 
      background: `linear-gradient(to top, ${C.bg}aa 0%, transparent 40%)`,
      mixBlendMode: 'multiply'
    }} />
  </div>

  {/* Floating Glass Name Card */}
  <div style={{ 
    position: 'absolute', 
    bottom: 20, 
    left: -20, // Offset to the left to break the symmetry
    background: `rgba(26, 26, 31, 0.8)`, 
    backdropFilter: 'blur(20px)', 
    border: `1px solid ${C.border}`, 
    borderRadius: 8, 
    padding: '12px 20px', 
    zIndex: 4,
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
  }}>
    <div style={{ fontSize: 16, fontWeight: 800, color: C.text, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>Aashir Ahmed</div>
    <div style={{ fontSize: 9, color: C.violet2, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '.14em', marginTop: 4 }}>FULL-STACK ENGINEER</div>
  </div>
</motion.div>


            {/* Corner accent squares */}
            <motion.div initial={{ opacity:0, scale:.5 }} animate={{ opacity:1, scale:1 }} transition={{ delay:1.0, duration:.6 }}
              style={{ position:'absolute', top:'14%', left:'2%', width:48, height:48, borderRadius:8, background:`${C.violet}18`, border:`1px solid ${C.violet}35`, display:'flex', alignItems:'center', justifyContent:'center', zIndex:5, animation:'float-badge 4s ease-in-out infinite' }}>
              <span style={{ fontSize:22, color:C.violet }}>◈</span>
            </motion.div>

            <motion.div initial={{ opacity:0, scale:.5 }} animate={{ opacity:1, scale:1 }} transition={{ delay:1.1, duration:.6 }}
              style={{ position:'absolute', top:'18%', right:'4%', zIndex:5, animation:'float-badge 3.5s ease-in-out infinite', animationDelay:'.8s' }}>
              <div style={{ background:`${C.bg}f2`, backdropFilter:'blur(14px)', border:`1px solid ${C.coral}30`, borderRadius:10, padding:'10px 13px', display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:14 }}>⚡</span>
                <div>
                  <div style={{ fontSize:11, fontWeight:700, color:C.text, fontFamily:"'Plus Jakarta Sans', sans-serif", lineHeight:1 }}>PageSpeed</div>
                  <div style={{ fontSize:9, color:C.muted, fontFamily:"'JetBrains Mono', monospace", marginTop:2 }}>90+ scores</div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, scale:.5 }} animate={{ opacity:1, scale:1 }} transition={{ delay:1.2, duration:.6 }}
              style={{ position:'absolute', bottom:'20%', left:'0%', zIndex:5, animation:'float-badge 5s ease-in-out infinite', animationDelay:'.4s' }}>
              <div style={{ background:`${C.bg}f2`, backdropFilter:'blur(14px)', border:`1px solid ${C.mint}30`, borderRadius:10, padding:'10px 13px', display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:14 }}>🚀</span>
                <div>
                  <div style={{ fontSize:11, fontWeight:700, color:C.text, fontFamily:"'Plus Jakarta Sans', sans-serif", lineHeight:1 }}>400+ Sites</div>
                  <div style={{ fontSize:9, color:C.muted, fontFamily:"'JetBrains Mono', monospace", marginTop:2 }}>delivered</div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, scale:.5 }} animate={{ opacity:1, scale:1 }} transition={{ delay:1.3, duration:.6 }}
              style={{ position:'absolute', bottom:'22%', right:'2%', zIndex:5 }}>
              <div style={{ background:`${C.violet}18`, border:`1px solid ${C.violet}35`, borderRadius:8, padding:'8px 12px', display:'flex', alignItems:'center', gap:6 }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:C.mint, boxShadow:`0 0 8px ${C.mint}`, animation:'pulse-glow 2s ease-in-out infinite' }} />
                <span style={{ fontSize:9, fontWeight:600, fontFamily:"'JetBrains Mono', monospace", letterSpacing:'.14em', color:C.mint }}>AVAILABLE</span>
              </div>
            </motion.div>

          </motion.div>
        </div>{/* end hero grid */}
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background:C.surface, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:'18px 0', overflow:'hidden', position:'relative', zIndex:1 }}>
        <div className="marquee-t">
          {[...SKILLS,...SKILLS].map((s,i) => (
            <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:20, marginRight:48, fontSize:11, fontFamily:"'JetBrains Mono', monospace", letterSpacing:'.1em', textTransform:'uppercase', color:C.muted, whiteSpace:'nowrap' }}>
              <span style={{ color:C.violet, fontSize:13 }}>◆</span>{s}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          ABOUT
      ══════════════════════════════════════ */}
      <section id="about" style={{ padding:'clamp(80px,10vh,140px) clamp(24px,5vw,80px)', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:1300, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:80, alignItems:'center' }}>
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.8 }}>
            <Eyebrow>About Me</Eyebrow>
            <h2 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(30px,4vw,56px)', fontWeight:800, color:C.text, letterSpacing:'-0.04em', lineHeight:1.05, marginBottom:24 }}>
              I build websites<br />
              <span style={{ fontFamily:"'Fraunces', serif", fontStyle:'italic', fontWeight:400, color:C.violet2 }}>that mean business.</span>
            </h2>
            <p style={{ fontSize:16, color:C.muted, lineHeight:1.9, marginBottom:18 }}>With a Computer Science degree from Iqra University (CGPA 3.1) and 3+ years in the industry, I've delivered over 400 fully responsive, high-performing websites for clients across the USA, Canada, and beyond.</p>
            <p style={{ fontSize:16, color:C.muted, lineHeight:1.9, marginBottom:36 }}>I specialize in WordPress, Shopify, and custom frontend development — with a sharp eye for SEO, performance, and converting visitors into leads.</p>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <a href="/resume.pdf" target="_blank" className="btn-primary" onMouseEnter={onEnter} onMouseLeave={onLeave}><span>Download CV ↓</span></a>
              <a href="mailto:aashira28@gmail.com" className="btn-ghost" onMouseEnter={onEnter} onMouseLeave={onLeave}>Email Me</a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.8, delay:.1 }}>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:'28px', marginBottom:20, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${C.violet}, ${C.coral})` }} />
              <div style={{ fontSize:9, fontFamily:"'JetBrains Mono', monospace", color:C.violet, letterSpacing:'.2em', textTransform:'uppercase', marginBottom:10 }}>Education</div>
              <div style={{ fontSize:19, fontWeight:700, color:C.text, fontFamily:"'Plus Jakarta Sans', sans-serif", marginBottom:4, letterSpacing:'-0.02em' }}>Bachelor of Computer Science</div>
              <div style={{ fontSize:15, color:C.muted, fontFamily:"'Fraunces', serif", fontStyle:'italic', marginBottom:4 }}>Iqra University (Official)</div>
              <div style={{ fontSize:11, color:C.faint, fontFamily:"'JetBrains Mono', monospace" }}>2017 – 2021 · CGPA: 3.1</div>
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {SKILLS.map((s,i) => (
                <motion.div key={i} initial={{ opacity:0, scale:.85 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:i*.03 }}>
                  <Tag color={i%3===0?C.violet:i%3===1?C.coral:C.mint}>{s}</Tag>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES
      ══════════════════════════════════════ */}
      <section id="services" style={{ padding:'clamp(80px,10vh,140px) clamp(24px,5vw,80px)', background:C.surface, position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.7 }} style={{ marginBottom:64 }}>
            <Eyebrow>What I Do</Eyebrow>
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'flex-end', gap:24 }}>
              <h2 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(30px,4.5vw,64px)', fontWeight:800, color:C.text, letterSpacing:'-0.04em', lineHeight:1 }}>Services</h2>
              <p style={{ fontSize:16, color:C.muted, maxWidth:400, lineHeight:1.8 }}>End-to-end web development — first wireframe to live, ranking website.</p>
            </div>
          </motion.div>
          <div className="svc-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
            {SERVICES.map((s,i) => (
              <motion.div key={i} initial={{ opacity:0, y:36 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-40px' }} transition={{ delay:i*.08, duration:.7 }}
                className="svc-card" onMouseEnter={onEnter} onMouseLeave={onLeave}
                style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:20, padding:'36px 28px', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:s.color, opacity:.7 }} />
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
                  <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:10, color:s.color, letterSpacing:'.15em', fontWeight:600 }}>{s.num}</span>
                  <span style={{ fontSize:22, color:s.color }}>{s.icon}</span>
                </div>
                <h3 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:19, fontWeight:800, color:C.text, marginBottom:12, letterSpacing:'-0.03em', lineHeight:1.25 }}>{s.title}</h3>
                <p style={{ fontSize:14, color:C.muted, lineHeight:1.85, marginBottom:24 }}>{s.desc}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {s.tags.map((t,j) => <Tag key={j} color={s.color}>{t}</Tag>)}
                </div>
                <div style={{ position:'absolute', bottom:-10, right:-4, fontFamily:"'Fraunces', serif", fontStyle:'italic', fontSize:96, fontWeight:700, color:s.color, opacity:.04, userSelect:'none', lineHeight:1 }}>{s.num}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROJECTS — hover-preview table layout
      ══════════════════════════════════════ */}
      <section id="work" style={{ padding:'clamp(80px,10vh,140px) clamp(24px,5vw,80px)', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.7 }} style={{ marginBottom:64 }}>
            <Eyebrow>Selected Work</Eyebrow>
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'flex-end', gap:24 }}>
              <h2 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(30px,4.5vw,64px)', fontWeight:800, color:C.text, letterSpacing:'-0.04em', lineHeight:1 }}>Live Projects</h2>
              <p style={{ fontSize:16, color:C.muted, maxWidth:400, lineHeight:1.8 }}>Real sites, real results — built for businesses across North America.</p>
            </div>
          </motion.div>

          {/* Table + floating preview */}
          <div style={{ position:'relative' }}>

            {/* Floating image preview — desktop */}
{/* Floating image preview — desktop */}
<div className="proj-preview" style={{ 
  position:'fixed', 
  top:'50%', 
  right:60, 
  transform:'translateY(-50%)', 
  width:320, 
  height:200, 
  borderRadius:16, 
  overflow:'hidden', 
  pointerEvents:'none', 
  zIndex:200, 
  border:`1px solid ${C.border}`, 
  boxShadow:'0 32px 80px rgba(0,0,0,0.6)', 
  transition:'opacity .3s, transform .3s', // Added transform transition for smoothness
  opacity: hoveredProj !== null ? 1 : 0 
}}>
  <AnimatePresence mode="wait">
    {hoveredProj !== null && (
      <motion.div 
        key={hoveredProj}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* The Image */}
        <Image 
          src={PROJECTS[hoveredProj].img} 
          alt={PROJECTS[hoveredProj].title} 
          fill 
          style={{ objectFit:'cover', zIndex: 1 }} 
          sizes="320px" 
          priority // Added priority to load images faster on hover
        />

        {/* Info Overlay - Higher Z-Index to stay on top */}
        <div style={{ 
          position:'absolute', 
          bottom:0, 
          left:0, 
          right:0, 
          padding:'12px 16px', 
          background:`linear-gradient(to top, ${C.bg}ee, transparent)`, 
          zIndex: 2 
        }}>
          <div style={{ 
            fontSize:9, 
            fontFamily:"'JetBrains Mono', monospace", 
            color: PROJECTS[hoveredProj].color, 
            letterSpacing:'.12em', 
            textTransform:'uppercase' 
          }}>
            {PROJECTS[hoveredProj]?.category}
          </div>
          <div style={{ 
            fontSize:14, 
            fontWeight:700, 
            color:C.text, 
            fontFamily:"'Plus Jakarta Sans', sans-serif" 
          }}>
            {PROJECTS[hoveredProj]?.title}
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>

            {/* Project rows */}
            <div style={{ borderTop:`1px solid ${C.border}` }}>
              {PROJECTS.map((p,i) => (
                <motion.a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-30px' }} transition={{ delay:i*.06, duration:.6 }}
                  onMouseEnter={() => { setHoveredProj(i); onEnter(); }}
                  onMouseLeave={() => { setHoveredProj(null); onLeave(); }}
                  className="proj-row"
                  style={{
                    display:'grid', gridTemplateColumns:'64px 1fr auto auto auto', alignItems:'center', gap:'clamp(12px,2vw,32px)',
                    padding:'clamp(18px,2.5vh,26px) 0',
                    borderBottom:`1px solid ${C.border}`,
                    textDecoration:'none',
                    background: hoveredProj === i ? `${p.color}06` : 'transparent',
                    transition:'background .3s',
                    cursor:'pointer',
                  }}>

                  {/* num */}
                  <div className="proj-row-num" style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:11, color:C.faint, letterSpacing:'.15em', fontWeight:600, transition:'color .3s' }}>{p.num}</div>

                  {/* title + category */}
                  <div>
                    <div className="proj-row-title" style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(16px,2vw,24px)', fontWeight:800, color:C.text, letterSpacing:'-0.03em', lineHeight:1.1, transition:'letter-spacing .3s' }}>{p.title}</div>
                    <div style={{ fontSize:11, color:C.muted, fontFamily:"'JetBrains Mono', monospace", letterSpacing:'.08em', marginTop:4 }}>{p.category}</div>
                  </div>

                  {/* tags — hide on small */}
                  <div className="desktop-only" style={{ display:'flex', gap:6, flexWrap:'wrap', justifyContent:'flex-end' }}>
                    {p.tags.map((t,j) => <Tag key={j} color={p.color}>{t}</Tag>)}
                  </div>

                  {/* year */}
                  <div className="desktop-only" style={{ fontSize:11, color:C.faint, fontFamily:"'JetBrains Mono', monospace", letterSpacing:'.1em', whiteSpace:'nowrap' }}>{p.year}</div>

                  {/* arrow */}
                  <motion.div
                    animate={{ x: hoveredProj===i ? 4 : 0, color: hoveredProj===i ? p.color : C.faint }}
                    style={{ fontSize:18, fontWeight:300, transition:'color .3s' }}>
                    ↗
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          EXPERIENCE
      ══════════════════════════════════════ */}
      <section id="experience" style={{ padding:'clamp(80px,10vh,140px) clamp(24px,5vw,80px)', background:C.surface, position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.7 }} style={{ marginBottom:64 }}>
            <Eyebrow>Career Path</Eyebrow>
            <h2 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(30px,4.5vw,64px)', fontWeight:800, color:C.text, letterSpacing:'-0.04em', lineHeight:1 }}>Experience</h2>
          </motion.div>
          <div className="exp-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
            {EXPERIENCE.map((exp,i) => (
              <motion.div key={i} initial={{ opacity:0, y:36 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.12, duration:.7 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = exp.color+'40'; onEnter(); }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; onLeave(); }}
                style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:20, padding:'36px 28px', position:'relative', overflow:'hidden', transition:'border-color .3s' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${exp.color}, transparent)` }} />
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:22 }}>
                  <span style={{ padding:'4px 12px', borderRadius:5, fontSize:9, fontFamily:"'JetBrains Mono', monospace", letterSpacing:'.15em', textTransform:'uppercase', background:exp.color+'18', color:exp.color, border:`1px solid ${exp.color}30`, fontWeight:600 }}>
                    {exp.current ? 'Current' : 'Past'}
                  </span>
                  <span style={{ fontSize:10, color:C.muted, fontFamily:"'JetBrains Mono', monospace" }}>{exp.period}</span>
                </div>
                <h3 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:18, fontWeight:800, color:C.text, marginBottom:6, letterSpacing:'-0.03em', lineHeight:1.3 }}>{exp.role}</h3>
                <p style={{ fontFamily:"'Fraunces', serif", fontStyle:'italic', color:exp.color, fontSize:15, marginBottom:4 }}>{exp.company}</p>
                <p style={{ fontSize:11, color:C.muted, fontFamily:"'JetBrains Mono', monospace", marginBottom:18 }}>{exp.location}</p>
                <p style={{ fontSize:14, color:C.muted, lineHeight:1.85 }}>{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding:'clamp(40px,5vh,60px) clamp(24px,5vw,80px)', position:'relative', zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ maxWidth:1300, margin:'0 auto', borderRadius:24, background:`linear-gradient(135deg, ${C.violet} 0%, #5B3FE4 100%)`, padding:'clamp(44px,5vw,72px)', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:32, position:'relative', overflow:'hidden' }}>
          <div aria-hidden style={{ position:'absolute', right:-80, top:-80, width:360, height:360, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.1)' }} />
          <div aria-hidden style={{ position:'absolute', right:-160, top:-160, width:560, height:560, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.05)' }} />
          <div style={{ position:'relative', zIndex:1 }}>
            <h2 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(22px,3.5vw,48px)', fontWeight:800, color:'#fff', letterSpacing:'-0.04em', lineHeight:1.1, marginBottom:10 }}>
              Ready to build something{' '}
              <span style={{ fontFamily:"'Fraunces', serif", fontStyle:'italic', fontWeight:400 }}>remarkable?</span>
            </h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.6)' }}>I reply within a few hours. Let's make it happen.</p>
          </div>
          <div style={{ position:'relative', zIndex:1, display:'flex', gap:12, flexWrap:'wrap' }}>
            <a href="#contact" onMouseEnter={onEnter} onMouseLeave={onLeave}
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'15px 28px', borderRadius:10, background:'#fff', color:C.violet, fontFamily:"'JetBrains Mono', monospace", fontSize:11, fontWeight:700, textDecoration:'none', letterSpacing:'.1em', transition:'all .3s' }}>
              START A PROJECT ↗
            </a>
            <a href="mailto:aashira28@gmail.com" onMouseEnter={onEnter} onMouseLeave={onLeave}
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 22px', borderRadius:10, background:'rgba(255,255,255,0.12)', color:'#fff', fontFamily:"'JetBrains Mono', monospace", fontSize:10, textDecoration:'none', letterSpacing:'.08em', border:'1px solid rgba(255,255,255,0.2)' }}>
              aashira28@gmail.com
            </a>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT
      ══════════════════════════════════════ */}
      <section id="contact" style={{ padding:'clamp(80px,10vh,140px) clamp(24px,5vw,80px)', background:C.surface, position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ marginBottom:64 }}>
            <Eyebrow>Get In Touch</Eyebrow>
            <h2 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(30px,4.5vw,64px)', fontWeight:800, color:C.text, letterSpacing:'-0.04em', lineHeight:1 }}>Let's Work Together</h2>
          </motion.div>
          <div className="contact-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:64, alignItems:'start' }}>
            <div>
              <p style={{ fontSize:16, color:C.muted, lineHeight:1.9, marginBottom:40, maxWidth:400 }}>New website, performance overhaul, or long-term dev partner — I'd love to hear what you're building.</p>
              <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:40 }}>
                {[
                  { icon:'✉', label:'Email',    value:'aashira28@gmail.com', href:'mailto:aashira28@gmail.com' },
                  { icon:'📱', label:'WhatsApp', value:'0343 0204417',        href:'tel:+923430204417' },
                  { icon:'🔗', label:'LinkedIn', value:'aashir-ahmed',        href:'https://linkedin.com/in/aashir-ahmed-2bb975115' },
                  { icon:'📍', label:'Location', value:'Karachi, Pakistan',   href:null },
                ].map((c,i) => (
                  <motion.div key={i} initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*.07 }}>
                    {c.href ? (
                      <a href={c.href} target={c.href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer"
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=C.violet+'55'; onEnter(); }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor=C.border; onLeave(); }}
                        style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px', borderRadius:12, background:C.card, border:`1px solid ${C.border}`, textDecoration:'none', transition:'all .3s' }}>
                        <div style={{ width:40, height:40, borderRadius:10, background:`${C.violet}14`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>{c.icon}</div>
                        <div>
                          <div style={{ fontSize:9, color:C.muted, fontFamily:"'JetBrains Mono', monospace", letterSpacing:'.16em', textTransform:'uppercase', marginBottom:2 }}>{c.label}</div>
                          <div style={{ fontSize:14, color:C.text, fontWeight:500 }}>{c.value}</div>
                        </div>
                      </a>
                    ) : (
                      <div style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px', borderRadius:12, background:C.card, border:`1px solid ${C.border}` }}>
                        <div style={{ width:40, height:40, borderRadius:10, background:`${C.violet}14`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>{c.icon}</div>
                        <div>
                          <div style={{ fontSize:9, color:C.muted, fontFamily:"'JetBrains Mono', monospace", letterSpacing:'.16em', textTransform:'uppercase', marginBottom:2 }}>{c.label}</div>
                          <div style={{ fontSize:14, color:C.text, fontWeight:500 }}>{c.value}</div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                {['⚡ Fast replies','🌍 Remote worldwide','🔒 NDA available','✓ Fixed-price options'].map((item,i) => (
                  <div key={i} style={{ padding:'11px 14px', borderRadius:10, background:C.card, border:`1px solid ${C.border}`, fontSize:11, color:C.muted, fontFamily:"'JetBrains Mono', monospace", letterSpacing:'.04em' }}>{item}</div>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.8 }}>
              <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:22, padding:'clamp(28px,4vw,48px)' }}>
                <h3 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:24, fontWeight:800, color:C.text, letterSpacing:'-0.04em', marginBottom:6 }}>Send a Message</h3>
                <p style={{ fontSize:13, color:C.muted, marginBottom:28, lineHeight:1.6 }}>I'll get back to you within one business day.</p>
                <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  <div className="form-2col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    {[
                      { id:'name',  label:'Your Name', type:'text',  ph:'John Smith' },
                      { id:'email', label:'Email',     type:'email', ph:'john@company.com' },
                    ].map(f => (
                      <div key={f.id}>
                        <label style={{ display:'block', fontSize:9, fontFamily:"'JetBrains Mono', monospace", color:C.muted, textTransform:'uppercase', letterSpacing:'.2em', marginBottom:8 }}>{f.label}</label>
                        <input type={f.type} required placeholder={f.ph} value={(formData as any)[f.id]} onChange={e => setFormData({ ...formData, [f.id]:e.target.value })} style={{ padding:'13px 14px' }} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:9, fontFamily:"'JetBrains Mono', monospace", color:C.muted, textTransform:'uppercase', letterSpacing:'.2em', marginBottom:8 }}>Service Needed</label>
                    <select required value={formData.service} onChange={e => setFormData({ ...formData, service:e.target.value })} style={{ padding:'13px 14px' }}>
                      <option value="">Select a service...</option>
                      <option>WordPress Development</option>
                      <option>Shopify / eCommerce</option>
                      <option>API Integration</option>
                      <option>SEO & Performance</option>
                      <option>Frontend Development</option>
                      <option>Other / Not Sure</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:9, fontFamily:"'JetBrains Mono', monospace", color:C.muted, textTransform:'uppercase', letterSpacing:'.2em', marginBottom:8 }}>Project Details</label>
                    <textarea required rows={5} placeholder="Tell me about your project, goals, and timeline..." value={formData.message} onChange={e => setFormData({ ...formData, message:e.target.value })} style={{ padding:'13px 14px', resize:'vertical', minHeight:120 }} />
                  </div>
                  <button type="submit" disabled={formStatus==='loading'} className="btn-primary" onMouseEnter={onEnter} onMouseLeave={onLeave}
                    style={{ padding:'16px', fontSize:11, width:'100%', marginTop:4, background:formStatus==='sent'?C.mint:formStatus==='error'?C.coral:C.violet }}>
                    <span>{{ idle:'Send Message ↗', loading:'Sending...', sent:"Sent! I'll be in touch ✓", error:'Failed — email me directly' }[formStatus]}</span>
                  </button>
                  <p style={{ fontSize:11, color:C.muted, textAlign:'center', fontFamily:"'JetBrains Mono', monospace" }}>
                    Or: <a href="mailto:aashira28@gmail.com" style={{ color:C.violet2, textDecoration:'none' }}>aashira28@gmail.com</a>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:C.bg, borderTop:`1px solid ${C.border}`, position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:1300, margin:'0 auto', padding:'clamp(44px,5vw,64px) clamp(24px,5vw,80px)' }}>
          <div className="footer-grid" style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:48, marginBottom:48 }}>
            <div>
              <a href="#top" style={{ textDecoration:'none', display:'inline-block', marginBottom:16 }}>
                <div style={{ display:'flex', alignItems:'center', gap:1 }}>
                  <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:24, fontWeight:800, color:C.text, letterSpacing:'-0.05em' }}>aashir</span>
                  <span style={{ fontFamily:"'Fraunces', serif", fontStyle:'italic', fontSize:28, color:C.violet }}>.</span>
                </div>
              </a>
              <p style={{ fontSize:13, color:C.muted, lineHeight:1.85, maxWidth:300, marginBottom:24 }}>Senior Web Developer building high-performance websites for businesses across North America and beyond.</p>
              <div style={{ display:'flex', gap:8 }}>
                {[
                  { l:'in', href:'https://linkedin.com/in/aashir-ahmed-2bb975115', title:'LinkedIn' },
                  { l:'✉',  href:'mailto:aashira28@gmail.com', title:'Email' },
                ].map((s,i) => (
                  <a key={i} href={s.href} title={s.title} target={s.href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer"
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=C.violet+'55'; (e.currentTarget as HTMLElement).style.color=C.violet2; onEnter(); }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor=C.border; (e.currentTarget as HTMLElement).style.color=C.muted; onLeave(); }}
                    style={{ width:38, height:38, borderRadius:8, border:`1px solid ${C.border}`, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted, textDecoration:'none', fontSize:11, fontFamily:"'JetBrains Mono', monospace", transition:'all .25s' }}>
                    {s.l}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize:9, fontFamily:"'JetBrains Mono', monospace", letterSpacing:'.2em', textTransform:'uppercase', color:C.violet, marginBottom:18 }}>Navigation</div>
              {NAV.map(n => (
                <a key={n} href={`#${n.toLowerCase()}`}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color=C.text; onEnter(); }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color=C.muted; onLeave(); }}
                  style={{ display:'block', padding:'8px 0', fontSize:14, color:C.muted, textDecoration:'none', fontWeight:500, transition:'color .2s' }}>{n}</a>
              ))}
            </div>
            <div>
              <div style={{ fontSize:9, fontFamily:"'JetBrains Mono', monospace", letterSpacing:'.2em', textTransform:'uppercase', color:C.violet, marginBottom:18 }}>Contact</div>
              {[
                { label:'Email',    val:'aashira28@gmail.com', href:'mailto:aashira28@gmail.com' },
                { label:'Phone',    val:'0343 0204417',         href:'tel:+923430204417' },
                { label:'Location', val:'Karachi, Pakistan',    href:null },
              ].map((c,i) => (
                <div key={i} style={{ marginBottom:14 }}>
                  <div style={{ fontSize:9, color:C.faint, fontFamily:"'JetBrains Mono', monospace", letterSpacing:'.12em', textTransform:'uppercase', marginBottom:2 }}>{c.label}</div>
                  {c.href ? <a href={c.href} style={{ fontSize:13, color:C.muted, textDecoration:'none' }}>{c.val}</a> : <span style={{ fontSize:13, color:C.muted }}>{c.val}</span>}
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:24, display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <p style={{ fontSize:10, color:C.faint, fontFamily:"'JetBrains Mono', monospace" }}>© 2025 Aashir Ahmed. All rights reserved.</p>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:C.mint, boxShadow:`0 0 8px ${C.mint}`, animation:'pulse-glow 2s ease-in-out infinite' }} />
              <span style={{ fontSize:10, fontFamily:"'JetBrains Mono', monospace", color:C.muted, letterSpacing:'.1em' }}>Open to new projects</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
