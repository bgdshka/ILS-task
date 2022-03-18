import React, { useEffect } from "react";
import { Table, Tag, Space, Select } from "antd";
import { Resizable } from "re-resizable";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as ordersActions from "../../actions/orders";
import "antd/dist/antd.css";

const { Option } = Select;

const mapPoints = [
  { id: 1, name: "Склад 1", coords: [55.7152942, 37.6390595] },
  { id: 2, name: "Склад 2", coords: [55.792942, 37.6190595] },
  { id: 3, name: "Склад 3", coords: [55.792942, 37.6890595] },
];

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
    render: coords => {
      const defaultCoordsString = coords.join(", ");
      return (
        <div>
          <Select
            defaultValue={defaultCoordsString}
            onChange={value => console.log("value", value)}
          >
            <Option value={defaultCoordsString}>{defaultCoordsString}</Option>
            {mapPoints.map(point => (
              <Option key={point.id} value={point.coords.join(", ")}>
                {point.name}
              </Option>
            ))}
          </Select>
        </div>
      );
    },
  },
  {
    title: "Finish",
    dataIndex: "finish",
    key: "finish",
    render: coords => {
      const defaultCoordsString = coords.join(", ");
      return (
        <div>
          <Select
            defaultValue={defaultCoordsString}
            onChange={value => console.log("value", value)}
          >
            <Option value={defaultCoordsString}>{defaultCoordsString}</Option>
            {mapPoints.map(point => (
              <Option key={point.id} value={point.coords.join(", ")}>
                {point.name}
              </Option>
            ))}
          </Select>
        </div>
      );
    },
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (tags, record) => {
      return tags.map(tag => (
        <Tag color={tag === "Экспресс" ? "red" : "green"} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      ));
    },
  },
];

const Sidebar = ({ orders, ordersActions: { getOrders, selectOrder } }) => {
  const [width, setWidth] = React.useState(300);

  useEffect(() => {
    getOrders();
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
            selectOrder(selectedRows[0]);
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
