export type ControllerKey =
  | 'event'
  | 'components'
  | 'content-types'
  | 'email'
  | 'content-api'
  | 'auth'
  | 'user'
  | 'role'
  | 'permissions'
  | 'locales';

export type ControllerObj = {
  controllerName: ControllerKey;
  actionName: string;
  enabled: boolean;
};

export type Permissions = {
  [roleKey: string]: {
    // Ovo može biti naziv uloge ili neke grupe
    controllers: {
      [controllerKey in ControllerKey]: {
        // Ovo predstavlja kontroler
        [actionKey: string]: {
          // Ovo predstavlja akciju unutar kontrolera
          enabled: boolean; // Akcija ima atribut enabled
        };
      };
    };
  };
};
