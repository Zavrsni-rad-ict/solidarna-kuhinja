import { InputGroup } from '@/components';
import { useTranslation } from 'react-i18next';

export const EventForm = () => {
  const currentDate = new Date().toISOString().slice(0, 10);

  const { t } = useTranslation('CreateEventView');
  const { t: tG } = useTranslation('General');

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4">
      <div className="col-span-1">
        <InputGroup
          label={t('locationName')}
          name="locationName"
          placeholder={t('locationName')}
        />
      </div>
      <InputGroup
        label={t('calendar')}
        name="date"
        type="datetime-local"
        title="Firefox browser does not support time, only date"
        min={currentDate}
      />

      <div className="col-span-1 row-start-2">
        <InputGroup
          label={t('numberOfCooks')}
          name="numberOfCooks"
          placeholder={tG('number_input_placeholder')}
        />
      </div>
      <div className="col-span-1 row-start-2">
        <InputGroup
          label={t('numberOfFieldWorkers')}
          name="numberOfFieldWorkers"
          placeholder={tG('number_input_placeholder')}
        />
      </div>
      <div className="col-span-1 row-start-2">
        <InputGroup
          label={t('numberOfDeliveryPerson')}
          name="numberOfDeliveryPerson"
          placeholder={tG('number_input_placeholder')}
        />
      </div>
    </div>
  );
};

EventForm.displayName = 'EventForm';
