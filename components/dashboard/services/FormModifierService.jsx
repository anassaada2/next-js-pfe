"use client";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const updateServiceSchema = z.object({
  id: z.string(),
  icon: z.string().url("L’icône doit être une URL valide"),
  title: z.string().min(1, "Le titre est requis."),
  brief: z.string().min(1, "Le résumé est requis."),
  description: z.string().min(1, "La description est requise."),
  animation: z.coerce.number().min(1, "L’animation est requise."),
});

function FormModifierService({ service }) {
  const router = useRouter();
  const [iconUrl, setIconUrl] = useState(service.icon || "");

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    const toastId = toast.loading("Téléchargement de l’icône...");

    try {
      const res = await fetch("/api/pinata-images", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setIconUrl(data.url);
        toast.success("Icône mise à jour !", { id: toastId });
      } else {
        toast.error(data.error || "Échec upload", { id: toastId });
      }
    } catch (err) {
      toast.error("Erreur lors de l’upload", { id: toastId });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const rawData = {
      id: form.get("id"),
      icon: iconUrl,
      title: form.get("title"),
      brief: form.get("brief"),
      description: form.get("description"),
      animation: form.get("animation"),
    };

    try {
      updateServiceSchema.parse(rawData);

      const toastId = toast.loading("Mise à jour du service...");

      const res = await fetch(`/api/services/${service._id}`, {
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

      toast.success("Service modifié avec succès !");
      router.refresh();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      } else {
        toast.error(error.message || "Une erreur est survenue");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-body">
        <input type="hidden" name="id" value={service._id} />

        <div className="mb-3">
          <label className="form-label">Icône (image)</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileUpload}
          />
          {iconUrl && (
            <img
              src={iconUrl}
              alt="Icon"
              className="mt-2"
              style={{ width: "100px", height: "auto" }}
            />
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Titre</label>
          <input
            type="text"
            name="title"
            className="form-control"
            defaultValue={service.title}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Résumé</label>
          <input
            type="text"
            name="brief"
            className="form-control"
            defaultValue={service.brief}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            defaultValue={service.description}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Animation (ms)</label>
          <input
            type="number"
            name="animation"
            className="form-control"
            defaultValue={service.animation}
            required
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

export default FormModifierService;
