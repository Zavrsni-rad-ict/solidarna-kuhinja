import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const overlay = document.querySelector('#overlay')!;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ children, isOpen, onClose }: Props) => {
  useEffect(() => {
    if (isOpen) {
      return document.body.classList.add('overflow-hidden');
    }

    return document.body.classList.remove('overflow-hidden');
  }, [isOpen]);
  useEffect(() => {
    // Add event listener to close the modal when the escape key is pressed
    const handleKeyDown = (event: any) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    isOpen &&
    createPortal(
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-slate-950 bg-opacity-55 flex justify-center items-center z-[999999]"
        onClick={onClose}
      >
        <div
          className="bg-white p-5 rounded-md max-w-lg w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
            title="Close modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only"></span>
          </button>
        </div>
      </div>,
      overlay,
    )
  );
};

Modal.displayName = 'Modal';
