import React from "react";
import { Table, Tag, Space } from "antd";
import { Resizable } from "re-resizable";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as ordersActions from '../../../actions/orders';
import "antd/dist/antd.css";


const columns = [
  {
    title: "Order",
    dataIndex: "order",
    key: "order",
    render: text => <a>{text}</a>,
  },
  {
    title: "Start",
    dataIndex: "start",
    key: "start",
    render: coords => <div>{coords.join(", ")}</div>,
  },
  {
    title: "Finish",
    dataIndex: "finish",
    key: "finish",
    render: coords => <div>{coords.join(", ")}</div>,
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
          {console.log(text, record)}
        <a>Edit</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    order: "Заказ #123",
    start: [55.7353656,37.6218091],
    finish: [55.7352942,37.6190595],
  },
  {
    key: "2",
    order: "Заказ #124",
    start: [55.7353656,37.6218091],
    finish: [55.7364056,37.6200895],
  },
  {
    key: "3",
    order: "Заказ #125",
    start: [55.7353656,37.6218091],
    finish: [55.7400522,37.6248379],
  },
];

const Sidebar = () => {
  const [width, setWidth] = React.useState(300);

  return (
    <Resizable
      style={{ borderRight: "4px solid gray" }}
      size={{ width }}
      onResizeStop={(e, direction, ref, d) => {
        setWidth(width + d.width);
      }}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ["none", "none"] }}
        scroll={{ x: "max-content" }}
      />
    </Resizable>
  );
};

function mapStateToProps() {
    const mapStateToProps = (state) => {
      return {
        orders: state.orders,
      };
    };
    return mapStateToProps;
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      ordersActions: bindActionCreators(ordersActions, dispatch)
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
