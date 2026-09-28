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
    "Designing Reward Sharing for the KFC Rewards Arcade, so customers could pass on a prize they had won and introduce someone else to KFC Rewards. KFC UK & Ireland.",
  role: "Senior Product Designer",
  period: "4 months",
  tags: ["Behavioural Design", "Habit Formation", "Technical Constraints"],
  thumbnail: {
    src: "/work/kfc/kfc-hero.jpg",
    alt: "KFC Rewards Arcade campaign — neon arcade key art with KFC Rewards branding",
    dims: { w: 1900, h: 725 },
  },
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
        "Data showed that KFC customers weren't using rewards often, indicating they needed more reasons to return to the app and use the rewards programme. The new Rewards Arcade gave them a chance to win prizes. My part of the process was the reward functionality and presentation from when a customer won a new reward. I explored how letting a customer gift a reward to a friend or family member could help KFC reach its goal.",
      ],
    },
    {
      type: "prose",
      label: "The challenge",
      heading: "Loyalty that gave customers few reasons to return",
      body: [
        "Most loyalty journeys end with the person who earned the reward. They buy something, collect a reward and redeem it later.",
        "KFC wanted to increase engagement among existing customers and bring new people into the programme.",
      ],
    },
    {
      type: "list",
      heading: "One feature, a connected loyalty system",
      style: "bullet",
      items: [
        "Antavo powered reward management. Its rules affected whether a reward could be shared, who owned it afterward, how a coupon worked and how it would be redeemed. I worked through those constraints early so the journey we designed could actually be built.",
        "RAPP led the wider Rewards Arcade campaign. Reward Sharing needed to make sense alongside that work and feel consistent wherever a customer entered the journey, including outside the app.",
      ],
    },
    {
      type: "statement",
      label: "The question",
      body: "How might we give existing customers more reasons to return to KFC Rewards and encourage new customers to join?",
    },
    {
      type: "prose",
      label: "My role",
      heading: "Leading the design from discovery to delivery",
      body: [
        "I led the design of Reward Sharing from discovery through delivery. I worked with Product, Engineering, Commercial and our external partners to understand what customers needed, define the feature, test the experience and prepare it for release.",
      ],
    },
    {
      type: "comparison",
      label: "Three forces",
      heading: "Balancing three perspectives at once",
      body: [
        "There were three things to balance throughout:",
      ],
      columns: ["Perspective", "What it demanded"],
      rows: [
        ["Customer needs", "Rewards that felt valuable, clear and simple to redeem"],
        ["Business goals", "More engagement and new customer acquisition"],
        ["Technical reality", "An experience Antavo could support within the timeline"],
      ],
    },
    {
      type: "prose",
      label: "Discovery",
      heading: "A workshop to choose the right opportunity",
      body: [
        "Before designing the feature, I ran a remote workshop with the Product Owner, Product Manager, Engineers, Designers and Commercial Revenue team. We looked at ways to grow engagement and sign-ups, then weighed them against customer value, feasibility and business impact.",
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
      body: ["We considered:"],
      items: [
        "Reward Sharing",
        "Making the Arcade more visible across KFC touchpoints",
        "Promoting the free sign-up reward more prominently",
      ],
    },
    {
      type: "prose",
      body: [
        "Reward Sharing gave existing customers something useful to do with a prize while giving a new customer a reason to join. The workshop helped us agree on that direction before detailed design began.",
      ],
    },
    {
      type: "statement",
      label: "The question behind Reward Sharing",
      body: "A customer had won a reward. The question for us was whether giving it to someone else could also give that person a reason to join.",
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
      body: [
        "Reward Sharing added another person to the loyalty journey. That sounds like a small addition to the Arcade, but it introduced questions about who owned a reward, when it could be shared, how the recipient claimed it, and what happened if they were new to the app. I had to make that journey clear to customers while working within the rules of KFC’s loyalty platform.",
        "We needed the reward to feel worth sending and straightforward to claim. The design had to work with Antavo, the platform managing reward ownership, coupons and redemption, and with the wider Rewards Arcade campaign led by RAPP.",
      ],
    },
    {
      type: "prose",
      label: "Competitive research",
      heading: "Reward sharing was rare in quick-service",
      body: [
        "I reviewed loyalty experiences including Costa Coffee and McDonald’s to see how they handled sharing and engagement. Sharing existed in some programmes, but I did not find it widely used across the quick-service products I reviewed.",
        "That gave us a useful starting point. We could look at sharing patterns customers might already recognise, while working out how those patterns would fit KFC’s rewards and Antavo’s rules. I brought those examples into early conversations with Product and Engineering about the interaction and its likely complexity.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/kfc/costa-competitor.webp",
          caption: "Costa Coffee competitor analysis",
          alt: "Five Costa Coffee app screens: a two-step onboarding explaining how to gift a reward to a friend, the app home screen, a ten-stamp coffee card, and an About rewards page covering how to claim and how to gift rewards",
          width: "full",
          dims: { w: 2950, h: 1020 },
        },
      ],
    },
    {
      type: "cards",
      label: "Defining success",
      heading: "Five requirements that defined “done”",
      numbered: true,
      body: [
        "I worked with the Product Owner on acceptance criteria so Design, Product and Engineering were working towards the same experience.",
      ],
      cards: [
        {
          title: "Personalised rewards",
          body: "Customers needed to understand which reward they had won, why they had received it and whether they could share it.",
        },
        {
          title: "One-time sharing",
          body: "A reward could be gifted only once. The rule had to protect the programme and be easy for customers to understand.",
        },
        {
          title: "Rewards Arcade integration",
          body: "Sharing needed to follow naturally from winning a reward in the Arcade.",
        },
        {
          title: "Expiry reminders",
          body: "Customers needed a reminder before a reward expired so they had a chance to use it.",
        },
        {
          title: "New customer registration",
          body: "Someone receiving a reward who was not yet a member needed a route through sign-up before claiming it.",
        },
      ],
    },
    {
      type: "prose",
      label: "Mapping the experience",
      heading: "Designing the flows before the screens",
      body: [
        "Once we had agreed on the requirements, I mapped four journeys: sharing a reward just won, sharing one already held, receiving one as an existing member, and receiving one as a new customer.",
        "The flows let us work through ownership, coupon rules, expiry and error states before development.",
      ],
    },
    {
      type: "prose",
      body: [
        "As Engineering investigated what Antavo could support, I updated the journeys with them. They gave us a shared way to discuss the edge cases instead of discovering them after the screens were designed.",
      ],
    },
    {
      type: "prose",
      label: "Wireframes",
      heading: "Resolving structure before detail",
      body: [
        "I used wireframes to explore where customers would find rewards they could share, how a recipient would claim one, and how we would introduce a new customer to KFC Rewards.",
        "I reviewed those options with Product and Engineering while the designs were still easy to change. Their feedback helped me account for platform constraints before moving into high-fidelity UI.",
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
        "I designed the final screens using KFC’s existing design system. The new behaviour needed clear signals: whether a reward could be shared, who owned it, whether it had already been sent and what the customer should do next.",
      ],
    },
    {
      type: "imageSequence",
      body: [
        "The journey began when someone won a reward. They could share it, their friend could receive it, and the friend could redeem it through the reward screen already used in the app. I wanted the sharing step to feel like part of KFC Rewards, with no separate way of claiming a prize to learn.",
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
        "The work introduced elements that could be useful beyond Reward Sharing, including personalised reward tags, status indicators, instructional banners and information cards. I added them to KFC’s Figma design system so another loyalty feature could use the same patterns.",
        "That also gave the team a consistent way to show reward status and explain unfamiliar actions as the programme grew.",
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
      type: "figmaEmbed",
      label: "Reusable pattern",
      heading: "A pattern designed to teach, then disappear",
      body: [
        "I had recently worked on a feature at KFC that increased calls to Customer Service. Customers were not expecting the feature or did not know how to use it. As a result of this, I designed the explainer as a pattern that could be reused when KFC introduced an unfamiliar experience.",
        "As the project was moving towards the RAPP marketing release deadline, I did not have time to do an in-depth user testing session but still felt it was important to get user input so I did guerrilla testing with people on the street.",
        "The question in testing was how much explanation customers actually needed before using the Arcade and sharing a reward to understand it and feel confident using it.",
      ],
      embedUrl:
        "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FLM6oYL0en38Kvzl877kub0%2FReward-sharing-KFC%3Fnode-id%3D1603-9700%26scaling%3Dmin-zoom%26content-scaling%3Dfixed%26starting-point-node-id%3D1603%253A9700%26page-id%3D1120%253A9594%26hide-ui%3D1",
      fallbackUrl:
        "https://www.figma.com/proto/LM6oYL0en38Kvzl877kub0/Reward-sharing-KFC?node-id=1603-9700&p=f&viewport=-602%2C-211%2C0.06&t=MzCXfyMHDKQtpgEj-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1603%3A9700&show-proto-sidebar=1&page-id=1120%3A9594",
      cta: "TRY THE PROTOTYPE →",
    },
    {
      type: "prose",
      label: "Validation",
      heading: "Trusting the pattern over the copy",
      body: [
        "I ran guerrilla usability testing, paying particular attention to the instructional carousel. Participants swiped through it without spending much time on the supporting copy.",
        "That changed my approach. The interface was already giving them enough direction, so I removed the extra instruction. It left customers with less to read before they could get on with the experience.",
        "After participants' suggestions, I also removed arrow icons next to the carousel circles. This gave the screen a cleaner look and gave components more white space to breathe.",
      ],
    },
    {
      type: "prose",
      label: "Delivery",
      heading: "Design didn't stop at handoff",
      body: [
        "I prepared the Figma files and interaction details for Engineering and made sure the reusable components were ready to use.",
        "I stayed involved during implementation. Regular check-ins gave us a way to answer interaction questions, respond as we learned more about the platform and review builds against the design. That mattered for a feature with several routes into it and rules that customers should not have to think about.",
      ],
    },
    {
      type: "prose",
      label: "Measuring success",
      heading: "Impact across engagement and acquisition",
      body: [
        "We designed Reward Sharing to give existing customers another reason to engage and to bring new customers into KFC Rewards. After launch, loyal customer engagement increased across the wider Rewards Arcade. Reward Sharing recorded increases in new KFC Rewards sign-ups and reward click-through.",
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
        "All three measures remained up in the second month.",
      ],
    },
    {
      type: "prose",
      label: "What I learned",
      body: [
        "The interface was only one part of getting Reward Sharing into customers’ hands. The workshop helped us choose where to focus. The flows helped us work through Antavo’s rules. Testing showed us where we could remove explanation, and working with Engineering throughout helped us carry those decisions into the build.",
      ],
    },
  ],
  reflection: {
    heading: "The best outcomes came from alignment, not design alone",
    body: [
      "I’m proud that we took a familiar reward journey and made it useful to someone beyond the customer who won it. The work also left KFC with patterns it could reuse in later loyalty features.",
      "For me, the hardest part was keeping the customer journey simple while the rules behind it were anything but simple. That meant making decisions with Product, Engineering, Commercial and our partners throughout the project, not just at the point of handoff.",
    ],
  },
  interactiveSplitBefore: "Measuring success",
  chapters: [
    { id: "overview",   label: "Overview",   blockLabel: "Overview" },
    { id: "challenge",  label: "Challenge",  blockLabel: "The challenge" },
    { id: "discovery",  label: "Discovery",  blockLabel: "Discovery" },
    { id: "design",     label: "Design",     blockLabel: "Wireframes" },
    { id: "validation", label: "Validation", blockLabel: "Validation" },
    { id: "impact",     label: "Impact",     blockLabel: "Measuring success" },
    { id: "reflection", label: "Reflection", blockLabel: "_reflection" },
  ],
};
