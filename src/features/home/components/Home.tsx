import { BasicInfo, Calendar, Map } from '@/components';
import { useFetchEventByDate } from '../api';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

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

  useEffect(() => {
    if (event?.data.length === 0) {
      toast.warning(tH('noAction'), { position: 'top-center' });
      return;
    }
  }, [event?.data]);

  return (
    <>
      <BasicInfo />

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
