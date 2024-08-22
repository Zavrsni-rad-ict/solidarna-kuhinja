import * as yup from 'yup';
import { MAXIMUM_CHARACTERS } from '@/constants';
import { useTranslation } from 'react-i18next';

export const useSchema = () => {
  const { t: tGE } = useTranslation('GlobalError');

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, `${tGE('minimumCharacters')} 3`)
      .max(
        MAXIMUM_CHARACTERS,
        `${tGE('maximumCharacters')} ${MAXIMUM_CHARACTERS}`,
      )
      .required(),
  });

  return schema;
};
