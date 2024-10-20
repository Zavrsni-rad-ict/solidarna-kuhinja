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
    chooseDate: 'Choose date';
  };
  Sidebar: {
    home: 'Home';
    users: 'Users';
    createEvent: 'Create Event';
    listOfEvents: 'List of Events';
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
      role: 'Role';
      participationCount: 'Participation Count';
    };
    createButton: 'Create User';
  };
  User: {
    toastSuccess: {
      create: "You've created a user successfully";
      update: "You've updated a user successfully";
      delete: "You've deleted a user successfully";
    };
  };
  RoleList: {
    createButton: 'Create Role';
    roleName: 'Role Name';
  };
  Role: {
    toastSuccess: "You've deleted a role successfully";
  };
  CreateEventView: {
    locationName: 'Location Name';
    calendar: 'Calendar';
    numberOfCooks: 'Number of Cooks';
    numberOfFieldWorkers: 'Number of Field Workers';
    numberOfDeliveryPerson: 'Number of Delivery Person';
    mapLocation: 'Choose map location';
  };
  BasicInfo: {
    welcomeBack: 'Welcome back';
    participationInAction: 'How many times have you participated in actions?';
    lastTimeParticipated: 'Last time participated';
  };
  Modal: {
    yes: "Yes I'm sure";
    no: 'No, cancel';
    eventMessage: 'Are you sure you want to delete event?';
    userMessage: 'Are you sure you want to delete this user?';
  };
  Home: { noAction: 'There is no action with the desired date' };
  EditProfile: {
    languageChangeSuccess: 'You have successfully changed a language';
    chooseLanguage: 'Choose language';
  };
  Event: {
    toastSuccess: {
      create: "You've created an event successfully";
      update: "You've updated an event successfully";
      delete: "You've deleted an event successfully";
      signIn: "You've successfully registered for the event!";
      signOut: "You've successfully signed out for the event!";
    };
    marker: {
      numberOfChefs: 'Number of chefs';
      numberOfDeliverer: 'Number of deliverer';
      numberOfFieldWorkers: 'Number of Field Workers';
    };
  };
}

export default Resources;
