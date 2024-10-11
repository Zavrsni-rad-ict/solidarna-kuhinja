import * as yup from 'yup';

import { FormWrapper } from '@/components/RHFFormProvider/FormWrapper';
import { useState } from 'react';
import { EventForm } from './EventForm';
import { MapView } from '@/features/map';
import { Button } from '@/components';
import { Spinner } from '@/components/ui/spinner';
import { Coordinates, LocationAttributes } from '@/types';
import { useTranslation } from 'react-i18next';
import { EventRequest } from '../api';

type Props = {
  submitHandler: (data: EventRequest) => void;
  data: LocationAttributes;
};

export const EventFormWrapper = ({ submitHandler, data }: Props) => {
  const { t } = useTranslation('General');
  const { t: tGE } = useTranslation('GlobalError');

  const [location, setLocation] = useState<null | Coordinates>(() =>
    data ? { lat: data.latitude, lng: data.longitude } : null,
  );

  const schema = yup.object().shape({
    locationName: yup.string().required(tGE('required')),
    date: yup.string().required(),
    numberOfCooks: yup.number().required().min(1),
    numberOfFieldWorkers: yup.number().required().min(1),
    numberOfDeliveryPerson: yup.number().required().min(1),
  });

  const buttonText = data ? t('edit') : t('submit');

  return (
    <FormWrapper
      schema={schema}
      submitHandler={submitHandler}
      defaultValues={data}
    >
      <EventForm />

      <div className="mt-10">
        <MapView
          location={location}
          setLocation={setLocation}
          querySearch={data.locationName ?? ''}
        />
      </div>

      <div className="col-start-1 mt-4">
        <Button
          variant="primary"
          type="submit"
          className="w-[82px] h-[40px] flex justify-center items-center transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={false}
        >
          {false ? <Spinner size="sm" className="text-white" /> : buttonText}
        </Button>
      </div>
    </FormWrapper>
  );
};

EventFormWrapper.displayName = 'EventFormWrapper';
