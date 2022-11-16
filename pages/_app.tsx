import "../styles/globals.scss";
import type { AppProps } from "next/app";
import ShoppingCart from "../contexts/ShoppingCart";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ecommerce</title>
        <meta name="description" content="Ecommerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ShoppingCart>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ShoppingCart>
    </>
  );
}
