// components/ProductGrid.jsx — Shared product catalog and grid
import Image from "next/image";
import Link from "next/link";

export const PRODUCTS = [
  {
    id: "wgw",
    name: "White Glove Wireless",
    label: "Sales operations",
    description: "AI-assisted sales, bill review, field activity, outreach, appointments, and owner controls for wireless teams.",
    sneakPeek: "A connected operating system for wireless sales teams that brings lead intake, customer follow-up, field execution, onboarding, and performance visibility into one place.",
    features: ["Lead and territory workflows", "AI-assisted calling and messaging", "Owner dashboards and approvals"],
    logo: "/logos/white-glove-wireless-app-icon-selected.png",
    previewHref: "/wireless",
    accent: "#00A8E0",
  },
  {
    id: "sales-platform",
    name: "White-Label AI Sales Platform",
    label: "Configurable CRM",
    description: "An approximately halfway-built platform for configurable CRM, calling, onboarding, billing, and role-based workflows.",
    sneakPeek: "A configurable foundation businesses can brand and adapt to their own pipeline, team roles, customer journey, communications, and operating rules.",
    features: ["Industry presets and branding", "Calling, SMS, and lead workflows", "Hiring, onboarding, and billing modules"],
    logo: "/logos/sales-platform-app-icon-selected.png",
    previewHref: "/sales-platform",
    accent: "#a78bfa",
  },
  {
    id: "spendsense",
    name: "SpendSense",
    label: "Founder finance",
    description: "Financial intelligence that turns transactions, runway, burn, and investor metrics into clearer founder decisions.",
    sneakPeek: "A founder-focused financial command center designed to explain where money is going, how long the company can operate, and which metrics need attention next.",
    features: ["Burn and runway visibility", "Founder and investor metrics", "Spending signals and guidance"],
    logo: "/logos/spendsense-brand-lockup-selected.png",
    previewHref: "/spendsense",
    accent: "#2dd4bf",
  },
  {
    id: "repairscout",
    name: "RepairScout",
    label: "Repair intelligence",
    description: "A two-sided automotive workflow for preliminary vehicle research, evidence-backed quotes, and repair-shop communication.",
    sneakPeek: "Drivers get clearer context before authorizing a repair, while shops get structured concerns, evidence, estimates, and a cleaner customer communication trail.",
    features: ["Preliminary vehicle assessments", "Transparent quote requests", "Shop verification and repair stages"],
    logo: "/logos/repairscout-brand-lockup-selected.png",
    previewHref: "/repairscout",
    accent: "#c8ff18",
  },
  {
    id: "trucktracker",
    name: "TruckTracker",
    label: "Local discovery",
    description: "Live food-truck discovery with maps, local food stories, dish ratings, reviews, and current wait-time signals.",
    sneakPeek: "A local discovery network where customers can find active trucks and vendors can build a following around location, menu highlights, and real community feedback.",
    features: ["Live location discovery", "Food stories and dish reviews", "Vendor and community signals"],
    logo: "/logos/trucktracker-app-icon-selected.png",
    previewHref: "/trucktracker",
    accent: "#ffb21c",
  },
  {
    id: "poopsense",
    name: "PoopSense",
    label: "Pet wellness information",
    description: "Safety-bounded visual pet-wellness information for stool and skin concerns, paired with a veterinary care finder.",
    sneakPeek: "Pet owners receive clearly limited, non-diagnostic information about what they photographed and can quickly search for nearby routine or emergency veterinary care.",
    features: ["Stool and skin photo screening", "Urgency-oriented safety language", "Location-based veterinary finder"],
    logo: "/logos/poopsense-app-icon.svg",
    previewHref: "https://web-production-fb2d1.up.railway.app/",
    accent: "#fb7185",
  },
  {
    id: "the-pass",
    name: "The Pass",
    label: "AI kitchen brigade",
    description: "A multi-model kitchen workflow that turns available ingredients into practical recipes reviewed for usability and safety.",
    sneakPeek: "Groq proposes dishes, while OpenAI and Anthropic review the proposals in parallel for practical corrections, ingredient fidelity, and food-safety concerns.",
    features: ["Four recipe directions per ticket", "Parallel multi-model review", "Ingredient and cookability checks"],
    logo: "/logos/the-pass-app-icon.svg",
    previewHref: "/the-pass",
    accent: "#e8541e",
  },
  {
    id: "physicalkey",
    name: "PhysicalKey",
    label: "Hardware authentication",
    description: "A first public beta combining a phone, an ESP32 hardware device, and cryptographic verification.",
    sneakPeek: "A physical proof-of-possession system designed around phone biometrics, BLE hardware, and Ed25519 challenge-response instead of relying on a copyable secret alone.",
    features: ["Native iOS and ESP32 pairing", "Ed25519 challenge-response", "Device and organization controls"],
    initial: "PK",
    previewHref: "https://physicalkey.whitegwireless.com/",
    accent: "#c06a3d",
  },
  {
    id: "brainos",
    name: "Personal BrainOS",
    label: "Private local AI",
    description: "A local-first personal AI operating system with durable memory, bounded agents, telecommunications, and approval gates.",
    sneakPeek: "A private AI workspace that runs on owner-controlled hardware, remembers approved context, coordinates specialist workflows, and keeps consequential actions behind explicit approval.",
    features: ["Local models and durable memory", "Bounded specialist agents", "Approval-gated communications and coding"],
    initial: "B",
    previewHref: "/brainos",
    accent: "#60a5fa",
  },
  {
    id: "white-glove-social",
    name: "White Glove Social",
    label: "Social operations",
    description: "AI-assisted content planning, media review, approval, and publishing workflows for growing brands.",
    sneakPeek: "A focused content operating system intended to help small teams move from ideas to reviewed, scheduled media without losing human control of the brand.",
    features: ["Content planning and briefs", "Media review and approval", "Publishing workflow coordination"],
    logo: "/logos/white-glove-social-app-icon.svg",
    accent: "#38bdf8",
  },
  {
    id: "sales-trainer",
    name: "Sales Trainer",
    label: "Conversation practice",
    description: "A practice environment for telecom sales conversations, pitch improvement, coaching, and performance tracking.",
    sneakPeek: "Reps can rehearse realistic customer conversations, receive structured coaching, and improve the specific parts of a pitch that affect trust and conversion.",
    features: ["Scenario-based practice", "Pitch feedback and coaching", "Progress and performance tracking"],
    initial: "ST",
    previewHref: "https://trainer.whitegwireless.com/",
    accent: "#22c55e",
  },
  {
    id: "trading-options",
    name: "Premium Scanner",
    label: "Options intelligence",
    description: "An options research platform for high-IV premium-selling setups, scored signals, risk review, and traceable decisions.",
    sneakPeek: "The scanner filters live options data, explains candidate setups, and routes any enabled broker action through a multi-stage risk and compliance approval pipeline.",
    features: ["Options-chain scanning and scoring", "Risk gates and kill switch", "Traceable decision journal"],
    initial: "PS",
    previewHref: "https://scanner.whitegwireless.com/",
    accent: "#facc15",
  },
  {
    id: "friendlyfriends",
    name: "FriendlyFriends",
    label: "AI + media lab",
    description: "A self-hosted AI usage dashboard, animated pet-story pipeline, and synchronized desktop companion in one experimental workspace.",
    sneakPeek: "The project explores low-cost model routing and a reusable media pipeline that turns short scripts into character art, dialogue, and assembled animated episodes.",
    features: ["AI provider cost and rate dashboard", "Pet-story media pipeline", "Sophia synchronized companion"],
    initial: "FF",
    accent: "#f472b6",
  },
  {
    id: "different-friends",
    name: "Different Friends Studio",
    label: "Bilingual media studio",
    description: "A human-reviewed pipeline for producing bilingual children’s animation from script through private YouTube draft.",
    sneakPeek: "Creators guide scripts, voices, assets, video rendering, and private draft uploads through approval checkpoints rather than letting automation publish on its own.",
    features: ["English and Spanish production", "Human approval at every stage", "Distributed rendering and private drafts"],
    initial: "DF",
    accent: "#fb923c",
  },
];

function ProductMark({ product }) {
  if (product.logo) {
    return <Image src={product.logo} alt={`${product.name} logo`} width={56} height={56} className="product-logo" />;
  }
  return <div className="product-logo product-monogram" aria-hidden="true">{product.initial}</div>;
}

export default function ProductGrid() {
  return (
    <div className="products">
      {PRODUCTS.map(product => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <article className="product" style={{ "--accent": product.accent }}>
            <ProductMark product={product} />
            <div className="product-copy">
              <span>{product.label}</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-card-foot">
                <strong>Coming soon</strong>
                <b>See sneak peek →</b>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
