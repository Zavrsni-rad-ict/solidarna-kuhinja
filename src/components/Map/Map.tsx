import { MapContainer, Marker, TileLayer, Popup, useMap } from 'react-leaflet';

import 'react-leaflet-fullscreen/styles.css';
import 'leaflet/dist/leaflet.css';

import { useEffect, useRef, useState } from 'react';
import { SetViewOnClick } from './SetViewOnClick';
import { BELGRADE_COORDINATES } from '@/constants';
import { Coordinates, EventLocation } from '@/types';
import { calculateMapCenter } from '@/utils/calculateMapCenter';
import { DraggableMarker } from './DraggableMarker';

type Props = {
  eventLocations?: EventLocation[];
  location?: Coordinates | null;
  setLocation?: (location: Coordinates) => void;
};

const RecenterMap = ({ eventLocations, location }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (eventLocations) {
      const mapCenter = calculateMapCenter(eventLocations);
      map.flyTo(mapCenter);
    }
  }, [eventLocations]);

  useEffect(() => {
    if (location) {
      map.flyTo(location);
    }
  }, [location]);

  return null;
};

export const Map = ({ eventLocations, location, setLocation }: Props) => {
  const animateRef = useRef(true);

  return (
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

      <SetViewOnClick animateRef={animateRef} />

      <RecenterMap location={location} eventLocations={eventLocations} />
      {eventLocations &&
        eventLocations.map((location) => (
          <Marker
            position={[location.coordinates.lat, location.coordinates.lng]}
            key={location.name}
            eventHandlers={{
              mouseover: (event) => event.target.openPopup(),
            }}
          >
            <Popup>{location.name}</Popup>
          </Marker>
        ))}

      {!eventLocations && (
        <DraggableMarker
          lat={location?.lat ?? BELGRADE_COORDINATES.lat}
          lng={location?.lng ?? BELGRADE_COORDINATES.lng}
          setLocation={
            typeof setLocation === 'function' ? setLocation : undefined
          }
          center={BELGRADE_COORDINATES}
        />
      )}
    </MapContainer>
  );
};

Map.displayName = 'Map';
