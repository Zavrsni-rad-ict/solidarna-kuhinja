const storage = {
  get: (key: any) => {
    return localStorage.getItem(`${key}`);
  },
  set: (key: any, value: string) => {
    localStorage.setItem(`${key}`, value);
  },
  removeItem: (key: any) => {
    localStorage.removeItem(`${key}`);
  },
  removeStorage: () => {
    localStorage.clear();
  },
};

export default storage;
