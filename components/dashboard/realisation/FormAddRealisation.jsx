"use client";

import { toast } from "react-hot-toast";
import { z } from "zod";
import { useRouter } from "next/navigation";

const addRealisationSchema = z.object({
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères"),
  brief: z.string().min(5, "Le brief doit contenir au moins 5 caractères"),
  year: z.string().optional(), // date au format string (ex: "2023-05-12")
});

function FormAddRealisation() {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const rawData = {
      title: formData.get("title"),
      brief: formData.get("brief"),
      year: formData.get("year") || undefined,
    };

    try {
      addRealisationSchema.parse(rawData);

      const res = await fetch("/api/realisations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rawData),
      });

      if (!res.ok) {
        const { error } = await res.json();
        toast.error(error || "Une erreur est survenue");
        return;
      }

      toast.success("Réalisation ajoutée avec succès !");
      router.refresh();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      } else {
        toast.error(error.message || "Une erreur est survenue");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Titre</label>
        <input name="title" type="text" className="form-control" required />
      </div>

      <div className="mb-3">
        <label className="form-label">Brief</label>
        <textarea name="brief" className="form-control" required />
      </div>

      <div className="mb-3">
        <label className="form-label">Année</label>
        <input name="year" type="date" className="form-control" />
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Fermer
        </button>
        <button type="submit" className="btn btn-primary hvr-fill-black">
          Ajouter
        </button>
      </div>
    </form>
  );
}

export default FormAddRealisation;
