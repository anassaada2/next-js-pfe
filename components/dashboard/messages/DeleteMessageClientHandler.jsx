"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";


export default function DeleteMessageClientHandler({ id, modalId }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);

    const res = await fetch("/dashboard/message?action=deleteMessage", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const modal = bootstrap.Modal.getInstance(
        document.getElementById(modalId)
      );
      if (modal) modal.hide();

      startTransition(() => {
        router.refresh();
      });
    } else {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-danger"
      disabled={isPending}
    >
      {isPending ? "Suppression..." : "Supprimer"}
    </button>
  );
}
