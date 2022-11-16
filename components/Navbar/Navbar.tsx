import React from "react";
import s from "./Navbar.module.scss";
import { Typography } from "antd";
import Link from "next/link";

const { Title, Text, Paragraph } = Typography;

const Navbar = () => {
  return (
    <div className={s.navbar}>
      <div className={s.container}>
        <Link href={"/"} className={s.header}>
          E-commerce
        </Link>
        <Link href={"/"} className={s.cart}>
          Cart
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
