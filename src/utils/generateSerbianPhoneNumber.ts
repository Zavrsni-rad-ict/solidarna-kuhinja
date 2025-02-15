const PROVIDER_NUMBERS = [
  '060',
  '061',
  '062',
  '063',
  '064',
  '065',
  '066',
  '068',
  '069',
] as const;

const MOBILE_NUMBER_LENGTH = 7;

export const generateSerbianPhoneNumber = () => {
  const providerNumber = getRandomProviderNumber(PROVIDER_NUMBERS);
  const userNumber = generateUserNumber();

  return `${providerNumber} ${userNumber}`;
};

const generateUserNumber = () =>
  Array.from({ length: MOBILE_NUMBER_LENGTH }, () =>
    Math.floor(Math.random() * 10),
  ).join('');

const getRandomProviderNumber = (arr: typeof PROVIDER_NUMBERS) =>
  arr[Math.floor(Math.random() * arr.length)];
