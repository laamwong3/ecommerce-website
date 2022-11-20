import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import Table, { ColumnType } from "antd/lib/table";
import React from "react";
import s from "./CartContent.module.scss";

interface DataType {
  key: string;
  name: string;
  quantity: number;
  price: number;
}

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
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text, val) => {
      console.log(text);
      console.log(val);
      return <a>{text}</a>;
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: "right",
    render: () => <Button icon={<CloseOutlined />} shape="circle" />,
  },
];

const dataSource: DataType[] = [
  { key: "1", name: "hello", price: 100, quantity: 2 },
  { key: "2", name: "yes", price: 10, quantity: 20 },
];

const CartContent = () => {
  return (
    <div className={s.container}>
      <div className={s.cart}>
        <Typography.Title> Shopping Cart</Typography.Title>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
            <Table
              pagination={false}
              columns={columns}
              dataSource={dataSource}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={6} xxl={6}></Col>
        </Row>
      </div>
    </div>
  );
};

export default CartContent;
