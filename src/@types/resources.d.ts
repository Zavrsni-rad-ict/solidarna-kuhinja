interface Resources {
  Test: {
    hello_world: 'Hello World';
  };
  General: {
    sign_in: 'Sign In';
    actions: 'Acitons';
    edit: 'Edit';
    delete: 'Delete';
    no_data_available: 'No data available';
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
  };
  UserList: {
    columns: {
      username: 'Username';
    };
    createButton: 'Create User';
  };
}

export default Resources;
