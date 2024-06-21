const storagePrefix = 'zavrsni_rad-';

const storage = {
  get: (key: any) => {
    return localStorage.getItem(`${storagePrefix}${key}`);
  },
  set: (key: any, value: string) => {
    localStorage.setItem(`${storagePrefix}${key}`, value);
  },
  clear: (key: any) => {
    localStorage.removeItem(`${storagePrefix}${key}`);
  },
  clearStorage: () => {
    localStorage.clear();
  },
};

export default storage;
