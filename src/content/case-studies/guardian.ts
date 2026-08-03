import type { CaseStudy } from "../types";

export const guardian: CaseStudy = {
  slug: "guardian",
  index: "04",
  shortTitle: "Guardian",
  title: "Guardian Digital Experience — Personalisation & Content Discovery",
  pageHeading: "Guardian App: UX/UI Redesign to Drive Premium Growth",
  subtitle: "Driving Engagement Through Personalisation & Content Discovery",
  role: "Product Designer",
  period: "4 months",
  tags: ["Growth-Focused Thinking", "Cross-Functional Leadership"],
  cover: {
    src: "/work/guardian/guardian-hero.jpg",
    alt: "Three Guardian app screens showing the Discover, home feed and Live premium features side by side",
    width: "full",
    dims: { w: 1200, h: 900 },
    priority: true,
  },
  blocks: [
    // ─── Overview ────────────────────────────────────────────────────────────
    {
      type: "prose",
      label: "Overview",
      heading: "Optimising app navigation to grow Premium subscribers",
      body: [
        "The Guardian needed to grow in-year revenue by acquiring and retaining Premium subscribers. I convinced senior stakeholders that optimising app navigation could directly support this business goal, improving both discoverability and engagement with premium features.",
      ],
    },

    // ─── Challenges ──────────────────────────────────────────────────────────
    {
      type: "list",
      label: "Challenges",
      heading: "Four challenges shaping the project",
      items: [
        "Showcase The Guardian App's premium features in a subtle, user-friendly way",
        "Gain buy-in from multiple senior stakeholders with differing goals",
        "Align senior stakeholders and the team around a shared vision",
        "Deliver results within limited company resources",
      ],
    },

    // ─── OKR ─────────────────────────────────────────────────────────────────
    {
      type: "prose",
      label: "OKR",
      heading: "A clear, measurable target",
      body: [],
    },
    {
      type: "callout",
      label: "Objective & Key Result",
      body: [
        "Increase sign-ups to The Guardian Premium App by 4% while reducing churn by 1%.",
      ],
    },

    // ─── Project Strategy ────────────────────────────────────────────────────
    {
      type: "prose",
      label: "Project Strategy",
      heading: "Sole UX designer in an OKR squad",
      body: [
        "The Guardian's digital team was structured into autonomous, cross-functional OKR squads. As the sole UX designer in my squad, I ensured the UX process was applied effectively to meet our OKR. Once we received our targets, I explored strategies to help the team achieve them.",
      ],
    },

    // ─── User Feedback ───────────────────────────────────────────────────────
    {
      type: "prose",
      label: "User Feedback",
      heading: "Premium features that weren't clearly tappable",
      body: [
        "I analysed QA feedback through a heuristic review to identify pain points. My key finding was that the premium features, Live and Discover, were not clearly tappable.",
      ],
    },
    {
      type: "callout",
      label: "Hypothesis",
      body: [
        "Enhancing visual cues for premium features would increase user exploration.",
        "I presented the findings and hypothesis to the team, gained alignment, and wrote a UX sprint plan to guide delivery within the quarter. The plan was shared with PMs and engineers to ensure feasibility and get sign-off.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/guardian/live-discover-features.png",
          alt: "Guardian app screenshot showing the Live and Discover premium features and their navigation treatment",
          caption: "Guardian app — 'Live' and 'Discover' premium paid features",
          dims: { w: 1150, h: 1350 },
        },
      ],
    },

    // ─── Business Buy-In ─────────────────────────────────────────────────────
    {
      type: "prose",
      label: "Business Buy-In",
      heading: "Designing a scoring system to align stakeholders",
      body: [
        "I presented my heuristic review to stakeholders from Design, Product, Engineering, Commercial, and UX. This allowed me to explore their ideas of successful navigation. I discovered they had different definitions of navigation success. To align them, I designed a scoring system to evaluate navigation concepts against agreed metrics. This system created a shared understanding and enabled consensus on project direction.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/guardian/scoring-system.png",
          alt: "Navigation scoring system used to evaluate concepts against agreed stakeholder metrics",
          caption: "Navigation scoring system used to align stakeholders",
          width: "wide",
          dims: { w: 739, h: 351 },
        },
      ],
    },

    // ─── Cross-Discipline Ideation Workshop ──────────────────────────────────
    {
      type: "figures",
      label: "Cross-Discipline Ideation Workshop",
      heading: "Ranking navigation features by importance",
      body: [
        "With the senior stakeholders' agreement, I organised a cross-discipline ideation workshop. By discussing the user problems and my hypothesis, we agreed on the most important navigation features and ranked them by importance.",
      ],
      figures: [
        {
          src: "/work/guardian/cover.jpg",
          alt: "Card-sorting workshop with sticky notes showing navigation features ranked as Primary, Secondary and Tertiary",
          caption: "Workshop feature ranking by importance",
          width: "wide",
          dims: { w: 2500, h: 3333 },
        },
      ],
    },
    {
      type: "figures",
      body: [
        "We also agreed on the primary journeys we would promote through our new navigation. I then split the group into teams to sketch their versions of The Guardian's future navigation.",
      ],
      figures: [
        {
          src: "/work/guardian/primary-journeys.png",
          alt: "Workshop output showing the primary user journeys agreed for the new navigation",
          caption: "Primary journeys agreed in the workshop",
          dims: { w: 343, h: 554 },
        },
      ],
    },
    {
      type: "figures",
      body: [
        "The outcome of the workshop was three navigation sketches. After the workshop, I iterated on the sketches while focusing on the primary navigation journeys, and created wireframes.",
      ],
      figures: [
        {
          src: "/work/guardian/card-sort.jpg",
          alt: "Hand-drawn navigation concept sketch 1 — tab bar with News, Opinion, Sports sections and Latest, Premium, Profile tabs",
          caption: "Navigation sketch 1",
          dims: { w: 2500, h: 3333 },
        },
        {
          src: "/work/guardian/sketches.jpg",
          alt: "Hand-drawn navigation concept sketch 2 — showing Live and Discover in the top navigation alongside Latest, Premium, Profile tabs",
          caption: "Navigation sketch 2",
          dims: { w: 2500, h: 3333 },
        },
        {
          src: "/work/guardian/concepts.png",
          alt: "Hand-drawn navigation concept sketch 3 — horizontal section tabs with News, Opinions, Sports, Culture and sub-navigation below",
          caption: "Navigation sketch 3",
          dims: { w: 2500, h: 3333 },
        },
      ],
    },

    // ─── Usability Testing ───────────────────────────────────────────────────
    {
      type: "figures",
      label: "Usability Testing",
      heading: "Testing which concept best balanced user needs and business goals",
      body: [
        "I partnered with a User Researcher to develop a testing guide. Participants evaluated the wireframes using the scoring system, revealing which navigation concept best balanced user needs and business goals.",
      ],
      figures: [
        {
          src: "/work/guardian/wireframe-1.png",
          alt: "First wireframe navigation concept tested with participants",
          caption: "Wireframe tested with participants",
          dims: { w: 367, h: 650 },
        },
        {
          src: "/work/guardian/wireframe-2.png",
          alt: "Second wireframe navigation concept tested with participants",
          caption: "Wireframe tested with participants",
          dims: { w: 367, h: 650 },
        },
        {
          src: "/work/guardian/wireframe-3.png",
          alt: "Third wireframe navigation concept tested with participants",
          caption: "Wireframe tested with participants",
          dims: { w: 367, h: 650 },
        },
      ],
    },

    // ─── Playback & Alignment ────────────────────────────────────────────────
    {
      type: "prose",
      label: "Playback & Alignment",
      heading: "Using data to secure team alignment",
      body: [
        "'Navigation Concept 2' scored highest in user testing but initially faced team disagreement as the team did not view all of the user tests. I presented the scoring system and user feedback, clarifying the data and securing team alignment around a single concept.",
      ],
    },

    // ─── Platform Parity ─────────────────────────────────────────────────────
    {
      type: "prose",
      label: "Platform Parity",
      heading: "A consistent experience across iOS and Android",
      body: [
        "With the team aligned on 'Navigation Concept 2' I worked with the team to design a consistent experience across iOS and Android while respecting platform guidelines (Material Design & Human Interface Guidelines). We reviewed journeys and feature handling to ensure usability and coherence across both platforms.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/guardian/platform-ios.png",
          alt: "Guardian app navigation designs applied to iOS following Human Interface Guidelines",
          caption: "iOS — Human Interface Guidelines",
          dims: { w: 714, h: 511 },
        },
        {
          src: "/work/guardian/platform-android.png",
          alt: "Guardian app navigation designs applied to Android following Material Design guidelines",
          caption: "Android — Material Design",
          dims: { w: 714, h: 511 },
        },
      ],
    },

    // ─── UI Design ───────────────────────────────────────────────────────────
    {
      type: "prose",
      label: "UI Design",
      heading: "Applying The Guardian's design system",
      body: [
        "Competitive analysis highlighted standard bottom navigation patterns, such as home on the left and utility on the right.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/guardian/competitor-1.jpg",
          alt: "Competitor app bottom navigation pattern — standard left-to-right tab layout",
          caption: "Competitor navigation pattern",
          dims: { w: 1080, h: 607 },
        },
        {
          src: "/work/guardian/competitor-2.jpg",
          alt: "Second competitor app bottom navigation pattern for comparative analysis",
          caption: "Competitor navigation pattern",
          dims: { w: 1080, h: 607 },
        },
      ],
    },
    {
      type: "prose",
      body: [
        "I applied The Guardian's design system for colours, typography and interactions to create an aesthetically consistent and intuitive navigation.",
        "All elements were integrated into the final UI design, ensuring clarity, accessibility, and premium feature visibility.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/guardian/design-system-colour.png",
          alt: "Guardian design system colour palette across News, Opinion, Sport, Culture and Lifestyle sections",
          caption: "Guardian design system — colour palette",
          width: "wide",
          dims: { w: 1324, h: 541 },
        },
        {
          src: "/work/guardian/design-system-type.png",
          alt: "Guardian Titlepiece typeface specimen showing the editorial typography",
          caption: "Guardian design system — typography",
          dims: { w: 555, h: 260 },
        },
      ],
    },

    // ─── Delivery ────────────────────────────────────────────────────────────
    {
      type: "list",
      label: "Delivery",
      heading: "Defining success metrics with PMs and the Data team",
      body: [
        "I collaborated with engineers to finalise usability and platform parity, updated the design system, and worked with PMs and the Data team to define success metrics, including:",
      ],
      items: [
        "Screen depth while reading articles",
        "Cross-section exploration",
        "Premium App sign-ups",
        "Premium feature usage",
        "Churn",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/guardian/final-ui-1.png",
          alt: "Final delivered Guardian app navigation — Live premium feature screen",
          caption: "Final UI design",
          dims: { w: 373, h: 742 },
        },
        {
          src: "/work/guardian/final-ui-2.png",
          alt: "Final delivered Guardian app navigation — Discover premium feature screen",
          caption: "Final delivered Guardian app navigation",
          dims: { w: 375, h: 742 },
        },
      ],
    },

    // ─── Outcome ─────────────────────────────────────────────────────────────
    {
      type: "metrics",
      label: "Outcome",
      heading: "Month 2 post-launch metrics",
      metrics: [
        { value: "17%", caption: "Click rate for premium features", direction: "up" },
        { value: "4%", caption: "Increase in subscriptions", direction: "up" },
      ],
    },
  ],

  reflection: {
    heading: "Data-driven decision-making at the heart of it",
    body: [
      "Aligning stakeholders early, testing concepts with users, and using data-driven decision-making enabled a navigation redesign that directly drove measurable growth in Premium adoption.",
    ],
  },
};
