import { InputGroup } from '@/components';

export const EventForm = () => {
  const currentDate = new Date().toISOString().slice(0, 10);

  return (
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
  );
};

EventForm.displayName = 'EventForm';
