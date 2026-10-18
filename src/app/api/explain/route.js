import { queryTaxExplanation } from "../../lib/taxContent.js";

/**
 * Server-side route for tax explanations.
 * Deterministic and offline-first: works smoothly whether an AI key is configured or not.
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const { question } = body;

    if (!question || typeof question !== "string" || question.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Please provide a question." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const cleanQuestion = question.trim();
    const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const liveAiAnswer = await fetchGeminiTaxExplanation(cleanQuestion, apiKey);
        if (liveAiAnswer) {
          return new Response(JSON.stringify(liveAiAnswer), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        }
      } catch (err) {
        console.error("Live AI explanation error, falling back to local library:", err);
      }
    }

    // Offline / No Key Fallback
    const localAnswer = queryTaxExplanation(cleanQuestion);
    return new Response(JSON.stringify(localAnswer), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Tax explain API error:", error);
    return new Response(JSON.stringify({ error: "Unable to process explanation." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

async function fetchGeminiTaxExplanation(question, apiKey) {
  const prompt = `You are FirstFile, a non-partisan, plain-English tax educator for teenagers, student workers, and first-time filers.
Explain this tax question clearly in 2-3 sentences. Do NOT give personalized legal advice. Distinguish employee wages (W-2) from self-employment (1099), explain that dependents CAN file their own return, and emphasize that refunds are return of over-withheld earnings.
Question: "${question}"

Return ONLY a JSON object:
{
  "answer": "Plain English educational explanation",
  "sourceTitle": "IRS Publication 17 / Form 1040 Guide",
  "sourceUrl": "https://www.irs.gov/publications/p17",
  "confidenceLabel": "reviewed",
  "mode": "ai"
}`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1
      }
    })
  });

  if (!response.ok) return null;
  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return null;
  return JSON.parse(text);
}
