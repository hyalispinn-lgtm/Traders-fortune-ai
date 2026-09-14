"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const markets = [
  {symbol:"BTC/USD", name:"Bitcoin", price:104820.45},
  {symbol:"ETH/USD", name:"Ethereum", price:3812.67},
  {symbol:"AAPL", name:"Apple", price:188.54},
  {symbol:"TSLA", name:"Tesla", price:342.18},
  {symbol:"NVDA", name:"NVIDIA", price:174.82},
  {symbol:"SPX", name:"S&P 500", price:6428.12}
];

export default function TradeLab() {
  const [selected,setSelected]=useState(markets[0]);
  const [side,setSide]=useState("BUY");
  const [qty,setQty]=useState("0.01");
  const [cash,setCash]=useState(100000);
  const [positions,setPositions]=useState({});
  const [trades,setTrades]=useState([]);
  const [notice,setNotice]=useState("");
  const position=positions[selected.symbol] || {qty:0,avg:0};
  const value=position.qty*selected.price;
  const pnl=position.qty*(selected.price-position.avg);
  const equity=useMemo(()=>cash+Object.entries(positions).reduce((sum,[sym,p])=>{
    const m=markets.find(x=>x.symbol===sym); return sum+p.qty*m.price;
  },0),[cash,positions]);

  function execute(){
    const n=Number(qty);
    if(!Number.isFinite(n)||n<=0){setNotice("Enter a valid quantity.");return;}
    const gross=n*selected.price;
    if(side==="BUY" && gross>cash){setNotice("Not enough demo cash.");return;}
    const old=positions[selected.symbol]||{qty:0,avg:0};
    let nextQty=old.qty;
    let nextAvg=old.avg;
    if(side==="BUY"){
      nextQty=old.qty+n; nextAvg=((old.qty*old.avg)+(n*selected.price))/nextQty; setCash(v=>v-gross);
    }else{
      if(n>old.qty){setNotice("You cannot sell more than your simulated position.");return;}
      nextQty=old.qty-n; setCash(v=>v+gross);
      if(nextQty===0) nextAvg=0;
    }
    setPositions(v=>({...v,[selected.symbol]:{qty:nextQty,avg:nextAvg}}));
    setTrades(v=>[{time:new Date().toLocaleTimeString(),side,qty:n,symbol:selected.symbol,price:selected.price},...v].slice(0,20));
    setNotice(`${side} ${n} ${selected.symbol} executed in demo mode.`);
  }
  function close(){
    if(position.qty<=0){setNotice("No open position.");return;}
    const proceeds=position.qty*selected.price;
    setCash(v=>v+proceeds);
    setTrades(v=>[{time:new Date().toLocaleTimeString(),side:"CLOSE",qty:position.qty,symbol:selected.symbol,price:selected.price},...v].slice(0,20));
    setPositions(v=>({...v,[selected.symbol]:{qty:0,avg:0}}));
    setNotice(`Closed ${selected.symbol} at the simulated market price.`);
  }
  function reset(){setCash(100000);setPositions({});setTrades([]);setNotice("Demo account reset to $100,000.");}

  return <main className="page">
    <header className="nav"><Link className="brand" href="/">TF<span>AI</span></Link><nav><Link href="/">Markets</Link><Link href="/education">Academy</Link><Link href="/coach">AI Coach</Link><Link href="/trade-lab">Trade Lab</Link><Link href="/pricing">Pricing</Link></nav><Link className="navCta" href="/">← Home</Link></header>
    <section className="wrap">
      <div className="eyebrow">TRADERS FORTUNE AI / DEMO</div><h1>TRADE LAB</h1><p className="sub">Practice execution, position sizing and risk with simulated money.</p>
      <div className="stats"><div><span>DEMO CASH</span><b>${cash.toLocaleString(undefined,{maximumFractionDigits:2})}</b></div><div><span>EQUITY</span><b>${equity.toLocaleString(undefined,{maximumFractionDigits:2})}</b></div><div><span>OPEN POSITION</span><b>{position.qty.toFixed(4)}</b></div><div><span>UNREALIZED P&L</span><b className={pnl>=0?"green":"red"}>{pnl>=0?"+":""}${pnl.toFixed(2)}</b></div></div>
      <div className="layout">
        <aside><h3>MARKETS</h3>{markets.map(m=><button className={selected.symbol===m.symbol?"market active":"market"} key={m.symbol} onClick={()=>setSelected(m)}><span>{m.symbol}</span><small>${m.price.toLocaleString()}</small></button>)}<button className="reset" onClick={reset}>RESET DEMO</button></aside>
        <section className="panel"><div className="selected"><div><span>{selected.name}</span><h2>{selected.symbol}</h2></div><strong>${selected.price.toLocaleString()}</strong></div><div className="chart"><div className="line l1"/><div className="line l2"/><div className="line l3"/><div className="bars">{Array.from({length:18},(_,i)=><i key={i} style={{height:`${25+((i*37)%65)}%`}}/>)}</div></div><div className="order"><div className="sides"><button className={side==="BUY"?"buy active":"buy"} onClick={()=>setSide("BUY")}>BUY</button><button className={side==="SELL"?"sell active":"sell"} onClick={()=>setSide("SELL")}>SELL</button></div><label>QUANTITY<input value={qty} onChange={e=>setQty(e.target.value)} inputMode="decimal"/></label><div className="risk"><span>MARKET PRICE</span><b>${selected.price.toLocaleString()}</b></div><button className="execute" onClick={execute}>EXECUTE {side} — DEMO</button><button className="close" onClick={close}>CLOSE POSITION</button>{notice&&<div className="notice">{notice}</div>}</div></section>
      </div>
      <section className="history"><h2>TRADE HISTORY</h2>{trades.length===0?<p>No demo trades yet. Place your first simulated order above.</p>:<div className="table">{trades.map((t,i)=><div key={i}><span>{t.time}</span><b className={t.side==="SELL"||t.side==="CLOSE"?"red":"green"}>{t.side}</b><span>{t.qty} {t.symbol}</span><span>${t.price.toLocaleString()}</span></div>)}</div>}</section>
    </section>
    <style jsx>{`
      .page{min-height:100vh;background:#050608;color:#f5f7fa}.nav{height:72px;border-bottom:1px solid #20242b;display:flex;align-items:center;padding:0 5%;gap:28px}.brand{font-weight:900;font-size:25px}.brand span{color:#b886ff}.nav nav{display:flex;gap:22px;flex:1;color:#9da4af;font-size:13px}.navCta{font-size:12px;font-weight:800}.wrap{padding:55px 6%;max-width:1400px;margin:auto}.eyebrow{color:#b7ff3c;font-size:10px;letter-spacing:2px;font-weight:900}h1{font-size:58px;margin:12px 0 5px;letter-spacing:-3px}.sub{color:#89929f}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:35px 0}.stats>div{background:#0c0f14;border:1px solid #202631;padding:20px;border-radius:10px}.stats span{display:block;color:#747e8c;font-size:9px;letter-spacing:1px}.stats b{display:block;margin-top:10px;font-size:23px}.green{color:#b7ff3c}.red{color:#ff6677}.layout{display:grid;grid-template-columns:230px 1fr;gap:14px}aside,.panel,.history{background:#0c0f14;border:1px solid #202631;border-radius:12px;padding:18px}aside h3{font-size:11px;color:#7c8693;letter-spacing:1px}.market{width:100%;display:flex;justify-content:space-between;padding:14px 10px;background:none;border:0;border-bottom:1px solid #1d222a;color:#aab2bd;cursor:pointer}.market small{color:#697482}.market.active{background:#161c13;color:#fff;border-left:2px solid #b7ff3c}.reset{width:100%;margin-top:18px;padding:10px;background:#11151b;color:#8f98a4;border:1px solid #2a3039;border-radius:7px}.selected{display:flex;justify-content:space-between;align-items:center}.selected span{color:#7e8794;font-size:12px}.selected h2{margin:5px 0}.selected strong{font-size:28px}.chart{height:290px;margin:20px 0;background:repeating-linear-gradient(0deg,transparent 0,transparent 57px,#1b2028 58px),repeating-linear-gradient(90deg,transparent 0,transparent 80px,#171c23 81px);position:relative;overflow:hidden}.bars{position:absolute;inset:15px 15px 0;display:flex;align-items:end;gap:9px}.bars i{display:block;flex:1;background:#b7ff3c33;border-top:1px solid #b7ff3c}.order{border-top:1px solid #202631;padding-top:20px;display:grid;gap:12px}.sides{display:grid;grid-template-columns:1fr 1fr;gap:8px}.sides button{padding:13px;border:1px solid #303640;background:#11151b;color:#8d96a2;border-radius:7px;font-weight:900}.sides .buy.active{background:#b7ff3c;color:#050608}.sides .sell.active{background:#ff6677;color:#fff}.order label{font-size:10px;color:#7c8693}.order input{display:block;width:100%;margin-top:7px;background:#080a0e;color:#fff;border:1px solid #2a3039;border-radius:7px;padding:13px;font-size:16px}.risk{display:flex;justify-content:space-between;color:#7f8996;font-size:11px}.risk b{color:#fff}.execute,.close{padding:14px;border:0;border-radius:7px;font-weight:900}.execute{background:#b7ff3c;color:#050608}.close{background:#181c23;color:#fff}.notice{padding:12px;border:1px solid #b7ff3c55;background:#b7ff3c0d;color:#d7ffa0;border-radius:7px;font-size:12px}.history{margin-top:14px}.history h2{font-size:15px}.history p{color:#737d89;font-size:13px}.table>div{display:grid;grid-template-columns:1fr 1fr 2fr 1fr;padding:11px 0;border-top:1px solid #1c2129;font-size:12px}@media(max-width:800px){.nav{padding:0 18px}.nav nav{display:none}.navCta{margin-left:auto}.wrap{padding:35px 16px}h1{font-size:46px}.stats{grid-template-columns:1fr 1fr}.layout{grid-template-columns:1fr}.chart{height:220px}}
    `}</style>
  </main>
}
