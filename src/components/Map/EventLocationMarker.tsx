import {
  useDeleteUserForEvent,
  useRegisterUserForEvent,
} from '@/features/home';
import { useUser } from '@/lib/auth';
import { Marker, Popup } from 'react-leaflet';

import IconChief from '@/assets/chief.svg?react';
import IconDeliveryBike from '@/assets/deliver-bike-svgrepo-com.svg?react';
import IconUser from '@/assets/user-svgrepo-com.svg?react';

import React from 'react';
import { EventLocation } from '@/types';
import { ICON_SIZE } from '@/constants';
import { Button } from '../Button';

export const EventLocationMarker = ({
  eventLocations,
}: {
  eventLocations: EventLocation[];
}) => {
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

  return eventLocations.map((location) => {
    const toggleSignText = user?.events && user?.events.length > 0;
    const shouldDisableButton =
      user?.events && user.events.some((event) => location.id !== event.id);

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
            <strong className="uppercase text-center">{location.name}</strong>
            <div className="flex flex-col my-2">
              <div className="flex gap-2">
                <IconChief width={ICON_SIZE.sm} height={ICON_SIZE.sm} />
                <strong>Broj Kuvara: </strong>
                {location.signedUpChefs} / {location.numberOfCooks ?? '-'}
              </div>
              <div className="flex gap-2">
                <IconDeliveryBike width={ICON_SIZE.sm} height={ICON_SIZE.sm} />
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
                  variant={shouldDisableButton ? 'disabled' : 'red'}
                  className="!p-1"
                  onClick={handleClick}
                  data-id={location.id}
                  data-number-of-cooks={location.numberOfCooks}
                  data-active-role={location.signedUpChefs}
                  data-sign-action={toggleSignText ? 'sign-out' : 'sign-in'}
                  disabled={shouldDisableButton}
                >
                  {/* If button is disabled I want to show "sign-in" */}
                  {!shouldDisableButton && toggleSignText
                    ? 'Odjavi se'
                    : 'Prijavi se'}
                </Button>
              )}
            </div>
          </div>
        </Popup>
      </Marker>
    );
  });
};

EventLocationMarker.displayName = 'EventLocationMarker';
