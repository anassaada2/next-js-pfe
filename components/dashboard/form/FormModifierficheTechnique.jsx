"use client";

import { useState, useRef } from "react";
import { updateficheTechnique } from "@/lib/actions";

export default function FormModifierficheTechnique({ ficheTechnique }) {
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [sectionBlocsUrl, setSectionBlocsUrl] = useState(
    ficheTechnique.dessin_technique?.section_blocs || ""
  );
  const [sectionDalleUrl, setSectionDalleUrl] = useState(
    ficheTechnique.dessin_technique?.section_dalle || ""
  );

  const sectionBlocsInputRef = useRef(null);
  const sectionDalleInputRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const rawData = {
      id: formData.get("id"),
      name: formData.get("name"),
      description: formData.get("description"),
      caracteristiques: {
        materiaux: formData.get("materiaux"),
        densite: parseFloat(formData.get("densite")),
        couleurs: formData
          .get("couleurs")
          ?.split(",")
          .map((c) => c.trim()),
        dimensions_cm: formData.get("dimensions_cm"),
        poids_kg: parseFloat(formData.get("poids_kg")),
        volume_bloc_m3: parseFloat(formData.get("volume_bloc_m3")),
        temps_pose_m2_h_ouvrier: parseFloat(
          formData.get("temps_pose_m2_h_ouvrier")
        ),
        entraxes_cm: formData.get("entraxes_cm")?.split(",").map(Number),
        distance_entre_blocs_cm: formData
          .get("distance_entre_blocs_cm")
          ?.split(",")
          .map(Number),
        resistance_poinconnement_daN: parseFloat(
          formData.get("resistance_poinconnement_daN")
        ),
        classement_feu: formData.get("classement_feu"),
        conductivite_thermique_W_mK: parseFloat(
          formData.get("conductivite_thermique_W_mK")
        ),
      },
      exigences_qualite: {
        document_CSTB: formData.get("document_CSTB"),
        norme: formData.get("norme"),
      },
      avantages: formData
        .get("avantages")
        ?.split("\n")
        .filter((l) => l.trim() !== ""),
      dessin_technique: {
        section_blocs: sectionBlocsUrl,
        section_dalle: sectionDalleUrl,
      },
      support_technique: {
        bureau_etudes: formData.get("bureau_etudes"),
        assistance: formData
          .get("assistance")
          ?.split("\n")
          .filter((l) => l.trim() !== ""),
      },
    };

    const res = await updateficheTechnique(rawData);

    setMessage(
      res?.success
        ? "Fiche mise à jour avec succès !"
        : "Erreur lors de la mise à jour."
    );
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
      console.log("Image upload response:", data);
      if (res.ok && data?.url) {
        setUrlState(data.url);
      }
    } catch (err) {
      console.error("Erreur upload image :", err);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <input type="hidden" name="id" value={ficheTechnique._id.toString()} />

      <div className="mb-2">
        <label>Nom</label>
        <input
          className="form-control"
          name="name"
          defaultValue={ficheTechnique.name}
        />
      </div>

      <div className="mb-2">
        <label>Description</label>
        <textarea
          className="form-control"
          name="description"
          defaultValue={ficheTechnique.description}
        />
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
              <input
                type="text"
                className="form-control"
                name={name}
                defaultValue={ficheTechnique.caracteristiques?.[name]}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 border">
        <h6 className="mt-4 mb-5 fs-5">Exigences Qualité</h6>
        <div className="mb-2">
          <label>Document CSTB</label>
          <input
            className="form-control"
            name="document_CSTB"
            defaultValue={ficheTechnique.exigences_qualite?.document_CSTB}
          />
        </div>
        <div className="mb-2">
          <label>Norme</label>
          <input
            className="form-control"
            name="norme"
            defaultValue={ficheTechnique.exigences_qualite?.norme}
          />
        </div>
      </div>

      <h6 className="mt-4 mb-3 fs-5">Avantages (1 par ligne)</h6>
      <textarea
        className="form-control mb-4"
        name="avantages"
        defaultValue={ficheTechnique.avantages?.join("\n")}
      />

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
          <input
            className="form-control"
            name="bureau_etudes"
            defaultValue={ficheTechnique.support_technique?.bureau_etudes}
          />
        </div>

        <label>Assistance (1 par ligne)</label>
        <textarea
          className="form-control"
          name="assistance"
          defaultValue={ficheTechnique.support_technique?.assistance?.join(
            "\n"
          )}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary mt-4"
        disabled={isUploading}
      >
        {isUploading ? "Veuillez patienter..." : "Enregistrer"}
      </button>

      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
