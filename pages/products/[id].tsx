import Commerce from "@chec/commerce.js";
import { Product } from "@chec/commerce.js/types/product";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { P_KEY } from "../../constants/config";
import s from "../../styles/pages/Products.module.scss";

interface Iparams extends ParsedUrlQuery {
  id: string;
}
interface ProductsProps {
  product: Product;
}

const Products: NextPage<ProductsProps> = ({ product }) => {
  return <div className={s.container}></div>;
};

export default Products;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as Iparams;
  // console.log(id);
  const commerce = new Commerce(P_KEY ?? "");
  const product = await commerce.products.retrieve(id);
  return {
    props: {
      product,
    },
  };
};
