import { UserRequest, useCreateUser } from '../api';
import { UserForm } from './form/UserForm';

export const CreateUser = () => {
  // ? Mislim da nema potrebe da ovo prosledjujem kao prop, moze komotno u form komponente - Vanja
  const { mutateAsync: createUserAsync, status } = useCreateUser();

  const submitHandler = async (data: UserRequest) => {
    await createUserAsync(data);
  };

  return <UserForm submitHandler={submitHandler} />;
};

CreateUser.displayName = 'CreateUser';
