import { Product } from "@chec/commerce.js/types/product";
import { Card } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HomeProps } from "../../../pages";
import s from "./ProductCard.module.scss";

const { Meta } = Card;
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/products/${product.name}`}>
      <Card
        className={s.card}
        hoverable
        cover={
          <Image
            className={s.img}
            src={product.image?.url ?? ""}
            alt={product.name}
            width={product.image?.image_dimensions.width}
            height={product.image?.image_dimensions.height}
          />
        }
      >
        <Meta
          className={s.meta}
          title={product.name}
          description={product.price.formatted_with_symbol}
        />
      </Card>
    </Link>
  );
};

export default ProductCard;
