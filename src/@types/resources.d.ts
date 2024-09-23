interface Resources {
  Test: {
    hello_world: 'Hello World';
  };
  General: {
    sign_in: 'Sign In';
    actions: 'Actions';
    edit: 'Edit';
    delete: 'Delete';
    no_data_available: 'No data available';
    number_input_placeholder: 'Enter a number';
    submit: 'Submit';
  };
  Login: {
    password: 'Password';
    errors: {
      validation: {
        email: 'Email is not valid';
        password: 'Password is not valid';
      };
    };
  };
  GlobalError: {
    required: 'Field is required';
    minimumCharacters: 'Minimum character is';
    maximumCharacters: 'Maximum character is';
    capitalLetter: 'Field must begin with capital letter';
  };
  UserList: {
    columns: {
      username: 'Username';
      firstName: 'First Name';
      lastName: 'Last name';
    };
    createButton: 'Create User';
  };
  RoleList: {
    createButton: 'Create Role';
    roleName: 'Role Name';
  };
  CreateEventView: {
    locationName: 'Location Name';
    calendar: 'Calendar';
    numberOfCooks: 'Number of Cooks';
    numberOfFieldWorkers: 'Number of Field Workers';
    numberOfDeliveryPerson: 'Number of Delivery Person';
    mapLocation: 'Choose map location';
  };
}

export default Resources;
