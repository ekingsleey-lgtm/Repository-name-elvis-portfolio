import type { CaseStudy } from "../types";

/**
 * KFC Rewards Arcade — Reward Sharing. A consumer growth / behavioural-design
 * story, told as a contrast to the Dext enterprise study: the signature visual
 * is the before/after behavioural journey, and Antavo / RAPP are handled in
 * concise editorial prose rather than a stakeholder diagram.
 *
 * All copy is Elvis's own, transcribed from KFC.md and only selected, resequenced
 * or lightly trimmed for pacing — never invented.
 */
export const kfc: CaseStudy = {
  slug: "kfc",
  index: "02",
  shortTitle: "KFC",
  title: "KFC App Growth — Driving Engagement Through Reward Sharing",
  pageHeading: "KFC Rewards: turning loyalty into a habit worth sharing",
  subtitle:
    "Designing Reward Sharing for the KFC Rewards Arcade — turning a transactional loyalty programme into a social one. KFC UK & Ireland.",
  role: "Senior Product Designer",
  period: "4 months",
  tags: ["Behavioural Design", "Habit Formation", "Technical Constraints"],
  heroComposition: "kfc-phones",
  cover: {
    src: "/work/kfc/hero-devices.png",
    alt: "Two iPhones on a warm backdrop showing the KFC app home and the Rewards Arcade, with reward sharing surfaced",
    caption: "KFC Rewards, reimagined as something worth passing on — the Arcade and its new sharing prompt.",
    width: "full",
    dims: { w: 2500, h: 1982 },
    priority: true,
  },
  heroMetrics: [
    { value: "+12%", caption: "Loyal customer engagement" },
    { value: "+6%", caption: "New customer sign-ups" },
    { value: "+7.5%", caption: "Reward click-through" },
  ],
  blocks: [
    {
      type: "prose",
      label: "Overview",
      heading: "Evolving loyalty beyond the transaction",
      body: [
        "KFC wanted to evolve its digital loyalty experience beyond traditional reward collection — creating stronger reasons for customers to regularly engage with the app.",
        "As part of the wider Rewards Arcade, customers could win prizes through a gamified experience. My responsibility was to design a Reward Sharing feature that extended the value of those rewards beyond individual redemption — letting customers share rewards with friends and family while encouraging new users to join the KFC Rewards programme.",
      ],
    },
    {
      type: "statement",
      label: "Behaviour, not feature",
      body: "Reward Sharing wasn't a feature. It was a new behaviour — turning a reward you won into a reason to bring someone else into KFC Rewards.",
    },
    {
      type: "prose",
      body: [
        "The challenge was much broader than designing a new screen. It meant balancing customer needs, business objectives and evolving technical capabilities while working across multiple teams and external partners — including the Antavo loyalty platform and RAPP, the agency behind the wider Rewards Arcade campaign.",
        "Rather than treating Reward Sharing as an isolated feature, we designed it as part of a connected loyalty experience — one that would deepen engagement among existing customers while building a direct route to new-customer acquisition.",
      ],
    },
    {
      type: "prose",
      label: "The challenge",
      heading: "Loyalty that gave customers little reason to share",
      body: [
        "Traditional loyalty programmes are highly transactional.",
        "Customers purchase food. They collect rewards. Eventually they redeem them.",
        "While that encourages repeat purchases, it creates relatively few opportunities for customers to actively promote the product to others.",
      ],
    },
    {
      type: "statement",
      label: "The question",
      body: "How might we transform loyalty from an individual experience into a social one — creating value for both existing and new customers?",
    },
    {
      type: "flow",
      label: "The behavioural shift",
      heading: "A transaction becomes a habit",
      before: {
        label: "Before · an individual transaction",
        steps: ["Purchase", "Collect reward", "Redeem reward"],
      },
      after: {
        label: "After · a social loop",
        steps: [
          "Purchase",
          "Win reward",
          "Share reward",
          "Friend joins KFC",
          "Both engage",
        ],
        highlightFrom: 2,
        loops: true,
      },
    },
    {
      type: "prose",
      label: "My role",
      heading: "Leading the design from discovery to delivery",
      body: [
        "As Senior Product Designer, I led Reward Sharing from discovery through to delivery — and the role extended well beyond interface design.",
        "I worked across cross-functional teams to understand customer needs, define product requirements, explore technical constraints and align stakeholders around a solution that could actually ship.",
      ],
    },
    {
      type: "comparison",
      label: "Three forces",
      heading: "Balancing three perspectives at once",
      body: [
        "Answering that question meant holding three perspectives in tension — none of which could win outright.",
      ],
      columns: ["Perspective", "What it demanded"],
      rows: [
        ["Customer needs", "Rewards that felt valuable, clear and simple to redeem"],
        ["Business goals", "More engagement — and new-customer acquisition"],
        ["Technical reality", "Working within the Antavo platform, and the timeline"],
      ],
    },
    {
      type: "prose",
      label: "The wider ecosystem",
      heading: "One feature, a connected loyalty system",
      body: [
        "Although Reward Sharing looked like a single feature, it was part of a much larger loyalty transformation — and delivering it meant working with two external partners as much as with internal teams.",
        "Antavo provided the platform powering reward management. Its capabilities set the core rules of the experience — reward ownership, one-time sharing, coupon logic and redemption — so understanding those constraints early was what kept the experience simple for customers while remaining technically achievable.",
        "RAPP led the wider Rewards Arcade campaign. Aligning Reward Sharing with that broader activity kept the customer journey consistent across KFC's digital ecosystem, even where it reached beyond the app.",
      ],
    },
    {
      type: "prose",
      label: "Discovery",
      heading: "A workshop to choose the right opportunity",
      body: [
        "Before exploring solutions, I facilitated a remote ideation workshop with the Product Owner, Product Manager, Engineers, Designers and the Commercial Revenue team. The goal wasn't to generate as many ideas as possible — it was to align everyone on opportunities that could grow engagement while supporting KFC's wider business objectives.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/kfc/workshop.jpg",
          alt: "Remote ideation board with two clusters — ideas that could grow engagement, and considerations against feasibility",
          caption:
            "The ideation workshop — weighing opportunities against customer value, feasibility and business impact.",
          width: "full",
          dims: { w: 2500, h: 1185 },
        },
      ],
    },
    {
      type: "list",
      style: "bullet",
      body: ["We weighed three directions against customer value, technical feasibility and business impact:"],
      items: [
        "Reward Sharing",
        "Increasing visibility of the Rewards Arcade across other KFC touchpoints",
        "Promoting the free sign-up reward more prominently",
      ],
    },
    {
      type: "prose",
      body: [
        "Reward Sharing emerged as the strongest opportunity: it created value for existing customers while encouraging new ones to join the programme — and it gave the wider team confidence in the direction before we moved into detailed design.",
      ],
    },
    {
      type: "prose",
      label: "Competitive research",
      heading: "Reward sharing was rare in quick-service",
      body: [
        "With a direction chosen, I researched how other loyalty programmes approached sharing and engagement, reviewing products including Costa Coffee and McDonald's.",
        "Sharing existed in some programmes but remained uncommon across the quick-service sector. That reinforced the opportunity — KFC could build a more socially driven loyalty experience — and because the pattern already existed elsewhere, customers would likely understand it immediately. The findings also grounded early conversations with Product and Engineering, surfacing common interaction patterns and helping estimate implementation complexity.",
      ],
    },
    {
      type: "cards",
      label: "Defining success",
      heading: "Five requirements that defined “done”",
      numbered: true,
      body: [
        "Working with the Product Owner, I set acceptance criteria that gave Product, Engineering and Design a shared definition of success — balancing a simple customer experience, KFC's growth goals, and what the Antavo platform could actually support.",
      ],
      cards: [
        {
          title: "Personalised rewards",
          body: "Customers should immediately understand what reward they'd received, why, and whether it could be shared.",
        },
        {
          title: "One-time sharing",
          body: "A reward could be gifted only once — protecting the integrity of the programme while keeping the rules easy to understand.",
        },
        {
          title: "Rewards Arcade integration",
          body: "Sharing had to feel like a natural continuation of the Rewards Arcade, not a bolt-on.",
        },
        {
          title: "Expiry reminders",
          body: "Timely reminders before a reward expired, nudging redemption and reducing missed rewards.",
        },
        {
          title: "New customer registration",
          body: "Recipients who weren't yet members were guided through sign-up before claiming — turning a shared reward into an acquisition moment.",
        },
      ],
    },
    {
      type: "prose",
      label: "Mapping the experience",
      heading: "Designing the flows before the screens",
      body: [
        "Once the requirements were agreed, I mapped the complete Reward Sharing experience — not to document screens, but to give Product, Engineering and Design a shared artefact for exploring feasibility and edge cases before development began.",
        "The flows covered four scenarios — sharing a won reward, sharing an existing one, and receiving a reward as either an existing member or a brand-new customer — alongside the system rules for ownership, coupon logic, expiry and error states.",
      ],
    },
    {
      type: "prose",
      body: [
        "As Engineering investigated the Antavo platform, these flows evolved with them — a shared tool that reduced implementation risk rather than a hand-off.",
      ],
    },
    {
      type: "prose",
      label: "Wireframes",
      heading: "Resolving structure before detail",
      body: [
        "From the flows, I moved into wireframing — not to produce final screens, but to explore how the experience could work before committing to visual design. Working closely with Product and Engineering, I tested different approaches for surfacing shareable rewards, guiding recipients through redemption, and introducing new customers to KFC Rewards.",
        "Because Engineering were involved throughout, technical constraints shaped decisions from the start. The wireframes became a shared discussion tool in design reviews — a way to evaluate ideas and gather feedback before any high-fidelity investment was made.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/kfc/wireframes-v2.png",
          alt: "Wireframe layouts showing early explorations of the reward sharing flow, from initial structure through to more defined interaction patterns",
          caption: "Wireframes — exploring how shareable rewards surfaced, how recipients were guided, and how new customers were introduced, before high-fidelity design began.",
          width: "full",
          dims: { w: 11282, h: 3898 },
        },
      ],
    },
    {
      type: "prose",
      label: "High-fidelity UI",
      heading: "New behaviour, familiar language",
      body: [
        "I translated the interaction model into high-fidelity designs using KFC's Design System. Customers already knew the app's visual language, so the work was extending it to support Reward Sharing while keeping everything consistent — making clear which rewards could be shared, who owned them, their sharing status, and the next step for existing and new customers alike.",
      ],
    },
    {
      type: "imageSequence",
      body: [
        "The behaviour reads as a single loop: win a reward, share it, a friend receives it — and from there they redeem it through the same reward screen every member already uses. No new pattern to learn on either side; the moment of winning simply becomes a reason to bring someone else in.",
      ],
      steps: [
        {
          label: "You've won",
          anchor: true,
          figure: {
            src: "/work/kfc/journey-won.png",
            alt: "The winning moment — a KFC reward won in the Arcade, with the option to share it",
            dims: { w: 519, h: 755 },
          },
        },
        {
          label: "Share the reward",
          figure: {
            src: "/work/kfc/Share the reward.jpg",
            alt: "The reward detail screen with a prominent option to share the reward with a friend",
            dims: { w: 828, h: 2058 },
          },
        },
        {
          label: "A friend receives it",
          figure: {
            src: "/work/kfc/A friend receives it.jpg",
            alt: "The recipient receiving the shared KFC reward",
            dims: { w: 828, h: 2320 },
          },
        },
        {
          label: "A friend has seen it",
          figure: {
            src: "/work/kfc/A friend see's it.jpg",
            alt: "The recipient viewing the shared reward in the KFC app",
            dims: { w: 828, h: 2320 },
          },
        },
      ],
    },
    {
      type: "prose",
      label: "Design system",
      heading: "Building for what comes next",
      body: [
        "As new functionality emerged, I identified opportunities to build reusable components rather than one-off solutions — personalised reward tags, status indicators, instructional banners and information cards — each designed so future loyalty features could inherit the same patterns rather than reinvent them.",
        "Designing at this level meant the project delivered value beyond its own release. By strengthening the foundations of KFC's design system, Reward Sharing made the next loyalty feature easier and faster to ship.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/kfc/design system 2.png",
          alt: "Reusable component designs showing the personalised reward tags, status indicators, instructional banners and information cards built for the KFC design system",
          caption: "Reusable components built for Reward Sharing — designed as scalable patterns for KFC's wider loyalty ecosystem.",
          width: "full",
          dims: { w: 1536, h: 1024 },
        },
      ],
    },
    {
      type: "prose",
      label: "Validation",
      heading: "Trusting the pattern over the copy",
      body: [
        "Before finalising the experience, I ran guerrilla usability testing — with particular focus on the instructional carousel explaining how the Rewards Arcade worked.",
        "Participants swiped straight through it, barely reading the supporting copy. The interface was already doing the explaining. So rather than adding more instruction, I removed it — letting the interaction patterns and visual hierarchy guide customers, and leaving a cleaner screen with less to process.",
      ],
    },
    {
      type: "statement",
      label: "The principle",
      body: "The testing reinforced a principle I come back to often: when the interface clearly communicates what to do next, adding more explanation usually adds more friction, not more understanding.",
    },
    {
      type: "prose",
      label: "Delivery",
      heading: "Design didn't stop at handoff",
      body: [
        "For me, delivery didn't begin when the designs were finished — it continued through implementation. I prepared the experience for development, organising the final Figma files, documenting interactions and getting the reusable components ready for Engineering.",
        "Then I stayed involved. Regular check-ins with developers let us clarify interaction behaviours, resolve questions quickly, validate technical decisions as the platform's capabilities evolved, and review builds against the intended design — keeping design quality intact and ownership shared rather than handed over.",
      ],
    },
    {
      type: "prose",
      label: "Measuring success",
      heading: "Impact across engagement and acquisition",
      body: [
        "Reward Sharing was designed to do two things at once: deepen engagement among existing customers and bring new ones into KFC Rewards. After launch, it moved both.",
      ],
    },
    {
      type: "metrics",
      label: "Month one",
      metrics: [
        { value: "+12%", caption: "Loyal customer engagement" },
        { value: "+6%", caption: "New KFC Rewards sign-ups" },
        { value: "+7.5%", caption: "Reward click-through" },
      ],
    },
    {
      type: "metrics",
      label: "Month two",
      metrics: [
        { value: "+10.5%", caption: "Loyal customer engagement" },
        { value: "+4.25%", caption: "New KFC Rewards sign-ups" },
        { value: "+5%", caption: "Reward click-through" },
      ],
    },
    {
      type: "prose",
      body: [
        "The gains held into a second month — pointing to a sustained behavioural change rather than a launch spike.",
        "Reward Sharing was only one part of the wider Rewards Arcade, but it contributed directly to KFC's broader goal: building longer-term customer relationships through digital engagement.",
      ],
    },
    {
      type: "prose",
      label: "What I learned",
      body: [
        "Reward Sharing reinforced that the quality of a solution depends on the quality of the alignment behind it. The experience was shaped as much by business objectives, platform capabilities and technical constraints as by user needs — and getting those to agree was the real work. Facilitating workshops, partnering with Engineering and understanding what partners like Antavo could support all shaped the final experience as much as the interface did.",
      ],
    },
  ],
  reflection: {
    heading: "The best outcomes came from alignment, not design alone",
    body: [
      "For me, the measure of success wasn't launching a feature. It was turning a transactional loyalty interaction into a more engaging, shareable one — strengthening KFC's digital ecosystem and supporting longer-term customer relationships.",
    ],
  },
  interactiveSplitBefore: "Measuring success",
};
