import Head from "next/head";
import Image from "next/image";
import Commerce from "@chec/commerce.js";
import { GetStaticProps, NextPage } from "next";
import { P_KEY } from "../constants/config";
import { Product } from "@chec/commerce.js/types/product";
import s from "../styles/Home.module.scss";
import ProductList from "../components/Home/ProductList";

export interface HomeProps {
  products: Product[];
}

const Home: NextPage<HomeProps> = ({ products }) => {
  console.log(products);
  return (
    <>
      <div>
        <ProductList products={products} />
      </div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const commerce = new Commerce(P_KEY ?? "");
  const { data: products } = await commerce.products.list();
  return {
    props: {
      products,
    },
  };
};
