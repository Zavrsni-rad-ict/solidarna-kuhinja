import { Map } from '@/components';
import { useFetchEvents } from '../api';
import { useMemo } from 'react';

export const Home = () => {
  const { data: events } = useFetchEvents();

  const eventLocations = useMemo(
    () =>
      events?.data.map((location) => ({
        name: location.attributes.locationName,
        coordinates: {
          lat: location.attributes.latitude,
          lng: location.attributes.longitude,
        },
      })),
    [events],
  );

  return (
    <>
      <Map eventLocations={eventLocations} />
    </>
  );
};

Home.displayName = 'Home';
