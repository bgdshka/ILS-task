import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { connect } from "react-redux";
import { DEFAULT_COORDS } from "../../constants/mocks";
import RoutineMachine from "../RoutingMachine";

const Map = ({ selectedOrder }) => {
  const rMachine = useRef();

  useEffect(() => {
    if (rMachine.current) {
      console.log("rMachine", rMachine.current);
      rMachine.current.setWaypoints([selectedOrder.start, selectedOrder.finish]);
    }
  }, [selectedOrder.key, rMachine]);

  return (
    <MapContainer doubleClickZoom={false} id="mapId" zoom={14} center={DEFAULT_COORDS}>
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
