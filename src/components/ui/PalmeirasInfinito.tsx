// src/components/ui/PalmeirasInfinito.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

// 🔗 carrossel FIFA integrado
import FifaCarousel from "@/fifa/FifaCarousel";
import players from "@/fifa/players";

/* ================================
   Paleta + Constantes
==================================*/
const palette = {
  greenNeonDark: "#0B8F55",
  greenNeon: "#00FF90",
  night: "#030a07",
  leaf: "rgba(9, 35, 24, 0.6)",
  text: "#E8FFF3",
  textMuted: "#9DD8BD",
  border: "rgba(0,255,144,0.25)",
};

const PALMEIRAS_CREST =
  "https://upload.wikimedia.org/wikipedia/commons/1/10/Palmeiras_logo.svg";

/* ================================
   Ícones sociais (inline SVG)
==================================*/
function IconInstagram(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}
function IconX(p: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...p}><path d="M17.5 3h3l-7 8.2L22 21h-6.9l-5.3-6.5L3.8 21H1l7.6-8.9L2 3h7l4.8 5.9L17.5 3Z" fill="currentColor"/></svg>;
}
function IconYouTube(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M23 12s0-3.4-.4-4.9c-.2-.9-.9-1.6-1.8-1.8C18.3 4 12 4 12 4S5.7 4 3.2 4.3c-.9.2-1.6.9-1.8 1.8C1 8.6 1 12 1 12s0 3.4.4 4.9c.2.9.9 1.6 1.8 1.8C5.7 19.9 12 20 12 20s6.3 0 8.8-.3c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.9.4-4.9Z" fill="currentColor"/>
      <path d="M10 15.5v-7l6 3.5-6 3.5Z" fill={palette.night}/>
    </svg>
  );
}
function IconTikTok(p: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...p}><path d="M14.5 3c.6 1.8 2 3.2 3.8 3.7v3.1c-1.7-.1-3.3-.7-4.6-1.8v6.2a5.4 5.4 0 11-3.1-4.9v3.2a2.3 2.3 0 11-1.6 2.1V3h2.5Z" fill="currentColor"/></svg>;
}

/* ================================
   Tipos — Títulos
==================================*/
type MajorScope = "Internacional" | "Continental" | "Nacional" | "Interestadual" | "Estadual";
type Titulo = { ano: number; competencia: string; escopo: MajorScope; observacao?: string };

/* ================================
   Dataset de Títulos (corrigido)
==================================*/
const BASE_TITULOS: Titulo[] = [
  // Internacional / Continental
  { ano: 1951, competencia: "Copa Rio Internacional", escopo: "Internacional", observacao: "Título internacional de 1951 (\"Mundial\")" },
  { ano: 1998, competencia: "Copa Mercosul", escopo: "Continental" },
  { ano: 1999, competencia: "Copa Libertadores da América", escopo: "Continental" },
  { ano: 2020, competencia: "Copa Libertadores da América", escopo: "Continental" },
  { ano: 2021, competencia: "Copa Libertadores da América", escopo: "Continental" },
  { ano: 2022, competencia: "Recopa Sul-Americana", escopo: "Continental" },

  // Nacionais
  { ano: 1960, competencia: "Campeonato Brasileiro (Taça Brasil)", escopo: "Nacional" },
  { ano: 1967, competencia: "Campeonato Brasileiro (Robertão)", escopo: "Nacional" },
  { ano: 1967, competencia: "Campeonato Brasileiro (Taça Brasil)", escopo: "Nacional" },
  { ano: 1969, competencia: "Campeonato Brasileiro (Robertão)", escopo: "Nacional" },
  { ano: 1972, competencia: "Campeonato Brasileiro", escopo: "Nacional" },
  { ano: 1973, competencia: "Campeonato Brasileiro", escopo: "Nacional" },
  { ano: 1993, competencia: "Campeonato Brasileiro", escopo: "Nacional" },
  { ano: 1994, competencia: "Campeonato Brasileiro", escopo: "Nacional" },
  { ano: 2016, competencia: "Campeonato Brasileiro", escopo: "Nacional" },
  { ano: 2018, competencia: "Campeonato Brasileiro", escopo: "Nacional" },
  { ano: 2022, competencia: "Campeonato Brasileiro", escopo: "Nacional" },
  { ano: 2023, competencia: "Campeonato Brasileiro", escopo: "Nacional" },

  { ano: 1998, competencia: "Copa do Brasil", escopo: "Nacional" },
  { ano: 2012, competencia: "Copa do Brasil", escopo: "Nacional" },
  { ano: 2015, competencia: "Copa do Brasil", escopo: "Nacional" },
  { ano: 2020, competencia: "Copa do Brasil", escopo: "Nacional" },

  { ano: 2023, competencia: "Supercopa do Brasil", escopo: "Nacional" },
  { ano: 2000, competencia: "Copa dos Campeões", escopo: "Nacional" },

  // Interestaduais
  { ano: 1933, competencia: "Torneio Rio–São Paulo", escopo: "Interestadual" },
  { ano: 1951, competencia: "Torneio Rio–São Paulo", escopo: "Interestadual" },
  { ano: 1965, competencia: "Torneio Rio–São Paulo", escopo: "Interestadual" },
  { ano: 1993, competencia: "Torneio Rio–São Paulo", escopo: "Interestadual" },
  { ano: 2000, competencia: "Torneio Rio–São Paulo", escopo: "Interestadual" },
];

// Paulistas (regulares)
const PAULISTA_ANOS = [
  1920,1926,1927,1932,1933,1934,1936,1940,1942,1944,1947,1950,1959,1963,1966,1972,1974,1976,1993,1994,1996,2008,2020,2022,2023,2024,
];
const PAULISTAS: Titulo[] = PAULISTA_ANOS.map((ano) => ({
  ano, competencia: "Campeonato Paulista", escopo: "Estadual",
}));

// Paulistas “Extra”
const PAULISTAS_EXTRA: Titulo[] = [
  { ano: 1926, competencia: "Campeonato Paulista (Extra)", escopo: "Estadual" },
  { ano: 1938, competencia: "Campeonato Paulista (Extra)", escopo: "Estadual" },
];

// Dataset final
const TITULOS: Titulo[] = [...BASE_TITULOS, ...PAULISTAS, ...PAULISTAS_EXTRA];

/* ================================
   Helpers para títulos / contadores
==================================*/
const byYear = (a: Titulo, b: Titulo) => a.ano - b.ano;

const groupByDecade = (items: Titulo[]) => {
  const map: Record<string, Titulo[]> = {};
  items.forEach((t) => {
    const decade = `${Math.floor(t.ano / 10) * 10}s`;
    (map[decade] ||= []).push(t);
  });
  Object.values(map).forEach((arr) => arr.sort(byYear));
  return Object.entries(map)
    .sort((a,b)=>parseInt(a[0])-parseInt(b[0]))
    .map(([decade,data])=>({ decade, data }));
};

const isLiberta = (t: Titulo) => t.competencia.includes("Libertadores");
const isBrasileiro = (t: Titulo) =>
  t.competencia.startsWith("Campeonato Brasileiro") && !t.competencia.includes("Série B");
const isCdB = (t: Titulo) => t.competencia.includes("Copa do Brasil");
const isPaulista = (t: Titulo) => t.competencia.startsWith("Campeonato Paulista");
const isPaulistaExtra = (t: Titulo) => t.competencia.includes("(Extra)");

const yearsOf = (pred: (t: Titulo)=>boolean) =>
  TITULOS.filter(pred).map((t)=>t.ano).sort((a,b)=>a-b);

/* ================================
   Componente
==================================*/
export default function PalmeirasInfinito() {
  const decades = useMemo(() => groupByDecade(TITULOS.slice().sort(byYear)), []);

  // Contadores corretos
  const yearsLib = yearsOf(isLiberta);
  const yearsBras = yearsOf(isBrasileiro);
  const yearsCdB = yearsOf(isCdB);
  const yearsPaulReg = yearsOf((t)=> isPaulista(t) && !isPaulistaExtra(t));
  const yearsPaulEx = yearsOf(isPaulistaExtra);

  const counts = {
    lib: yearsLib.length,
    bras: yearsBras.length,
    cdb: yearsCdB.length,
    paulReg: yearsPaulReg.length,
    paulEx: yearsPaulEx.length,
    total: TITULOS.length,
  };

  // Partículas leves no fundo
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const DPR = globalThis.devicePixelRatio||1;
    const resize = ()=>{ c.width=c.clientWidth*DPR; c.height=c.clientHeight*DPR; };
    resize();
    const dots = Array.from({length:48}).map(()=>({
      x: Math.random()*c.width, y: Math.random()*c.height, r: .8+Math.random()*1.2, s:.15+Math.random()*.6, a:.15+Math.random()*.25
    }));
    let t=0;
    const loop=()=>{
      t+=1; ctx.clearRect(0,0,c.width,c.height);
      dots.forEach((d,i)=>{
        d.x += Math.cos((t+i*13)/150)*d.s;
        d.y += Math.sin((t+i*19)/170)*d.s;
        if(d.x<0) d.x=c.width; if(d.x>c.width) d.x=0; if(d.y<0) d.y=c.height; if(d.y>c.height) d.y=0;
        ctx.beginPath(); ctx.fillStyle=`rgba(0,255,144,${d.a})`; ctx.arc(d.x,d.y,d.r*DPR,0,Math.PI*2); ctx.fill();
      });
      raf=requestAnimationFrame(loop);
    };
    loop(); return ()=>cancelAnimationFrame(raf);
  }, []);

  /* ========= Linha do Tempo: clean (sem barra visível) ========= */
  const timelineRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el = timelineRef.current; if(!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY * 0.9, behavior: "smooth" });
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return ()=> el.removeEventListener("wheel", onWheel);
  }, []);

  /* ========= Menu móvel (hamburger só no mobile) ========= */
  const [navOpen, setNavOpen] = useState(false);
  useEffect(()=>{
    const onHash = () => setNavOpen(false);
    window.addEventListener("hashchange", onHash);
    // fecha menu móvel se a viewport ficar ≥640px
    const onResize = () => {
      if (window.innerWidth >= 640) setNavOpen(false);
    };
    window.addEventListener("resize", onResize);
    return ()=> {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: `radial-gradient(1200px 800px at 20% -10%, rgba(0,255,144,0.12), transparent 60%),
                     radial-gradient(900px 600px at 100% 10%, rgba(11,143,85,0.22), transparent 55%),
                     linear-gradient(180deg, ${palette.night}, #03140f 60%, #020806)`,
        color: palette.text,
      }}
    >
      {/* Logo de fundo com PULSO */}
      <img
        src={PALMEIRAS_CREST}
        alt=""
        className="pointer-events-none fixed right-[-8vw] bottom-[-8vw] opacity-10 select-none pulse"
        style={{ width: "50vw", filter: "drop-shadow(0 0 20px rgba(0,255,144,0.25))" }}
      />

      {/* Partículas */}
      <canvas ref={canvasRef} className="fixed inset-0 -z-10 w-full h-full pointer-events-none" />

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl">
        <div className="w-full border-b" style={{ borderColor: palette.border, boxShadow: "inset 0 -1px 0 rgba(0,255,144,0.15), 0 6px 24px rgba(0,255,144,0.06), 0 1px 0 rgba(255,255,255,0.03)" }}>
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <img src={PALMEIRAS_CREST} alt="Palmeiras" className="h-10 w-10 md:h-12 md:w-12" style={{ filter: "drop-shadow(0 0 12px rgba(0,255,144,0.35))" }} />
              <span className="hidden sm:block text-sm md:text-base tracking-widest uppercase" style={{ color: palette.textMuted }}>
                Palmeiras Hub • Amor e História
              </span>
            </div>

            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-2">
              <a href="#timeline" className="nav-pill">Linha do Tempo</a>
              <a href="#mancha" className="nav-pill">Mancha</a>
              <a href="#cards" className="nav-pill">Cards do Elenco</a>
              <a href="#titulos" className="nav-pill">Títulos</a>
            </div>

            {/* Mobile hamburger (somente mobile) */}
            <button
              className="sm:hidden hamburger"
              aria-label="Abrir menu"
              aria-expanded={navOpen}
              onClick={()=>setNavOpen(v=>!v)}
            >
              <span />
              <span />
              <span />
            </button>
          </nav>

          {/* Painel mobile (forçado a esconder em ≥640px) */}
          <div className={`mobile-panel ${navOpen ? "open" : ""}`}>
            <a href="#timeline" onClick={()=>setNavOpen(false)}>Linha do Tempo</a>
            <a href="#mancha" onClick={()=>setNavOpen(false)}>Mancha</a>
            <a href="#cards" onClick={()=>setNavOpen(false)}>Cards do Elenco</a>
            <a href="#titulos" onClick={()=>setNavOpen(false)}>Títulos</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 md:pt-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                <span className="block">Palmeiras não é só um clube.</span>
                <span
                  className="mt-3 inline-block animate-gradient bg-clip-text text-transparent font-extrabold tracking-wide fancy-underline"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg,#00FF90 0%,#84FFC9 35%,#C3FFED 50%,#00FF90 75%,#84FFC9 100%)",
                    textShadow: "0 0 22px rgba(0,255,144,0.45)",
                    fontSize: "clamp(1.25rem,1rem+1.5vw,2rem)",
                  }}
                >
                  É identidade. É dedicação. É você.
                </span>
              </h1>

              <p className="mt-6 text-base md:text-lg" style={{ color: palette.textMuted }}>
                Mais do que resultados, é <strong>pertencimento</strong>. História, títulos e pessoas — numa experiência feita para quem vive o clube.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#timeline" className="btn-primary">Ver Linha do Tempo</a>
                <a href="#cards" className="btn-ghost">Abrir Cards do Elenco</a>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl p-6" style={{ background: palette.leaf, border: `1px solid ${palette.border}`, boxShadow: "0 10px 40px rgba(0,255,144,0.12), inset 0 0 0 1px rgba(255,255,255,0.04)" }}>
                <img src={PALMEIRAS_CREST} alt="Brasão Palmeiras" className="mx-auto h-52 w-52 drop-shadow-2xl" style={{ filter: "drop-shadow(0 0 14px rgba(0,255,144,0.35)) drop-shadow(0 0 60px rgba(0,255,144,0.15))" }} />
                <p className="mt-6 text-center text-sm" style={{ color: palette.textMuted }}>“Quando surge o Alviverde imponente…”</p>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="stat-chip">Tríplice 1993</div>
                  <div className="stat-chip">Copa Rio 1951</div>
                  <div className="stat-chip">Liberta 99/20/21</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* scanlines sobre o hero */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay [background-image:repeating-linear-gradient(0deg,rgba(0,255,144,0.4),rgba(0,255,144,0.4)_1px,transparent_1px,transparent_3px)]" />
      </section>

      {/* LINHA DO TEMPO — clean */}
      <section id="timeline" className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <h2 className="section-title">Linha do Tempo</h2>
        <p className="section-subtitle">Momentos que moldaram a identidade palestrina.</p>

        <div className="relative mt-6">
          <div className="timeline clean" ref={timelineRef}>
            {[
              { ano: 1914, titulo: "Fundação (Palestra Italia)", desc: "Raiz italiana, alma brasileira." },
              { ano: 1942, titulo: "Arrancada Heroica", desc: "Mudança para Palmeiras + título no Pacaembu." },
              { ano: 1951, titulo: "Cinco Coroas & Copa Rio", desc: "Conquista internacional emblemática." },
              { ano: 1960, titulo: "Primeiro Brasileiro", desc: "Academia inicia hegemonia nacional." },
              { ano: 1972, titulo: "Academia Bicampeã", desc: "Domínio técnico e mentalidade vencedora." },
              { ano: 1993, titulo: "Retomada", desc: "Paulista, Rio–SP e Brasileiro." },
              { ano: 1999, titulo: "Libertadores I", desc: "A América é nossa." },
              { ano: 2020, titulo: "Libertadores II + Tríplice", desc: "Liberta, Copa do Brasil e Estadual." },
              { ano: 2021, titulo: "Libertadores III", desc: "Bicampeonato consecutivo." },
              { ano: 2022, titulo: "Recopa + Brasileiro", desc: "Consolidação recente." },
              { ano: 2024, titulo: "Paulista Tricampeão", desc: "Sequência 2022–24." },
            ].map((e,i)=>(
              <article
                key={i}
                className="timeline-card group"
                style={{ borderColor: palette.border, background:"linear-gradient(180deg, rgba(9,35,24,0.65), rgba(9,35,24,0.35))" }}
                onClick={()=>document.getElementById("cards")?.scrollIntoView({ behavior: "smooth" })}
              >
                <div className="text-[11px] tracking-widest text-emerald-300/80">{e.ano}</div>
                <h3 className="text-lg font-semibold mt-0.5">{e.titulo}</h3>
                <p className="text-sm mt-1 text-emerald-200/80">{e.desc}</p>
                <div className="mt-3 h-[2px] w-full origin-left scale-x-0 bg-emerald-300/60 transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MANCHA ALVI VERDE — aprimorado (mantido da versão anterior) */}
      <section id="mancha" className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <h2 className="section-title">Mancha Alvi Verde</h2>
        <p className="section-subtitle">Torcida que canta, vibra e carrega a história.</p>

        <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr]">
          {/* Texto/trajetória */}
          <div className="rounded-3xl p-6 md:p-7 mancha-card">
            <h3 className="text-xl font-semibold">Origem & Identidade</h3>
            <p className="mt-3 text-sm/6 text-emerald-100/90">
              Fundada em 1983, a Mancha Alvi Verde nasce da união de torcidas palestrinas, consolidando-se como a principal organizada do Palmeiras.
              Presença marcante no <strong>Gol Norte</strong> e atuação cultural destacada, com a escola de samba de mesmo nome.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="fact">
                <span className="fact-k">Setor</span>
                <span className="fact-v">Gol Norte (Allianz Parque)</span>
              </div>
              <div className="fact">
                <span className="fact-k">Fundação</span>
                <span className="fact-v">11 jan 1983</span>
              </div>
              <div className="fact">
                <span className="fact-k">Atuação</span>
                <span className="fact-v">Arquibancada • Social • Cultural</span>
              </div>
              <div className="fact">
                <span className="fact-k">Samba</span>
                <span className="fact-v">Escola de Samba Mancha Verde</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-emerald-200/70">Informações públicas/ oficiais da torcida.</p>
          </div>

          {/* Redes oficiais (sem TikTok) */}
          <div className="rounded-3xl p-6 md:p-7 mancha-card-alt">
            <h3 className="text-xl font-semibold">Redes Oficiais</h3>
            <div className="mt-4 grid gap-3">
              <a className="social-lg wide" href="https://manchaalviverde.com.br/" target="_blank" rel="noreferrer"><span>Site Oficial</span></a>
              <a className="social-lg wide" href="https://www.instagram.com/manchaverdetorcida/" target="_blank" rel="noreferrer"><IconInstagram className="h-5 w-5" /><span>@manchaverdetorcida</span></a>
              <a className="social-lg wide" href="https://www.facebook.com/manchaverde/?locale=pt_BR" target="_blank" rel="noreferrer"><span>Facebook (Oficial)</span></a>
              <a className="social-lg wide" href="https://x.com/torcidamv83" target="_blank" rel="noreferrer"><IconX className="h-5 w-5" /><span>@torcidamv83</span></a>
              <a className="social-lg wide" href="https://www.youtube.com/manchaverde1983" target="_blank" rel="noreferrer"><IconYouTube className="h-5 w-5" /><span>YouTube</span></a>
              <a className="social-lg wide" href="https://lojamanchaalviverde.com.br/institucional/15183/44535" target="_blank" rel="noreferrer"><span>Loja Oficial — Institucional</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 CARDS DO ELENCO — carrossel FIFA */}
      <section id="cards" className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <h2 className="section-title">Cards do Elenco</h2>
        <p className="section-subtitle">
          Uma carta por vez — navegue com botões, setas do teclado, swipe no mobile e dots acessíveis (tabs).
        </p>
        <div className="mt-6 flex justify-center">
          <FifaCarousel players={players} />
        </div>
      </section>

      {/* CONTADORES — desktop com chips, mobile com linha */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          <StatTile title="Libertadores" value={counts.lib} years={yearsLib} />
          <StatTile title="Brasileiros" value={counts.bras} years={yearsBras} />
          <StatTile title="Copa do Brasil" value={counts.cdb} years={yearsCdB} />
          <StatTile title="Paulista (Regulares)" value={counts.paulReg} years={yearsPaulReg} />
          <StatTile title="Paulista (Extra)" value={counts.paulEx} years={yearsPaulEx} glow />
        </div>
        <div className="mt-2 text-right text-sm text-emerald-200/90">…e contando.</div>
      </section>

      {/* GUIA DE TÍTULOS (sem filtro) + destaque 1951 */}
      <section id="titulos" className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <h2 className="section-title">Guia de Títulos — Todos com Data</h2>
        <p className="section-subtitle">Internacionais, Continentais, Nacionais, Interestaduais e Estaduais (inclui “Extra”).</p>

        {/* Destaque 1951 */}
        <div className="mt-6 rounded-3xl p-4 md:p-6 relative overflow-hidden"
             style={{ background: "linear-gradient(135deg, rgba(0,255,144,0.12), rgba(9,35,24,0.75))", border:`1px solid ${palette.border}`,
                      boxShadow:"0 12px 40px rgba(0,255,144,.15), inset 0 0 0 1px rgba(255,255,255,.04)" }}>
          <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full opacity-25" style={{ background:"radial-gradient(circle, rgba(0,255,144,.5), transparent 60%)" }} />
          <div className="text-xs uppercase tracking-widest text-emerald-200/80">1951 • Maracanã</div>
          <div className="mt-1 text-2xl md:text-3xl font-extrabold">Copa Rio Internacional — <span className="text-emerald-300">Mundial</span></div>
          <p className="mt-2 text-sm text-emerald-100/85">Vitória sobre a Juventus (ITA) na decisão; parte das “Cinco Coroas”.</p>
        </div>

        {/* Lista por décadas */}
        <div className="mt-6 space-y-3">
          {decades.map(({ decade, data })=>(
            <details key={decade} open={decade==="1920s"}
              className="rounded-2xl"
              style={{ background: "linear-gradient(180deg, rgba(9,35,24,0.55), rgba(9,35,24,0.35))", border: `1px solid ${palette.border}` }}>
              <summary className="cursor-pointer select-none px-4 py-3 text-lg font-semibold tracking-wide">
                {decade}<span className="ml-2 text-sm text-emerald-200/70">({data.length})</span>
              </summary>
              <div className="grid gap-2 px-4 pb-4 pt-1 md:grid-cols-2 lg:grid-cols-3">
                {data.map((t, idx)=>(
                  <div key={idx} className="rounded-xl px-3 py-2 text-sm"
                       style={{ border:`1px dashed ${palette.border}`, background:"linear-gradient(180deg, rgba(0,255,144,0.06), rgba(0,0,0,0))" }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{t.ano}</span>
                      <span className="rounded-full px-2 py-0.5 text-[11px] uppercase tracking-wider"
                            style={{ border:`1px solid ${palette.border}`, color: palette.greenNeon, background:"rgba(0,255,144,0.06)" }}>
                        {t.escopo}
                      </span>
                    </div>
                    <div className="mt-1">{t.competencia}</div>
                    {t.observacao && <div className="mt-0.5 text-xs text-emerald-200/70">• {t.observacao}</div>}
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* RODAPÉ REDES (clube) */}
      <section id="redes" className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="section-title">Canais Oficiais do Palmeiras</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a className="social-lg" href="https://www.palmeiras.com.br/" target="_blank" rel="noreferrer"><span>Site Oficial</span></a>
          <a className="social-lg" href="https://www.youtube.com/c/palmeirasbr" target="_blank" rel="noreferrer"><IconYouTube className="h-5 w-5" /><span>YouTube</span></a>
          <a className="social-lg" href="https://www.instagram.com/palmeiras" target="_blank" rel="noreferrer"><IconInstagram className="h-5 w-5" /><span>Instagram</span></a>
          <a className="social-lg" href="https://x.com/Palmeiras" target="_blank" rel="noreferrer"><IconX className="h-5 w-5" /><span>X</span></a>
          <a className="social-lg" href="https://www.tiktok.com/@palmeiras" target="_blank" rel="noreferrer"><IconTikTok className="h-5 w-5" /><span>TikTok</span></a>
        </div>
      </section>

      {/* ESTILOS GLOBAIS LOCAIS */}
      <style jsx global>{`
        .pulse { animation: pulseGlow 5.5s ease-in-out infinite; transform-origin: 80% 80%; }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 16px rgba(0,255,144,.18)); opacity:.10; }
          50%      { transform: scale(1.04); filter: drop-shadow(0 0 28px rgba(0,255,144,.35)); opacity:.16; }
        }

        /* ================= Nav (desktop + mobile) ================= */
        .nav-pill {
          display:inline-flex; align-items:center; gap:8px; padding:8px 14px; border-radius:9999px;
          font-weight:600; letter-spacing:.02em; color:${palette.text};
          background: linear-gradient(180deg, rgba(0,255,144,.12), rgba(0,0,0,.2));
          border:1px solid ${palette.border};
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .nav-pill:hover { transform: translateY(-1px); box-shadow: 0 0 0 3px rgba(0,255,144,.15), 0 8px 28px rgba(0,255,144,.12); background: linear-gradient(180deg, rgba(0,255,144,.20), rgba(0,0,0,.2)); }

        .hamburger { display:inline-flex; flex-direction:column; gap:4px; padding:10px 8px; border-radius:12px; border:1px solid ${palette.border}; background:rgba(0,0,0,.2); }
        .hamburger span { width:22px; height:2px; background:${palette.text}; display:block; border-radius:2px; }

        .mobile-panel {
          display:none;
          background: linear-gradient(180deg, rgba(3,10,7,.95), rgba(3,20,14,.9));
          border-top:1px solid ${palette.border};
          box-shadow: 0 18px 40px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.04);
        }
        .mobile-panel.open { display:grid; gap:8px; padding:10px 14px 14px; }
        .mobile-panel a {
          display:block; padding:10px 12px; border-radius:12px; border:1px solid ${palette.border};
          background:rgba(0,255,144,.06); color:${palette.text}; font-weight:600;
        }
        /* força oculto em ≥640px para evitar duplicação */
        @media (min-width: 640px) {
          .mobile-panel { display: none !important; }
        }

        .btn-primary {
          display:inline-flex; align-items:center; justify-content:center; padding:10px 16px; border-radius:14px;
          background: linear-gradient(90deg, #0b8f55, #0bd27a 60%, #00ff90); color:#04110c; font-weight:800;
          text-shadow:0 1px 0 rgba(255,255,255,.2); box-shadow:0 10px 30px rgba(0,255,144,.3); transition: transform .15s ease;
        }
        .btn-primary:hover { transform: translateY(-1px); }
        .btn-ghost { display:inline-flex; align-items:center; justify-content:center; padding:10px 16px; border-radius:14px; color:${palette.text}; border:1px solid ${palette.border}; background:rgba(0,0,0,.2); }

        .section-title {
          font-size: clamp(1.4rem, .9rem + 2.2vw, 2rem); font-weight:900; letter-spacing:.02em; text-transform:uppercase;
          text-shadow: 0 0 18px rgba(0,255,144,.24);
        }
        .section-subtitle { margin-top:6px; color:${palette.textMuted}; font-size:.95rem; }

        @keyframes gradientShift { 0%{background-position:0% 50%} 100%{background-position:100% 50%} }
        .animate-gradient { background-size:200% 200%; animation: gradientShift 3.5s linear infinite; }
        .fancy-underline { box-shadow: 0 -6px 0 inset rgba(0,255,144,.12), 0 -12px 0 inset rgba(0,255,144,.05); border-radius: 10px; }

        .stat-chip { border:1px solid ${palette.border}; background:rgba(0,255,144,.06); padding:6px 10px; border-radius:9999px; }
        .li-dot { position:relative; padding-left:18px; }
        .li-dot::before { content:""; position:absolute; left:0; top:9px; width:8px; height:8px; border-radius:9999px; background:${palette.greenNeon}; box-shadow:0 0 16px rgba(0,255,144,.5); }

        /* Timeline — clean: sem barra visível, scroll suave no mouse */
        .timeline.clean {
          display:flex; gap:16px; overflow-x:auto; padding:10px 6px; scroll-snap-type:x mandatory;
          scrollbar-width: none;  /* Firefox */
        }
        .timeline.clean::-webkit-scrollbar { display:none; } /* WebKit */
        .timeline-card {
          min-width:min(82vw,360px); border:1px solid; border-radius:20px; padding:16px;
          transition: transform .25s ease, box-shadow .25s ease; scroll-snap-align:center; cursor:pointer;
        }
        .timeline-card:hover { transform: translateY(-3px); box-shadow:0 10px 30px rgba(0,255,144,.2); }

        .social, .social-lg { display:inline-flex; align-items:center; gap:8px; padding:8px 12px; border-radius:9999px; border:1px solid ${palette.border}; color:${palette.text}; background:rgba(0,0,0,.15); transition: transform .15s ease, box-shadow .15s ease; }
        .social-lg { padding:10px 14px; font-weight:600; }
        .social-lg.wide { justify-content:flex-start; }
        .social:hover, .social-lg:hover { box-shadow:0 0 0 3px rgba(0,255,144,.15); transform: translateY(-1px); }

        /* ====== Mancha cards ====== */
        .mancha-card {
          background: linear-gradient(180deg, rgba(9,35,24,0.65), rgba(9,35,24,0.35));
          border: 1px solid ${palette.border};
          box-shadow: 0 10px 40px rgba(0,255,144,0.10), inset 0 0 0 1px rgba(255,255,255,0.04);
          border-radius: 22px;
        }
        .mancha-card-alt {
          background: linear-gradient(180deg, rgba(0,255,144,0.08), rgba(9,35,24,0.60));
          border: 1px solid ${palette.border};
          box-shadow: 0 10px 40px rgba(0,255,144,0.10), inset 0 0 0 1px rgba(255,255,255,0.04);
          border-radius: 22px;
        }
        .fact { display:flex; flex-direction:column; gap:4px; padding:10px 12px; border:1px dashed ${palette.border}; border-radius:12px; background:rgba(0,255,144,.04); }
        .fact-k { font-size:.75rem; color:${palette.textMuted}; text-transform:uppercase; letter-spacing:.06em; }
        .fact-v { font-weight:700; }

        /* ====== Stat Tiles (contadores) ====== */
        .stat-tile {
          position:relative; overflow:hidden; border-radius:20px; padding:14px 14px 12px;
          background: linear-gradient(180deg, rgba(9,35,24,0.55), rgba(9,35,24,0.35));
          border: 1px solid ${palette.border};
          box-shadow: 0 8px 28px rgba(0,255,144,.10), inset 0 0 0 1px rgba(255,255,255,.03);
        }
        .stat-tile .crest {
          position:absolute; right:-18px; top:-18px; width:100px; opacity:.10;
          filter:drop-shadow(0 0 8px rgba(0,255,144,.25));
        }
        .stat-tile .value {
          display:inline-grid; place-items:center; min-width:56px; height:56px; border-radius:16px;
          background: linear-gradient(90deg, #00ff90, #66ffc9);
          color:#04110c; font-weight:900; font-size:1.25rem; margin-right:10px;
          box-shadow: 0 8px 24px rgba(0,255,144,.25);
        }
        .stat-tile .label { font-weight:800; }

        /* Mobile: anos em linha simples */
        .years-inline { margin-top:4px; color:${palette.textMuted}; font-size:.9rem; }
        /* Desktop: chips legíveis */
        @media (min-width: 1024px) {
          .years-chips { margin-top:8px; display:flex; flex-wrap:wrap; gap:6px; }
          .year-chip {
            display:inline-flex; align-items:center; padding:4px 8px; border-radius:9999px;
            border:1px solid ${palette.border};
            background:rgba(0,255,144,.06);
            color:${palette.text};
            font-size:.8rem; line-height:1;
          }
        }
      `}</style>
    </div>
  );
}

/* ====== subcomponente: stat tile ====== */
function StatTile({
  title,
  value,
  years,
  glow=false,
}: {
  title: string;
  value: number;
  years?: number[];
  glow?: boolean;
}) {
  return (
    <div className={`stat-tile ${glow ? "glow" : ""}`}>
      <img src={PALMEIRAS_CREST} alt="" className="crest" />
      <div className="flex items-start gap-3">
        <div className="value">{value}</div>
        <div>
          <div className="label">{title}</div>

          {/* Mobile: linha única com bullets */}
          {years && (
            <div className="years-inline lg:hidden">
              {years.join(" • ")}
            </div>
          )}

          {/* Desktop: chips bonitos e organizados */}
          {years && (
            <div className="years-chips hidden lg:flex">
               {years.map((y, i) => (
                <span key={y} className="year-chip">{y}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
