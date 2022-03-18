import React, { useEffect } from "react";
import { Table, Tag, Space, Select } from "antd";
import { Resizable } from "re-resizable";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as ordersActions from "../../actions/orders";
import "antd/dist/antd.css";
import { mapPoints } from "../../constants/mocks";
import { arraysEqual } from "../../functions/arrays";

const { Option } = Select;

const getColumns = handleChangeAddress => {
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
      render: (coords, record) => {
        const coordsString = coords.join(", ");
        return (
          <div>
            <Select
              defaultValue={coordsString}
              onChange={value =>
                handleChangeAddress({
                  orderKey: record.key,
                  column: "start",
                  coordinates: value.split(", "),
                })
              }
            >
              {mapPoints.map(point => (
                !arraysEqual(point.coords, record.finish.map(elem => Number(elem))) &&
                <Option key={point.key} value={point.coords.join(", ")}>
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
      render: (coords, record) => {
        const coordsString = coords.join(", ");
        return (
          <div>
            <Select
              defaultValue={coordsString}
              onChange={value =>
                handleChangeAddress({
                  orderKey: record.key,
                  column: "finish",
                  coordinates: value.split(", "),
                })
              }
            >
              {mapPoints.map(
                point =>
                  !arraysEqual(point.coords, record.start.map(elem => Number(elem))) && (
                    <Option key={point.key} value={point.coords.join(", ")}>
                      {point.name} 
                    </Option>
                  ),
              )}
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

  return columns;
};

const Sidebar = ({ orders, ordersActions: { getOrders, selectOrder, changeAddress } }) => {
  const [width, setWidth] = React.useState(300);

  useEffect(() => {
    getOrders();
  }, []);

  const handleChangeAddress = ({ orderKey, column, coordinates }) => {
    changeAddress({ orderKey, column, coordinates });
  };

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
        columns={getColumns(handleChangeAddress)}
        dataSource={orders}
        pagination={{ position: ["none", "bottomLeft"] }}
        scroll={{ x: "max-content" }}
        rowSelection={{
          type: "radio",
          onChange: (selectedRowKey, selectedRows) => {
            selectOrder(selectedRows[0]);
          },
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
