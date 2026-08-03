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
    { value: "65%", caption: "Adoption among existing users" },
    { value: "42,153", caption: "Clients managed through the dashboard" },
    { value: "4", caption: "Quarterly submissions per client" },
  ],
  cover: {
    src: "/work/dext/hmrc-hero.jpg",
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
      heading: "Helping accountants prepare for a future they hadn't yet experienced",
      body: [
        "Making Tax Digital for Income Tax (MTD IT) represents one of the biggest changes to UK personal tax compliance in decades. Instead of submitting tax information annually, accountants would soon be required to file quarterly returns, increasing the volume of submissions by up to four times for every client they managed.",
        "For accounting practices responsible for hundreds — or even thousands — of clients, this wasn't simply a regulatory update. It fundamentally changed how work would be prioritised, monitored and delivered throughout the year.",
      ],
    },
    {
      type: "statement",
      label: "The challenge",
      body: "We weren't solving a problem users had already experienced — we were designing for behaviours they understood conceptually but hadn't yet developed in practice.",
    },
    {
      type: "cards",
      label: "Three constraints",
      heading: "Solving tomorrow's problems with today's information",
      numbered: true,
      body: [
        "Designing the dashboard was only half the challenge. The more difficult task was helping multiple teams align around a problem that customers themselves had not yet fully experienced.",
        "Three constraints shaped almost every decision we made.",
      ],
      cards: [
        {
          title: "Designing for future behaviour",
          body: "Although accountants understood that quarterly submissions were coming, very few had experienced what managing hundreds of quarterly compliance tasks would actually feel like. Traditional user research could only take us so far. We needed to combine customer insight, domain expertise and informed product judgement to anticipate where future operational pain would emerge before users could clearly articulate it themselves.",
        },
        {
          title: "Balancing regulatory deadlines with customer experience",
          body: "The HMRC implementation date was fixed. Product understandably prioritised shipping a compliant solution before legislation came into effect, while Design wanted to ensure the experience genuinely reduced operational effort for accountants. Rather than treating these as competing objectives, we identified where early compromises were acceptable and where protecting the long-term experience would ultimately drive stronger adoption.",
        },
        {
          title: "Working within an evolving platform",
          body: "Dext Solo was an established platform already used by thousands of accounting practices. Introducing entirely new interaction patterns carried technical and maintenance costs, making close collaboration with Engineering essential. Rather than designing idealised solutions in isolation, I wanted technical feasibility to influence design decisions from the earliest stages.",
        },
      ],
    },
    {
      type: "prose",
      label: "Product strategy",
      heading: "Reducing the cost of compliance",
      body: [
        "Early conversations with the Product Manager revealed an important shift in perspective. The project's primary commercial objective was increasing Net Revenue Retention — encouraging existing accounting practices to adopt Dext Solo as their preferred solution for Making Tax Digital compliance.",
      ],
    },
    {
      type: "reframe",
      label: "The reframe",
      from: {
        label: "Instead of asking",
        body: "How do we help accountants submit quarterly tax returns?",
      },
      to: {
        label: "We asked",
        body: "How might we reduce the ongoing operational effort of managing quarterly compliance across hundreds of clients?",
      },
    },
    {
      type: "prose",
      body: [
        "This subtle shift changed the direction of the project. Rather than optimising individual submission tasks, we focused on helping practices understand their overall compliance position, identify risks earlier and confidently prioritise work across their client portfolio.",
      ],
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
      label: "Framing the problem",
      heading: "Aligning stakeholders before designing solutions",
      body: [
        "Before opening Figma, I wanted the team to agree on the problem we were solving.",
        "Working closely with the Product Manager, I mapped delivery risks, identified technical dependencies and explored where uncertainty existed across Product, Engineering and the wider business.",
      ],
    },
    {
      type: "list",
      style: "bullet",
      body: ["Together we explored questions such as:"],
      items: [
        "Which assumptions represented the greatest delivery risk?",
        "Which decisions required early certainty?",
        "Which areas could safely evolve after launch?",
        "How would the HMRC deadline influence prioritisation?",
      ],
    },
    {
      type: "prose",
      body: [
        "Making these trade-offs visible early helped Product make more informed roadmap decisions while giving Engineering greater confidence when estimating feasibility.",
        "One of our earliest conversations wasn't about interface design — it was about where the new dashboard should live within Dext Solo. Resolving these questions before detailed design work began ensured the dashboard became an integrated part of the platform rather than a standalone feature.",
      ],
    },
    {
      type: "prose",
      label: "Learning from the market",
      heading: "Identifying opportunities through competitive research",
      body: [
        "Before exploring solutions, I analysed existing accounting platforms and compliance products to understand how similar problems were being solved. Using a combination of traditional competitor analysis and AI-assisted research, I reviewed products including Xero, QuickBooks and FreeAgent, alongside broader dashboard patterns used within enterprise SaaS products.",
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
      type: "prose",
      body: [
        "While competitors offered extensive reporting capabilities, many relied on information-dense interfaces that required significant effort to interpret. Large tables, multiple filters and complex navigation made it difficult for users to quickly understand where their attention was needed.",
      ],
    },
    {
      type: "cards",
      label: "Design principle",
      heading: "The dashboard only needed to answer three questions",
      numbered: true,
      body: [
        "Rather than replicating these patterns, we chose a different direction. Instead of displaying as much information as possible, our goal became helping accountants answer three simple questions within seconds:",
      ],
      cards: [
        { title: "How many clients require attention?", body: "" },
        { title: "Which clients are most at risk?", body: "" },
        { title: "What should I do next?", body: "" },
      ],
    },
    {
      type: "prose",
      body: [
        "Reducing cognitive load became a guiding principle throughout the project, ensuring every component contributed to faster decision-making rather than increasing complexity.",
      ],
    },
    {
      type: "prose",
      label: "Cross-functional alignment",
      heading: "Building shared ownership from the beginning",
      body: [
        "With the overall direction agreed, I facilitated a workshop bringing together Product, Engineering and domain experts to create a shared understanding of the problem before moving into design.",
      ],
    },
    {
      type: "comparison",
      columns: ["Team", "Optimised for"],
      rows: [
        ["Product", "Deadlines, roadmap & scope"],
        ["Engineering", "Feasibility & maintainability"],
        ["Domain experts", "Workflows & HMRC rules"],
        ["Design", "Cognitive load & usability"],
      ],
    },
    {
      type: "list",
      style: "bullet",
      body: ["Rather than reviewing interface ideas, we focused on four key questions:"],
      items: [
        "What does success look like for accounting practices managing hundreds of clients?",
        "Where are users most likely to make mistakes?",
        "Which problems must Version 1 solve?",
        "Which improvements could safely wait until future releases?",
      ],
    },
    {
      type: "prose",
      body: [
        "The outcome was a shared definition of success that guided every major decision throughout the project.",
      ],
    },
    {
      type: "prose",
      label: "Defining the experience",
      heading: "Understanding how accountants think, not just what they do",
      body: [
        "Rather than jumping straight into interface design, I wanted to understand the mental models accountants would use when reviewing large numbers of clients. If we could mirror those thought processes within the product, the dashboard would feel intuitive from the first interaction.",
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
      type: "statement",
      label: "The insight",
      body: "Accountants rarely think about one client at a time.",
    },
    {
      type: "prose",
      body: [
        "Instead, they continuously switch between reviewing their overall workload, identifying high-risk clients and drilling into individual cases that require attention. The dashboard needed to support movement between summary and detail without overwhelming users with unnecessary complexity.",
      ],
    },
    {
      type: "prose",
      label: "Wireframing",
      heading: "Translating strategy into an MVP",
      body: [
        "With the customer journeys and information hierarchy agreed, I began translating the product strategy into early wireframes. Rather than focusing on visual polish, these concepts explored how accountants would move through the experience and how information could be prioritised to support quick decision-making.",
      ],
    },
    {
      type: "imagePair",
      bleed: true,
      body: [
        "Working in low fidelity let the team iterate quickly without becoming attached to specific interface solutions. More importantly, it encouraged Product and Engineering to critique workflows rather than aesthetics, leading to richer conversations around behaviour and usability.",
      ],
      primary: {
        src: "/work/dext/wireframe-annotated.webp",
        alt: "Annotated MVP wireframe: the dashboard mapped to related screens, with open questions called out in the margins",
        caption: "The MVP mapped — every open question surfaced before a pixel was polished.",
        width: "wide",
        dims: { w: 2500, h: 1328 },
      },
      secondary: {
        src: "/work/dext/dashboard-final.webp",
        alt: "The shipped Dext MTD for IT dashboard: overdue, submitted and next-due summary above a client submission table",
        caption: "…and shipped — the same structure, resolved.",
        width: "wide",
        dims: { w: 1440, h: 758 },
      },
    },
    {
      type: "prose",
      label: "Designing with engineering",
      heading: "Turning constraints into better decisions",
      body: [
        "One of the strongest aspects of this project was the close partnership between Design and Engineering. Rather than presenting finished designs for implementation, I involved engineers throughout the process so technical considerations could influence decisions before significant time had been invested.",
        "Early discussions highlighted that nested filtering and more advanced interaction patterns would significantly increase implementation complexity and potentially delay delivery. Instead of immediately removing those ideas, we worked together to understand the customer value behind each interaction — some genuinely reduced cognitive effort and deserved investment; others added complexity without improving decision-making.",
      ],
    },
    {
      type: "statement",
      label: "Shared ownership",
      body: "These conversations transformed Engineering from reviewers into design partners.",
    },
    {
      type: "prose",
      label: "Validating assumptions",
      heading: "Testing with accountants",
      body: [
        "Because Making Tax Digital had not yet been fully implemented, validating our assumptions with real users became even more important. I organised remote guerrilla usability sessions with six accountants, using interactive prototypes to understand how they interpreted the dashboard and whether the information hierarchy supported their natural workflows.",
      ],
    },
    {
      type: "cards",
      label: "What we learned",
      heading: "Four themes appeared in every session",
      cards: [
        {
          title: "Accountants expected an overview first",
          body: "Every participant instinctively searched for a high-level summary before individual client detail. In sessions where the dashboard was shown without summary tiles, every participant asked for them — providing direct evidence for the design decision that had faced the most internal debate.",
        },
        {
          title: "Users prioritised exceptions over completion",
          body: "Participants cared far more about identifying clients at risk than reviewing those already progressing — shifting us from progress reporting towards actionable exceptions.",
        },
        {
          title: "Simplicity increased confidence",
          body: "With fewer competing visual elements, participants decided faster and more confidently — validating our choice to reduce density rather than add functionality.",
        },
        {
          title: "Evidence changed the conversation",
          body: "Debates that had relied on personal opinion became grounded in observable behaviour, making prioritisation across Product and Engineering markedly easier.",
        },
      ],
    },
    {
      type: "prose",
      label: "From testing to delivery",
      heading: "Balancing immediate delivery with long-term product quality",
      body: [
        "One tension now dominated: the business needed a compliant solution ahead of the fixed HMRC deadline, but we wanted to avoid shipping an experience that solved today's regulatory requirement while creating tomorrow's usability problems.",
      ],
    },
    {
      type: "statement",
      label: "Version 1",
      body: "Success wasn't about delivering every idea in Version 1 — it was the smallest set of functionality that would help practices confidently adopt the new workflow.",
    },
    {
      type: "list",
      style: "bullet",
      body: [
        "The testing evidence, not opinion, set the priorities. Working with the Product Manager and Engineering Lead, we weighed every feature against three questions:",
      ],
      items: [
        "Does this reduce operational effort for accountants?",
        "Is there evidence users genuinely need it?",
        "Can it realistically be delivered within our timeline?",
      ],
    },
    {
      type: "prose",
      body: [
        "The hardest trade-off concerned the summary tiles — the compliance overview every participant had instinctively reached for. Rather than cutting them when the timeline tightened, I used the research evidence to advocate for staged delivery: core client list in Version 1, with summary tiles committed as Version 2's first priority. Observable user behaviour, not opinion, became the deciding factor.",
      ],
    },
    {
      type: "metrics",
      label: "Business impact",
      heading: "Creating value beyond the design team",
      body: [
        "More than 42,153 client records were managed through the dashboard, helping practices prepare for Making Tax Digital at scale.",
      ],
      metrics: [
        { value: "47%", caption: "Usage across eligible partner practices" },
        { value: "65%", caption: "Adoption among existing users" },
      ],
    },
    {
      type: "prose",
      body: [
        "The feature became a key talking point in product demonstrations, including at Accountex, where Sales used it to showcase Dext's readiness for upcoming regulatory change. Customer Success incorporated it into onboarding conversations and educational webinars, helping firms understand how Dext could simplify quarterly compliance.",
      ],
    },
    {
      type: "imagePair",
      label: "Recognition",
      scale: "quiet",
      bleed: true,
      noBorder: true,
      primary: {
        src: "/work/dext/recognition-slack.webp",
        alt: "Internal Slack #kudos thread praising the Solo team for delivering the MTD work, with dozens of reactions",
        caption: "Partners noticed — internal recognition for the team behind the dashboard.",
        width: "wide",
        dims: { w: 2106, h: 1320 },
      },
      secondary: {
        src: "/work/dext/recognition-marketing.webp",
        alt: "Dext marketing video thumbnail featuring the MTD IT Dashboard as a headline capability",
        caption: "…and it left the product — the dashboard became a marketed feature.",
        width: "wide",
        dims: { w: 2371, h: 1329 },
      },
    },
    {
      type: "prose",
      label: "Collaboration",
      heading: "Designing through influence rather than ownership",
      body: [
        "Looking back, one of the aspects I'm most proud of wasn't the interface itself. It was the way Design became a facilitator for better decision-making across the team.",
        "By involving stakeholders early, facilitating workshops and grounding conversations in customer evidence, decisions became faster, priorities clearer and trade-offs easier to navigate — even against evolving requirements and a fixed regulatory deadline.",
      ],
    },
  ],
  interactiveSplitBefore: "Business impact",
  reflection: {
    heading: "Great product design aligns people around the right problem",
    body: [
      "Making Tax Digital challenged me to think beyond interface design. Because the future workflow didn't yet exist, success depended on combining user research, domain expertise, strategic thinking and close collaboration to anticipate problems before customers experienced them.",
      "Three lessons stayed with me: alignment is often more valuable than speed; evidence transforms stakeholder conversations from subjective opinion into evidence-based decision-making; and in products where error carries real consequences, prioritise error reduction over elegance.",
      "Great product design isn't measured by the number of screens produced. It's measured by how effectively it helps teams make better decisions and enables customers to achieve their goals with confidence.",
    ],
  },
};
