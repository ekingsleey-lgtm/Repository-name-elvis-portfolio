import type { CaseStudy } from "../types";

export const travelex: CaseStudy = {
  slug: "travelex",
  index: "03",
  shortTitle: "Travelex",
  title: "Travelex Digital Transformation — Scalable B2B & B2C Checkout",
  pageHeading: "Designing the alignment that made a stalled transformation move",
  subtitle: "Designing the discovery, service blueprint and checkout experience for Travelex's B2B2C white-label platform in partnership with Sainsbury's UK.",
  role: "Senior Product Designer",
  period: "8 months",
  tags: ["Systems Thinking", "Stakeholder Alignment", "Platform Design"],
  thumbnail: {
    src: "/work/travelex/hero.jpg",
    alt: "Travelex worldwide money branding",
    dims: { w: 1920, h: 1200 },
  },
  cover: {
    src: "/work/travelex/hero.jpg",
    alt: "Travelex worldwide money branding",
    width: "full",
    dims: { w: 1920, h: 1200 },
    priority: true,
  },
  blocks: [
    // ── Hero ────────────────────────────────────────────────────────────────
    {
      type: "statement",
      body: "The most complex design problem on this project wasn't a screen. It was a system — one that no single person in the programme fully understood.",
    },
    {
      type: "prose",
      body: [
        "Different teams held different pieces of it. The B2B workstream knew the partner requirements. The B2C workstream knew the consumer journey. Engineering knew what Salesforce would and wouldn't support. Compliance knew what a regulated checkout had to include. Nobody had a complete model of how all of those things connected.",
        "Before I designed anything, that model had to exist.",
      ],
    },

    // ── Business Context ─────────────────────────────────────────────────────
    {
      type: "prose",
      label: "Overview",
      heading: "A business model under competitive pressure",
      body: [
        "Travelex is one of the world's largest foreign exchange businesses. Its retail model operates through travelex.co.uk, a network of airport stores, and a B2B partner ecosystem in which major UK retailers — including Sainsbury's, its largest partner — embed the Travelex travel money service inside their own customer experience under a white-label arrangement.",
        "By 2019, that model was under pressure. Challenger banks had made competitive, low-friction FX a mainstream expectation. Revolut, Wise, and others offered currency exchange at interbank rates with almost no effort. The Travelex digital product hadn't kept pace. The checkout was complex, trust signals were inconsistent, and the experience differed depending on whether a customer arrived from the travel money website, the Travelex Money Card, or the Wire money transfer service. There was no unified entry point across the product range.",
        "Leadership wanted to change this. The ambition was to transform Travelex from a transactional business into a more customer-centred organisation — one with a digital platform capable of scaling its B2B partner model without the engineering overhead that came with building bespoke solutions for every partner. Every partner build was a separate engineering commitment. The business could not grow its partner network without a shared platform foundation.",
        "The programme to build it was already underway. Phase 2 had rebuilt the direct-to-consumer experience on Salesforce Commerce Cloud. Phase 3 — the partner white-label — was the next stage. The strategy was defined: one checkout engine, configurable per partner, allowing each to control their own branding, promotions, margins, and product configuration. I joined during Phase 3. The strategy existed. The delivery had stalled.",
      ],
    },

    // ── Challenge ────────────────────────────────────────────────────────────
    {
      type: "prose",
      label: "The challenge",
      heading: "Knowledge without alignment",
      body: [
        "Eight months of prior research existed — user interviews, competitive analysis, service mapping, technical discovery. It lived across documents, across teams, and across two offices. The B2B and B2C workstreams had developed their understanding of the problem separately, without a common model to reconcile them.",
        "The consequences were visible. Priorities hadn't been agreed. Scope hadn't been confirmed. Engineering was waiting for design direction that couldn't be given.",
      ],
    },
    {
      type: "prose",
      body: [
        "The customer problems were real. Users lacked confidence in how much currency to buy, and the distinction between a cash order and a travel card top-up was not clearly surfaced. Three Travelex products — the travel money checkout, the Money Card, and the Wire transfer service — had no unified entry point.",
        "The partner problems were equally real. Sainsbury's and others needed a branded FX experience that felt like their own — requiring promotional flexibility, account management integration, and margin control.",
        "Both problems were understood individually. The relationship between them — how partner configuration decisions shaped what consumers experienced — was not mapped anywhere.",
      ],
    },
    {
      type: "reframe",
      label: "The real challenge",
      from: {
        label: "The obvious answer",
        body: "Fix the checkout experience",
      },
      to: {
        label: "The actual challenge",
        body: "Build a shared understanding of what the system needed to do — for consumers, for partners, and for Travelex operating both.",
      },
    },

    // ── Discovery ────────────────────────────────────────────────────────────
    {
      type: "figures",
      label: "Discovery",
      heading: "Understanding what existed before proposing anything new",
      body: [
        "My starting point was to understand the existing experience before I proposed anything new. I conducted a structured UX review of the existing travelex.co.uk checkout — annotating what was working, what created friction, and where trust signals were absent or inconsistent.",
      ],
      figures: [
        {
          src: "/work/travelex/ux-review-1.png",
          alt: "Annotated UX review of the Travelex mobile checkout — colour-coded annotations marking friction points, unclear copy, and missing trust signals",
          caption:
            "UX audit — colour-coded to distinguish what worked (green), what caused mild concern (blue), and what needed addressing (red).",
          dims: { w: 567, h: 829 },
        },
        {
          src: "/work/travelex/ux-review-2.png",
          alt: "Second annotated screen from the Travelex UX review, showing additional friction points in the currency selection flow",
          caption: "Currency selection — annotated questions surfacing where user intent and interface assumptions diverged.",
          dims: { w: 567, h: 545 },
        },
      ],
    },
    {
      type: "prose",
      body: [
        "I then held conversations with the Global Head of Channel, who led the B2B workstream, and the Head of Direct Consumer Channels, who led the B2C side. My objective was not just to gather requirements — it was to understand where the two teams' understanding of the problem diverged. The divergence turned out to be significant. What the B2B workstream needed to solve for its partners was not always compatible with what the B2C workstream had designed for its consumers, and neither had a clear framework for resolving those conflicts.",
        "I also needed to understand what was fixed. Salesforce Commerce Cloud's SFRA architecture was the platform — partner customisation had to work within its skinning and configuration model, not through bespoke code. Compliance requirements were equally fixed: KYC checks on all first-time customers, sanctions checks at order submission, document upload requirements as a fallback for KYC exceptions, and 3D Secure payment authorisation. These were mainstream journeys that had to be designed from the start, not deferred.",
        "There was no research budget. User testing was eliminated by COVID-19. I worked within those constraints by using internal staff unfamiliar with the product as a proxy for non-digital users, and by designing a post-launch A/B testing framework that would allow the programme to learn from real customer behaviour after deployment.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/travelex/workshop-roadmap.jpg",
          alt: "Workshop session, November 2019 — programme team reviewing the Phase 3 roadmap, white-label partner strategy visible on screen",
          caption:
            "November 2019 — Phase 3 roadmap workshop. White-label solution for partners, client self-service, partner migration.",
          width: "bleed",
          dims: { w: 2500, h: 2500 },
        },
        {
          src: "/work/travelex/workshop-session.jpg",
          alt: "Cross-functional programme team in session, November 2019 — stakeholders from B2B, B2C, and engineering focused on the service mapping visible on the wall behind them",
          caption:
            "November 2019 — cross-functional alignment session. B2B, B2C, engineering, and partner requirements reviewed against the evolving service model.",
          width: "bleed",
          dims: { w: 2500, h: 2500 },
        },
      ],
    },

    // ── Service Blueprint ────────────────────────────────────────────────────
    {
      type: "statement",
      label: "Service Blueprint",
      body: "Before any design decisions could be validated, a shared model of the system needed to exist.",
    },
    {
      type: "prose",
      heading: "Three journeys, one document",
      body: [
        "No document mapped how a currency order moved through the full journey — from a customer researching their travel destination, through product selection, checkout, payment, KYC, and fulfilment — while simultaneously mapping what that journey required from a retail partner, and what Travelex had to operate underneath. Without that document, any prioritisation decision or scope conversation was operating without a shared frame of reference.",
        "I created the first draft of what became the Oreo B2B2C Service Blueprint.",
        "The blueprint mapped three distinct journeys across the same end-to-end experience. The customer journey tracked what users experienced, needed, and felt at each stage — with emotional state tracked alongside actions, because a financial transaction is not a neutral experience. The partner configuration layer mapped what a retail partner like Sainsbury's needed to control: branding, promotional content, margin settings, account management. The Travelex operational layer mapped what the business had to operate underneath — fulfilment routing, compliance, product inventory, and the handoffs between internal teams.",
        "The three-layer structure was a deliberate choice. Building separate documents would have preserved the silos. Building one document that placed all three layers in relationship to each other made visible what had previously been held separately — where partner decisions affected consumer experience, and where Travelex operational constraints shaped what partners could offer.",
        "I validated the first draft with the Head of Product. It then went through working sessions with the wider programme team — B2B, B2C, engineering, and operational leads. The version that became the working reference across the programme was V1.1.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/travelex/service-blueprint.jpg",
          alt: "The Oreo B2B2C Service Blueprint V1.1 — a full-width document mapping the currency ordering journey across three layers: customer experience, partner configuration, and Travelex operations",
          caption: "Oreo B2B2C Service Blueprint V1.1 — three layers, one document.",
          width: "full",
          dims: { w: 2500, h: 1126 },
        },
      ],
    },
    {
      type: "prose",
      body: [
        "What changed when the blueprint existed was the quality of the conversations. Before it, scope discussions were abstract — teams were debating requirements without a shared map of where those requirements sat in the overall system. With the blueprint in the room, disagreements became locatable. A question about account login could be pointed to a specific stage in the customer journey and a specific configuration requirement in the partner layer. Decisions that had been stuck became unstuck — not because the blueprint resolved the disagreement, but because it gave the disagreement a precise location.",
        "The Global Transformation Director reviewed the blueprint and used it to anchor subsequent programme decisions. It remained the working reference for the duration of the project.",
      ],
    },

    // ── Four Sprint Delivery ─────────────────────────────────────────────────
    {
      type: "prose",
      label: "Delivery",
      heading: "Adapting the design process to a Lean delivery plan",
      body: [
        "The Lead Technical Architect had a Lean delivery plan in place when I joined. My job was not to replace it — it was to adapt my design process so it could run inside it.",
        "The delivery was structured around four design sprints, sequenced by conversion impact rather than technical dependency: the entry module first, because it determined whether a customer began an order at all; the checkout flow second, because completion was the next critical threshold; account management third; and fulfilment fourth.",
      ],
    },
    {
      type: "cards",
      numbered: true,
      body: [
        "Sequencing by impact was a deliberate product decision. The most significant risk was spending engineering effort on a part of the journey that customers never reached because an earlier step had already lost them.",
      ],
      cards: [
        {
          title: "Entry module",
          body: "Currency product selection — the highest-conversion-impact step. Getting customers to begin an order was the most valuable threshold in the funnel.",
        },
        {
          title: "Checkout flow",
          body: "Compliance mapping, payment, and the KYC journey. First-time customer checks, sanctions, 3D Secure, and the 'under review' state — designed from the start, not deferred.",
        },
        {
          title: "Account management",
          body: "Customer recognition and login — including Sainsbury's authentication integration, which needed to feel like a Sainsbury's experience, not a Travelex one.",
        },
        {
          title: "Fulfilment",
          body: "Home delivery, click-and-collect, and multi-currency routing — sequenced last because it depended on decisions made in the earlier sprints.",
        },
      ],
    },
    {
      type: "prose",
      body: [
        "Within each sprint, I used wireframes not as finished designs but as hypothesis surfaces — artefacts that made assumptions explicit so that engineers, product managers, and stakeholders could challenge them before they became engineering commitments. An assumption uncovered at wireframe stage is almost free to correct. The same assumption discovered after a Salesforce sprint has already been built and paid for.",
        "Each sprint also required compliance validation. KYC checks on first-time customers, document upload requirements as a fallback, sanctions checks, 3D Secure payment authorisation, and the design implications of customers entering an 'under review' state — these weren't decisions to defer. They were decisions that shaped the checkout flow at every step, validated with the compliance team and Salesforce engineers at each sprint stage.",
        "SFRA's architecture shaped every design decision. The platform determines what partners can configure versus what is fixed in the shared checkout engine. Designing within multitenancy constraints meant making decisions at the system level, not just the screen level.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/travelex/wireframe.jpg",
          alt: "Early wireframe of the entry module — showing the product type selector and currency entry in low fidelity",
          caption: "Entry module wireframe — the hypothesis, before the solution.",
          width: "column",
          dims: { w: 375, h: 538 },
        },
      ],
    },

    // ── Partner Validation ───────────────────────────────────────────────────
    {
      type: "prose",
      label: "Partner Validation",
      heading: "Solving the problem for Sainsbury's",
      body: [
        "The platform strategy was built on a clear premise: solve the problem for Sainsbury's first, and you solve it for most other partners.",
        "Sainsbury's was Travelex's largest B2B partner. Their scale, their brand standards, their customer base, and their operational requirements were representative of what other major retail partners would need. Getting it right with Sainsbury's would validate the platform model at the level of complexity that mattered.",
        "I held sessions with Sainsbury's stakeholders focused on understanding what a branded FX experience needed to do for their customers that the generic Travelex checkout did not. The most significant findings were around two areas. The first was promotional flexibility: Sainsbury's needed to surface their own promotional content and loyalty-adjacent messaging within the checkout flow. The second was customer account management: the login and account recognition journey needed to feel like a Sainsbury's experience — using their authentication patterns and their account model — rather than a Travelex one overlaid with a different brand skin.",
        "These findings were not separate from the service blueprint. They were fed back into it. The partner configuration layer — what a partner could control, what they could customise, and what remained fixed — became more specific as a result of those conversations. The blueprint iterated to reflect what the partner sessions had added.",
        "The A/B testing framework I designed for post-launch validation was developed with Sainsbury's stakeholders as collaborators, not simply as recipients. The specific hypotheses we agreed — including where to position the account login step relative to order fulfilment — were shaped by their understanding of how their customers shopped.",
      ],
    },

    // ── MoSCoW Prioritisation ────────────────────────────────────────────────
    {
      type: "prose",
      label: "Prioritisation",
      heading: "Making trade-offs visible",
      body: [
        "At a certain point in the programme, the volume of research, requirements, and competing stakeholder priorities in circulation was greater than any decision-maker could hold in their head. Requirements had come from the B2B workstream and the B2C workstream, the compliance team, the Sainsbury's partner sessions, and Salesforce engineering. None of it had been formally consolidated.",
        "I organised, designed, and facilitated a MoSCoW prioritisation workshop with cross-functional stakeholders.",
        "The purpose of the workshop was not administrative. It was not to produce a sorted list. The purpose was to make trade-offs visible, to force the articulation of why any given requirement mattered more than another, and to reach consensus that each function could own — rather than a decision that had been handed down.",
        "Stakeholders didn't simply place requirements into categories. They had to articulate why a requirement belonged in Must Have rather than Should Have, and defend that reasoning against other stakeholders who weighted it differently. The friction in that process was intentional. Genuine prioritisation doesn't happen in the absence of disagreement — it happens when disagreement is surfaced, examined, and resolved.",
      ],
    },
    {
      type: "figures",
      figures: [
        {
          src: "/work/travelex/moscow.jpg",
          alt: "MoSCoW prioritisation workshop — requirements from B2B, B2C, compliance, and Sainsbury's partner sessions weighted against each other on a large matrix",
          caption:
            "MoSCoW prioritisation — requirements from across the programme, weighted by cross-functional consensus.",
          width: "full",
          dims: { w: 2500, h: 1443 },
        },
      ],
    },
    {
      type: "prose",
      body: [
        "What the workshop consolidated was the output of everything that had come before: the service blueprint findings, the UX audit, the partner sessions, the technical discovery, the compliance requirements. What it produced was a shared, agreed scope for Phase 3 that each function had contributed to and could stand behind.",
        "The Must Have requirements that emerged — partner branding configuration, margin control at the product and delivery type level, customer account integration, basic promotional content display — went directly into the sprint delivery plan.",
      ],
    },

    // ── Platform Design ──────────────────────────────────────────────────────
    {
      type: "statement",
      label: "Platform Design",
      body: "The decision to build a modular white-label platform was made before I joined the programme. My contribution was designing the customer experience and the alignment process that made the strategy achievable.",
    },
    {
      type: "prose",
      heading: "One checkout engine, many partner brands",
      body: [
        "The Sainsbury's entry module was the first proof of the model in practice.",
        "At sainsburys.co.uk/money, with Sainsbury's orange branding applied to the Travelex checkout infrastructure, step one of a five-step journey asked a question that the original travelex.co.uk checkout had never surfaced directly: how would you like your travel money?",
        "Three options: Cash, Card, or Both. That selector resolved the core confusion problem identified in the UX audit. Customers arriving at a currency checkout frequently didn't know which Travelex product they needed. The existing experience required them to arrive already knowing. The product type selector surfaced the distinction clearly at the point of entry, and gave customers a decision they could make rather than a taxonomy they had to decode.",
        "Destination-based spend guidance addressed the confidence problem — customers had no reliable reference for how much currency to buy for a specific trip. A guaranteed buy-back option, surfaced at entry rather than at the end of the order, addressed the risk anxiety specific to currency purchases. Trust signals were embedded at the stages of the journey where the service blueprint had identified emotional state was lowest — not as static footer badges, but at the points where a customer was being asked to do something that felt risky.",
        "What the platform design preserved was the boundary between what Sainsbury's controlled and what Travelex operated. Sainsbury's controlled their branding, their promotional content, their margin settings by currency and delivery type, and their account management integration. Travelex controlled the checkout engine, the compliance layer, the fulfilment logic, and the product taxonomy. That boundary was a design decision as much as a technical one, and it had to be agreed before a single screen was finalised.",
      ],
    },
    {
      type: "imageSequence",
      steps: [
        {
          label: "Plan your trip",
          figure: {
            src: "/work/travelex/checkout-widget.jpg",
            alt: "The Sainsbury's travel money widget at sainsburys.co.uk/money. Destination set to Canada. Amount to spend: £1000.00 GBP. Amount to receive: $1727.00 CAD at 1 GBP = 1.73 CAD. Order travel money button. Below: Average price estimate showing taxi ($50 CAD/20 km), coffee ($5 CAD), average meal ($75 CAD).",
            caption: "Pre-checkout — destination-based spend guidance addresses the confidence problem. Customers buying travel money often have no reference for how much to buy. Surfacing cost estimates by destination gives them an anchor before they enter the checkout.",
            dims: { w: 440, h: 1045 },
          },
        },
        {
          label: "Choose the product",
          anchor: true,
          figure: {
            src: "/work/travelex/entry-module.jpg",
            alt: "Step 1 of 5 — the Sainsbury's white-label entry module at sainsburys.co.uk/money. Cash, Card, or Both product type selector with currency amount and buy-back option. Sainsbury's orange branding applied to the Travelex checkout infrastructure.",
            caption: "Step 1 — the customer selects Cash, Card, or Both before entering the checkout. The product type selector resolved the core confusion problem: customers previously had to arrive already knowing which Travelex product they needed.",
            dims: { w: 375, h: 760 },
          },
        },
        {
          label: "Your details",
          figure: {
            src: "/work/travelex/checkout-details.jpg",
            alt: "Step 2 of 5 — personal details form. First name, middle name, last name, date of birth, contact number, and email address. Account recognition link and T&Cs acceptance before proceeding to delivery.",
            caption: "Step 2 — personal details and account recognition, collecting the information required for KYC compliance and order management.",
            dims: { w: 375, h: 919 },
          },
        },
        {
          label: "Delivery method",
          figure: {
            src: "/work/travelex/checkout-delivery.jpg",
            alt: "Step 3 of 5 — delivery or collection. The customer chooses between Home delivery and Store collection, with address lookup for the home delivery option.",
            caption: "Step 3 — home delivery or store collection. Fulfilment routing was one of the four sprint priorities, sequenced here because it determines the operational path for the remainder of the order.",
            dims: { w: 375, h: 812 },
          },
        },
        {
          label: "Select a delivery date",
          figure: {
            src: "/work/travelex/checkout-delivery-date.jpg",
            alt: "Step 3 continued — delivery date selection. A calendar showing May 2020 with Friday 22nd highlighted. 'Switch to store collection' link allows the customer to change fulfilment method at this stage.",
            caption: "Step 3 continued — the customer selects a home delivery date from available slots. A 'Switch to store collection' option remains visible, keeping the fulfilment choice reversible before committing to a date.",
            dims: { w: 375, h: 812 },
          },
        },
        {
          label: "Payment",
          figure: {
            src: "/work/travelex/checkout-payment.jpg",
            alt: "Step 4 of 5 — payment details. Debit or Credit Card with card scanning option, card number, expiration, name on card, and CVV fields. PayPal as an alternative payment method. Sainsbury's orange branding throughout.",
            caption: "Step 4 — payment by card or PayPal, within the 3D Secure payment flow required by compliance. Card scanning reduces manual entry friction for a step where trust is lowest.",
            dims: { w: 375, h: 1000 },
          },
        },
        {
          label: "Billing address",
          figure: {
            src: "/work/travelex/checkout-billing.jpg",
            alt: "Step 4 continued — billing address form. Postcode, house/flat number, street, city/town, county, and country fields. A checkbox at the top allows the customer to confirm billing address matches delivery address.",
            caption: "Step 4 continued — billing address, collected after card details. A checkbox to confirm billing matches delivery address reduces friction for the majority of customers who ship to their home.",
            dims: { w: 375, h: 869 },
          },
        },
        {
          label: "Review and pay",
          figure: {
            src: "/work/travelex/checkout-review.jpg",
            alt: "Step 5 of 5 — order review. Travel money summary showing Canadian dollars and US dollars with amounts, delivery fee, and total in GBP. Delivery address, delivery date, payment card details, and contact information all displayed with Edit links. Pay now button at the bottom.",
            caption: "Step 5 — the customer reviews travel money, delivery, payment, and contact details before completing the order. Every line item is editable, keeping the customer in control before the final commitment.",
            dims: { w: 375, h: 1183 },
          },
        },
      ],
    },

    // ── Outcome ──────────────────────────────────────────────────────────────
    {
      type: "statement",
      body: "When I joined, the programme was not moving. When I left, it was.",
    },
    {
      type: "cards",
      label: "Outcome",
      heading: "What the programme could now do",
      cards: [
        {
          title: "Shared understanding established",
          body: "The programme's fragmented research — eight months of work across two offices and two workstreams — was consolidated into a single shared model that every function could navigate and challenge.",
        },
        {
          title: "Service Blueprint adopted",
          body: "The Global Transformation Director used the blueprint to anchor subsequent programme decisions. It became the working reference across B2B, B2C, engineering, and compliance for the duration of the project.",
        },
        {
          title: "Platform direction validated",
          body: "A white-label prototype at sainsburys.co.uk/money confirmed the modular platform model — Sainsbury's branding applied to Travelex's checkout infrastructure, meeting the configuration requirements identified in partner sessions.",
        },
        {
          title: "Learning framework prepared",
          body: "A post-launch A/B testing framework — hypothesis designs and success metrics — was handed over as part of the delivery documentation, ready to run after deployment.",
        },
      ],
    },
    {
      type: "prose",
      body: [
        "I left the programme before deployment to live customers. Post-launch conversion data was not available to me. The A/B testing framework was designed to capture the learning I knew I wouldn't be there to see.",
      ],
    },
  ],

  interactiveSplitBefore: "Delivery",
  chapters: [
    { id: "context",        label: "Overview",   blockLabel: "Overview" },
    { id: "challenge",      label: "Challenge",  blockLabel: "The challenge" },
    { id: "discovery",      label: "Discovery",  blockLabel: "Discovery" },
    { id: "blueprint",      label: "Blueprint",  blockLabel: "Service Blueprint" },
    { id: "delivery",       label: "Delivery",   blockLabel: "Delivery" },
    { id: "prioritisation", label: "Priorities", blockLabel: "Prioritisation" },
    { id: "outcome",        label: "Impact",     blockLabel: "Outcome" },
    { id: "reflection",     label: "Reflection", blockLabel: "_reflection" },
  ],

  reflection: {
    heading:
      "Great product design isn't about creating alignment because everyone agrees. It's about understanding different perspectives well enough that people can make better decisions together.",
    body: [
      "There's a version of this project where the service blueprint is just a document — something produced, reviewed, signed off, and filed. That's not what happened here, and I think the difference matters enough to name.",
      "What made the blueprint useful was not the structure. The three-layer map, the emotion tracking, the consolidation of eight months of prior research — those things were necessary, but they weren't sufficient. What made it change the programme was that it gave people from very different parts of the business a surface they could all point to at the same time. And once they could all point to the same thing, they could disagree more precisely.",
      "The blueprint didn't resolve the disagreements. It located them. And locating a disagreement turned out to be most of the work.",
      "If I were to do this project again, I would push for lightweight external validation earlier — before the service blueprint had been agreed, not after. The internal proxy testing and the Sainsbury's partner sessions were the right response to genuine constraints. But I'd want to have been challenged earlier on the assumptions I was carrying into the blueprint.",
      "The design problem is almost never the screen. It is the model. Build that first. Everything else follows.",
    ],
  },
};
