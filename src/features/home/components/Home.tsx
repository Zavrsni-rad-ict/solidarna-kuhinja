import { Map } from '@/components';
import { useFetchEvents } from '../api';
import { useMemo } from 'react';

export const Home = () => {
  const { data: events } = useFetchEvents();

  const eventLocations = useMemo(
    () =>
      events?.data.map((location) => ({
        name: location.attributes.locationName,
        date: location.attributes.date,
        coordinates: {
          lat: location.attributes.latitude,
          lng: location.attributes.longitude,
        },
        numberOfCooks: location.attributes.numberOfCooks,
        numberOfDeliveryPerson: location.attributes.numberOfDeliveryPerson,
        numberOfFieldWorkers: location.attributes.numberOfFieldWorkers,
      })),
    [events],
  );

  return <Map eventLocations={eventLocations} />;
};

Home.displayName = 'Home';
