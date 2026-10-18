# FirstFile — Your First Tax Return, Simplified.
> **Congressional App Challenge Submission**  
> *A free, teen-first tax education platform helping student workers, teenagers, and first-time filers understand taxes, practice with fictional documents, and locate legitimate filing resources.*

---

## 🏛️ Project Overview

**Product Name:** FirstFile  
**Tagline:** Your first tax return, simplified.  
**Programming Language:** **JavaScript** (Allowed language under Congressional App Challenge rules)

Taxes are one of the most intimidating milestones young people face when entering the workforce. Confusing legal terminology, predatory commercial preparation fees, and persistent myths—such as the belief that being claimed as a dependent prevents someone from filing—cause thousands of teens to miss out on refunds they rightfully earned.

FirstFile bridges this civic and financial literacy gap through an interactive, privacy-first web application.

---

## 🌟 Core Features & Modules

1. **Tax Readiness Questionnaire & Live Checklist (`/`)**
   - Interactive 4-step questionnaire collecting general circumstances (income types, documents, dependency status, multiple jobs, state).
   - Generates an actionable, dynamic filing readiness checklist in real time.
   - Includes 4 realistic, preloaded student scenarios (Summer Retail Job, Freelance Tutoring, Dual-Earner, and First-Timer).

2. **Paycheck & Deduction Lab (`/paycheck`)**
   - Interactive calculator demonstrating the mechanics behind take-home pay.
   - Accurately models mandatory FICA payroll withholdings (Social Security 6.2% and Medicare 1.45%) alongside estimated or user-customized federal and state income tax deductions.
   - Transparently explains why net pay differs from gross wages and how withheld taxes can be refunded.

3. **Fictional Document Learning Lab (`/practice`)**
   - Interactive Form W-2 explorer using fictional student records.
   - Clickable form boxes (Box 1 Wages, Box 2 Federal Withheld, Boxes 3-6 FICA, Boxes 16-17 State) detailing what each field represents and its specific significance for first-time filers.

4. **Tax Glossary & Scenario Quiz (`/learn`)**
   - **Searchable Glossary:** 14 essential beginner terms (Gross Income, Take-Home Pay, W-2, 1099, Dependent, Refund, Tax Liability, Standard Deduction, Self-Employment Tax, etc.) with plain-English definitions, examples, and official citations.
   - **Scenario Quiz:** 5 realistic, teen-tailored scenario questions testing knowledge on summer jobs, freelance gig work, dependent filing rules, and refund mechanics with instant feedback and explanations.

5. **Official Filing Resources Directory (`/resources`)**
   - Verified links to legitimate government resources:
     - [IRS Free File Program](https://www.irs.gov/file-your-taxes-for-free)
     - [IRS Publication 17 (Your Federal Income Tax)](https://www.irs.gov/publications/p17)
     - [IRS Form W-2 Guide](https://www.irs.gov/forms-pubs/about-form-w-2)
     - [IRS Publication 501 (Dependents & Deductions)](https://www.irs.gov/publications/p501)
     - [IRS Self-Employment Tax Guide](https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes)

6. **Privacy by Design (`/privacy`)**
   - **Zero SSN / ITIN Collection:** Does not collect or store Social Security numbers, banking credentials, or real names.
   - **No Actual Tax Uploads:** Strictly prohibits real document uploads; uses only fictional educational examples.
   - **100% Client-Side Calculations:** Runs deterministically in the user's browser without database tracking.

7. **Optional Server-Side AI Explainer (`/api/explain`)**
   - Provides plain-English answers to open-ended tax questions when `AI_API_KEY` or `GEMINI_API_KEY` is present.
   - Robust offline fallback: searches local educational libraries and verified IRS rules if no key is configured.

---

## 🛠️ Technology Stack & CAC Compliance

- **Primary Programming Language:** **JavaScript (Node.js / React / Next.js)**
- **File Types:** Pure `.js` and `.jsx` modules across all components, API routes, and test suites.
- **Styling:** Tailwind CSS with an accessible, high-contrast, editorial design system.
- **Testing:** Node.js native test runner (`node --test src/lib/*.test.js`).

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Automated Unit Tests
```bash
npm test
```
All core calculator algorithms, checklist generators, and retrieval fallback engines pass.

### 3. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```
All routes (`/`, `/paycheck`, `/practice`, `/learn`, `/resources`, `/privacy`, `/api/explain`) are statically optimized and dynamically rendered.