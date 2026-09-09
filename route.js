export async function POST(request) {
  try {
    const body = await request.json();
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const latest = messages.filter(m => m.role === "user").at(-1)?.content || "";
    if (!process.env.OPENAI_API_KEY) {
      return Response.json({
        reply: "Demo AI Coach is active. Add OPENAI_API_KEY in your Vercel environment variables to connect a live AI model. For now, practice by defining market context, setup, entry, invalidation, position size and exit plan."
      });
    }
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {"Content-Type":"application/json","Authorization":`Bearer ${process.env.OPENAI_API_KEY}`},
      body: JSON.stringify({
        model: "gpt-5.6-luna",
        input: [
          {role:"system",content:"You are Traders Fortune AI Coach. Give educational trading guidance, emphasize risk management, never guarantee profits, and do not execute trades."},
          ...messages.filter(m=>m.role==="user"||m.role==="assistant").map(m=>({role:m.role,content:m.content}))
        ]
      })
    });
    const data = await response.json();
    if (!response.ok) return Response.json({error:data.error?.message||"AI request failed."},{status:500});
    return Response.json({reply:data.output_text || `I received: ${latest}`});
  } catch {
    return Response.json({error:"Coach request failed."},{status:500});
  }
}
