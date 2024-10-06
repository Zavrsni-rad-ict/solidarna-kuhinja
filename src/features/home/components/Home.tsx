import { Calendar, Map } from '@/components';
import { useFetchEventByDate } from '../api';
import { useMemo, useState } from 'react';

export const Home = () => {
  const [date, setDate] = useState<string>('');
  const { data: event } = useFetchEventByDate(date, {
    enabled: !!date,
    refetchOnMount: true,
  });

  const eventLocations = useMemo(
    () =>
      event?.data.map((location) => ({
        id: location.id,
        name: location.attributes.locationName,
        date: location.attributes.date,
        coordinates: {
          lat: location.attributes.latitude,
          lng: location.attributes.longitude,
        },
        numberOfCooks: location.attributes.numberOfCooks,
        numberOfDeliveryPerson: location.attributes.numberOfDeliveryPerson,
        numberOfFieldWorkers: location.attributes.numberOfFieldWorkers,
        signedUpChefs: location.attributes.signedUpChefs,
      })),
    [event],
  );

  return (
    <>
      {!event && <>Izaberite datum - HC</>}
      {event?.data.length === 0 && <>Nema akcije sa zeljenim datumom - HC</>}

      <div className="my-3">
        <Calendar date={date} setDate={setDate} />
      </div>
      <Map eventLocations={eventLocations} isDateEmpty={date === ''} />
    </>
  );
};

Home.displayName = 'Home';
