import { Dropdown, InputGroup } from '@/components';
import { RHFFormProvider } from '@/components/RHFFormProvider';
import { useForm } from 'react-hook-form';

// Ime, Prezime, EMAIL, lozinka, uloga
export const CreateUser = () => {
  const methods = useForm({
    mode: 'onSubmit',
    // resolver: yupResolver(schema),
    shouldFocusError: false,
  });

  const { handleSubmit, control } = methods;

  return (
    <RHFFormProvider onSubmit={() => {}} onKeyDown={() => {}} methods={methods}>
      <div className="max-w-[1280px] w-full grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-6">
          <InputGroup
            name="firstName"
            placeholder="First Name"
            label="First Name"
            control={control}
          />
        </div>
        <div className="col-span-6">
          <InputGroup
            name="lastName"
            placeholder="Last Name"
            label="Last Name"
            control={control}
          />
        </div>
        <div className="col-span-4">
          <InputGroup
            name="username"
            placeholder="Username"
            label="Username"
            control={control}
          />
        </div>

        <div className="col-span-4">
          <InputGroup
            name="email"
            placeholder="Email"
            label="Email"
            control={control}
          />
        </div>
        <div className="col-span-4">
          <InputGroup
            name="password"
            placeholder="passowrd"
            label="Password"
            type="password"
            control={control}
          />
        </div>

        <div className="col-span-12">
          <Dropdown label="Role">
            <option value="default" selected disabled>
              Choose a role
            </option>
            <option value="AS">United States</option>
            <option value="US">United States</option>
          </Dropdown>
        </div>
      </div>
    </RHFFormProvider>
  );
};

CreateUser.displayName = 'CreateUser';
