import { Button, InputGroup } from '@/components';
import { RHFFormProvider } from '@/components/RHFFormProvider';
import { Spinner } from '@/components/ui/spinner';
import { MapView } from '@/features/map';
import { useForm } from 'react-hook-form';
import { EventRequest, useCreateEvent } from '../api';
import { FormWrapper } from '@/components/RHFFormProvider/FormWrapper';
import { useState } from 'react';
import { Coordinates } from '@/types';
import { EventForm } from './EventForm';

export const CreateEventView = () => {
  const methods = useForm({
    mode: 'onSubmit',
    // resolver: yupResolver(schema),
    shouldFocusError: false,
  });

  const [location, setLocation] = useState<null | Coordinates>(null);

  const { mutate: createEvent } = useCreateEvent();
  const submtiHandler = async (data: EventRequest) =>
    createEvent({ ...data, latitude: location!.lat, longitude: location!.lng });

  return (
    <FormWrapper schema={null} submitHandler={submtiHandler}>
      <EventForm />

      <MapView location={location} setLocation={setLocation} />

      <div className="col-start-1 mt-4">
        <Button
          variant="primary"
          type="submit"
          className="w-[82px] h-[40px] flex justify-center items-center transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={false}
        >
          {false ? <Spinner size="sm" className="text-white" /> : 'SUBMIT - HC'}
        </Button>
      </div>
    </FormWrapper>
  );
};

CreateEventView.displayName = 'CreateEventView';
