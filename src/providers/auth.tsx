import { configureAuth } from 'react-query-auth';

// async function handleUserResponse(data) {
//   Object.entries(data).forEach(([key, value]) => {
//     storage.set(key, value);
//   });

//   const user = await getLoggedInUser();

//   return user;
// }

// async function loadUser() {
//   if (storage.get('access_token')) {
//     try {
//       const data = await getLoggedInUser();

//       return data;
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
//   }

//   return null;
// }

// async function loginFn(data) {
//   const response = await loginWithEmailAndPassword(data);
//   const user = await handleUserResponse(response);
//   storage.set('user_role', user.role);
//   return user;
// }

// async function registerFn(data) {
//   const response = await registerWithEmailAndPassword(data);
//   const user = await handleUserResponse(response);
//   return user;
// }

// async function logoutFn() {
//   const refreshTokenId = storage.get('refresh_token_id');

//   if (!refreshTokenId) return;
//   try {
//     await performLogout(refreshTokenId);
//     storage.clearStorage();
//     // window.location.assign(window.location.origin);
//   } catch (error) {
//     console.log('##LOGOUT ERROR: ', error);
//   }
// }

const authConfig = {
  userFn: () => {},
  loginFn: () => {},
  registerFn: () => {},
  logoutFn: () => {},
};
// userFn: getUser,
// loginFn: async (data: LoginInput) => {
//   const response = await loginWithEmailAndPassword(data);
//   return response.user;
// },
// registerFn: async (data: RegisterInput) => {
//   const response = await registerWithEmailAndPassword(data);
//   return response.user;
// },
// logoutFn: logout,

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig as any); // TODO: Remove any
