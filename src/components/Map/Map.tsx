import { MapContainer, Marker, TileLayer, Popup, useMap } from 'react-leaflet';

import 'react-leaflet-fullscreen/styles.css';
import 'leaflet/dist/leaflet.css';

import { useEffect, useRef, useState } from 'react';
import { SetViewOnClick } from './SetViewOnClick';
import { BELGRADE_COORDINATES } from '@/constants';
import { Coordinates, EventLocation } from '@/types';
import { calculateMapCenter } from '@/utils/calculateMapCenter';

type Props = {
  eventLocations?: EventLocation[];
};

const RecenterMap = ({
  eventLocations,
}: {
  eventLocations: EventLocation[] | undefined;
}) => {
  const map = useMap();

  useEffect(() => {
    if (eventLocations) {
      const mapCenter = calculateMapCenter(eventLocations);
      map.flyTo(mapCenter);
    }
  }, [eventLocations]);

  return null;
};

export const Map = ({ eventLocations }: Props) => {
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

      <RecenterMap eventLocations={eventLocations} />
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
    </MapContainer>
  );
};

Map.displayName = 'Map';
