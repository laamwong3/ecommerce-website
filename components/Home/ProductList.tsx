import Image from "next/image";
import React, { FC } from "react";
import { HomeProps } from "../../pages";
import s from "./ProductList.module.scss";

const ProductList: FC<HomeProps> = ({ products }) => {
  return (
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
          <p>{product.price.formatted_with_symbol}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
