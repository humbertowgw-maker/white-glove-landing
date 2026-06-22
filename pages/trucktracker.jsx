import ProductThemePage from "../components/ProductThemePage";
export default function TruckTracker(){return <ProductThemePage product={{
  name:"TruckTracker",tagline:"Find the food that is moving",eyebrow:"Live food truck discovery",logo:"/logos/trucktracker-app-icon-selected.png",
  accent:"#ffb21c",accent2:"#ff4538",rgb:"255,178,28",page:"#110a06",panel:"rgba(37,20,7,.78)",muted:"#b19a82",buttonText:"#150c05",
  background:"radial-gradient(circle at 72% 18%,rgba(255,69,56,.14),transparent 28%),radial-gradient(circle at 25% 75%,rgba(255,178,28,.1),transparent 32%),#110a06",
  heroBefore:"Your next favorite meal",heroAccent:"is already nearby.",description:"See food trucks go live, discover what is serving around you, follow favorites, and turn local food into a real-time social experience.",
  appUrl:"https://trucktracker-eight.vercel.app",primary:"Find Food Trucks",
  signals:[["Live map","See who is serving now"],["Follow trucks","Never miss a stop"],["Social feed","Photos and local stories"],["Nearby discovery","Food around the corner"]],
  sectionTitle:"The pin finds the place. The truck brings the experience.",sectionCopy:"Bright map-red and food-truck yellow shape a fast, friendly interface built for motion, appetite, and local discovery.",
  steps:[{title:"See what is live",copy:"Open the map and immediately find active trucks, distance, and current location."},{title:"Discover the menu",copy:"Browse truck profiles, food photos, menus, stories, ratings, and nearby landmarks."},{title:"Follow the movement",copy:"Save favorites and keep up with new stops, posts, and community activity."}],
  ctaKicker:"Live food · local discovery",ctaTitle:"Find what’s serving now.",ctaCopy:"The best meal nearby may have wheels.",footer:"Food truck maps"
}}/>}
