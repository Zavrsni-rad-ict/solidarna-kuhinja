import * as yup from 'yup';

import { Button } from '@/components';

import { Spinner } from '@/components/ui/spinner';
import { MapView } from '@/features/map';
import { EventRequest, useCreateEvent } from '../api';
import { FormWrapper } from '@/components/RHFFormProvider/FormWrapper';
import { useState } from 'react';
import { Coordinates } from '@/types';
import { EventForm } from './EventForm';
import { useTranslation } from 'react-i18next';

export const CreateEventView = () => {
  const { t } = useTranslation('General');
  const [location, setLocation] = useState<null | Coordinates>(null);

  const { mutate: createEvent } = useCreateEvent();
  const submtiHandler = async (data: EventRequest) =>
    createEvent({ ...data, latitude: location!.lat, longitude: location!.lng });

  const { t: tGE } = useTranslation('GlobalError');

  const schema = yup.object().shape({
    locationName: yup.string().required(tGE('required')),
    date: yup.string().required(),
    numberOfCooks: yup.number().required().min(1),
    numberOfFieldWorkers: yup.number().required().min(1),
    numberOfDeliveryPerson: yup.number().required().min(1),
  });

  return (
    <FormWrapper schema={schema} submitHandler={submtiHandler}>
      <EventForm />

      <div className="mt-10">
        <MapView location={location} setLocation={setLocation} />
      </div>

      <div className="col-start-1 mt-4">
        <Button
          variant="primary"
          type="submit"
          className="w-[82px] h-[40px] flex justify-center items-center transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={false}
        >
          {false ? <Spinner size="sm" className="text-white" /> : t('submit')}
        </Button>
      </div>
    </FormWrapper>
  );
};

CreateEventView.displayName = 'CreateEventView';
