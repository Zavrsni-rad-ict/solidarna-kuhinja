import { useState } from 'react';

export const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return { isOpenModal, setIsOpenModal };
};
