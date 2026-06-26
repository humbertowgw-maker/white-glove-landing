// components/ProductGrid.jsx — Shared product grid used on / and /products
import Image from "next/image";
import Link from "next/link";

export const PRODUCTS = [
  {
    id: "wgw",
    name: "White Glove Wireless",
    label: "Sales OS",
    description: "AI sales, bill review, field reps, outreach, appointments, and owner controls for wireless teams.",
    logo: "/logos/white-glove-wireless-app-icon-selected.png",
    href: "/wireless",
    accent: "#00A8E0",
  },
  {
    id: "spendsense",
    name: "SpendSense",
    label: "Finance OS",
    description: "Connected spending intelligence, financial guidance, and owner-level money visibility.",
    logo: "/logos/spendsense-brand-lockup-selected.png",
    href: "/spendsense",
    accent: "#2dd4bf",
  },
  {
    id: "sales-platform",
    name: "Sales Platform",
    label: "Configurable CRM",
    description: "A white-label SaaS foundation for industry-specific pipelines, roles, and workflows.",
    logo: "/logos/sales-platform-app-icon-selected.png",
    href: "/sales-platform",
    accent: "#a78bfa",
  },
  {
    id: "repairscout",
    name: "RepairScout",
    label: "Repair intelligence",
    description: "AI diagnostics and quote context for drivers who need a clearer repair path.",
    logo: "/logos/repairscout-brand-lockup-selected.png",
    href: "/repairscout",
    accent: "#c8ff18",
  },
  {
    id: "trucktracker",
    name: "TruckTracker",
    label: "Local discovery",
    description: "Live food truck maps, follow signals, and local commerce discovery tools.",
    logo: "/logos/trucktracker-app-icon-selected.png",
    href: "/trucktracker",
    accent: "#ffb21c",
  },
  {
    id: "poopsense",
    name: "PoopSense",
    label: "Pet health AI",
    description: "Browser-based clinical image analysis for pet stool health and urgency reports.",
    logo: "/logos/poopsense-app-icon.svg",
    href: "https://web-production-fb2d1.up.railway.app/",
    accent: "#fb7185",
  },
  {
    id: "the-pass",
    name: "The Pass",
    label: "AI kitchen",
    description: "A multi-model chef brigade that turns ingredients into usable recipes.",
    logo: "/logos/the-pass-app-icon.svg",
    href: "/the-pass",
    accent: "#e8541e",
  },
];

function ProductLink({ product }) {
  const external = product.href.startsWith("http");
  const content = (
    <article className="product" style={{ "--accent": product.accent }}>
      <Image src={product.logo} alt={`${product.name} logo`} width={56} height={56} className="product-logo" />
      <div>
        <span>{product.label}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
    </article>
  );
  if (external) return <a href={product.href} target="_blank" rel="noreferrer">{content}</a>;
  return <Link href={product.href}>{content}</Link>;
}

export default function ProductGrid() {
  return (
    <div className="products">
      {PRODUCTS.map(product => <ProductLink product={product} key={product.id} />)}
    </div>
  );
}
