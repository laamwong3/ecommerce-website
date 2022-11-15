import "../styles/globals.scss";
import type { AppProps } from "next/app";
import ShoppingCart from "../contexts/ShoppingCart";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ShoppingCart>
      <Component {...pageProps} />
    </ShoppingCart>
  );
}
