import { NextRequest, NextResponse } from "next/server";
import { PROPAGANDA_CASE_STUDIES } from "../../../lib/caseStudies.js";
import { inspectPropagandaTechniques, evaluatePropagandaPosture } from "../../../lib/propagandaEngine.js";
import { generateCriticalChecklist } from "../../../lib/analysisUtils.js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, sourceContext, caseStudyId } = body;

    // 1. If explicit real-world case study is selected
    if (caseStudyId) {
      const match = PROPAGANDA_CASE_STUDIES.find((c: any) => c.id === caseStudyId);
      if (match) {
        return NextResponse.json({
          mode: "case-study",
          result: {
            title: match.title,
            tag: match.tag,
            sourceContext: match.sourceContext,
            sourceUrl: match.sourceUrl,
            sampleText: match.sampleText,
            ...match.analysis,
            criticalQuestions: match.analysis.structuralBreakdown.criticalQuestions
          }
        });
      }
    }

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Please enter text to inspect for propaganda tactics." },
        { status: 400 }
      );
    }

    const trimmed = text.trim();

    // Check if user input matches one of our case studies
    const matchingStudy = PROPAGANDA_CASE_STUDIES.find(
      (c: any) => c.sampleText.trim() === trimmed || trimmed.includes(c.sampleText.slice(0, 50))
    );

    if (matchingStudy) {
      return NextResponse.json({
        mode: "case-study",
        result: {
          title: matchingStudy.title,
          tag: matchingStudy.tag,
          sourceContext: matchingStudy.sourceContext,
          sourceUrl: matchingStudy.sourceUrl,
          sampleText: matchingStudy.sampleText,
          ...matchingStudy.analysis,
          criticalQuestions: matchingStudy.analysis.structuralBreakdown.criticalQuestions
        }
      });
    }

    // Check for live Gemini API key
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const liveAiResult = await runLiveGeminiPropagandaAudit(trimmed, sourceContext, geminiKey);
        return NextResponse.json({
          mode: "live-ai",
          result: liveAiResult
        });
      } catch (err) {
        console.error("Live AI propaganda inspection failed, using local engine:", err);
      }
    }

    // Pure JavaScript heuristic propaganda analysis
    const tactics = inspectPropagandaTechniques(trimmed);
    const posture = evaluatePropagandaPosture(trimmed, tactics);
    const criticalQuestions = generateCriticalChecklist(tactics);

    return NextResponse.json({
      mode: "local-engine",
      result: {
        title: "Custom Propaganda Inspection",
        tag: "Live Text Analysis",
        sourceContext: sourceContext || "Direct User Submission",
        posture: posture.posture,
        severity: posture.severity,
        rhetoricalSlant: posture.rhetoricalSlant,
        summary: posture.summary,
        tactics: tactics,
        structuralBreakdown: {
          narrativeStrategy: posture.primaryDrivers,
          omittedFacts: "Unspecified in raw text. Check cross-partisan news registries, independent academic reviews, or government records to verify missing context.",
          psychologicalLeverage: tactics.length > 0 
            ? "Exploits emotional urgency, identity grouping, or pejorative moral framing to discourage dispassionate verification."
            : "Maintains informational distance without emotional blackmail.",
          criticalQuestions
        },
        criticalQuestions
      }
    });

  } catch (error: any) {
    console.error("Propaganda API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while analyzing propaganda tactics." },
      { status: 500 }
    );
  }
}

async function runLiveGeminiPropagandaAudit(text: string, sourceContext: string | undefined, apiKey: string) {
  const prompt = `You are Truthoganda, an unsparing, non-partisan forensic propaganda and psychological rhetoric analyst.
Analyze the following text strictly for PROPAGANDA and MANIPULATION tactics.
Focus exclusively on identifying:
- Fear appeals & catastrophizing
- Loaded language & demonization
- False dilemmas & manufactured urgency
- Scapegoating & us-vs-them polarization
- Cherry-picked statistics & baseline omissions
- Conspiratorial framing & hidden hand narratives
- Ad hominem attacks

Text to inspect:
"""${text}"""
Context/Attribution: ${sourceContext || "None specified"}

Return ONLY a strict JSON object (no markdown, no backticks, just raw JSON) matching this structure:
{
  "title": "Brief Descriptive Title of the Rhetorical Piece",
  "tag": "e.g. Wartime Rhetoric, Electoral Agitation, Corporate PR, or Neutral Reporting",
  "sourceContext": "${sourceContext || 'Direct Text Submission'}",
  "posture": "High Propaganda Density" | "Moderate Rhetorical Persuasion" | "Neutral / Low Propaganda Profile",
  "severity": "high" | "moderate" | "low",
  "rhetoricalSlant": "Concise classification of tone and slant",
  "summary": "2-3 sentences explaining the core rhetorical agenda and technique composition",
  "tactics": [
    {
      "id": "tactic-unique-id",
      "name": "Technique Name",
      "category": "Emotional Coercion | Logical Distortion | Linguistic Bias | Social Division | Disinformation Strategy",
      "excerpt": "Exact quotation from text demonstrating this tactic",
      "indicator": "Brief signature of this tactic",
      "explanation": "Why this specific excerpt constitutes propaganda",
      "influence": "How it psychologically impacts or manipulates the reader"
    }
  ],
  "structuralBreakdown": {
    "narrativeStrategy": "High-level description of the persuasion strategy",
    "omittedFacts": "Key context, baselines, or counter-perspectives omitted by the author",
    "psychologicalLeverage": "Specific human instincts or fears targeted (e.g., survival fear, parental panic, tribal loyalty)",
    "criticalQuestions": [
      "Targeted critical thinking question 1",
      "Targeted critical thinking question 2",
      "Targeted critical thinking question 3"
    ]
  },
  "criticalQuestions": [
    "Question 1",
    "Question 2",
    "Question 3"
  ]
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

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(rawText);
}
