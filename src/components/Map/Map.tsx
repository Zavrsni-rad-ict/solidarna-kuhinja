import { MapContainer, Marker, TileLayer, Popup, useMap } from 'react-leaflet';

import 'react-leaflet-fullscreen/styles.css';
import 'leaflet/dist/leaflet.css';

import { useEffect, useRef } from 'react';
import { SetViewOnClick } from './SetViewOnClick';
import { BELGRADE_COORDINATES, ICON_SIZE } from '@/constants';
import { Coordinates, EventLocation } from '@/types';
import { calculateMapCenter } from '@/utils/calculateMapCenter';
import { DraggableMarker } from './DraggableMarker';

import IconChief from '@/assets/chief.svg?react';
import IconDeliveryBike from '@/assets/deliver-bike-svgrepo-com.svg?react';
import IconUser from '@/assets/user-svgrepo-com.svg?react';

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
      const bounds: [number, number][] = eventLocations.map((loc) => [
        loc.coordinates.lat,
        loc.coordinates.lng,
      ]);

      map.flyTo(mapCenter);
      map.fitBounds(bounds);
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
            <Popup>
              <div className="flex flex-wrap items-center">
                <strong className="uppercase text-center">
                  {location.name}
                </strong>
                <div className="flex flex-col my-2">
                  <div className="flex gap-2">
                    <IconChief width={ICON_SIZE.sm} height={ICON_SIZE.sm} />
                    <strong>Broj Kuvara: </strong>0 /{' '}
                    {location.numberOfCooks ?? '-'}
                  </div>
                  <div className="flex gap-2">
                    <IconDeliveryBike
                      width={ICON_SIZE.sm}
                      height={ICON_SIZE.sm}
                    />
                    <strong>Broj Dostavljaca: </strong>0 /{' '}
                    {location.numberOfDeliveryPerson ?? '-'}
                  </div>
                  <div className="flex gap-2">
                    <IconUser width={ICON_SIZE.sm} height={ICON_SIZE.sm} />
                    <strong>Broj Ljudi na terenu: </strong>0 /{' '}
                    {location.numberOfFieldWorkers ?? '-'}
                  </div>
                </div>
              </div>
            </Popup>
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
