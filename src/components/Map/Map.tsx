import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvent,
  useMap,
} from 'react-leaflet';
import { FullscreenControl } from 'react-leaflet-fullscreen';

import 'react-leaflet-fullscreen/styles.css';
import 'leaflet/dist/leaflet.css';
import AsyncSearchBar from '../AsyncSearchBar/AsyncSearchBar';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { SetViewOnClick } from './SetViewOnClick';
import { BELGRADE_COORDINATES } from '@/constants';
import { Draggable } from 'leaflet';
import { DraggableMarker } from './DraggableMarker';

const RecenterAutomatically = ({ lat, lng }: any) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
};

type LocationCoordinates = {
  lat: number;
  lng: number;
};

export const Map = () => {
  const [location, setLocation] = useState<never[] | LocationCoordinates[]>([]);
  const [query, setQuery] = useState('');

  console.log(location);
  const animateRef = useRef(true);

  return (
    <>
      <div className="my-4 relative z-[1001]">
        <AsyncSearchBar
          setLocation={setLocation}
          setQuery={setQuery}
          query={query}
        />
      </div>
      <MapContainer
        center={BELGRADE_COORDINATES}
        zoom={16}
        className="min-h-[320px]"
        id="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <DraggableMarker
          lat={location?.[0].lat ?? 0}
          lng={location?.[0].lng ?? 0}
          // setQuery={setLocation}
          setQuery={(e) => console.log({ e })}
          center={BELGRADE_COORDINATES}
        /> */}
        <SetViewOnClick animateRef={animateRef} />
        {location.length > 0 && (
          <RecenterAutomatically
            // Uvek mi dohvati poslednji iz pretrage
            lat={location[location.length - 1].lat}
            lng={location[location.length - 1].lng}
          />
        )}
        {/* <FullscreenControl position="topleft" /> */}
        {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      </MapContainer>
    </>
  );
};

Map.displayName = 'Map';
