import { useParams } from 'react-router-dom';

export const EditEvent = () => {
  const params = useParams();
  console.log({ params });
  return <div>EditEvent</div>;
};

EditEvent.displayName = 'EditEvent';
