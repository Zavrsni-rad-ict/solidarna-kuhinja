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
import { useLocation } from 'react-router-dom';
import { useUser } from '@/lib/auth';

import { Button } from '../Button';
import {
  useRegisterUserForEvent,
  useDeleteUserForEvent,
} from '@/features/home';

type Props = {
  eventLocations?: EventLocation[];
  location?: Coordinates | null;
  setLocation?: (location: Coordinates) => void;
  isDateEmpty?: boolean;
};

const RecenterMap = ({ eventLocations, location }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (eventLocations && eventLocations.length === 0) return;

    if (eventLocations) {
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

  const loc = useLocation();

  const { data: user } = useUser({ refetchOnMount: true });

  const { mutate: registerUserForEvent } = useRegisterUserForEvent();
  const { mutate: deleteUserForEvent } = useDeleteUserForEvent();

  const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    const signAction = ev.currentTarget.dataset.signAction as
      | 'sign-in'
      | 'sign-out';
    const eventId = Number(ev.currentTarget.dataset.id);
    const numberOfCooks = Number(ev.currentTarget.dataset.numberOfCooks);
    const signedUpChefs = Number(ev.currentTarget.dataset.signedUpChefs);

    if (signAction === 'sign-out') {
      return deleteUserForEvent({ eventId, userId: user!.id });
    }

    registerUserForEvent({
      eventId,
      usersIds: [user!.id],
      numberOfCooks,
      signedUpChefs,
    });
  };

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
        {eventLocations &&
          eventLocations.map((location) => {
            const toggleSignText = user?.events && user?.events.length > 0;

            return (
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
                        <strong>Broj Kuvara: </strong>
                        {location.signedUpChefs} /{' '}
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

                    <div className="my-1 w-full flex justify-end">
                      {user?.role.type !== 'admin' && (
                        <Button
                          type="button"
                          variant="red"
                          className="!p-1"
                          onClick={handleClick}
                          data-id={location.id}
                          data-number-of-cooks={location.numberOfCooks}
                          data-signed-up-chefs={location.signedUpChefs}
                          data-sign-action={
                            toggleSignText ? 'sign-out' : 'sign-in'
                          }
                        >
                          {toggleSignText ? 'Odjavi se' : 'Prijavi se'}
                        </Button>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}

        {loc.pathname === '/create-event' && !eventLocations && (
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
