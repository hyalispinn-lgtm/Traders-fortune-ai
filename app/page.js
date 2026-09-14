"use client";

import Link from "next/link";
import { useState } from "react";

const quick = ["Analyze BTC/USD","Explain support and resistance","Build a risk plan","What is position sizing?"];

function demoReply(text){
  const t=text.toLowerCase();
  if(t.includes("risk")) return "Demo coaching: define your maximum loss before entering. A common educational framework is to risk only a small, predefined portion of simulated account equity per trade and place your stop where the trade idea is invalidated.";
  if(t.includes("support")) return "Demo coaching: support is an area where buyers have historically stepped in. Look for repeated reactions, volume/context, and confirmation rather than treating one price as guaranteed.";
  if(t.includes("btc")) return "Demo coaching: BTC/USD is shown here with simulated data. Before any setup, identify trend, key levels, entry trigger, invalidation point and position size. This is educational, not a prediction.";
  return "Demo coaching: break the idea into market context, setup, entry trigger, invalidation, position size and exit plan. Never treat a simulated result as a guarantee of future performance.";
}

export default function Coach(){
 const [input,setInput]=useState(""); const [messages,setMessages]=useState([{role:"assistant",text:"Welcome to Traders Fortune AI Coach. Ask me about trading concepts, risk, setups or your demo plan."}]);
 function send(text=input){if(!text.trim())return;setMessages(v=>[...v,{role:"user",text},{role:"assistant",text:demoReply(text)}]);setInput("")}
 return <main className="page"><header className="nav"><Link className="brand" href="/">TF<span>AI</span></Link><nav><Link href="/">Markets</Link><Link href="/education">Academy</Link><Link href="/coach">AI Coach</Link><Link href="/trade-lab">Trade Lab</Link><Link href="/pricing">Pricing</Link></nav><Link className="navCta" href="/trade-lab">Trade Lab →</Link></header><div className="wrap"><div className="eyebrow">AI COACH / DEMO</div><h1>YOUR TRADING COACH.</h1><p className="sub">Fast, plain-English guidance for learning and practicing your process.</p><div className="quick">{quick.map(q=><button key={q} onClick={()=>send(q)}>{q}</button>)}</div><section className="chat">{messages.map((m,i)=><div className={m.role==="user"?"msg user":"msg"} key={i}><span>{m.role==="user"?"YOU":"TF AI"}</span><p>{m.text}</p></div>)}<div className="composer"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask your coach..." /><button onClick={()=>send()}>SEND →</button></div></section></div><style jsx>{`.page{min-height:100vh;background:#050608;color:#fff}.nav{height:72px;border-bottom:1px solid #20242b;display:flex;align-items:center;padding:0 5%;gap:28px}.brand{font-size:25px;font-weight:900}.brand span{color:#b886ff}.nav nav{display:flex;gap:22px;flex:1;color:#9da4af;font-size:13px}.wrap{max-width:1000px;margin:auto;padding:70px 20px}.eyebrow{color:#b7ff3c;font-size:10px;letter-spacing:2px;font-weight:900}h1{font-size:56px;margin:12px 0}.sub{color:#8f98a5}.quick{display:flex;flex-wrap:wrap;gap:8px;margin:28px 0}.quick button{background:#11151b;color:#b8c0ca;border:1px solid #292f38;border-radius:20px;padding:10px 13px}.chat{border:1px solid #252b34;border-radius:12px;background:#0c0f14;padding:18px}.msg{max-width:80%;padding:14px 16px;margin:10px 0;background:#11151b;border-radius:10px}.msg.user{margin-left:auto;background:#17200f}.msg span{font-size:9px;color:#b7ff3c;font-weight:900}.msg p{margin:7px 0 0;color:#c2c8d0;line-height:1.5}.composer{display:flex;gap:8px;margin-top:18px}.composer input{flex:1;background:#080a0e;border:1px solid #2a3039;color:#fff;padding:14px;border-radius:8px}.composer button{background:#b7ff3c;border:0;padding:0 18px;border-radius:8px;font-weight:900}@media(max-width:700px){.nav{padding:0 18px}.nav nav{display:none}.navCta{margin-left:auto}h1{font-size:42px}.msg{max-width:94%}}`}</style></main>
}
