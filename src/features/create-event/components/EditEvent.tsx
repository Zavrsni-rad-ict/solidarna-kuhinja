import { useParams } from 'react-router-dom';
import { EventFormWrapper } from './EventFormWrapper';
import { EventRequest, useFetchEventById, useUpdateEvent } from '../api';
import { Spinner } from '@/components/ui/spinner';

export const EditEvent = () => {
  const id = useParams().id as string;

  const { data: event, isError, isLoading, error } = useFetchEventById(id);
  const { mutate: updateEvent } = useUpdateEvent();

  const submitHandler = (data: EventRequest) =>
    updateEvent({ event: data, id });

  if (isLoading || !event) {
    return <Spinner />;
  }

  if (isError) {
    return <>{error}</>;
  }

  return (
    <EventFormWrapper
      data={event.data.attributes}
      submitHandler={submitHandler}
    />
  );
};

EditEvent.displayName = 'EditEvent';
