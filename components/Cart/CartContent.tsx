import { CloseOutlined } from "@ant-design/icons";
import Commerce from "@chec/commerce.js";
import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { Button, Col, InputNumber, Row, Select, Spin, Typography } from "antd";
import Table, { ColumnType } from "antd/lib/table";
import { useRouter } from "next/router";
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
  selectedQuantity: number;
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
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutToken, setCheckoutToken] = useState<CheckoutToken>();
  // const [itemsQuantity, setItemsQuantity] = useState<ItemsQuantity[]>([]);
  const router = useRouter();

  const {
    shoppingCart: { dispatch, state },
    refreshChckout,
    setRefreshChckout,
    refreshCart,
    setRefreshCart,
  } = useShoppingCart();
  const { cart } = state;

  // console.log(cart.loading);

  useEffect(() => {
    let tempCart: DataType[] = [];
    // let tempItem: ItemsQuantity[] = [];

    cart.data?.line_items.map((cartItem) => {
      tempCart.push({
        key: cartItem.id,
        itemId: cartItem.id,
        name: cartItem.name,
        price: cartItem.price.formatted_with_symbol,
        quantity: cartItem.quantity,
        selectedQuantity: cartItem.quantity,
      });
      // tempItem.push({
      //   itemId: cartItem.id,
      //   quantity: cartItem.quantity,
      // });
    });

    // setItemsQuantity(tempItem);
    setDataSource(tempCart);
    setIsLoading(false);
  }, [refreshChckout]);

  useEffect(() => {
    (async () => {
      if (!cart.loading && cart.data?.id) {
        if (cart.data.line_items.length) {
          const commerce = new Commerce(P_KEY ?? "");
          const token = await commerce.checkout.generateToken(cart.data?.id, {
            type: "cart",
          });
          setCheckoutToken(token);
        }
      }
    })();
  }, [cart.loading]);
  console.log(checkoutToken?.line_items);
  const handleCheckout = async () => {
    const orderData: CheckoutCapture = {
      line_items: checkoutToken?.line_items,
      customer: {
        firstname: "Jane",
        lastname: "Doe",
        email: "janedoe.abc.com",
      },
      payment: {
        gateway: "test_gateway",
        card: {
          number: "1234123412341234",
          cvc: "123",
          expiry_month: "03",
          expiry_year: "2080",
          postal_zip_code: "1234",
        },
      },
    };

    const commerce = new Commerce(P_KEY ?? "");
    if (checkoutToken?.id) {
      const order = await commerce.checkout.capture(
        checkoutToken?.id,
        orderData
      );
      // dispatch({ type: ShoppingCartStatus.ORDER_SET, payload: order });
    }
    // const newCart = await commerce.cart.refresh();
    // dispatch({
    //   type: ShoppingCartStatus.CART_RETRIEVE_SUCCESS,
    //   payload: newCart,
    // });
    // setRefreshCart(!refreshCart);
  };

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    setIsLoading(true);

    const commerce = new Commerce(P_KEY ?? "");
    const cartData = await commerce.cart.update(itemId, { quantity });
    dispatch({
      type: ShoppingCartStatus.CART_RETRIEVE_SUCCESS,
      payload: cartData.cart,
    });
    // setItemsQuantity();
    // setRefreshChckout(!refreshChckout);
    setRefreshCart(!refreshCart);
  };

  const handleRemoveItemFromCart = async (itemId: string) => {
    setIsLoading(true);
    const commerce = new Commerce(P_KEY ?? "");
    const cartData = await commerce.cart.remove(itemId);
    dispatch({
      type: ShoppingCartStatus.CART_RETRIEVE_SUCCESS,
      payload: cartData.cart,
    });
    setRefreshCart(!refreshCart);
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
      render: (currentQuantity, { itemId, selectedQuantity }) =>
        isLoading ? (
          <Spin />
        ) : (
          <Select
            options={[...Array(10).keys()].map((q) => {
              return { value: q + 1 };
            })}
            value={selectedQuantity}
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
      render: (_, { itemId }) => (
        <Button
          disabled={isLoading}
          onClick={() => handleRemoveItemFromCart(itemId)}
          icon={<CloseOutlined />}
          shape="circle"
        />
      ),
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
                Sub-Total:
              </Typography.Title>
              <Typography.Title style={{ color: "green", marginTop: 0 }}>
                {isLoading ? (
                  <Spin />
                ) : (
                  cart.data?.subtotal.formatted_with_symbol
                )}
              </Typography.Title>
              <Button
                disabled={isLoading || cart.data?.line_items.length === 0}
                onClick={handleCheckout}
                // onClick={() => router.push("/checkout")}
                shape="round"
              >
                Proceed to Checkout
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CartContent;
