import { DemoScenario } from "../types/analysis";

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "emotional-manipulation",
    title: "Viral Social Alert on City Transit",
    category: "Emotional Manipulation",
    badge: "Fear & Loaded Language",
    summary: "A fictional urgent social media broadcast claiming municipal water and transit infrastructure is under secret collapse, using panic framing and scapegoating.",
    sampleText: `EMERGENCY ALERT: Corrupt bureaucrats and their corporate cronies are deliberately covering up a catastrophic contamination in our metro drinking water! Insiders confirm they're poisoning our children while sipping imported filtered water in their ivory towers. If you step outside or drink tap water, your family is in mortal danger. They want you silenced, sick, and helpless! Demand immediate resignations or face total destruction of our community! Share before this gets censored!`,
    url: "https://social-pulse.fictional-domain.org/posts/urgent-alert-9082",
    preAnalyzedResult: {
      id: "demo-res-1",
      overallAssessment: "Unsupported",
      confidence: "High",
      confidenceExplanation: "High confidence that the core claims are completely unsubstantiated by municipal test logs and that the framing relies almost entirely on inflammatory rhetoric.",
      summaryExplanation: "The text relies heavily on fear-inducing hyperbole, unverified whistleblower rumors, and apocalyptic language without offering measurable data, lab samples, or official corroboration.",
      claims: [
        {
          id: "claim-1",
          claim: "Municipal officials are deliberately covering up catastrophic water contamination.",
          assessment: "Unsupported",
          category: "unverified_claim",
          explanation: "No verifiable evidence or credible whistle-blower reports corroborate intentional contamination or systemic coverup.",
          supportingEvidence: [],
          contradictingEvidence: [
            "Regional Environmental Protection Agency daily water purity reports for the metropolitan system demonstrate compliance with EPA standards.",
            "Municipal Water Authority public open-data dashboard shows zero dangerous contaminant spikes over the monitored period."
          ],
          confidence: "High",
          sources: [
            {
              title: "Metropolitan Water Quality Report (Public Record)",
              publisher: "Metropolitan Water District",
              publicationDate: "2026",
              url: "https://www.epa.gov/ground-water-and-drinking-water",
              relevance: "Official municipal utility audit logs evaluating biological and chemical purity indices.",
              stance: "contradicts"
            }
          ]
        },
        {
          id: "claim-2",
          claim: "Drinking tap water places families in immediate mortal danger.",
          assessment: "Unsupported",
          category: "unverified_claim",
          explanation: "Hospital and public health surveillance show no emergency admissions, toxicological alerts, or waterborne disease clusters.",
          supportingEvidence: [],
          contradictingEvidence: [
            "Local public health department surveillance logs show baseline community health metrics with zero acute poisoning clusters."
          ],
          confidence: "High",
          sources: [
            {
              title: "Public Health Surveillance Weekly Bulletin",
              publisher: "Department of Public Health",
              publicationDate: "2026",
              url: "https://www.cdc.gov",
              relevance: "Regional hospital and urgent care syndromic surveillance records.",
              stance: "contradicts"
            }
          ]
        },
        {
          id: "claim-3",
          claim: "Officials are purposefully silencing coverage and actively planning community destruction.",
          assessment: "Inconclusive",
          category: "opinion",
          explanation: "This statement represents conspiratorial speculation regarding intent rather than a verifiable factual occurrence.",
          supportingEvidence: [],
          contradictingEvidence: [],
          confidence: "Moderate",
          sources: []
        }
      ],
      propagandaTechniques: [
        {
          id: "tech-1",
          name: "Emotional Manipulation & Fear Appeals",
          excerpt: "your family is in mortal danger... face total destruction of our community!",
          whyItFits: "Appeals directly to the reader's visceral fear for family survival to provoke irrational urgency and override critical skepticism.",
          impactExplanation: "Fear triggers immediate defensive emotions, making people more prone to share rumors rapidly without pausing to verify facts."
        },
        {
          id: "tech-2",
          name: "Loaded Language",
          excerpt: "Corrupt bureaucrats... corporate cronies... ivory towers",
          whyItFits: "Employs pre-packaged derogatory phrases designed to generate disgust and moral condemnation rather than describe verified facts.",
          impactExplanation: "Pre-biases the reader against the mentioned parties before any factual misconduct is actually demonstrated."
        },
        {
          id: "tech-3",
          name: "Scapegoating & Us vs. Them Polarization",
          excerpt: "poisoning our children while sipping imported filtered water in their ivory towers",
          whyItFits: "Presents an elite ruling clique deliberately inflicting suffering upon vulnerable victims.",
          impactExplanation: "Simplifies complex infrastructure debates into an emotionally charged morality play between pure victims and malicious villains."
        },
        {
          id: "tech-4",
          name: "False Dilemma & Urgency Pressure",
          excerpt: "Demand immediate resignations or face total destruction of our community! Share before this gets censored!",
          whyItFits: "Creates an artificial binary choice between immediate obedience and apocalyptic ruin, coupled with preemptive censorship claims.",
          impactExplanation: "Rushes the audience to amplify the content before third-party verification or debunking can take place."
        }
      ],
      biasAndFraming: {
        emotionalTone: "Highly alarmist, accusatory, and combative.",
        persuasiveStyle: "Strongly Persuasive / Agitprop Rhetoric",
        emphasizedPerspectives: "Only uncorroborated, anonymous 'insiders' alleging sinister motives.",
        omittedContext: "Independent laboratory testing data, standard municipal utility test procedures, and public health alert protocols.",
        investigationGuidance: "Check with regional environmental agencies, county health departments, and local non-partisan news organizations to see if boil-water notices or alerts exist."
      },
      criticalThinkingQuestions: [
        "What specific independent laboratory data or water sample test could confirm or refute this hazard?",
        "Why does the author rely on anonymous 'insiders' rather than citing verifiable incident numbers or laboratory reports?",
        "How does the immediate demand to 'share before censorship' exploit urgency to bypass critical skepticism?"
      ],
      sources: [
        {
          title: "Drinking Water Standards & Regulatory Safeguards",
          publisher: "US Environmental Protection Agency (EPA)",
          publicationDate: "2026",
          url: "https://www.epa.gov/ground-water-and-drinking-water",
          relevance: "Overview of mandatory community water testing protocols, contaminant reporting, and emergency public alert systems.",
          stance: "contradicts"
        },
        {
          title: "Recognizing Disinformation Tactics in Public Emergencies",
          publisher: "Cybersecurity & Infrastructure Security Agency (CISA)",
          publicationDate: "2025",
          url: "https://www.cisa.gov",
          relevance: "Guide on identifying manufactured panic, manipulated leaks, and viral social media rumors during utility events.",
          stance: "contextualizes"
        }
      ],
      isDemo: true,
      demoTitle: "Demonstration Example: Emotional Manipulation & Fear Appeals",
      disclaimer: "DEMO EXAMPLE — PRE-ANALYZED SAMPLE. This fictional scenario is pre-calculated to illustrate how Verity analyzes loaded language and fear appeals. AI analyses are assistive tools and should be paired with independent verification."
    }
  },
  {
    id: "misleading-statistics",
    title: "Selective Economic Snapshot",
    category: "Misleading Statistics",
    badge: "Cherry-Picked Data & Context",
    summary: "A fictional press release citing an isolated single-month statistic to argue a local downtown revitalization initiative has completely failed.",
    sampleText: `The Downtown Business Improvement District is an absolute catastrophe. Official city records reveal that business bankruptcy filings spiked by an astounding 200% this quarter alone! This proves conclusively that the new pedestrian plaza and merchant support fees have completely crippled small retailers and destroyed our local commerce. Every shopkeeper is closing their doors while administrators claim victory.`,
    url: "https://civic-ledger.fictional-domain.org/analysis/retail-quarterly-crisis",
    preAnalyzedResult: {
      id: "demo-res-2",
      overallAssessment: "Misleading or Missing Context",
      confidence: "High",
      confidenceExplanation: "High confidence that while the mathematical percentage cited is technically derived from records, omitting the baseline numbers and broader macroeconomic context creates a severely distorted conclusion.",
      summaryExplanation: "The author uses a real relative percentage change (from 1 bankruptcy to 3 bankruptcies) to create the impression of a widespread commercial collapse, while ignoring multi-year trends, foot traffic growth, and overall retail revenue.",
      claims: [
        {
          id: "claim-1",
          claim: "Business bankruptcy filings spiked by 200% this quarter.",
          assessment: "Partially Supported",
          category: "verified_fact",
          explanation: "Mathematically true in relative terms, but deceptive because the absolute count moved from 1 isolated filing to 3 filings in a district with over 450 active commercial tenants.",
          supportingEvidence: [
            "Municipal court filings record 3 commercial bankruptcy petitions this quarter versus 1 in the preceding quarter."
          ],
          contradictingEvidence: [
            "The 200% relative shift represents a baseline delta of only 2 businesses out of 450 total businesses (under 0.7% total district rate)."
          ],
          confidence: "High",
          sources: [
            {
              title: "Quarterly Municipal Commercial Docket Registry",
              publisher: "County Commercial Court Records",
              publicationDate: "2026",
              url: "https://www.uscourts.gov/statistics-reports",
              relevance: "Official judicial statistics on business bankruptcy filings.",
              stance: "supports"
            }
          ]
        },
        {
          id: "claim-2",
          claim: "The pedestrian plaza and merchant fees have crippled commerce and caused every shopkeeper to close doors.",
          assessment: "Unsupported",
          category: "unverified_claim",
          explanation: "Total merchant revenue in the pedestrian zone actually increased 14% year-over-year, and retail occupancy remained above 94%.",
          supportingEvidence: [],
          contradictingEvidence: [
            "Independent regional commerce council audit showed pedestrian zone sales tax receipts grew 14.2% year-over-year.",
            "District retail storefront occupancy is documented at 94.6%, higher than the statewide average."
          ],
          confidence: "High",
          sources: [
            {
              title: "Downtown Commercial Corridor Annual Economic Impact Study",
              publisher: "Regional Economic Development Partnership",
              publicationDate: "2026",
              url: "https://www.bea.gov",
              relevance: "Comprehensive tax revenue, leasing rate, and foot-traffic audit of the downtown revitalization district.",
              stance: "contradicts"
            }
          ]
        }
      ],
      propagandaTechniques: [
        {
          id: "tech-1",
          name: "Cherry-Picked Statistics (Small Baseline Distortion)",
          excerpt: "bankruptcy filings spiked by an astounding 200% this quarter alone!",
          whyItFits: "Highlights a huge relative percentage (200%) while concealing the tiny absolute sample size (from 1 to 3 cases).",
          impactExplanation: "Gives readers the false impression of a massive, systemic economic failure when the actual shift is negligible within normal volatility."
        },
        {
          id: "tech-2",
          name: "Unsupported Generalization / Hyperbole",
          excerpt: "Every shopkeeper is closing their doors while administrators claim victory.",
          whyItFits: "Extrapolates from three specific bankruptcies to make an absolute claim ('every shopkeeper') that contradicts actual district occupancy numbers.",
          impactExplanation: "Forces an extreme, one-sided narrative that discourages nuanced evaluation of urban revitalization policies."
        },
        {
          id: "tech-3",
          name: "False Causal Attribution",
          excerpt: "This proves conclusively that the new pedestrian plaza and merchant support fees have completely crippled small retailers",
          whyItFits: "Asserts direct causation without controlling for supplier cost changes, online retail competition, or historical seasonal fluctuation.",
          impactExplanation: "Presents correlation or coincidence as undeniable cause-and-effect to guide policy opposition."
        }
      ],
      biasAndFraming: {
        emotionalTone: "Critical, indignant, and polemical.",
        persuasiveStyle: "Selectively Framed Data / Advocacy",
        emphasizedPerspectives: "Commercial distress and dissatisfaction with municipal business improvement district fees.",
        omittedContext: "District-wide net business formation, year-over-year sales volume, foot traffic metrics, and comparable regional trends.",
        investigationGuidance: "Always ask: 'What are the absolute numbers behind that percentage?' and check broad economic census indicators."
      },
      criticalThinkingQuestions: [
        "What was the actual starting number of bankruptcies before the 200% increase occurred?",
        "Are other economic factors (such as interest rates or seasonal shifts) influencing small business operations?",
        "What do sales tax receipts and vacancy rates across all businesses in the district indicate about overall economic health?"
      ],
      sources: [
        {
          title: "Understanding How Small Sample Sizes Skew Percentage Metrics",
          publisher: "Bureau of Labor Statistics / Educational Resources",
          publicationDate: "2025",
          url: "https://www.bls.gov/opub/btn",
          relevance: "Methodological guide on interpreting percentage spikes derived from very low baseline denominators.",
          stance: "contextualizes"
        },
        {
          title: "Downtown Commercial Corridor Annual Economic Impact Study",
          publisher: "Regional Economic Development Partnership",
          publicationDate: "2026",
          url: "https://www.bea.gov",
          relevance: "Audited sales tax receipts, foot traffic analysis, and occupancy rates for the pedestrian district.",
          stance: "contradicts"
        }
      ],
      isDemo: true,
      demoTitle: "Demonstration Example: Cherry-Picked Statistics & Missing Baseline",
      disclaimer: "DEMO EXAMPLE — PRE-ANALYZED SAMPLE. This fictional scenario is pre-calculated to demonstrate how Verity identifies selective statistical framing and missing baselines. AI analyses are assistive tools and should be paired with independent verification."
    }
  },
  {
    id: "evidence-based-reporting",
    title: "Scientific Water Quality & Wildlife Study",
    category: "Evidence-Based Reporting",
    badge: "Balanced & Attributed Reporting",
    summary: "A fictional journalistic report detailing river water restoration results, transparently acknowledging both positive gains and lingering chemical challenges.",
    sampleText: `A three-year ecological monitoring study published Thursday by the State Department of Natural Resources indicates that dissolved oxygen levels in the Blackwood River Basin have rebounded by 18% following wastewater treatment upgrades. Researchers sampled twenty-four monitoring stations monthly between 2023 and 2026. Lead biologist Dr. Sarah Vance noted that while macroinvertebrate diversity showed measurable recovery in the northern tributary, agricultural runoff containing phosphorus remains elevated in downstream wetlands, requiring ongoing conservation incentives. Independent hydrologists contacted for review praised the sampling rigor but cautioned that long-term recovery depends on summer temperature trends.`,
    url: "https://state-science-quarterly.fictional-domain.org/articles/blackwood-river-restoration-findings",
    preAnalyzedResult: {
      id: "demo-res-3",
      overallAssessment: "Supported by Evidence",
      confidence: "High",
      confidenceExplanation: "High confidence that the report accurately reflects the documented findings of the cited research body, clearly specifies methodologies, and presents appropriate caveats.",
      summaryExplanation: "The text demonstrates high journalistic and scientific integrity: it cites specific dates, methodologies, and direct attributions, distinguishes between measured gains and remaining problems, and includes independent third-party commentary.",
      claims: [
        {
          id: "claim-1",
          claim: "Dissolved oxygen levels in the river basin improved by 18% over three years following wastewater upgrades.",
          assessment: "Supported by Evidence",
          category: "verified_fact",
          explanation: "Supported by multi-year environmental agency data gathered consistently across 24 fixed monitoring stations.",
          supportingEvidence: [
            "State Department of Natural Resources 2026 Basin Ecological Study Table 4.2 documents a mean 18.1% gain in dissolved oxygen.",
            "Water treatment plant discharge records confirm upgraded tertiary filtration went online in late 2023."
          ],
          contradictingEvidence: [],
          confidence: "High",
          sources: [
            {
              title: "State River Basin Water Quality & Ecological Assessment (2023-2026)",
              publisher: "State Department of Natural Resources",
              publicationDate: "2026",
              url: "https://www.usgs.gov/water-resources",
              relevance: "Primary peer-reviewed environmental monitoring study detailing dissolved oxygen and benthic indices.",
              stance: "supports"
            }
          ]
        },
        {
          id: "claim-2",
          claim: "Phosphorus levels remain elevated in downstream wetlands due to agricultural runoff.",
          assessment: "Supported by Evidence",
          category: "verified_fact",
          explanation: "The article candidly notes that downstream regions did not achieve target nutrient reduction, preventing false over-optimism.",
          supportingEvidence: [
            "Downstream wetland monitoring stations recorded phosphorus concentrations 1.4 times above targeted regional benchmarks."
          ],
          contradictingEvidence: [],
          confidence: "High",
          sources: [
            {
              title: "Agricultural Nutrient Runoff & Watershed Dynamics",
              publisher: "National Agricultural Research Service",
              publicationDate: "2025",
              url: "https://www.usda.gov",
              relevance: "Technical breakdown of nonpoint source fertilizer runoff and downstream marsh retention.",
              stance: "supports"
            }
          ]
        },
        {
          id: "claim-3",
          claim: "Long-term recovery will be influenced by future summer temperature patterns.",
          assessment: "Supported by Evidence",
          category: "prediction",
          explanation: "A qualified scientific projection explicitly attributed to independent reviewing hydrologists.",
          supportingEvidence: [
            "Established physical chemistry principles demonstrate that warmer water temperatures hold less dissolved oxygen."
          ],
          contradictingEvidence: [],
          confidence: "Moderate",
          sources: [
            {
              title: "Limnology & Temperature Effects on Freshwater Oxygen Saturation",
              publisher: "American Limnological Review",
              publicationDate: "2024",
              url: "https://www.usgs.gov",
              relevance: "Academic review of thermal impacts on riverine ecological resilience.",
              stance: "supports"
            }
          ]
        }
      ],
      propagandaTechniques: [],
      biasAndFraming: {
        emotionalTone: "Objective, measured, and matter-of-fact.",
        persuasiveStyle: "Neutral / Informational & Transparent",
        emphasizedPerspectives: "Presents both positive restoration milestones and persisting environmental vulnerabilities.",
        omittedContext: "No significant contextual omission detected; includes methodology, timeframes, and external reviewer perspectives.",
        investigationGuidance: "Readers can consult the original Department of Natural Resources technical tables to review localized station-by-station oxygen trends."
      },
      criticalThinkingQuestions: [
        "How do the monitoring methodology and sample size (24 stations over 3 years) bolster the reliability of these findings?",
        "Why is it valuable for an article to discuss both positive progress and continuing environmental challenges?",
        "How does seeking comment from an independent hydrologist outside the primary agency enhance reporting credibility?"
      ],
      sources: [
        {
          title: "State River Basin Water Quality & Ecological Assessment (2023-2026)",
          publisher: "State Department of Natural Resources",
          publicationDate: "2026",
          url: "https://www.usgs.gov/water-resources",
          relevance: "Primary peer-reviewed environmental monitoring report with empirical sensor tables.",
          stance: "supports"
        },
        {
          title: "Guidelines for Clear Scientific Communication in Public Reporting",
          publisher: "National Association of Science Writers",
          publicationDate: "2025",
          url: "https://www.nasw.org",
          relevance: "Standard criteria for balanced scientific attribution, nuance, and contextualized data presentation.",
          stance: "contextualizes"
        }
      ],
      isDemo: true,
      demoTitle: "Demonstration Example: Evidence-Based Reporting & Transparent Nuance",
      disclaimer: "DEMO EXAMPLE — PRE-ANALYZED SAMPLE. This fictional scenario illustrates how Verity highlights balanced reporting, clear attribution, and appropriate qualifications. AI analyses are assistive tools and should be paired with independent verification."
    }
  }
];
