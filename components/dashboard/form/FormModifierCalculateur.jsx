"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { updateCalculateur } from "@/lib/actions";

// Schéma Zod
const calculateurSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  url: z.string().url("L'URL du fichier est invalide"),
  telechargement: z
    .number()
    .min(0, "Le nombre de téléchargements doit être positif")
    .optional(),
});

export default function FormModifierCalculateur({ calculateur }) {
  const router = useRouter();
  const [url, setUrl] = useState(calculateur.url || "");
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");

  // Extraire le CID depuis l'URL
  const extractCID = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

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
        setFileName(file.name);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const rawData = {
      id: calculateur._id,
      name: form.get("name"),
      url,
      telechargement: Number(form.get("telechargement")) || 0,
    };

    try {
      calculateurSchema.parse(rawData);
      const res = await updateCalculateur(rawData);
      if (res?.success) {
        toast.success("Calculateur modifié !");
        router.refresh();
      } else {
        toast.error("Erreur lors de la modification.");
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
        <input
          className="form-control"
          name="name"
          defaultValue={calculateur.name}
          required
        />
      </div>

      <div className="mb-3">
        <label>Fichier (Excel)</label>
        {url ? (
          <>
            <p className="mt-2">
              <strong>Fichier actuel :</strong>{" "}
              <a href={url} target="_blank" rel="noreferrer">
                {fileName || "Voir le fichier"}
              </a>
            </p>
            <p className="text-muted">
              Tu peux uploader un nouveau fichier pour remplacer.
            </p>
          </>
        ) : null}
        <input
          type="file"
          className="form-control"
          onChange={(e) => handleUpload(e.target.files?.[0], setUrl)}
        />
      </div>

      <div className="mb-3">
        <label>Téléchargements</label>
        <input
          type="number"
          className="form-control"
          name="telechargement"
          defaultValue={calculateur.telechargement || 0}
        />
      </div>

      <button className="btn btn-primary" type="submit" disabled={isUploading}>
        {isUploading ? "Téléchargement..." : "Modifier"}
      </button>
    </form>
  );
}
