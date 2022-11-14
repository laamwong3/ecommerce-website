import Head from "next/head";
import Image from "next/image";
import Commerce from "@chec/commerce.js";
import { GetStaticProps, NextPage } from "next";
import { P_KEY } from "../constants/config";
import { Product } from "@chec/commerce.js/types/product";
import s from "../styles/Home.module.css";

interface HomeProps {
  products: Product[];
}

const Home: NextPage<HomeProps> = ({ products }) => {
  console.log(products);
  return (
    <>
      <div>
        {products.map((product, index) => (
          <div key={index} className={s.card}>
            <Image
              className={s.img}
              src={product.image?.url ?? ""}
              alt={product.name}
              width={product.image?.image_dimensions.width}
              height={product.image?.image_dimensions.height}
            />

            <p>{product.name}</p>
            <p>{product.price.raw}</p>
          </div>
        ))}
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
