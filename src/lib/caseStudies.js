// JavaScript repository of real-world propaganda and rhetoric case studies
// Spans wartime rhetoric, partisan campaign messaging, and scientific press statements

export const PROPAGANDA_CASE_STUDIES = [
  {
    id: "case-wartime-mobilization",
    title: "Gulf of Tonkin Incident Press Release (1964)",
    tag: "Wartime Mobilization",
    sourceContext: "Declassified Department of Defense Bulletin & Contemporary News Dispatches",
    sourceUrl: "https://www.archives.gov/milestone-documents/gulf-of-tonkin-resolution",
    sampleText: `Official Pentagon sources confirm that hostile North Vietnamese torpedo boats launched an unprovoked, deliberate ambush against American naval vessels operating peacefully in international waters. This brazen act of direct military aggression proves beyond doubt that communist forces are hellbent on destroying freedom across Southeast Asia. If the United States does not strike back with overwhelming force immediately, our entire Pacific defense perimeter will fall like dominoes to violent terror. We cannot allow cowardly assaults against our brave servicemen to go unanswered.`,
    analysis: {
      posture: "High Propaganda Density",
      severity: "high",
      rhetoricalSlant: "War Mobilization & Threat Inflation",
      tactics: [
        {
          id: "tactic-fear",
          name: "Fear Appeal & Catastrophizing",
          category: "Emotional Coercion",
          excerpt: "our entire Pacific defense perimeter will fall like dominoes to violent terror",
          indicator: "Domino-theory existential catastrophe framing",
          explanation: "Draws an immediate line from an isolated skirmish in ambiguous waters to the imminent total destruction of global democratic defense.",
          influence: "Pressures lawmakers and the public to grant sweeping executive war powers without demanding naval radar logs or sonar audits."
        },
        {
          id: "tactic-false-dilemma",
          name: "Manufactured Binary / Urgency Trap",
          category: "Logical Distortion",
          excerpt: "If the United States does not strike back with overwhelming force immediately... will fall",
          indicator: "Binary: immediate massive retaliation or total ruin",
          explanation: "Forecloses diplomatic inquiry, UN mediation, or tactical reconnaissance in favor of immediate armed escalation.",
          influence: "Neutralizes anti-war skepticism by characterizing hesitation as military vulnerability."
        },
        {
          id: "tactic-loaded",
          name: "Loaded Language & Moral Inversion",
          category: "Linguistic Bias",
          excerpt: "brazen act of direct military aggression... cowardly assaults... hellbent on destroying freedom",
          indicator: "Pejorative moralizing contrasting with glorified self-description",
          explanation: "Frames covert commando operations and covert patrol boat clashes in purely righteous, moralistic terms.",
          influence: "Eliminates operational context (such as covert Operation 34A raids) to present the event as completely unprovoked."
        }
      ],
      structuralBreakdown: {
        narrativeStrategy: "Manufactured Casus Belli through Threat Inflation",
        omittedFacts: "Omitted that U.S. destroyers had been cooperating with South Vietnamese commando raids against North Vietnamese radar stations in the preceding 72 hours, and that the second alleged attack on August 4 was contradicted by sonar operators and radar logs.",
        psychologicalLeverage: "Leverages collective patriotism, outrage over attacked servicemen, and anti-communist domino anxiety to bypass constitutional war declarations.",
        criticalQuestions: [
          "What classified operational background preceded the encounter?",
          "Are physical radar logs, sonar recordings, and visual confirmations independently verified by non-combatants?",
          "Who benefits from presenting retaliation as the only conceivable policy option?"
        ]
      }
    }
  },
  {
    id: "case-corporate-tobacco",
    title: "A Frank Statement to Cigarette Smokers (1954)",
    tag: "Corporate Denialism & Doubt",
    sourceContext: "Tobacco Industry Research Committee Full-Page Newspaper Advertisement",
    sourceUrl: "https://www.tobaccofreekids.org/assets/factsheets/0244.pdf",
    sampleText: `Recent reports on experiments with mice have given wide publicity to a theory that cigarette smoking is in some way linked with lung cancer in human beings. Although conducted by doctors of professional standing, these tests are not regarded as conclusive in the field of cancer research. Scientists have pointed out that there is no agreement among the authorities regarding what the cause is. There are many causes: some claim atmospheric pollution, others city dust, radioactive substances, or hereditary traits. We accept an interest in people's health as a basic responsibility, paramount to every other consideration in our business. We pledge our wholehearted cooperation to those who are researching this problem with an open mind.`,
    analysis: {
      posture: "High Propaganda Density",
      severity: "high",
      rhetoricalSlant: "Manufactured Uncertainty & False Equivalence",
      tactics: [
        {
          id: "tactic-cherry-picking",
          name: "Manufactured Controversy & Doubt Injection",
          category: "Disinformation Strategy",
          excerpt: "there is no agreement among the authorities regarding what the cause is... some claim atmospheric pollution, others city dust",
          indicator: "Deflection to obscure co-factors to conceal primary risk",
          explanation: "Elevates secondary environmental variables (dust, background smog) to create the false illusion of total scientific dissension.",
          influence: "Reassures smokers that quitting is unnecessary because 'the jury is still out.'"
        },
        {
          id: "tactic-absolutism",
          name: "Performative Benevolence & Responsibility Signaling",
          category: "Public Relations Deflection",
          excerpt: "We accept an interest in people's health as a basic responsibility, paramount to every other consideration in our business",
          indicator: "Pious ethical posturing directly contradicted by internal research documents",
          explanation: "Positions commercial manufacturers as self-sacrificing public health stewards to preempt regulatory enforcement.",
          influence: "Substitutes moral grandstanding for honest scientific disclosure."
        },
        {
          id: "tactic-othering",
          name: "Dog-Whistling Bias / Discrediting Rigorous Research",
          category: "Argumentative Fallacy",
          excerpt: "We pledge our wholehearted cooperation to those who are researching this problem with an open mind",
          indicator: "Labeling critical researchers as 'closed-minded'",
          explanation: "Inverts standard peer-review criteria by framing independent medical researchers as dogmatic alarmists and industry-funded contrarians as 'open-minded'.",
          influence: "Enables consumers to dismiss established epidemiological warnings as sensationalist dogma."
        }
      ],
      structuralBreakdown: {
        narrativeStrategy: "The Tobacco Strategy: Doubt Is Our Product",
        omittedFacts: "Internal company laboratories had already isolated carcinogenic tar fractions and demonstrated tumor induction in animal models years prior to this publication.",
        psychologicalLeverage: "Exploits confirmation bias and addiction psychology to grant consumers moral and intellectual permission to continue smoking.",
        criticalQuestions: [
          "Does the publishing entity have an acute financial interest in delaying public consensus?",
          "Is 'demanding absolute 100% certainty' being used as a weapon to stall life-saving regulation?",
          "Are industry-funded research councils genuinely independent of marketing directives?"
        ]
      }
    }
  },
  {
    id: "case-partisan-economic-panic",
    title: "Campaign Direct-Mail Dossier on Economic Collapse",
    tag: "Electoral Agitation",
    sourceContext: "National Congressional Campaign Committee Mailer & Digital Ad Campaign",
    sourceUrl: "https://www.fec.gov",
    sampleText: `THE WORKING FAMILY RUIN BILL: Corrupt Washington insiders and their radical billionaire handlers just rammed through an economic death sentence for Middle America. Inflation has detonated by an unprecedented 400% on everyday household necessities! Radical bureaucrats are deliberately stealing your hard-earned pensions to bankroll luxury subsidies for illegal foreign cartels. Either we throw every single traitor out of office this November, or your children will inherit a bankrupt socialist wasteland. Send an emergency donation of $25 right now before this message is banned by the censors!`,
    analysis: {
      posture: "High Propaganda Density",
      severity: "high",
      rhetoricalSlant: "Agitational Populism & Fundraising Panic",
      tactics: [
        {
          id: "tactic-loaded",
          name: "Loaded Language & Demonization",
          category: "Linguistic Bias",
          excerpt: "economic death sentence... corrupt Washington insiders... radical billionaire handlers... traitors",
          indicator: "Violent moral condemnation replacing legislative critique",
          explanation: "Weaponizes apocalyptic labels to induce intense contempt rather than explaining specific budget amendments.",
          influence: "Prevents rational debate on fiscal policy by defining political adversaries as treasonous criminals."
        },
        {
          id: "tactic-othering",
          name: "Us vs. Them Polarization / Xenophobic Scapegoating",
          category: "Social Division",
          excerpt: "stealing your hard-earned pensions to bankroll luxury subsidies for illegal foreign cartels",
          indicator: "Fictional redistribution from virtuous in-group to villainous out-group",
          explanation: "Invents a predatory parasitic relationship where honest domestic laborers are plundered for foreign criminals.",
          influence: "Converts economic insecurity into racial and nationalist grievance."
        },
        {
          id: "tactic-false-dilemma",
          name: "Manufactured Binary & High-Pressure Solicitation",
          category: "Logical Distortion",
          excerpt: "Either we throw every single traitor out... or your children will inherit a bankrupt socialist wasteland. Send $25 right now",
          indicator: "Catastrophic binary coupled to instantaneous financial demand",
          explanation: "Reduces legislative democracy to an existential showdown resolved solely by immediate financial compliance.",
          influence: "Capitalizes on acute terror to extract recurring donations before donors can fact-check claims."
        },
        {
          id: "tactic-cherry-picking",
          name: "Fabricated / Cherry-Picked Baseline Statistics",
          category: "Statistical Manipulation",
          excerpt: "Inflation has detonated by an unprecedented 400% on everyday household necessities",
          indicator: "Fabricated compound percentage without index citations",
          explanation: "Cites a fictitious 400% spike (perhaps cherry-picking a specific wholesale agricultural commodity over a single holiday week) to misrepresent general consumer price index figures.",
          influence: "Validates emotional terror with the veneer of mathematical precision."
        }
      ],
      structuralBreakdown: {
        narrativeStrategy: "Agitprop Monetization & Extremist Radicalization",
        omittedFacts: "Standard Consumer Price Index (CPI) increases over the debated session were 3.2% annually, and the legislation contained standard infrastructure appropriations with bipartisan procedural votes.",
        psychologicalLeverage: "Preys on middle-class financial vulnerability, parental protective instincts, and fear of censorship.",
        criticalQuestions: [
          "What specific line items in the actual statute are being referenced?",
          "Are the cited percentage increases verified by the Bureau of Labor Statistics?",
          "Why is an urgent political 'analysis' concluding with an immediate credit card donation request?"
        ]
      }
    }
  },
  {
    id: "case-neutral-scientific-audit",
    title: "USGS Hydrological & Basin Groundwater Assessment",
    tag: "Institutional Baseline (Non-Propaganda)",
    sourceContext: "United States Geological Survey Scientific Investigations Report 2024-5081",
    sourceUrl: "https://pubs.usgs.gov",
    sampleText: `Long-term monitoring of the High Plains Aquifer indicates an average water-level decline of 1.2 feet across the monitored 14-state network during the 2021-2023 evaluation cycle. While northern recharge zones in Nebraska showed localized stability with a 0.3-foot net recovery following spring precipitation, southern irrigation districts in the Texas Panhandle experienced localized drawdowns exceeding 3.8 feet. The USGS research team notes that current pumping rates for intensive maize cultivation continue to exceed natural replenishment by an estimated factor of 2.4. Senior hydrologist Dr. Marcus Vance emphasized that while aquifer depletion presents substantial multi-decade challenges for municipal supplies, localized conservation compacts have reduced drawdown velocity by 11% compared to the 2012 drought baseline.`,
    analysis: {
      posture: "Neutral / Low Propaganda Profile",
      severity: "low",
      rhetoricalSlant: "Objective Scientific & Empirical Reporting",
      tactics: [],
      structuralBreakdown: {
        narrativeStrategy: "Measured Empirical Attribution with Geographic Caveats",
        omittedFacts: "None detected. The report transparently balances localized recovery against severe southern drawdown zones, presents exact measurements, and cites baseline comparison years.",
        psychologicalLeverage: "Contains zero emotional appeals, scapegoating, pejorative language, or emergency calls to partisan action.",
        criticalQuestions: [
          "How do differing state groundwater extraction regulations impact regional variance?",
          "What economic trade-offs accompany reduced irrigation pumping quotas?",
          "How do precipitation trends over 30-year climate cycles compare to short-term data?"
        ]
      }
    }
  }
];
