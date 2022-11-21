import React, { ReactNode, useEffect } from "react";
import s from "./Navbar.module.scss";
import { Badge, Spin, Typography } from "antd";
import Link from "next/link";
import {
  ShoppingCartStatus,
  useShoppingCart,
} from "../../contexts/ShoppingCart";
import Commerce from "@chec/commerce.js";
import { P_KEY } from "../../constants/config";
import { LoadingOutlined } from "@ant-design/icons";
import Footer from "../Footer/Footer";
const { Title, Text, Paragraph } = Typography;

interface NavbarProps {
  children: ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  const {
    shoppingCart: { dispatch, state },
    refreshCart,
    setRefreshChckout,
    refreshChckout,
  } = useShoppingCart();

  const { cart } = state;

  // console.log(cart);

  useEffect(() => {
    (async () => {
      const commerce = new Commerce(P_KEY ?? "");
      dispatch({ type: ShoppingCartStatus.CART_RETRIEVE_REQUEST });
      const cartData = await commerce.cart.retrieve();
      // console.log(cartData);
      dispatch({
        type: ShoppingCartStatus.CART_RETRIEVE_SUCCESS,
        payload: cartData,
      });
      setRefreshChckout(!refreshChckout);
    })();
  }, [refreshCart]);

  return (
    <>
      <div>
        <div className={s.navbar}>
          <div className={s.container}>
            <Link href={"/"} className={s.header}>
              E-commerce
            </Link>
            {cart.loading ? (
              <Badge count={<LoadingOutlined />}>
                <Link href={"/"} className={s.cart}>
                  Cart
                </Link>
              </Badge>
            ) : (
              <Badge count={cart.data?.total_items} showZero>
                <Link href={"/cart"} className={s.cart}>
                  Cart
                </Link>
              </Badge>
            )}
          </div>
        </div>
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Navbar;
