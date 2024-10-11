import { MapContainer, TileLayer, useMap } from 'react-leaflet';

import 'react-leaflet-fullscreen/styles.css';
import 'leaflet/dist/leaflet.css';

import { useEffect, useRef } from 'react';
import { SetViewOnClick } from './SetViewOnClick';
import { BELGRADE_COORDINATES, ICON_SIZE } from '@/constants';
import { Coordinates, EventLocation } from '@/types';
import { calculateMapCenter } from '@/utils/calculateMapCenter';
import { DraggableMarker } from './DraggableMarker';

import { EventLocationMarker } from './EventLocationMarker';

type Props = {
  eventLocations?: EventLocation[];
  location?: Coordinates | null;
  setLocation?: (location: Coordinates) => void;
  isDateEmpty?: boolean;
};

const RecenterMap = ({ eventLocations, location, isDateEmpty }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (eventLocations && eventLocations.length === 0) return;

    if (eventLocations && !isDateEmpty) {
      const mapCenter = calculateMapCenter(eventLocations);
      const bounds: [number, number][] = eventLocations.map((loc) => [
        loc.coordinates.lat,
        loc.coordinates.lng,
      ]);

      map.flyTo(mapCenter);
      map.fitBounds(bounds, {
        paddingTopLeft: [0, 30],
      });
    }
  }, [eventLocations]);

  useEffect(() => {
    if (location) {
      map.flyTo(location);
    }
  }, [location]);

  return null;
};

export const Map = ({
  eventLocations,
  location,
  setLocation,
  isDateEmpty,
}: Props) => {
  const animateRef = useRef(true);

  return (
    <div className="relative">
      {isDateEmpty && (
        <div className="group absolute bg-black bg-opacity-20 z-[9999] w-full h-full flex items-center justify-center hover:bg-opacity-40 transition">
          <span className="text-white text-4xl group-hover:visible">
            Izaberi Datum
          </span>
        </div>
      )}
      <MapContainer
        center={BELGRADE_COORDINATES}
        zoom={16}
        className="min-h-[480px]"
        id="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <SetViewOnClick animateRef={animateRef} />

        <RecenterMap location={location} eventLocations={eventLocations} />

        {eventLocations && !isDateEmpty && (
          <EventLocationMarker eventLocations={eventLocations} />
        )}

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
    </div>
  );
};

Map.displayName = 'Map';
