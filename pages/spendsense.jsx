import ProductThemePage from "../components/ProductThemePage";
export default function SpendSense(){return <ProductThemePage product={{
  name:"SpendSense",tagline:"See the story behind every dollar",eyebrow:"AI financial intelligence",logo:"/logos/spendsense-brand-lockup-selected.png",
  accent:"#2dd4bf",accent2:"#0f9f8f",rgb:"45,212,191",page:"#04100f",panel:"rgba(6,28,26,.78)",muted:"#7eaaa5",buttonText:"#03100e",
  background:"radial-gradient(circle at 72% 16%,rgba(45,212,191,.16),transparent 30%),radial-gradient(circle,rgba(45,212,191,.055) 1px,transparent 1.5px) 0 0/26px 26px,#04100f",
  heroBefore:"Your money already talks.",heroAccent:"Now you can understand it.",description:"Connect your accounts, let AI organize the noise, and turn everyday spending into clear decisions, practical plans, and measurable progress.",
  appUrl:"https://spendsense-seven.vercel.app",primary:"Open SpendSense",
  signals:[["Bank sync","Accounts in one view"],["AI categories","Less manual cleanup"],["Receipt scan","Capture spending instantly"],["Smart guidance","Ask your own financial data"]],
  sectionTitle:"Every transaction becomes part of a clearer financial picture.",sectionCopy:"The orbiting nodes in the logo become the product language: money flows in, AI connects the signals, and useful insight comes back out.",
  steps:[{title:"Connect the money",copy:"Securely link accounts through Plaid and bring transactions together in one living view."},{title:"Make sense of it",copy:"AI categorizes purchases, reads receipts, and reveals patterns hidden in daily spending."},{title:"Turn insight into action",copy:"Build budgets, monitor goals, receive alerts, and ask direct questions about your financial life."}],
  ctaKicker:"Connect · understand · plan · grow",ctaTitle:"Make every dollar easier to understand.",ctaCopy:"No spreadsheet archaeology. Just a clearer relationship with your money.",footer:"AI-powered personal finance"
}}/>}
