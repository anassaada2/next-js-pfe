"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";

// Action serveur pour ajouter un calculateur (à implémenter)
import { addCalculateur } from "@/lib/actions";
import { useRouter } from "next/navigation";
// Schéma de validation avec Zod
const calculateurSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  url: z.string().url("L'URL du fichier est invalide"),
  telechargement: z
    .number()
    .min(0, "Le nombre de téléchargements doit être positif")
    .optional(),
});

export default function FormAddCalculateur() {
  const [url, setUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter(); // déjà importé en haut

  // Gestion de l'upload de fichier
  const handleUpload = async (file, onSuccess) => {
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/pinata-excel", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok && data?.url) {
        onSuccess(data.url);
        toast.success("Fichier téléversé !");
      } else {
        toast.error("Erreur d’upload.");
      }
    } catch (err) {
      toast.error("Erreur inattendue.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const rawData = {
      name: form.get("name"),
      url,
      telechargement: Number(form.get("telechargement")) || 0,
    };

    try {
      calculateurSchema.parse(rawData);
      const res = await addCalculateur(rawData);
      if (res?.success) {
        toast.success("Calculateur ajouté !");
        setUrl(""); // Réinitialiser l'URL après succès
        e.target.reset(); // Réinitialiser le formulaire
        router.refresh(); // ✅ Rafraîchir la page
      } else {
        toast.error("Erreur lors de l’ajout.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((e) => toast.error(e.message));
      } else {
        toast.error("Erreur inattendue.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
     

      <div className="mb-3">
        <label>Nom</label>
        <input className="form-control" name="name" required />
      </div>

      <div className="mb-3">
        <label>Fichier (Excel)</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => handleUpload(e.target.files?.[0], setUrl)}
        />
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="d-block mt-2"
          >
            Voir le fichier
          </a>
        )}
      </div>

      <button className="btn btn-primary" type="submit" disabled={isUploading}>
        {isUploading ? "Téléversement..." : "Ajouter le calculateur"}
      </button>
    </form>
  );
}
