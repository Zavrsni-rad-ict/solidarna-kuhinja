import storage from '@/utils/storage';

export const logout = (): any => {
  return storage.removeStorage();
};
