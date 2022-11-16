import Commerce from "@chec/commerce.js";
import { GetStaticProps, NextPage } from "next";
import { P_KEY } from "../constants/config";
import { Product } from "@chec/commerce.js/types/product";
import ProductList from "../components/Home/ProductList";
import Navbar from "../components/Navbar/Navbar";

export interface HomeProps {
  products: Product[];
}

const Home: NextPage<HomeProps> = ({ products }) => {
  // console.log(products);
  return (
    <>
      <ProductList products={products} />
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
