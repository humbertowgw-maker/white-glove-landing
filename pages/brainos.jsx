export async function getServerSideProps() {
  return {
    redirect: {
      destination: "https://brainos.whitegwireless.com",
      permanent: false,
    },
  };
}

export default function BrainOSRedirect() {
  return null;
}
