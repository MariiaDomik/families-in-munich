import 'leaflet';

declare module 'leaflet' {
  function markerClusterGroup(options?: any): L.MarkerClusterGroup;
  
  class MarkerClusterGroup extends L.LayerGroup {
    clearLayers(): this;
    addLayer(layer: L.Layer): this;
  }
} 