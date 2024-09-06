import { Button, InputGroup } from '@/components';
import { RHFFormProvider } from '@/components/RHFFormProvider';
import { Spinner } from '@/components/ui/spinner';
import { MapView } from '@/features/map';
import { useForm } from 'react-hook-form';
import { EventRequest, useCreateEvent } from '../api';
import { FormWrapper } from '@/components/RHFFormProvider/FormWrapper';
import { useState } from 'react';
import { Coordinates } from '@/types';

export const CreateEventView = () => {
  const methods = useForm({
    mode: 'onSubmit',
    // resolver: yupResolver(schema),
    shouldFocusError: false,
  });

  const [location, setLocation] = useState<null | Coordinates>(null);

  const currentDate = new Date().toISOString().slice(0, 10);

  const { mutate: createEvent } = useCreateEvent();
  const submtiHandler = async (data: EventRequest) =>
    createEvent({ ...data, latitude: location!.lat, longitude: location!.lng });

  return (
    <FormWrapper schema={null} submitHandler={submtiHandler}>
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        <div className="col-span-1">
          <InputGroup
            label="Location Name - HC"
            name="locationName"
            placeholder="Location name"
          />
        </div>
        <InputGroup
          label="Calendar - HC"
          name="date"
          type="datetime-local"
          title="Firefox browser ne podrzava vreme, samo datum"
          min={currentDate}
        />

        <div className="col-span-1"></div>

        <div className="col-span-1 row-start-2">
          <InputGroup
            label="Koliko kuvara je potrebno - HC"
            name="numberOfCooks"
            placeholder="Uneti broj - HC"
          />
        </div>
        <div className="col-span-1 row-start-2">
          <InputGroup
            label="Koliko dostavljaca je potrebno - HC"
            name="numberOfFieldWorkers"
            placeholder="Uneti broj - "
          />
        </div>
        <div className="col-span-1 row-start-2">
          <InputGroup
            label="Koliko ljudi na terenu je potrebno - HC"
            name="numberOfDeliveryPerson"
            placeholder="Uneti broj - HC "
          />
        </div>
      </div>

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
