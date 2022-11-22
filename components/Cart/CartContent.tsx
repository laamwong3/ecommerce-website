import { CloseOutlined } from "@ant-design/icons";
import Commerce from "@chec/commerce.js";
import { Button, Col, InputNumber, Row, Select, Typography } from "antd";
import Table, { ColumnType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { P_KEY } from "../../constants/config";
import {
  ShoppingCartStatus,
  useShoppingCart,
} from "../../contexts/ShoppingCart";
import s from "./CartContent.module.scss";

interface DataType {
  key: string;
  name: string;
  quantity: number;
  price: string;
  itemId: string;
}

interface ItemsQuantity {
  quantity: number;
  itemId: string;
}
// const dataSource: DataType[] = [
//   { key: "1", name: "hello", price: 100, quantity: 2 },
//   { key: "2", name: "yes", price: 10, quantity: 20 },
// ];

const CartContent = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [itemsQuantity, setItemsQuantity] = useState<ItemsQuantity[]>([]);

  const {
    shoppingCart: { dispatch, state },
    refreshChckout,
    setRefreshChckout,
  } = useShoppingCart();
  const { cart } = state;

  useEffect(() => {
    let tempCart: DataType[] = [];
    let tempItem: ItemsQuantity[] = [];

    cart.data?.line_items.map((cartItem) => {
      tempCart.push({
        key: cartItem.id,
        itemId: cartItem.id,
        name: cartItem.name,
        price: cartItem.price.formatted_with_symbol,
        quantity: cartItem.quantity,
      });
      tempItem.push({
        itemId: cartItem.id,
        quantity: cartItem.quantity,
      });
    });

    setItemsQuantity(tempItem);
    setDataSource(tempCart);
  }, [refreshChckout]);

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    const commerce = new Commerce(P_KEY ?? "");
    const cartData = await commerce.cart.update(itemId, { quantity });
    dispatch({
      type: ShoppingCartStatus.CART_RETRIEVE_SUCCESS,
      payload: cartData.cart,
    });
    // setItemsQuantity();
    // setRefreshChckout(!refreshChckout);
  };

  const columns: ColumnType<DataType>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (currentQuantity, { itemId }) => (
        <Select
          options={[...Array(currentQuantity).keys()].map((q) => {
            return { value: q + 1 };
          })}
          value={
            itemsQuantity.find((keyword) => keyword.itemId === itemId)?.quantity
          }
          onChange={(newValue) => handleQuantityChange(itemId, newValue)}
          style={{ width: "100px" }}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "right",
      render: () => <Button icon={<CloseOutlined />} shape="circle" />,
    },
  ];

  return (
    <div className={s.container}>
      <div className={s.cart}>
        <Typography.Title>Shopping Cart</Typography.Title>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
            <Table
              pagination={false}
              columns={columns}
              dataSource={dataSource}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={6} xxl={6}>
            <div className={s.summary}>
              <Typography.Title style={{ textAlign: "center" }}>
                Sub-Total:{" "}
                <span style={{ color: "green" }}>
                  {cart.data?.subtotal.formatted_with_symbol}
                </span>
              </Typography.Title>
              <Button shape="round">Proceed to Checkout</Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CartContent;
