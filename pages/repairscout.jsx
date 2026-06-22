import ProductThemePage from "../components/ProductThemePage";
export default function RepairScout(){return <ProductThemePage product={{
  name:"RepairScout",tagline:"Understand the warning before the repair",eyebrow:"AI automotive repair scout",logo:"/logos/repairscout-brand-lockup-selected.png",
  accent:"#c8ff18",accent2:"#84cc16",rgb:"200,255,24",page:"#080b06",panel:"rgba(18,27,10,.78)",muted:"#929b82",buttonText:"#0b0e08",
  background:"radial-gradient(circle at 72% 15%,rgba(200,255,24,.12),transparent 30%),repeating-radial-gradient(circle at 80% 25%,rgba(200,255,24,.035) 0 1px,transparent 2px 22px),#080b06",
  heroBefore:"Know what the dash",heroAccent:"is trying to tell you.",description:"Describe the symptom, decode the warning, compare likely repairs, and approach a shop with more confidence and less guesswork.",
  appUrl:"https://repairscout-smoky.vercel.app",primary:"Launch RepairScout",
  signals:[["AI diagnosis","Turn symptoms into possibilities"],["VIN-aware","Use real vehicle details"],["Shop search","Find help nearby"],["Cost range","Know what to expect"]],
  sectionTitle:"From dashboard warning to informed repair decision.",sectionCopy:"The logo’s instrument-cluster language carries through the experience: signals first, clear diagnosis next, then a practical route to repair.",
  steps:[{title:"Describe the signal",copy:"Enter symptoms, warning lights, sounds, or vehicle details in plain language."},{title:"Scout the likely causes",copy:"Review possible issues, urgency, typical repairs, and realistic cost ranges."},{title:"Compare trusted help",copy:"Find nearby repair shops and request quotes with the right context already attached."}],
  ctaKicker:"Less guessing · better questions",ctaTitle:"Face the repair with context.",ctaCopy:"Understand the likely problem before handing over the keys.",footer:"Automotive intelligence"
}}/>}
