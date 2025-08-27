"use client";

import { toast } from "react-hot-toast";
import { z } from "zod";
import { useRouter } from "next/navigation";

const updateRealisationSchema = z.object({
  id: z.string(),
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères"),
  brief: z.string().min(5, "Le brief doit contenir au moins 5 caractères"),
  year: z.string().optional(),
});

function FormModifierRealisation({ realisation }) {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const rawData = {
      id: formData.get("id"),
      title: formData.get("title"),
      brief: formData.get("brief"),
      year: formData.get("year") || undefined,
    };

    try {
      updateRealisationSchema.parse(rawData);

      const toastId = toast.loading("Mise à jour en cours...");

      const res = await fetch(`/api/realisations/${realisation._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rawData),
      });

      toast.dismiss(toastId);

      if (!res.ok) {
        const { error } = await res.json();
        toast.error(error || "Erreur lors de la mise à jour");
        return;
      }

      toast.success("Réalisation modifiée avec succès !");
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
      <div className="modal-body">
        <input type="hidden" name="id" value={realisation._id} />

        <div className="mb-3">
          <label className="form-label">Titre</label>
          <input
            type="text"
            name="title"
            className="form-control"
            defaultValue={realisation.title}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Brief</label>
          <textarea
            name="brief"
            className="form-control"
            defaultValue={realisation.brief}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Année</label>
          <input
            type="date"
            name="year"
            className="form-control"
            defaultValue={
              realisation.year
                ? new Date(realisation.year).toISOString().split("T")[0]
                : ""
            }
          />
        </div>
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
          Sauvegarder
        </button>
      </div>
    </form>
  );
}

export default FormModifierRealisation;
