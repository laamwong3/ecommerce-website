import Commerce from "@chec/commerce.js";
import { Product } from "@chec/commerce.js/types/product";
import { GetStaticProps, NextPage } from "next";
import { type } from "os";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { P_KEY } from "../../constants/config";

interface Iparams extends ParsedUrlQuery {
  id: string;
}
interface ProductsProps {
  product: Product;
}

const Products: NextPage<ProductsProps> = ({ product }) => {
  return <div>Products</div>;
};

export default Products;

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { id } = params as Iparams;

//   const commerce = new Commerce(P_KEY ?? "");
//   const product = await commerce.products.retrieve(id, { type: "permalink" });
//   return {
//     props: {
//       product,
//     },
//   };
// };
