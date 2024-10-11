import { EventRequest, useCreateEvent } from '../api';
import { EventFormWrapper } from './EventFormWrapper';

export const CreateEventView = () => {
  const { mutate: createEvent } = useCreateEvent();
  const submtiHandler = async (data: EventRequest) => createEvent(data);

  return <EventFormWrapper submitHandler={submtiHandler} />;
};

CreateEventView.displayName = 'CreateEventView';
