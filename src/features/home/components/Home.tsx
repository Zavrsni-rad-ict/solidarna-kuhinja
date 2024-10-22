import { BasicInfo, Calendar, Map } from '@/components';
import { useFetchEventByDate } from '../api';
import { useMemo, useState } from 'react';
import { Alert } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const [date, setDate] = useState<string>('');
  const { data: event, isLoading } = useFetchEventByDate(date, {
    enabled: !!date,
    refetchOnMount: true,
    refetchOnWindowFocus: 'always',
  });

  const { t: tH } = useTranslation('Home');

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
        signedUpFieldWorkers: location.attributes.signedUpFieldWorkers,
        signedUpDeliverer: location.attributes.signedUpDeliverer,
        signedInUsers: location.attributes.users?.data,
      })),
    [event],
  );

  return (
    <>
      <BasicInfo />

      {event?.data.length === 0 && (
        <Alert color="red" className="w-fit">
          <span className="font-semibold">{tH('noAction')}</span>
        </Alert>
      )}

      <div className="my-3">
        <Calendar date={date} setDate={setDate} />
      </div>
      <Map
        eventLocations={eventLocations}
        isDateEmpty={date === ''}
        isFetching={isLoading}
      />
    </>
  );
};

Home.displayName = 'Home';
