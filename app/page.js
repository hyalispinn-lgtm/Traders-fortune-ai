"use client";

import Link from "next/link";
import { useState } from "react";

const markets = [
  ["BTC/USD", "$104,820.45", "+2.41%"],
  ["ETH/USD", "$3,812.67", "+1.87%"],
  ["AAPL", "$188.54", "+0.94%"],
  ["TSLA", "$342.18", "-1.26%"],
  ["NVDA", "$174.82", "+3.18%"],
  ["SPX", "$6,428.12", "+0.72%"],
];

const features = [
  ["AI COACH", "Get plain-English trading education, setup analysis and risk guidance."],
  ["TRADE LAB", "Practice entries, exits, sizing and risk with simulated money."],
  ["FORTUNE ACADEMY", "Build your trading foundation with structured lessons."],
  ["STRATEGY CENTER", "Explore momentum, trend and breakout ideas without risking cash."],
];

export default function Home() {
  const [notice, setNotice] = useState("");

  function demo() {
    setNotice("Demo mode is ready — open Trade Lab to start with $100,000 simulated cash.");
    setTimeout(() => setNotice(""), 4500);
  }

  return (
    <main>
      <header className="nav">
        <Link className="brand" href="/">TF<span>AI</span></Link>
        <nav>
          <Link href="/">Markets</Link>
          <Link href="/education">Academy</Link>
          <Link href="/coach">AI Coach</Link>
          <Link href="/trade-lab">Trade Lab</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>
        <Link className="navCta" href="/trade-lab">Enter Platform →</Link>
      </header>

      <section className="hero">
        <div className="glow one" />
        <div className="glow two" />
        <div className="eyebrow">● TRADERS FORTUNE AI — INTELLIGENCE ONLINE</div>
        <h1>TRADE SMARTER.<br /><span>BUILD YOUR FORTUNE.</span></h1>
        <p className="heroText">
          Your all-in-one trading command center for AI coaching, market education,
          strategy discovery and risk-free paper trading.
        </p>
        <div className="actions">
          <Link className="primary" href="/trade-lab">START DEMO →</Link>
          <Link className="secondary" href="/coach">MEET YOUR AI COACH</Link>
        </div>
        {notice && <div className="notice">{notice}</div>}
        <div className="badges">
          <span>◆ PAPER TRADING</span><span>◆ AI COACHING</span><span>◆ RISK CONTROLS</span><span>◆ EDUCATION</span>
        </div>
      </section>

      <section className="ticker">
        {markets.map(([s,p,c]) => <div key={s}><b>{s}</b><strong>{p}</strong><em className={c.startsWith("-") ? "down" : ""}>{c}</em></div>)}
      </section>

      <section className="section">
        <div className="sectionHead">
          <div><div className="eyebrow">LIVE DEMO MARKET</div><h2>MARKET COMMAND CENTER</h2></div>
          <button className="smallBtn" onClick={demo}>Test Demo Mode</button>
        </div>
        <div className="marketGrid">
          {markets.map(([s,p,c]) => (
            <div className="marketCard" key={s}>
              <div className="marketTop"><span>{s}</span><span className="dot">●</span></div>
              <div className="price">{p}</div>
              <div className={c.startsWith("-") ? "down" : "up"}>{c} today</div>
              <div className="miniChart"><i/><i/><i/><i/><i/><i/><i/></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="eyebrow">THE ECOSYSTEM</div>
        <h2>EVERYTHING IN ONE WORLD.</h2>
        <div className="featureGrid">
          {features.map(([title, text]) => <Link className="feature" href={title === "AI COACH" ? "/coach" : title === "TRADE LAB" ? "/trade-lab" : "/education"} key={title}>
            <div className="featureIcon">✦</div><h3>{title}</h3><p>{text}</p><span>EXPLORE →</span>
          </Link>)}
        </div>
      </section>

      <footer><b>TRADERS FORTUNE AI</b><span>Paper trading only. No real trades are executed.</span></footer>

      <style jsx global>{`
        *{box-sizing:border-box} html{background:#050608} body{margin:0;background:#050608;color:#f5f7fa;font-family:Arial,Helvetica,sans-serif}
        a{text-decoration:none;color:inherit}.nav{height:72px;border-bottom:1px solid #20242b;display:flex;align-items:center;padding:0 5%;gap:28px;position:sticky;top:0;background:rgba(5,6,8,.9);backdrop-filter:blur(12px);z-index:5}
        .brand{font-weight:900;font-size:25px;letter-spacing:-1px}.brand span{color:#b886ff}.nav nav{display:flex;gap:24px;color:#9da4af;font-size:13px;flex:1}.nav nav a:hover{color:#fff}.navCta,.primary{background:#b7ff3c;color:#050608;padding:12px 18px;border-radius:8px;font-weight:900;font-size:12px}
        .hero{min-height:620px;padding:105px 7% 80px;position:relative;overflow:hidden}.eyebrow{font-size:11px;letter-spacing:2px;color:#b7ff3c;font-weight:800}.hero h1{font-size:clamp(48px,8vw,104px);line-height:.92;letter-spacing:-5px;margin:24px 0;position:relative}.hero h1 span{color:#b7ff3c}.heroText{max-width:650px;color:#a9b0bb;font-size:18px;line-height:1.6}.actions{display:flex;gap:12px;margin-top:30px;flex-wrap:wrap}.secondary,.smallBtn{border:1px solid #303640;background:#101319;color:#fff;padding:12px 18px;border-radius:8px;font-weight:800;font-size:12px}.badges{display:flex;gap:18px;flex-wrap:wrap;margin-top:55px;color:#7e8794;font-size:10px;letter-spacing:1px}.glow{position:absolute;border-radius:50%;filter:blur(80px);opacity:.15;width:320px;height:320px}.one{background:#b7ff3c;right:5%;top:70px}.two{background:#9c55ff;right:25%;bottom:20px}.notice{margin-top:18px;display:inline-block;border:1px solid #b7ff3c55;padding:12px 15px;border-radius:8px;color:#d9ffad;background:#b7ff3c0d}
        .ticker{display:grid;grid-template-columns:repeat(6,1fr);border-top:1px solid #20242b;border-bottom:1px solid #20242b;background:#090b0f}.ticker div{padding:18px 20px;border-right:1px solid #20242b;display:flex;flex-direction:column;gap:5px}.ticker b{font-size:11px;color:#7f8895}.ticker strong{font-size:16px}.ticker em{font-style:normal;color:#b7ff3c;font-size:11px}.down{color:#ff6677!important}.section{padding:80px 7%}.sectionHead{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:28px}.section h2{font-size:36px;letter-spacing:-1px;margin:10px 0 28px}.marketGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.marketCard,.feature{background:linear-gradient(145deg,#101319,#090b0f);border:1px solid #202631;border-radius:14px;padding:22px}.marketTop{display:flex;justify-content:space-between;color:#a1a9b4;font-size:13px}.dot{color:#b7ff3c}.price{font-size:28px;font-weight:900;margin:18px 0 5px}.up{color:#b7ff3c;font-size:12px}.miniChart{height:55px;margin-top:20px;display:flex;align-items:end;gap:5px}.miniChart i{display:block;width:13%;border-radius:3px 3px 0 0;background:#b7ff3c44}.miniChart i:nth-child(1){height:30%}.miniChart i:nth-child(2){height:48%}.miniChart i:nth-child(3){height:38%}.miniChart i:nth-child(4){height:68%}.miniChart i:nth-child(5){height:54%}.miniChart i:nth-child(6){height:82%}.miniChart i:nth-child(7){height:72%}.featureGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.feature{min-height:245px;transition:.2s}.feature:hover{transform:translateY(-4px);border-color:#b7ff3c66}.featureIcon{color:#b7ff3c;font-size:25px}.feature h3{margin:40px 0 10px}.feature p{color:#8f98a5;line-height:1.5;font-size:13px}.feature span{display:block;margin-top:25px;color:#b7ff3c;font-size:10px;font-weight:900}footer{border-top:1px solid #20242b;padding:28px 7%;display:flex;justify-content:space-between;color:#737c89;font-size:11px}
        @media(max-width:800px){.nav{padding:0 18px}.nav nav{display:none}.navCta{margin-left:auto}.hero{padding:75px 20px 60px}.hero h1{letter-spacing:-3px}.section{padding:55px 20px}.ticker{grid-template-columns:repeat(2,1fr)}.marketGrid,.featureGrid{grid-template-columns:1fr}.sectionHead{align-items:start;flex-direction:column}footer{padding:25px 20px;flex-direction:column;gap:12px}}
      `}</style>
    </main>
  );
}
