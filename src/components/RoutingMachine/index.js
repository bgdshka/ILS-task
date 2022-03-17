import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({ selectedOrder }) => {
  console.log("createRoutineMachineLayer", selectedOrder);
  const points = selectedOrder
    ? [
        L.latLng(selectedOrder.start[0], selectedOrder.start[1]),
        L.latLng(selectedOrder.finish[0], selectedOrder.finish[1]),
      ]
    : [null];

  const instance = L.Routing.control({
    waypoints: points,
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
