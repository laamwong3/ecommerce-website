import { Button, Col, Divider, Input, Row, Typography } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { ProductsProps } from "../../pages/products/[id]";
import s from "./ProductDetails.module.scss";

const ProductDetails = ({ product }: ProductsProps) => {
  const [quantity, setQuantity] = useState(1);
  // console.log(quantity);

  return (
    <div className={s.container}>
      <div className={s.content}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
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
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
            <div className={s.product_details}>
              <div className={s.header}>
                <Typography.Title level={1}>{product.name}</Typography.Title>
                <Divider />
                <Typography.Title level={3}>Description:</Typography.Title>
                <p dangerouslySetInnerHTML={{ __html: product.description }} />
              </div>
              <div className={s.checkout}>
                <div>
                  <div className={s.form_item}>
                    <Typography.Title level={5} className={s.form_item_size}>
                      Price
                    </Typography.Title>
                    <Typography.Text className={s.form_item_size}>
                      {product.price.formatted_with_symbol}
                    </Typography.Text>
                  </div>
                  <div className={s.form_item}>
                    <Typography.Title level={5} className={s.form_item_size}>
                      Status
                    </Typography.Title>
                    {product.inventory.available > 0 ? (
                      <Typography.Text className={s.form_item_size}>
                        In Stock
                      </Typography.Text>
                    ) : (
                      <Typography.Text className={s.form_item_size}>
                        Sold Out
                      </Typography.Text>
                    )}
                  </div>
                  <div className={s.form_item}>
                    <Typography.Title level={5} className={s.form_item_size}>
                      Quantity
                    </Typography.Title>
                    <Input
                      className={s.form_item_size}
                      type="number"
                      placeholder="Enter Quantity"
                      min={1}
                      max={product.inventory.available}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                  </div>

                  <div className={s.button}>
                    <Button>Add to Cart</Button>
                  </div>
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
