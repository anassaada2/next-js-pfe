"use client";

import { useState, useRef } from "react";
import { addFicheTechnique } from "@/lib/actions";
import { toast } from "react-hot-toast";
import { z } from "zod";

const ficheTechniqueSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  description: z.string().min(5, "La description est trop courte"),
  caracteristiques: z.object({
    materiaux: z.string().min(1),
    densite: z.coerce.number().min(0),
    couleurs: z.array(z.string()).optional(),
    dimensions_cm: z.string(),
    poids_kg: z.coerce.number().min(0),
    volume_bloc_m3: z.coerce.number().min(0),
    temps_pose_m2_h_ouvrier: z.coerce.number().min(0),
    entraxes_cm: z.array(z.number()).optional(),
    distance_entre_blocs_cm: z.array(z.number()).optional(),
    resistance_poinconnement_daN: z.coerce.number().min(0),
    classement_feu: z.string(),
    conductivite_thermique_W_mK: z.coerce.number().min(0),
  }),
  exigences_qualite: z.object({
    document_CSTB: z.string(),
    norme: z.string(),
  }),
  avantages: z.array(z.string()).optional(),
  dessin_technique: z.object({
    section_blocs: z.string().optional(),
    section_dalle: z.string().optional(),
  }),
  support_technique: z.object({
    bureau_etudes: z.string(),
    assistance: z.array(z.string()).optional(),
  }),
});

export default function FormAddficheTechnique() {
  const [isUploading, setIsUploading] = useState(false);
  const [sectionBlocsUrl, setSectionBlocsUrl] = useState("");
  const [sectionDalleUrl, setSectionDalleUrl] = useState("");

  const sectionBlocsInputRef = useRef(null);
  const sectionDalleInputRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();

    if (isUploading) return;

    const formData = new FormData(event.currentTarget);

    const rawData = {
      name: formData.get("name"),
      description: formData.get("description"),
      caracteristiques: {
        materiaux: formData.get("materiaux"),
        densite: formData.get("densite"),
        couleurs: formData
          .get("couleurs")
          ?.split(",")
          .map((c) => c.trim()),
        dimensions_cm: formData.get("dimensions_cm"),
        poids_kg: formData.get("poids_kg"),
        volume_bloc_m3: formData.get("volume_bloc_m3"),
        temps_pose_m2_h_ouvrier: formData.get("temps_pose_m2_h_ouvrier"),
        entraxes_cm: formData.get("entraxes_cm")?.split(",").map(Number),
        distance_entre_blocs_cm: formData
          .get("distance_entre_blocs_cm")
          ?.split(",")
          .map(Number),
        resistance_poinconnement_daN: formData.get(
          "resistance_poinconnement_daN"
        ),
        classement_feu: formData.get("classement_feu"),
        conductivite_thermique_W_mK: formData.get(
          "conductivite_thermique_W_mK"
        ),
      },
      exigences_qualite: {
        document_CSTB: formData.get("document_CSTB"),
        norme: formData.get("norme"),
      },
      avantages: formData
        .get("avantages")
        ?.split("\n")
        .map((l) => l.trim())
        .filter((l) => l),
      dessin_technique: {
        section_blocs: sectionBlocsUrl,
        section_dalle: sectionDalleUrl,
      },
      support_technique: {
        bureau_etudes: formData.get("bureau_etudes"),
        assistance: formData
          .get("assistance")
          ?.split("\n")
          .map((l) => l.trim())
          .filter((l) => l),
      },
    };

    try {
      ficheTechniqueSchema.parse(rawData);

      setIsUploading(true);
      const res = await addFicheTechnique(rawData);
      setIsUploading(false);

      if (res?.success) {
        toast.success("Fiche ajoutée avec succès !");
      } else {
        toast.error("Erreur lors de l'ajout de la fiche.");
      }
    } catch (error) {
      setIsUploading(false);
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      } else {
        toast.error("Erreur inattendue : " + error.message);
      }
    }
  }

  async function handleImageUpload(file, setUrlState) {
    if (!file) return;
    setIsUploading(true);

    const form = new FormData();
    form.set("file", file);

    try {
      const res = await fetch("/api/pinata-images", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (res.ok && data?.url) {
        setUrlState(data.url);
        toast.success("Image téléversée avec succès !");
      } else {
        toast.error("Erreur lors de l'upload de l'image");
      }
    } catch (err) {
      toast.error("Erreur lors du téléversement.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="mb-2">
        <label>Nom</label>
        <input className="form-control" name="name" />
      </div>

      <div className="mb-2">
        <label>Description</label>
        <textarea className="form-control" name="description" />
      </div>

      <div className="mt-5 border">
        <h6 className="mt-4 mb-5 fs-5">Caractéristiques</h6>
        <div className="row">
          {[
            ["materiaux", "Matériaux"],
            ["densite", "Densité"],
            ["couleurs", "Couleurs (séparées par ,)"],
            ["dimensions_cm", "Dimensions (cm)"],
            ["poids_kg", "Poids (kg)"],
            ["volume_bloc_m3", "Volume bloc (m³)"],
            ["temps_pose_m2_h_ouvrier", "Temps de pose m²/h"],
            ["entraxes_cm", "Entraxes (séparés par ,)"],
            [
              "distance_entre_blocs_cm",
              "Distances entre blocs (séparées par ,)",
            ],
            ["resistance_poinconnement_daN", "Résistance (daN)"],
            ["classement_feu", "Classement feu"],
            ["conductivite_thermique_W_mK", "Conductivité thermique (W/mK)"],
          ].map(([name, label]) => (
            <div className="col-12 col-sm-6 col-md-3 mb-3" key={name}>
              <label className="form-label">{label}</label>
              <input type="text" className="form-control" name={name} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 border">
        <h6 className="mt-4 mb-5 fs-5">Exigences Qualité</h6>
        <div className="mb-2">
          <label>Document CSTB</label>
          <input className="form-control" name="document_CSTB" />
        </div>
        <div className="mb-2">
          <label>Norme</label>
          <input className="form-control" name="norme" />
        </div>
      </div>

      <h6 className="mt-4 mb-3 fs-5">Avantages (1 par ligne)</h6>
      <textarea className="form-control mb-4" name="avantages" />

      <div className="mt-5 border">
        <h6 className="mt-4 mb-3 fs-5">Dessin Technique</h6>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Image Section Blocs</label>
            {sectionBlocsUrl && (
              <img
                width={400}
                height={400}
                src={sectionBlocsUrl}
                alt="Section Blocs"
                className="img-fluid border p-2 mb-2"
              />
            )}
            <input
              ref={sectionBlocsInputRef}
              type="file"
              className="form-control"
              onChange={(e) =>
                handleImageUpload(e.target.files[0], setSectionBlocsUrl)
              }
            />
          </div>

          <div className="col-md-6">
            <label>Image Section Dalle</label>
            {sectionDalleUrl && (
              <img
                width={400}
                height={400}
                src={sectionDalleUrl}
                alt="Section Dalle"
                className="img-fluid border p-2 mb-2"
              />
            )}
            <input
              ref={sectionDalleInputRef}
              type="file"
              className="form-control"
              onChange={(e) =>
                handleImageUpload(e.target.files[0], setSectionDalleUrl)
              }
            />
          </div>
        </div>
      </div>

      <div className="mt-5 border">
        <h6>Support Technique</h6>
        <div className="mb-2">
          <label>Bureau d'études</label>
          <input className="form-control" name="bureau_etudes" />
        </div>

        <label>Assistance (1 par ligne)</label>
        <textarea className="form-control" name="assistance" />
      </div>

      <button
        type="submit"
        className="btn btn-primary mt-4"
        disabled={isUploading}
      >
        {isUploading ? "Veuillez patienter..." : "Ajouter la fiche"}
      </button>
    </form>
  );
}
