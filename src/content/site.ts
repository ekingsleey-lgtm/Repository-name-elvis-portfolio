/** Site-wide content, lifted from the current elvisdesigns.online. */

export const site = {
  name: "Elvis Rimdap",
  role: "Senior Product Designer",
  location: "London",
  domain: "elvisdesigns.online",
  url: "https://elvisdesigns.online",
  email: "erimdap@gmail.com",
  linkedin: "https://www.linkedin.com/in/elvisruxd/",
  cv: "/elvis-rimdap-cv.pdf",
  tagline:
    "I craft products that solve real problems and scale with confidence — working at the intersection of people, strategy, and design.",
  /** His own words, from the About page intro — not a written-for-him summary. */
  metaDescription:
    "Designing clear, scalable experiences for complex digital products. Focused on the detail that makes things genuinely easier to use.",
  /** Homepage stats bridge — the argument the metrics support. */
  statsEditorial:
    "Ten years simplifying complexity — from enterprise compliance to consumer loyalty, from London fintechs to global media.",
  /** Homepage contact section. */
  contactStatement:
    "Complex problems are my favourite kind. If you're working on something at the intersection of strategy, behaviour, and technical constraint — I'd like to hear about it.",
} as const;

export const stats = [
  { value: "10+", caption: "Years designing products", captionShort: "Years" },
  { value: "4",   caption: "Featured case studies",    captionShort: "Case studies" },
  { value: "6",   caption: "Industries shaped",        captionShort: "Industries" },
] as const;

/** Four specific, memorable statements about how Elvis works. */
export const approachStatements = [
  "I bring structure to ambiguous problems before the team opens a design tool.",
  "I design systems, not screens — the interface is the last decision I make.",
  "Behaviour is my primary design material. I start with the loop, not the layout.",
  "The best design decisions look like business decisions by the time they ship.",
] as const;

export const principles = [
  {
    title: "People-first thinking",
    body: "Every design decision anchored in real user needs and behaviours.",
  },
  {
    title: "Collaborative by nature",
    body: "I thrive working alongside engineers, PMs, and stakeholders.",
  },
  {
    title: "Curious about the detail",
    body: "The right solution usually hides in the nuance — I like finding it.",
  },
] as const;

export const about = {
  eyebrow: "About me",
  headline: ["Senior Product", "Designer,", "London."],
  intro:
    "Designing clear, scalable experiences for complex digital products. Focused on the detail that makes things genuinely easier to use.",
  whoIAm: {
    label: "Who I am",
    heading: "Simplifying complexity — at surface and at scale",
    body: [
      "I'm a Senior Product Designer based in London, focused on designing clear, scalable experiences for complex digital products.",
      "I work across UX, interaction design, and product strategy, translating ambiguous problems into structured, usable systems. My strength lies in simplifying complexity — creating products that are easy to use on the surface, but carefully designed underneath to support scale, behaviour, and business goals.",
      "Across my work, I care most about clarity, thoughtful systems, and designing products that genuinely improve how people interact with technology.",
    ],
  },
  aiNative: {
    heading: "I'm an AI-native designer",
    body: "I actively integrate AI tools into my workflow to accelerate ideation, sharpen decision-making, and prototype faster — not as a shortcut, but as part of a modern, iterative design process that connects thinking and building more tightly.",
    tools: ["Cursor", "Claude", "Notion AI", "Replit", "Figma Make", "Figma", "FigJam", "Miro"],
  },
  mentoring: {
    label: "Mentoring & education",
    heading: "Supporting the next generation of designers",
    body: "Alongside product work, I have a strong focus on mentoring and design education. I've supported emerging designers across the UK and Nigeria through workshops, classroom teaching, and remote learning programmes — helping them build practical UX/UI skills and confidence in their craft.",
    entries: [
      {
        location: "London, UK",
        title: "Lilian Baylis Technology School",
        body: "Teaching UX/UI foundations in the classroom, helping students develop real design skills and industry confidence.",
        image: "/about/lilian-baylis-3.jpg",
      },
      {
        location: "Abuja, Nigeria",
        title: "UX/UI Foundations Workshops",
        body: "Running hands-on UX/UI workshops for emerging designers, building practical skills and creative confidence.",
        image: "/about/abuja-workshop-2.jpg",
      },
      {
        location: "Online",
        title: "TeachU — UX/UI Online Course",
        body: "Created an online UX/UI course reaching designers remotely, making quality design education more accessible.",
        image: "/about/teachu.jpg",
      },
      {
        location: "Speaking",
        title: "National Diaspora Day 2022",
        body: "Speaker at the National Diaspora Day 2022 hosted by NIDCOM, sharing insights on design, technology, and the diaspora community.",
        image: "/about/diaspora-day.jpg",
      },
    ],
  },
  skills: {
    label: "Skills & tools",
    heading: "What I bring to every project",
    design: [
      "UX Design",
      "Product Design",
      "Interaction Design",
      "Information Architecture",
      "Design Systems",
      "User Research",
      "Prototyping",
      "Workshop Facilitation",
      "Mentoring",
    ],
    tools: ["Figma", "FigJam", "Cursor", "Claude", "Notion AI", "Replit", "Miro"],
  },
  contact: {
    heading: "Let's work together",
    body: "Whether you're looking for a senior product designer, a collaborator on a complex problem, or someone to run a workshop — I'd love to hear from you.",
  },
} as const;
