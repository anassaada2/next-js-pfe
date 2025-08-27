"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useRouter } from "next/navigation";

const addServiceSchema = z.object({
  icon: z.string().url("L’icône doit être une URL valide"),
  title: z.string().min(1, "Le titre est requis."),
  brief: z.string().min(1, "Le résumé est requis."),
  description: z.string().min(1, "La description est requise."),
  animation: z.coerce.number().min(1, "L’animation est requise."),
});

function FormAddService() {
  const router = useRouter();
  const [iconUrl, setIconUrl] = useState("");

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
        toast.success("Icône téléchargée avec succès !", { id: toastId });
      } else {
        toast.error(data.error || "Échec de l’upload", { id: toastId });
      }
    } catch (error) {
      toast.error("Erreur lors de l’upload", { id: toastId });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const rawData = {
      icon: iconUrl,
      title: form.get("title"),
      brief: form.get("brief"),
      description: form.get("description"),
      animation: form.get("animation"),
    };

    try {
      addServiceSchema.parse(rawData);

      const toastId = toast.loading("Ajout du service...");

      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rawData),
      });

      toast.dismiss(toastId);

      if (!res.ok) {
        const { error } = await res.json();
        toast.error(error || "Erreur lors de l’ajout");
        return;
      }

      toast.success("Service ajouté avec succès !");
      router.refresh();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      } else {
        toast.error(error.message || "Erreur inattendue");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-body">
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
          <input type="text" name="title" className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Résumé</label>
          <input type="text" name="brief" className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Animation (ms)</label>
          <input
            type="number"
            name="animation"
            className="form-control"
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
          Ajouter
        </button>
      </div>
    </form>
  );
}

export default FormAddService;
