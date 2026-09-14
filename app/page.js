import Link from "next/link";

const lessons=[
["01","Trading Basics","Market orders, charts, bid/ask and the language every new trader needs."],
["02","Candlesticks","Learn open, high, low, close and how candle structure communicates price action."],
["03","Support & Resistance","Map important areas and understand why levels can fail."],
["04","Risk Management","Build rules for position size, invalidation and simulated account protection."],
["05","Trend & Momentum","Learn how trend structure and momentum can work together."],
["06","Trading Plan","Turn your ideas into a repeatable process you can test in Trade Lab."]
];

export default function Education(){return <main className="page"><header className="nav"><Link className="brand" href="/">TF<span>AI</span></Link><nav><Link href="/">Markets</Link><Link href="/education">Academy</Link><Link href="/coach">AI Coach</Link><Link href="/trade-lab">Trade Lab</Link><Link href="/pricing">Pricing</Link></nav></header><div className="wrap"><div className="eyebrow">FORTUNE ACADEMY</div><h1>LEARN THE GAME.</h1><p className="sub">A structured path from trading basics to a repeatable practice process.</p><div className="grid">{lessons.map(x=><article key={x[0]}><span>{x[0]}</span><h2>{x[1]}</h2><p>{x[2]}</p><Link href="/trade-lab">PRACTICE →</Link></article>)}</div></div><style jsx>{`.page{min-height:100vh;background:#050608;color:#fff}.nav{height:72px;border-bottom:1px solid #20242b;display:flex;align-items:center;padding:0 5%;gap:30px}.brand{font-size:25px;font-weight:900}.brand span{color:#b886ff}.nav nav{display:flex;gap:22px;flex:1;color:#9da4af;font-size:13px}.wrap{padding:70px 7%}.eyebrow{color:#b7ff3c;font-size:10px;letter-spacing:2px;font-weight:900}h1{font-size:65px;letter-spacing:-3px;margin:12px 0}.sub{color:#8e97a4}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:45px}article{border:1px solid #222933;background:#0c0f14;border-radius:12px;padding:24px;min-height:220px}article>span{color:#b7ff3c;font-weight:900}article h2{margin-top:45px}article p{color:#89929f;line-height:1.5;font-size:13px}article a{color:#b7ff3c;font-size:10px;font-weight:900}@media(max-width:800px){.nav{padding:0 18px}.nav nav{display:none}.wrap{padding:50px 18px}h1{font-size:48px}.grid{grid-template-columns:1fr}}`}</style></main>}
