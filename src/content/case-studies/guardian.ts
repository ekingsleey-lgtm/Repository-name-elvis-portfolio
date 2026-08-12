import type { CaseStudy } from "../types";

export const guardian: CaseStudy = {
  slug: "guardian",
  index: "04",
  shortTitle: "Guardian",
  title: "The Guardian — Making Premium Discoverable",
  pageHeading: "Making Premium discoverable without putting journalism behind a paywall",
  subtitle:
    "The Guardian needed to grow digital subscription revenue while maintaining its commitment to freely accessible journalism. As the sole designer embedded in the Revenue team, I redesigned the app's navigation to make Premium features easier to discover while balancing competing editorial, commercial and user priorities.",
  role: "UX Designer",
  period: "4 months",
  tags: ["Revenue Growth", "Stakeholder Alignment", "Evidence-Led Design"],
  heroMetrics: [
    { value: "+17%", caption: "Click-through to Premium subscription" },
    { value: "+4%", caption: "Premium subscriptions" },
    { value: "1 month", caption: "Post-launch measurement window" },
  ],
  cover: {
    src: "/work/guardian/guardian-hero.jpg",
    alt: "Three Guardian app screens showing the Discover, home feed and Live premium features side by side",
    width: "full",
    dims: { w: 1200, h: 900 },
    priority: true,
  },
  blocks: [
    // ─── 01 — Growing revenue without closing off the news ──────────────────
    {
      type: "prose",
      label: "The brief",
      heading: "Growing revenue without closing off the news",
      body: [
        "The Guardian was exploring ways to build sustainable digital revenue while maintaining its commitment to keeping journalism freely accessible.",
        "Premium was an early attempt to introduce paid digital experiences through the app. Users could subscribe for access to additional features including Live and Discover.",
        "Premium conversion, however, was below expectations.",
      ],
    },
    {
      type: "reframe",
      from: {
        label: "The business problem",
        body: "How do we grow digital subscription revenue?",
      },
      to: {
        label: "The design challenge",
        body: "How might we make Premium more discoverable without compromising the core Guardian experience?",
      },
    },
    {
      type: "prose",
      body: [
        "Navigation was identified as the intervention point. As the sole designer embedded in the Revenue team — working alongside Product, Engineering, Commercial/Subscriptions, Editorial and Data & Analytics — As the sole designer in the Revenue team, I owned the navigation redesign.",
      ],
    },

    // ─── 02 — Finding the problem hiding in plain sight ─────────────────────
    {
      type: "prose",
      label: "The discovery",
      heading: "Finding the problem hiding in plain sight",
      body: [
        "My initial heuristic review identified a specific discoverability problem. At the top of the existing app, Discover appeared to the left of The Guardian title and Live appeared to the right:",
      ],
    },
    {
      type: "callout",
      label: "Existing navigation",
      body: ["Discover  |  The Guardian  |  Live"],
    },
    {
      type: "prose",
      body: [
        "The Premium controls did not look sufficiently interactive. A user could read the three elements as a single masthead phrase — \"Discover The Guardian Live\" — rather than recognising Live and Discover as separate, tappable Premium destinations.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/guardian/live-discover-features.png",
          alt: "Annotated Guardian app screenshot showing the original masthead: Discover pill (left), The Guardian title (centre), Live pill (right), with a callout labelling them as premium paid features",
          caption: "The original navigation — 'Discover' and 'Live' as Premium feature pills either side of The Guardian masthead.",
          dims: { w: 1150, h: 1350 },
        },
      ],
    },
    {
      type: "callout",
      label: "Hypothesis",
      body: [
        "If users don't recognise Live and Discover as interactive Premium features, they may never reach the point where they understand their value or consider subscribing.",
      ],
    },

    // ─── 03 — One navigation, competing priorities ───────────────────────────
    {
      type: "prose",
      label: "Stakeholder alignment",
      heading: "One navigation, competing priorities",
      body: [
        "Navigation space had competing demands. I interviewed senior stakeholders to understand what each group believed the navigation needed to achieve.",
      ],
    },
    {
      type: "comparison",
      columns: ["Stakeholder", "Navigation priority"],
      rows: [
        ["Editorial", "Guardian journalism and sections appropriately represented"],
        ["Commercial", "Premium features clearly visible and accessible"],
        ["Users", "A simple, understandable navigation model"],
        ["Engineering", "Feasibility within platform and timeline constraints"],
        ["iOS & Android", "Respect for each platform's own conventions"],
      ],
    },
    {
      type: "prose",
      body: [
        "Rather than allowing competing opinions to dictate the design, I converted recurring stakeholder concerns into a scoring framework — asking each group to rate the relative importance of these criteria before any concept was proposed.",
      ],
    },

    // ─── 04 — Designing the solution together ───────────────────────────────
    {
      type: "prose",
      label: "Workshop",
      heading: "Designing the solution together",
      body: [
        "I ran a design workshop with Engineering, Creative Design and Commercial, structured around the discoverability hypothesis. The group ranked navigation features by importance and agreed on the primary journeys the new navigation would need to serve.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/guardian/cover.jpg",
          alt: "Workshop wall with sticky notes sorted into three columns headed Primary 1, Secondary 2 and Tertiary 3. Primary: News, Promote Primary Tier. Secondary: Topic Sections, Live, Discover, Crosswords, Search, Profile, Save for Later, Settings, Offline Download. Tertiary: Video, Podcasts, The Observer, Jobs.",
          caption: "Workshop prioritisation output — navigation features ranked into Primary, Secondary and Tertiary importance. Live and Discover landed in the Secondary column, behind News but ahead of utility features.",
          dims: { w: 2500, h: 3333 },
        },
        {
          src: "/work/guardian/primary-journeys.png",
          alt: "Sticky note headed Primary Journeys with hand-drawn flow diagrams: Home to Sections/Story to Article; Home to Article/Opinion; Article to Section Culture; with a note reading 'we don't do this'",
          caption: "The primary journeys agreed during the workshop.",
          dims: { w: 343, h: 554 },
        },
      ],
    },
    {
      type: "cards",
      heading: "Three directions emerged",
      numbered: true,
      body: [
        "The group split into teams to sketch their versions of The Guardian's future navigation. Three distinct concepts emerged from the session.",
      ],
      cards: [
        {
          title: "Premium-first",
          body: "A top-navigation approach giving Live and Discover greater prominence — directly addressing the discoverability hypothesis identified in the heuristic review.",
        },
        {
          title: "Editorial-first",
          body: "A top-navigation approach exposing Guardian editorial sections — News, Opinion, Sport and Culture — as the primary navigation model.",
        },
        {
          title: "New navigation model",
          body: "A bottom-navigation approach with a central floating action button and clearer, dedicated access to Live and Discover as distinct destinations.",
        },
      ],
    },
    // Concept 1 and 2 as sketches — fidelity matches what the images actually show
    {
      type: "figures",
      figures: [
        {
          src: "/work/guardian/sketches.jpg",
          alt: "Hand-drawn phone sketch showing Live and Discover as a split two-column top navigation strip, with Latest, Premium and Profile in the bottom bar",
          caption: "Concept 1 — Live and Discover given prominent placement as a split top-navigation strip.",
          dims: { w: 2500, h: 3333 },
        },
        {
          src: "/work/guardian/card-sort.jpg",
          alt: "Hand-drawn phone sketch showing editorial sections — News, Opinion, Sports, Culture, Finance, Food, Travel — as a two-row horizontal top navigation, with Latest, Premium and Profile in the bottom bar",
          caption: "Concept 2 — editorial sections as the primary top navigation.",
          dims: { w: 2500, h: 3333 },
        },
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/guardian/sketch-3.png",
          alt: "Hand-drawn phone sketch showing The Guardian home feed with a bottom navigation bar: Discover on the left, a central floating action button in the middle, and Live on the right",
          caption: "Concept 3 — bottom navigation with Discover, a central floating action button, and Live as distinct destinations.",
          dims: { w: 941, h: 1672 },
        },
      ],
    },

    // ─── 05 — Testing opinions against behaviour ────────────────────────────
    {
      type: "prose",
      label: "Usability testing",
      heading: "Testing opinions against behaviour",
      body: [
        "The three concepts were wireframed and tested with six Guardian users. Participants rated each concept against four criteria: Usable, Desirable, Functional and Complementary.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/guardian/wireframe-1.png",
          alt: "Digital wireframe showing The Guardian with editorial section tabs — News, Opinion, Sport, Culture, Lifestyle — at the top and Discover and Live as footer-level text links",
          caption: "Concept wireframe tested — editorial section tabs at top, with Discover and Live accessible at footer level.",
          dims: { w: 367, h: 650 },
        },
        {
          src: "/work/guardian/Guardian-Style News Wireframe Mockup 3.png",
          alt: "Digital wireframe showing The Guardian masthead and search bar at top, Live and Discover as a two-column navigation strip below, and Latest, Premium and Profile in a bottom navigation bar",
          caption: "Concept wireframe tested — The Guardian masthead with Live and Discover as a prominent top navigation strip, Latest, Premium and Profile in the bottom bar.",
          dims: { w: 1023, h: 1537 },
        },
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/guardian/wireframe-3.png",
          alt: "Digital wireframe showing The Guardian home feed with a bottom navigation bar: Discover left, central floating action button, Live right",
          caption: "Concept wireframe tested — bottom navigation placing Discover and Live as distinct destinations.",
          dims: { w: 367, h: 650 },
        },
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/guardian/scoring-system.png",
          alt: "Printed usability-testing questionnaire with a 1-to-5 Likert scale asking participants to rate how well the navigation performed on four criteria: Usable, Desirable, Functional and Complementary",
          caption: "The evaluation form used in testing — participants rated each navigation concept 1–5 on Usable, Desirable, Functional and Complementary. The same criteria had been agreed with stakeholders before testing began.",
          width: "wide",
          dims: { w: 739, h: 351 },
        },
      ],
    },
    {
      type: "prose",
      body: [
        "Concept 3 emerged as the preferred direction. Users responded positively to Live and Discover and indicated that these areas felt new to them — because they had not previously discovered them at all. They also found the bottom navigation simpler and less cluttered.",
      ],
    },
    {
      type: "statement",
      label: "The insight",
      body: "Features that already existed felt new once people could actually discover them.",
    },

    // ─── 06 — When evidence challenged stakeholder preference ────────────────
    {
      type: "prose",
      label: "Evidence over opinion",
      heading: "When evidence challenged stakeholder preference",
      body: [
        "Some stakeholders had become attached to Concept 2 — the editorial-led direction — and questioned the validity of the testing when the results favoured a different approach.",
        "Rather than arguing for the preferred solution, I presented recordings from the usability sessions in which Guardian users explained their preferences in their own words. This moved the discussion away from internal opinion and back towards customer evidence.",
      ],
    },
    {
      type: "statement",
      label: "The approach",
      body: "Bring the customer's voice into the room.",
    },

    // ─── 07+08 — From concepts to final navigation / Making Premium unmistakably interactive
    {
      type: "prose",
      label: "Delivery",
      heading: "From concepts to final navigation",
      body: [
        "Concept 3 established the direction, but we didn't simply ship it unchanged. The final navigation combined the strongest elements from all three concepts.",
        "Implementation across iOS and Android required working through platform-specific constraints with engineering. Some interaction behaviours and journey flows were adjusted to fit each platform without changing the navigation hierarchy itself.",
      ],
    },
    // Visual before/after — the transformation made obvious through real UI
    {
      type: "figures",
      figures: [
        {
          src: "/work/guardian/live-discover-features.png",
          alt: "The original Guardian app masthead showing Discover pill left, The Guardian title centre, Live pill right — the before state",
          caption: "Before — Discover and Live positioned either side of The Guardian masthead, their interactivity easy to overlook.",
          dims: { w: 1150, h: 1350 },
        },
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/guardian/final-ui-1.png",
          alt: "Final shipped Live screen: dark red header with Live in large type, live news feed, and a bottom navigation bar showing Home, Discover and Live with a yellow floating action button",
          caption: "After — Live as a distinct destination in the bottom navigation, with a clear Premium subscription prompt.",
          dims: { w: 373, h: 742 },
        },
        {
          src: "/work/guardian/final-ui-2.png",
          alt: "Final shipped Discover screen: yellow header with Discover in large type, curated editorial content, Premium subscription CTA, and the same bottom navigation bar showing Home, Discover and Live",
          caption: "After — Discover as a distinct destination, with the bottom navigation placing Home, Discover and Live as clearly separate tabs.",
          dims: { w: 375, h: 742 },
        },
      ],
    },
    {
      type: "reframe",
      label: "The change",
      from: {
        label: "Before",
        body: "Live and Discover sat in the masthead — easy to read as part of the header title rather than as tappable Premium features.",
      },
      to: {
        label: "After",
        body: "Live and Discover surfaced as distinct, unmistakably interactive destinations in the bottom navigation.",
      },
    },

    // ─── 09 — One month after launch ────────────────────────────────────────
    {
      type: "metrics",
      label: "Outcome",
      heading: "One month after launch",
      body: [
        "Post-launch analytics showed a 17% increase in click-through from Live and Discover to the subscription page, and a 4% increase in Premium subscriptions.",
      ],
      metrics: [
        {
          value: "+17%",
          caption: "Click-through from Live and Discover to the Premium subscription page",
          direction: "up",
        },
        {
          value: "+4%",
          caption: "Premium subscriptions",
          direction: "up",
        },
      ],
    },
    {
      type: "statement",
      body: "The features hadn't changed. Their discoverability had.",
    },
  ],

  interactiveSplitBefore: "Workshop",

  chapters: [
    { id: "context",    label: "Context",    blockLabel: "The brief" },
    { id: "diagnosis",  label: "Diagnosis",  blockLabel: "The discovery" },
    { id: "alignment",  label: "Alignment",  blockLabel: "Stakeholder alignment" },
    { id: "design",     label: "Design",     blockLabel: "Workshop" },
    { id: "testing",    label: "Testing",    blockLabel: "Usability testing" },
    { id: "evidence",   label: "Evidence",   blockLabel: "Evidence over opinion" },
    { id: "delivery",   label: "Delivery",   blockLabel: "Delivery" },
    { id: "outcome",    label: "Outcome",    blockLabel: "Outcome" },
    { id: "reflection", label: "Reflection", blockLabel: "_reflection" },
  ],

  reflection: {
    heading: "Navigation is a product decision, not just a design one",
    body: [
      "The Guardian project showed me that navigation — often treated as a structural detail — can be a direct lever for commercial outcomes. The Premium features were already there. Users simply weren't finding them.",
      "What made the project work wasn't the visual design. It was the process: converting competing stakeholder opinions into a shared framework, testing concepts against real users, and using customer evidence to resolve disagreements rather than personal conviction.",
      "I was the sole designer on the Revenue team, reporting to the Lead UX Designer. The process required input from every part of the organisation — Product, Engineering, Commercial/Subscriptions, Editorial and Data & Analytics. The shared scoring framework gave each group a stake in the outcome before any solution was on the table.",
    ],
  },
};
