import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import { connect } from "react-redux";
import { DEFAULT_COORDS } from "../../constants/mocks";
import RoutineMachine from "../RoutingMachine";
import "./Map.css";

const Map = ({ selectedOrder }) => {
  const rMachine = useRef();

  const changeStyles = () => {
    const element = document.getElementsByClassName("leaflet-routing-alternatives-container")[0];
    const leafletRoutingContainer = ReactDOM.findDOMNode(element).style.display;
    ReactDOM.findDOMNode(element).style.display =
      !leafletRoutingContainer || leafletRoutingContainer === "none" ? "block" : "none";
  };

  useEffect(() => {
    if (rMachine.current) {
      rMachine.current.setWaypoints([selectedOrder.start, selectedOrder.finish]);
    }
  }, [JSON.stringify(selectedOrder), rMachine]);

  return (
    <MapContainer doubleClickZoom={false} id="mapId" zoom={14} center={DEFAULT_COORDS}>
      {selectedOrder && (
        <Button className="Map__LegendButton" onClick={changeStyles}>
          Легенда маршрута и альтернативные пути
        </Button>
      )}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri"
      />
      <RoutineMachine ref={rMachine} selectedOrder={selectedOrder} />
    </MapContainer>
  );
};

function mapStateToProps() {
  const mapStateToProps = state => {
    return {
      selectedOrder: state.orders.selectedOrder,
    };
  };
  return mapStateToProps;
}

export default connect(mapStateToProps)(Map);
