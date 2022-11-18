import { Button, Col, Input, Row, Typography } from "antd";
import Image from "next/image";
import React from "react";
import { ProductsProps } from "../../pages/products/[id]";
import s from "./ProductDetails.module.scss";

const ProductDetails = ({ product }: ProductsProps) => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <div className={s.product_img}>
              <Image
                className={s.img}
                src={product.image?.url ?? ""}
                alt={product.name}
                width={product.image?.image_dimensions.width}
                height={product.image?.image_dimensions.height}
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <div className={s.product_details}>
              <div className={s.header}>
                <Typography.Title level={1}>{product.name}</Typography.Title>
                <Typography.Title level={3}>Description:</Typography.Title>
                <p dangerouslySetInnerHTML={{ __html: product.description }} />
              </div>
              <div className={s.checkout}>
                <div className={s.form_group}>
                  <div className={s.form_item}>
                    <Typography.Title level={5}>Price</Typography.Title>
                    <Typography.Text>
                      {product.price.formatted_with_symbol}
                    </Typography.Text>
                  </div>
                  <div className={s.form_item}>
                    <Typography.Title level={5}>Status</Typography.Title>
                    {product.inventory.available > 0 ? (
                      <Typography.Text>In Stock</Typography.Text>
                    ) : (
                      <Typography.Text>Sold Out</Typography.Text>
                    )}
                  </div>
                  <div className={s.form_item}>
                    <Typography.Title level={5}>Quantity</Typography.Title>
                    <Input
                      type="number"
                      placeholder="Enter Quantity"
                      min={1}
                      max={product.inventory.available}
                    ></Input>
                  </div>

                  <Button>Add to Cart</Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductDetails;
