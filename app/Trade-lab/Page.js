

"use client";

import { useEffect, useState } from "react";

const assets = [
  { symbol: "BTC", name: "Bitcoin", market: "Crypto", start: 108000 },
  { symbol: "ETH", name: "Ethereum", market: "Crypto", start: 3900 },
  { symbol: "SOL", name: "Solana", market: "Crypto", start: 190 },
  { symbol: "AAPL", name: "Apple", market: "Stocks", start: 245 },
  { symbol: "NVDA", name: "NVIDIA", market: "Stocks", start: 180 },
  { symbol: "TSLA", name: "Tesla", market: "Stocks", start: 350 },
  { symbol: "EUR/USD", name: "Euro / US Dollar", market: "Forex", start: 1.16 },
  { symbol: "GBP/USD", name: "British Pound / US Dollar", market: "Forex", start: 1.34 },
  { symbol: "USD/JPY", name: "US Dollar / Japanese Yen", market: "Forex", start: 150 },
];

const initialCash = 100000;
const fmt = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);

export default function TradeLabPage() {
  const [market, setMarket] = useState("Crypto");
  const [symbol, setSymbol] = useState("BTC");
  const [prices, setPrices] = useState(
    Object.fromEntries(assets.map((a) => [a.symbol, a.start]))
  );
  const [cash, setCash] = useState(initialCash);
  const [holdings, setHoldings] = useState({});
  const [history, setHistory] = useState([]);
  const [amount, setAmount] = useState("100");
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("tfa-demo") || "null");
      if (saved) {
        if (Number.isFinite(saved.cash)) setCash(saved.cash);
        if (saved.holdings) setHoldings(saved.holdings);
        if (Array.isArray(saved.history)) setHistory(saved.history);
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(
        "tfa-demo",
        JSON.stringify({ cash, holdings, history })
      );
    } catch {}
  }, [cash, holdings, history, loaded]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrices((old) => {
        const next = { ...old };
        assets.forEach((a) => {
          next[a.symbol] = Math.max(
            0.0001,
            old[a.symbol] * (1 + (Math.random() - 0.5) * 0.004)
          );
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const asset = assets.find((a) => a.symbol === symbol) || assets[0];
  const price = prices[symbol] || asset.start;
  const holding = holdings[symbol] || { qty: 0, avg: 0 };
  const positionValue = Object.entries(holdings).reduce(
    (sum, [s, h]) => sum + h.qty * (prices[s] || 0),
    0
  );
  const equity = cash + positionValue;
  const pnl = equity - initialCash;
  const visibleAssets = assets.filter((a) => a.market === market);

  function chooseMarket(next) {
    setMarket(next);
    setSymbol(assets.find((a) => a.market === next).symbol);
    setMessage("");
  }

  function trade(side) {
    const dollars = Number(amount);
    if (!Number.isFinite(dollars) || dollars <= 0) {
      setMessage("Enter a valid trade amount.");
      return;
    }

    if (side === "BUY") {
      if (dollars > cash) {
        setMessage("Not enough virtual cash.");
        return;
      }
      const qty = dollars / price;
      setCash((c) => c - dollars);
      setHoldings((old) => {
        const h = old[symbol] || { qty: 0, avg: 0 };
        const totalQty = h.qty + qty;
        return {
          ...old,
          [symbol]: {
            qty: totalQty,
            avg: (h.qty * h.avg + dollars) / totalQty,
          },
        };
      });
    } else {
      const qty = dollars / price;
      if (qty > holding.qty + 1e-10) {
        setMessage("You don't have enough of this asset to sell.");
        return;
      }
      setCash((c) => c + dollars);
      setHoldings((old) => ({
        ...old,
        [symbol]: {
          ...old[symbol],
          qty: Math.max(0, old[symbol].qty - qty),
        },
      }));
    }

    setHistory((old) =>
      [{
        id: Date.now() + Math.random(),
        side,
        symbol,
        dollars,
        price,
        time: new Date().toLocaleString(),
      }, ...old].slice(0, 30)
    );
    setMessage(`${side} ${symbol} demo trade completed.`);
  }

  function reset() {
    if (!window.confirm("Reset your demo account and erase its history?")) return;
    setCash(initialCash);
    setHoldings({});
    setHistory([]);
    setMessage("Demo account reset.");
  }

  const buttonStyle = {
    padding: "11px 14px",
    borderRadius: 9,
    border: "1px solid #344154",
    cursor: "pointer",
    fontWeight: 700,
  };

  return (
    <main style={{
      minHeight: "100vh", background: "#080c14", color: "#f5f7fb",
      padding: "24px 16px", fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ maxWidth: 1100, margin: "auto" }}>
        <div style={{ color: "#78e7b6", fontWeight: 800, fontSize: 23 }}>
          TRADERS FORTUNE AI
        </div>
        <h1 style={{ fontSize: 36, marginBottom: 6 }}>Paper Trading Lab</h1>
        <p style={{ color: "#a5afc0" }}>
          Practice with $100,000 virtual funds. No real trades are placed.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 12, margin: "24px 0"
        }}>
          {[
            ["Account Equity", fmt(equity)],
            ["Virtual Cash", fmt(cash)],
            ["Positions Value", fmt(positionValue)],
            ["Demo Profit/Loss", (pnl >= 0 ? "+" : "") + fmt(pnl)],
          ].map(([label, value]) => (
            <div key={label} style={{
              background: "#121925", border: "1px solid #293548",
              padding: 18, borderRadius: 14
            }}>
              <div style={{ color: "#a5afc0", fontSize: 13 }}>{label}</div>
              <strong style={{
                display: "block", fontSize: 23, marginTop: 10,
                color: label === "Demo Profit/Loss"
                  ? pnl >= 0 ? "#78e7b6" : "#ff8995" : "#fff"
              }}>{value}</strong>
            </div>
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))",
          gap: 16
        }}>
          <section style={{
            background: "#121925", padding: 20, borderRadius: 14,
            border: "1px solid #293548"
          }}>
            <h2>Choose Market</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Crypto", "Stocks", "Forex"].map((m) => (
                <button key={m} onClick={() => chooseMarket(m)} style={{
                  ...buttonStyle,
                  background: market === m ? "#78e7b6" : "#1b2636",
                  color: market === m ? "#08150f" : "#fff"
                }}>{m}</button>
              ))}
            </div>

            <h3>Assets</h3>
            <div style={{ display: "grid", gap: 8 }}>
              {visibleAssets.map((a) => (
                <button key={a.symbol} onClick={() => {
                  setSymbol(a.symbol);
                  setMessage("");
                }} style={{
                  ...buttonStyle, textAlign: "left",
                  background: symbol === a.symbol ? "#203c34" : "#0b111b",
                  color: "#fff",
                  borderColor: symbol === a.symbol ? "#78e7b6" : "#344154"
                }}>
                  {a.symbol} — {a.name}
                  <span style={{ float: "right", color: "#78e7b6" }}>
                    {a.market === "Forex"
                      ? price.toFixed(4) && (prices[a.symbol] || a.start).toFixed(4)
                      : fmt(prices[a.symbol] || a.start)}
                  </span>
                </button>
              ))}
            </div>

            <div style={{
              marginTop: 20, padding: 16, background: "#0b111b",
              borderRadius: 12
            }}>
              <div style={{ color: "#a5afc0" }}>{asset.name} simulated price</div>
              <div style={{ fontSize: 32, fontWeight: 800, marginTop: 8 }}>
                {asset.market === "Forex" ? price.toFixed(4) : fmt(price)}
              </div>
              <p style={{ color: "#a5afc0", fontSize: 12 }}>
                Prices update every 3 seconds for demonstration only.
              </p>
            </div>
          </section>

          <section style={{
            background: "#121925", padding: 20, borderRadius: 14,
            border: "1px solid #293548"
          }}>
            <h2>Place Demo Trade</h2>
            <p>Selected: <strong>{symbol}</strong></p>
            <label htmlFor="amount">Trade value in USD</label>
            <input id="amount" type="number" min="1" value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                display: "block", boxSizing: "border-box", width: "100%",
                padding: 13, margin: "10px 0", borderRadius: 9,
                border: "1px solid #344154", background: "#080c14",
                color: "#fff", fontSize: 16
              }}
            />
            <p style={{ color: "#a5afc0", fontSize: 13 }}>
              Estimated quantity: {Number(amount) > 0
                ? (Number(amount) / price).toLocaleString("en-US", { maximumFractionDigits: 8 })
                : "—"}
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => trade("BUY")} style={{
                ...buttonStyle, flex: 1, background: "#78e7b6", color: "#08150f"
              }}>Buy</button>
              <button onClick={() => trade("SELL")} style={{
                ...buttonStyle, flex: 1, background: "#ff8995", color: "#301016"
              }}>Sell</button>
            </div>
            {message && <p role="status" style={{
              padding: 12, borderRadius: 8, background: "#203044"
            }}>{message}</p>}

            <hr style={{ borderColor: "#293548", margin: "22px 0" }} />
            <h3>Your {symbol} Position</h3>
            <p>Quantity: {holding.qty.toLocaleString("en-US", {
              maximumFractionDigits: 8
            })}</p>
            <p>Current value: {fmt(holding.qty * price)}</p>
            <button onClick={reset} style={{
              ...buttonStyle, width: "100%", background: "transparent",
              color: "#fff", marginTop: 12
            }}>Reset Demo Account</button>
          </section>
        </div>

        <section style={{
          marginTop: 18, background: "#121925", padding: 20,
          borderRadius: 14, border: "1px solid #293548"
        }}>
          <h2>Trade History</h2>
          {history.length === 0 ? <p style={{ color: "#a5afc0" }}>
            Your demo trades will appear here.
          </p> : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                <thead><tr>
                  <th style={{ padding: 10 }}>Time</th>
                  <th>Side</th><th>Asset</th><th>Value</th><th>Price</th>
                </tr></thead>
                <tbody>{history.map((t) => (
                  <tr key={t.id}>
                    <td style={{ padding: 10 }}>{t.time}</td>
                    <td style={{ color: t.side === "BUY" ? "#78e7b6" : "#ff8995" }}>{t.side}</td>
                    <td>{t.symbol}</td>
                    <td>{fmt(t.dollars)}</td>
                    <td>{fmt(t.price)}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </section>

        <p style={{ color: "#8995a8", fontSize: 12, lineHeight: 1.6 }}>
          Educational simulation only. Prices are randomly simulated, not live.
          No broker connection or real-money trading is enabled. Demo data is
          saved in this browser on this device.
        </p>
      </div>
    </main>
  );
}
