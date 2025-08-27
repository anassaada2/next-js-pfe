'use client';

import { useEffect } from 'react';

export default function ModalCloser() {
  useEffect(() => {
    function handleSubmit(event) {
      const form = event.target;
      if (form.matches('form[data-close-modal]')) {
        const modalElement = form.closest('.modal');
        if (modalElement) {
          const modal = window.bootstrap?.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        }
      }
    }

    document.addEventListener('submit', handleSubmit);

    return () => {
      document.removeEventListener('submit', handleSubmit);
    };
  }, []);

  return null;
}
