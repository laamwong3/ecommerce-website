import React from "react";
import { Typography } from "antd";
import s from "./Footer.module.scss";

const { Text } = Typography;
const Footer = () => {
  return (
    <div className={s.footer}>
      <Text className={s.text}>Copyright 2022</Text>
    </div>
  );
};

export default Footer;
