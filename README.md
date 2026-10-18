# Verity — Media Literacy & Propaganda Detection Web App
> **Congressional App Challenge Submission**  
> *"Look beyond the headline."*

Verity is an interactive civic-technology platform designed to help students, educators, and everyday citizens critically evaluate digital information, uncover manipulative propaganda rhetoric, and inspect claim-by-claim factual evidence without dictating what opinions to hold.

---

## 🌟 Key Features

1. **Claim-by-Claim Fact Checking**
   - Isolates factual statements from submitted text.
   - Categorizes statements as verified facts, opinions, predictions, or unverified claims.
   - Evaluates evidentiary support (supporting vs. contradicting facts) with confidence levels.

2. **Propaganda & Rhetoric Detection**
   - Identifies 10+ recognized manipulation tactics:
     - Emotional manipulation & fear appeals
     - Loaded language & pre-packaged derogatory phrasing
     - False dilemmas & artificial urgency
     - Scapegoating & us-vs-them polarization
     - Cherry-picked statistics & baseline omissions
     - Unsupported generalizations & hyperbole
     - Conspiracy framing
   - Cites exact textual excerpts, contextual rationale, and audience influence explanations.

3. **Bias & Framing Analysis**
   - Evaluates emotional tone and persuasive style.
   - Detects emphasized viewpoints and omitted stakeholder perspectives.
   - Supplies concrete investigative guidance for independent citizen verification.

4. **Think Critically Inquiries**
   - Generates contextual questions tailored to each analyzed article to encourage media discernment.

5. **Two Operating Modes**
   - **Mode A: Live AI Analysis** — Uses Google Gemini or OpenAI when API keys are configured in `.env.local`.
   - **Mode B: Judge-Ready Demo Mode (100% Offline)** — Pre-analyzed fictional scenarios demonstrating emotional manipulation, misleading statistics, and evidence-based reporting. Fully functional without an API key or internet connection.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js v18.x or higher
- npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional for Live Mode)
By default, Verity runs in **Judge-Ready Demo Mode** with offline scenarios. To enable live AI analysis:

Copy the sample environment file:
```bash
cp .env.example .env.local
```

Add your Gemini API key (or OpenAI key):
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🏛️ Congressional App Challenge Presentation Workflow (Demo Mode)

For judges and presentations, test the application entirely offline:

1. Open `http://localhost:3000`.
2. Inspect the **Judge-Ready Demonstration Scenarios**:
   - **Scenario 1:** *Viral Social Alert on City Transit* (Demonstrates fear appeals, loaded language, and conspiracy framing).
   - **Scenario 2:** *Selective Economic Snapshot* (Demonstrates cherry-picked percentage changes with small denominators and missing baselines).
   - **Scenario 3:** *Scientific Water Quality & Wildlife Study* (Demonstrates balanced, attributed reporting with caveats).
3. Click any scenario to populate the workspace and click **"Analyze Content"**.
4. Examine the detailed breakdown:
   - Overall Evidence Assessment & Confidence level
   - Claim-by-Claim verification
   - Flagged propaganda techniques with exact quotes
   - Tone, framing, and omitted context
   - "Think Critically" prompts
5. Click **"Analyze Another Piece"** to reset and test another scenario or arbitrary text.

---

## ⚖️ Ethics & Civic Principles

- **Impartiality:** Verity never labels an article as propaganda solely because it expresses a political point of view or criticizes an institution.
- **Tone vs. Truth:** Emotional language is not equated with falsehood; claims are evaluated strictly on available factual evidence.
- **Assistive Discernment:** The app acts as an educational guide, encouraging citizens to consult primary records rather than relying blindly on automated scores.
- **Zero Hallucination:** Verity never fabricates sources, quotes, statistics, or citations.