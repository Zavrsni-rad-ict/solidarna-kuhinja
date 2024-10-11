import { useParams } from 'react-router-dom';
import { EventFormWrapper } from './EventFormWrapper';
import { useFetchEventById } from '../api';
import { Spinner } from '@/components/ui/spinner';

export const EditEvent = () => {
  const id = useParams().id as string;

  const { data: event, isFetching, isError, error } = useFetchEventById(id);

  if (isFetching || !event) {
    return <Spinner />;
  }

  if (isError) {
    return <>{error}</>;
  }

  return (
    <EventFormWrapper
      data={event.data.attributes}
      submitHandler={() => {
        console.log('submit handler');
      }}
    />
  );
};

EditEvent.displayName = 'EditEvent';
