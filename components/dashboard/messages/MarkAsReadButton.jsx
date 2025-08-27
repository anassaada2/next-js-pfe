'use client';

import { useTransition } from 'react';
import { markMessageAsRead } from '@/lib/actions';
import { toast } from 'react-hot-toast';

export default function MarkAsReadButton({ id, onRead }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('id', id);

      const result = await markMessageAsRead(formData);

      if (result?.success) {
        onRead(result.updated); // met à jour localement
        toast.success('Message marqué comme vu.');
      } else {
        toast.error('Erreur lors de la mise à jour.');
      }
    });
  };

  return (
    <button
      className="btn btn-primary"
      onClick={handleClick}
      data-bs-toggle="modal"
      data-bs-target={`#viewUserModal-${id}`}
      disabled={isPending}
    >
      {isPending ? '...' : 'View'}
    </button>
  );
}
