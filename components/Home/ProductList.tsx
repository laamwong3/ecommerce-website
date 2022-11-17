import { Col, Row } from "antd";
import Image from "next/image";
import React, { FC } from "react";
import { HomeProps } from "../../pages";
import ProductCard from "./ProductCard/ProductCard";
import s from "./ProductList.module.scss";

const ProductList = ({ products }: HomeProps) => {
  return (
    <>
      <div className={s.container}>
        {/* {products.map((product, index) => (
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
      ))} */}
        <div className={s.content}>
          <Row gutter={[32, 32]} justify={"space-evenly"}>
            {products.map((product, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={8} xl={6} xxl={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default ProductList;
