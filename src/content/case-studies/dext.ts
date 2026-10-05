import type { CaseStudy } from "../types";

export const dext: CaseStudy = {
  slug: "dext",
  index: "01",
  shortTitle: "Dext",
  title: "Dext MTD IT Dashboard — Product Design Leadership",
  pageHeading: "Dext MTD Dashboard: Designing for the Biggest Change in UK Tax Compliance",
  subtitle:
    "Leading the end-to-end design of a new practice-level Making Tax Digital dashboard within Dext Solo.",
  role: "Senior Product Designer",
  period: "4 months",
  tags: ["Product & Systems Thinking", "Cross-Functional Leadership"],
  heroMetrics: [
    { value: "65%", caption: "First-month adoption among existing Dext Solo users" },
    { value: "42,153", caption: "Clients managed through the dashboard" },
    { value: "4", caption: "Quarterly submissions per client" },
  ],
  cover: {
    src: "/work/dext/hmrc-hero.webp",
    alt: "HMRC 'Making Tax Digital for Income Tax — one year to go' campaign image, showing a professional working at a laptop",
    caption: "The countdown that reframed the work — a fixed deadline every UK accounting practice could feel coming.",
    width: "full",
    dims: { w: 960, h: 640 },
    priority: true,
  },
  blocks: [
    {
      type: "prose",
      label: "Overview",
      body: [
        "Making Tax Digital for Income Tax (MTD IT) represents one of the biggest changes to UK personal tax compliance in decades. It would change how sole traders and landlords keep records and report to HMRC. For accountants, it would turn one annual submission per client into four quarterly submissions per client.",
        "For accountants and practices with hundreds or even thousands of clients, they needed to action at-risk clients and confidently prioritise their workload to take the right next step.",
      ],
    },
    {
      type: "list",
      label: "Challenges",
      style: "bullet",
      items: [
        "The increase in submissions brought new and multiplying sources of risk.",
        "We were solving a problem users had not experienced.",
        "I was designing to a strict product release deadline driven by the governmental policy.",
        "We were designing an addition to an existing platform, which meant adhering to platform constraints.",
      ],
    },
    {
      type: "prose",
      label: "Product strategy",
      body: [
        "From early conversations I had with the Product Manager, it became apparent that the initial release's primary commercial objective would be to increase Net Revenue Retention of Dext customers, making Dext Solo existing accountants’ preferred MTD compliance solution.",
      ],
    },
    {
      type: "reframe",
      label: "The reframe",
      from: {
        label: "Instead of asking",
        body: "How can we help accountants submit quarterly tax returns?",
      },
      to: {
        label: "We asked",
        body: "How do we help practices see their workload, spot clients at risk, and decide what to tackle next?",
      },
    },
    {
      type: "prose",
      body: [
        "The slight reframing realigned the direction of the project. We focused on helping practices understand their overall compliance position across all clients, and direct them on what to do next rather than optimising individual submission tasks. This would enable them to identify risks earlier and confidently prioritise work across their client portfolio.",
      ],
    },
    {
      type: "prose",
      label: "Learning from the market",
      heading: "I did a competitive analysis to discover opportunities.",
      body: [
        "I analysed accounting platforms and compliance products to understand how similar problems were being solved. I used a combination of AI research and competitive analysis. Some of the competitors I reviewed were Xero, FreeAgent, and QuickBooks. Outside of direct competitors, I also reviewed broader dashboard SaaS product patterns.",
        "I noticed that none of the competitors quickly informed users of how much was in their workload. My concern was that if an accountant could not estimate their workload, they would end up in a situation where they would not complete their work by the quarterly deadline or, even worse, rush and submit it with errors. I used this finding to explore the information hierarchy.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/dext/competitor.webp",
          alt: "Competitive landscape mapping — Xero, QuickBooks, FreeAgent and enterprise SaaS dashboard patterns analysed side by side",
          caption: "The competitive landscape — extensive reporting capability across every platform, but information density that made compliance risk invisible at a glance.",
          width: "full",
          dims: { w: 2326, h: 1060 },
        },
      ],
    },
    {
      type: "cards",
      label: "Design Principle",
      heading: "Our dashboard needed to answer three questions.",
      numbered: true,
      body: [
        "Our goal became helping accountants answer three simple questions within seconds instead of displaying as much information as possible.",
      ],
      cards: [
        { title: "How many clients require attention?", body: "" },
        { title: "Which clients are most at risk?", body: "" },
        { title: "What should accountants do next?", body: "" },
      ],
    },
    {
      type: "prose",
      body: [
        "Throughout the project, reducing cognitive load became a guiding principle, ensuring every component earned its place without contributing to increased complexity and slower decision-making.",
      ],
    },
    {
      type: "prose",
      label: "Cross-functional alignment",
      heading: "Building shared ownership",
      body: [
        "With the goal and overall direction agreed, I facilitated a workshop to create a shared understanding of the problem space. I brought together the cross-functional team of Product, Engineering and domain experts before moving into design.",
      ],
    },
    {
      type: "list",
      style: "bullet",
      body: ["We focused on questions like"],
      items: [
        "What does success look like for accounting practices managing hundreds or thousands of clients?",
        "Where are users most likely to make mistakes?",
      ],
    },
    {
      type: "prose",
      body: ["From this, the team had a shared understanding of success."],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/dext/workshop.webp",
          alt: "FigJam cross-functional discovery workshop board showing sticky notes, participant names and star-voting placements across problem areas",
          caption:
            "Cross-functional discovery workshop used to align stakeholders on the highest-impact operational problems before defining the MVP.",
          width: "full",
          dims: { w: 2500, h: 1354 },
        },
      ],
    },
    {
      type: "prose",
      label: "Defining the experience",
      heading: "Understanding the mental model of accountants",
      body: [
        "Before jumping into designing interfaces, I wanted to understand how accountants think, not just what they do, especially when viewing hundreds of clients. By understanding this and incorporating it into the product, the dashboard would feel like an intuitive experience.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/dext/journeys.webp",
          alt: "Journey maps of the accountant's quarterly submission cycle, laid out as labelled steps",
          caption:
            "How accountants actually move — switching between the overall workload, the clients at risk, and the individual return.",
          width: "full",
          dims: { w: 1540, h: 770 },
        },
      ],
    },
    {
      type: "prose",
      label: "The insight",
      heading: "Accountants think about multiple client types at a time",
      body: [
        "Separate user interviews with accountants gave us insight into their workflow. Accountants switch between reviewing their workload, identifying high-risk clients and drilling into individual cases that constantly require attention. The dashboard needed to support all of these switches in workflow without unnecessary complexity.",
      ],
    },
    {
      type: "prose",
      label: "User flow",
      heading: "Exploring the overdue client flow",
      body: [
        "The next thing to do was explore user flows. Understanding the accountant's mental model helped me view the product from their perspective. The flow that I wanted to explore the most was the overdue client flow, as this was the flow that would be the highest risk and easiest to make human errors on.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/dext/quarterly-submission-user-flow.webp",
          alt: "Accountant and bookkeeper user flow from identifying an overdue client obligation in the Dext MTD dashboard through review and submission.",
          caption:
            "Exploring how an accountant identifies an overdue obligation, reviews the client’s records and completes the submission.",
          width: "bleed",
          dims: { w: 2172, h: 724 },
          mobileScroll: true,
          sizes: "(min-width: 1024px) 82rem, (min-width: 640px) 100vw, 64rem",
        },
      ],
    },
    {
      type: "prose",
      label: "Wireframing",
      heading: "Turning strategy into MVP",
      body: [
        "The information hierarchy and customer journeys were now agreed upon, so I turned my attention to wireframes. This part of the process was not about polished designs but early concepts. I explored two ways of representing the task priority, how accountants could move through the product and how information could support quick decision-making.",
        "Wireframing in low fidelity encouraged Product and Engineering to critique workflows rather than aesthetics, leading to better conversations around usability and behaviour.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/dext/wireframe-annotated.webp",
          alt: "Annotated MVP wireframe: the dashboard mapped to related screens, with open questions called out in the margins",
          caption: "The MVP mapped — every open question surfaced before a pixel was polished.",
          width: "full",
          dims: { w: 2500, h: 1328 },
        },
      ],
    },
    {
      type: "prose",
      label: "Designing with engineering",
      heading: "Better decisions through constraints",
      body: [
        "As the MTD Dashboard was an addition to the Dext Solo product, designs had to adhere to the technical constraints of Dext Solo. This meant that a close working relationship between Design and Engineering was critical to succeed.",
        "Engineering informed me of the dependency cost of the Q1–Q4 quarter indicators, so together we chose to go with the badges. This way we retained the user benefit and avoided the extra implementation cost.",
        "Another section of the design where this was important was the nested-row interaction patterns. Building them would significantly increase development time and delay delivery. We discussed which interaction patterns genuinely reduced cognitive effort and deserved investment and which added complexity without improving decision-making.",
        "Through these conversations, engineering changed from reviewers to design partners.",
      ],
    },
    {
      type: "figures",
      layout: "compare",
      figures: [
        {
          src: "/work/dext/nested-progress.webp",
          alt: "Client table with nested income-source rows under each client and Q1–Q4 quarter indicators per row, coloured by status",
          caption: "Nested client rows with Q1–Q4 quarter indicators",
          dims: { w: 2170, h: 640 },
        },
        {
          src: "/work/dext/tags.webp",
          alt: "Flat client table with one row per quarter and a single submission status badge — Submitted, Overdue or Not Due",
          caption: "One row per quarter with a submission status badge",
          dims: { w: 2172, h: 724 },
        },
      ],
    },
    {
      type: "prose",
      label: "Releases on time versus experience",
      heading: "Deprioritising data tiles",
      body: [
        "One of the biggest challenges in this project was ensuring that the experience was always considered. It was my responsibility to advocate for it in the prioritisation of the scope and release. This became crucial when discussing the data tiles at the top of the MTD Dashboard design. I designed them to help accountants with a quick overview of their work and an indication of what to action. The engineers and Product Manager wanted to drop them from the design as they believed it would take too much effort to build and could potentially delay the release.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/dext/data-tiles.webp",
          alt: "MTD for IT data tiles: Overdue Submissions 6, Submitted 39/109, Due 64/109 and Next Due Date 07 Aug 26, above All, Overdue, Submitted and Due filters and a tax-year selector",
          width: "bleed",
          dims: { w: 2171, h: 514 },
          sizes: "(min-width: 1024px) 82rem, 100vw",
        },
      ],
    },
    {
      type: "prose",
      label: "Validating assumptions",
      heading: "User testing with accountants",
      body: [
        "As users had not yet tangibly experienced the effect of MTD on their workload, validating assumptions with real users was even more important. It would also give me a chance to validate the importance of the data tiles in the design. I organised remote guerrilla tests with 6 accountants. In each of the six user tests, I presented both prototypes I had quickly spun up with Claude Code: one with the data tiles and one without. The user tests allowed us to understand how accountants interpreted the dashboard and whether the information hierarchy supported their natural workflows. It also allowed me to prove the importance of the data tiles.",
      ],
    },
    {
      type: "figures",
      layout: "compare",
      figures: [
        {
          src: "/work/dext/prototype-data-tiles.webp",
          alt: "Test prototype of the MTD for IT dashboard with four data tiles — overdue, submitted, due and next due date — above the client submissions table",
          caption: "Prototype A: with data tiles",
          dims: { w: 1728, h: 910 },
        },
        {
          src: "/work/dext/prototype-no-data-tiles.webp",
          alt: "Test prototype of the MTD for IT dashboard without data tiles — the status filters sit directly above the client submissions table",
          caption: "Prototype B: without data tiles",
          dims: { w: 1921, h: 819 },
        },
      ],
    },
    {
      type: "cards",
      label: "What we learned",
      heading: "Four themes appeared in every session",
      cards: [
        {
          title: "Accountants expected an overview first",
          body: "Participants instinctively searched for a high-level summary before individual client detail. When shown the dashboard without data tiles, all six participants asked for them. This provided direct evidence for the design decision that had faced the most internal debate.",
        },
        {
          title: "Users prioritised exceptions over completion",
          body: "Participants cared far more about identifying clients at risk than reviewing clients already progressing. This shifted us from progress reporting towards actionable exceptions.",
        },
        {
          title: "Simplicity increased confidence",
          body: "Participants decided faster and more confidently with fewer competing visual elements. This validated the choice to reduce density rather than add functionality.",
        },
        {
          title: "Evidence changed the conversation",
          body: "Up until this point, personal opinions had driven debates, but now they were grounded in observable behaviour, making prioritisation across Product, Engineering and Design easier.",
        },
      ],
    },
    {
      type: "prose",
      label: "Testing to Delivery",
      heading: "Compromises between immediate delivery and long-term quality product experience",
      body: [
        "Throughout the project, there was a continuous tension between meeting the HMRC deadline and releasing a product that could create experience and design debt, as well as wider usability problems, down the line. The business understandably wanted to release quickly, but I had to weigh up the cost to the experience.",
        "As a result of this the Product Manager wanted us to drop the data tiles even though they addressed a valid need for the user. In the user testing, participants instinctively reached for the compliance overview. I used the research evidence to advocate for a representation of task overview. Working with the developers and Product Manager, we came up with a design pattern that already existed in the code base and solved the user needs.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/dext/pie-indicator.webp",
          alt: "Compact overview bar: submission due date 07 Feb 2026, with ring indicators for Overdue 4/20, Due 10/20 and Submitted 6/20",
          width: "bleed",
          dims: { w: 2170, h: 206 },
          mobileScroll: true,
          sizes: "(min-width: 1024px) 82rem, (min-width: 640px) 100vw, 64rem",
        },
      ],
    },
    {
      type: "prose",
      label: "Two-version release",
      heading: "As a result of the user testing I also proposed a V1 and V2 approach.",
      body: [],
    },
    {
      type: "prose",
      label: "Version 1",
      heading: "Success was not releasing everything in V1",
      body: [
        "Version 1 was the smallest set of functionality that would help accountants and practices confidently adopt the new workflows. This would enable them to be HMRC compliant.",
      ],
    },
    {
      type: "prose",
      label: "Version 2",
      heading: "Long-term experience improvements",
      body: [
        "Version 2 was planned to introduce functionality that would improve the efficiency of completing tasks, for example, by having nested rows with the badges we would reduce cognitive load for the user making it easier to see what clients needed more attention.",
      ],
    },
    {
      type: "metrics",
      label: "Business impact",
      heading: "1st month adoption",
      body: [
        "The launch gave us the first chance to see how effective our design was. Accounting practices began using the dashboard to manage real MTD obligations at scale.",
      ],
      metrics: [
        { value: "65%", caption: "First-month adoption among existing Dext Solo users" },
        { value: "42,153", caption: "Clients managed through the dashboard" },
      ],
    },
    {
      type: "prose",
      body: [
        "Customer Success started using the Dext Solo MTD Dashboard to market the Dext product as a whole to accountants in webinars and incorporated it into their onboarding conversations, which helped firms understand how to manage quarterly compliance using Dext. It was also used in Sales demonstrations and presented at Accountex, evidencing that Dext was ready for the regulatory change ahead.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/dext/recognition-marketing.webp",
          alt: "Dext educational video thumbnail featuring the MTD IT Dashboard, presented by a Product Domain Expert — showing the dashboard's Overdue filter in use",
          caption: "The dashboard as a Customer Success resource — featured in a dedicated Dext educational video to help accounting practices understand and prepare for quarterly compliance.",
          width: "bleed",
          dims: { w: 2390, h: 1342 },
          sizes: "(min-width: 1024px) 82rem, 100vw",
        },
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/dext/recognition-slack.webp",
          alt: "Internal Slack #kudos thread in which a senior stakeholder describes Solo as the leading product on the market for handling quarterly updates, with @elvis.rimdap tagged among the team",
          caption: "A senior stakeholder described Solo as 'the leading product on the market for handling quarterly updates,' noting that partners were happy and clients continued to be added.",
          width: "bleed",
          dims: { w: 2116, h: 1322 },
          sizes: "(min-width: 1024px) 82rem, 100vw",
        },
      ],
    },
  ],
  interactiveSplitBefore: "Product strategy",
  chapters: [
    { id: "overview",   label: "Overview",   blockLabel: "Overview" },
    { id: "challenge",  label: "Challenges", blockLabel: "Challenges" },
    { id: "strategy",   label: "Strategy",   blockLabel: "Product strategy" },
    { id: "research",   label: "Research",   blockLabel: "Learning from the market" },
    { id: "design",     label: "Design",     blockLabel: "Defining the experience" },
    { id: "testing",    label: "Testing",    blockLabel: "Validating assumptions" },
    { id: "impact",     label: "Impact",     blockLabel: "Business impact" },
    { id: "reflection", label: "Reflection", blockLabel: "_reflection" },
  ],
  reflection: {
    heading: "Aligning people around the right problem is great product design",
    body: [
      "Success depended on combining user research, domain expertise, strategic thinking and close collaboration to anticipate problems before customers experienced them. Making Tax Digital made me think beyond interface design because the future workflow didn't yet exist. The thing within this piece of work that I am most proud of is using Design to create a shared understanding of the problem across Product, Engineering and the wider business.",
      "Three important learnings stand out from this project.",
      "1) Evidence transforms stakeholder conversations from subjective opinion into evidence-based decision-making.",
      "2) In products where error carries real consequences, prioritise error reduction over elegance.",
      "3) Alignment is often more valuable than speed.",
    ],
  },
};
