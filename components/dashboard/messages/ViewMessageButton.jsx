'use client';

import { useTransition } from 'react';
import { markMessageAsRead } from '@/lib/actions';

export default function ViewMessageButton({ id, modalId }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    const formData = new FormData();
    formData.append("id", id);

    startTransition(() => {
      markMessageAsRead(formData).then(() => {
        // Ouvre la modale manuellement via JavaScript Bootstrap
        const modalElement = document.getElementById(modalId);
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      });
    });
  };

  return (
    <button
      onClick={handleClick}
      className="btn btn-primary btn-sm"
      disabled={isPending}
    >
      {isPending ? '...' : 'View'}
    </button>
  );
}
