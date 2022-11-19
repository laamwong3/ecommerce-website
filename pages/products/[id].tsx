import Commerce from "@chec/commerce.js";
import { Product } from "@chec/commerce.js/types/product";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import ProductDetails from "../../components/Products/ProductDetails";
import { P_KEY } from "../../constants/config";
import { useShoppingCart } from "../../contexts/ShoppingCart";

interface Iparams extends ParsedUrlQuery {
  id: string;
}
export interface ProductsProps {
  product: Product;
}

const Products: NextPage<ProductsProps> = ({ product }) => {
  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
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
