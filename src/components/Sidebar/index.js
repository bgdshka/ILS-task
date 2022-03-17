import React, { useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { Resizable } from "re-resizable";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as ordersActions from "../../actions/orders";
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


const Sidebar = ({ orders, ordersActions }) => {
  const [width, setWidth] = React.useState(300);

  useEffect(() => {
    ordersActions.getOrders();
  }, []);

  return (
    <Resizable
      style={{ borderRight: "4px solid gray", height: "100%" }}
      size={{ width }}
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      onResizeStop={(e, direction, ref, d) => {
        setWidth(width + d.width);
      }}
    >
      <Table
        columns={columns}
        dataSource={orders}
        pagination={{ position: ["none", "none"] }}
        scroll={{ x: "max-content" }}
        rowSelection={{
          type: "radio",
          onChange: (selectedRowKey, selectedRows) => {
            ordersActions.selectOrder(selectedRows[0]);
          },
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              console.log(record, rowIndex);
            },
          };
        }}
      />
    </Resizable>
  );
};

function mapStateToProps() {
  const mapStateToProps = state => {
    return {
      orders: state.orders.orders,
    };
  };
  return mapStateToProps;
}

function mapDispatchToProps(dispatch) {
  return {
    ordersActions: bindActionCreators(ordersActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
