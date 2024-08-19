import { Modal } from '../Modal/Modal';
import IconInfo from '@/assets/info.svg?react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};
export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}: Props) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="p-4 md:p-5 text-center">
      <IconInfo width={64} />
      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        {message}
      </h3>
      <button
        type="button"
        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
        onClick={onConfirm}
      >
        Yes, I'm sure - hc
      </button>
      <button
        type="button"
        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={onClose}
      >
        No, cancel - HC
      </button>
    </div>
  </Modal>
);

DeleteConfirmationModal.displayName = 'DeleteConfirmationModal';
