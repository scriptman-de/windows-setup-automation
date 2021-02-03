import "tailwindcss/tailwind.css";
import Head from "next/head";
import Nav from "../components/nav";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Windows Setup Automatisierung</title>
      </Head>
      <Nav />
      <main className="container mt-3 sm:mx-auto">
        <Component {...pageProps} className={"mt-3"} />
      </main>
    </>
  );
}

export default MyApp
