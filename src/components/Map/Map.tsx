import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import { FullscreenControl } from 'react-leaflet-fullscreen';

import 'react-leaflet-fullscreen/styles.css';
import 'leaflet/dist/leaflet.css';

export const Map = () => {
  return (
    <MapContainer
      center={[44.8125, 20.4612]}
      zoom={16}
      className="min-h-[320px]"
      id="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <FullscreenControl position="topleft" /> */}
      {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
  );
};

Map.displayName = 'Map';
