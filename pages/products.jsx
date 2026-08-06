export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/apps",
      permanent: true,
    },
  };
}

export default function ProductsRedirect() {
  return null;
}
