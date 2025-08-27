"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { editSolution } from "@/lib/actions";

const solutionSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  description: z.string().min(5, "La description est trop courte"),
  avantages: z
    .array(z.object({ titre: z.string(), description: z.string() }))
    .optional(),
  images: z.array(z.string()).optional(),
  ecarteur: z.string().optional(),
  specifications: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional(),
  dessinTechnique: z
    .object({ sectionBlocs: z.string(), sectionDalle: z.string() })
    .optional(),
  pdf: z.string().optional(),
  processusInstallation: z
    .array(
      z.object({
        etape: z.number(),
        titre: z.string(),
        description: z.string(),
      })
    )
    .optional(),
  certifications: z
    .array(z.object({ titre: z.string(), description: z.string() }))
    .optional(),
  saviezVous: z.string().optional(),
});

export default function FormEditSolution({ solution }) {
  if (!solution) {
    return <div>Erreur : Aucune solution fournie pour modification.</div>;
  }

  const [imageUrls, setImageUrls] = useState(solution?.images || []);
  const [dessinBlocsUrl, setDessinBlocsUrl] = useState(solution?.dessinTechnique?.sectionBlocs || "");
  const [dessinDalleUrl, setDessinDalleUrl] = useState(solution?.dessinTechnique?.sectionDalle || "");
  const [pdfUrl, setPdfUrl] = useState(solution?.pdf || "");
  const [isUploading, setIsUploading] = useState(false);

  const [avantages, setAvantages] = useState(solution?.avantages || []);
  const [showAvantageModal, setShowAvantageModal] = useState(false);
  const [newAvantage, setNewAvantage] = useState({
    titre: "",
    description: "",
  });
  const [certifications, setCertifications] = useState(solution?.certifications || []);
  const [showCertifications, setShowCertifications] = useState(false);
  const [newCertification, setNewCertification] = useState({
    titre: "",
    description: "",
  });
  const [specifications, setSpecifications] = useState(solution?.specifications || []);
  const [showSpecModal, setShowSpecModal] = useState(false);
  const [newSpec, setNewSpec] = useState({ label: "", value: "" });
  const [showProcessusModal, setShowProcessusModal] = useState(false);
  const [newProcessus, setNewProcessus] = useState({
    etape: 0,
    titre: "",
    description: "",
  });
  const [processusInstallation, setProcessusInstallation] = useState(solution?.processusInstallation || []);

  const handleUpload = async (file, onSuccess) => {
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/pinata-images", {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const rawData = {
      id: solution._id, // Changed from solution.id to solution._id to match serialized data
      name: form.get("name"),
      description: form.get("description"),
      avantages: avantages,
      images: imageUrls,
      ecarteur: form.get("ecarteur"),
      specifications: specifications,
      dessinTechnique: {
        sectionBlocs: dessinBlocsUrl,
        sectionDalle: dessinDalleUrl,
      },
      pdf: pdfUrl,
      processusInstallation: processusInstallation,
      certifications: certifications,
      saviezVous: form.get("saviezVous"),
    };

    try {
      solutionSchema.parse(rawData);
      const res = await editSolution(rawData);
      if (res?.success) {
        toast.success("Solution modifiée !");
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
          defaultValue={solution?.name}
          required
        />
      </div>

      <div className="mb-3">
        <label>Description</label>
        <textarea
          className="form-control"
          name="description"
          defaultValue={solution?.description}
          required
        />
      </div>

      <div className="mb-3">
        <label>Avantages</label>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <button
            type="button"
            className="btn btn-outline-primary btn-secondary btn-sm hvr-fill-black"
            onClick={() => setShowAvantageModal(true)}
          >
            + Ajouter avantage
          </button>
        </div>
        {avantages.length > 0 && (
          <ul className="list-group">
            {avantages.map((a, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                <div>
                  <strong>{a.titre}</strong>: {a.description}
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() =>
                    setAvantages(avantages.filter((_, i) => i !== index))
                  }
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-3 d-flex flex-column">
        <label>Images</label>
        <input
          type="file"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files);
            files.forEach((file) => {
              handleUpload(file, (url) =>
                setImageUrls((prev) => [...prev, url])
              );
            });
          }}
        />
        <div className="d-flex flex-wrap mt-2">
          {imageUrls.map((url, i) => (
            <img key={i} src={url} alt="" className="me-2 mb-2" width={100} />
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label>Écarteur</label>
        <input
          className="form-control"
          name="ecarteur"
          defaultValue={solution?.ecarteur}
        />
      </div>

      <div className="mb-3">
        <label>Spécifications</label>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <button
            type="button"
            className="btn btn-outline-primary btn-secondary btn-sm hvr-fill-black"
            onClick={() => setShowSpecModal(true)}
          >
            + Ajouter une spécification
          </button>
        </div>
        {specifications.length > 0 && (
          <ul className="list-group">
            {specifications.map((s, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                <div>
                  <strong>{s.label}</strong>: {s.value}
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() =>
                    setSpecifications(
                      specifications.filter((_, i) => i !== index)
                    )
                  }
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-5 border">
        <h6 className="mt-4 mb-3 fs-5">Dessin Technique</h6>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Dessin Technique - Section Blocs</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                handleUpload(e.target.files?.[0], setDessinBlocsUrl)
              }
            />
            {dessinBlocsUrl && (
              <img
                src={dessinBlocsUrl}
                alt="bloc"
                className="border p-2 mb-2"
                width={400}
                height={400}
              />
            )}
          </div>

          <div className="col-md-6">
            <label>Dessin Technique - Section Dalle</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                handleUpload(e.target.files?.[0], setDessinDalleUrl)
              }
            />
            {dessinDalleUrl && (
              <img
                src={dessinDalleUrl}
                alt="dalle"
                className="border p-2 mb-2"
                width={400}
                height={400}
              />
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Fichier PDF</label>
            <input
              type="file"
              accept=".pdf"
              className="form-control"
              onChange={(e) => handleUpload(e.target.files?.[0], setPdfUrl)}
            />
            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="d-block mt-2"
              >
                Voir le PDF
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label>Processus d'installation</label>
        <ul>
          {processusInstallation.map((p, idx) => (
            <li key={idx}>
              <strong>Étape {p.etape}:</strong> {p.titre} – {p.description}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="btn btn-outline-primary btn-secondary btn-sm hvr-fill-black mt-2"
          onClick={() => setShowProcessusModal(true)}
        >
          Ajouter une étape
        </button>
      </div>

      <div className="mb-3">
        <label>Certifications</label>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <button
            type="button"
            className="btn btn-outline-primary btn-secondary btn-sm hvr-fill-black"
            onClick={() => setShowCertifications(true)}
          >
            + Ajouter une certification
          </button>
        </div>
        {certifications.length > 0 && (
          <ul className="list-group">
            {certifications.map((a, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                <div>
                  <strong>{a.titre}</strong>: {a.description}
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() =>
                    setCertifications(
                      certifications.filter((_, i) => i !== index)
                    )
                  }
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-3">
        <label>Le saviez-vous ?</label>
        <input
          className="form-control"
          name="saviezVous"
          defaultValue={solution?.saviezVous}
        />
      </div>

      <button
        className="btn btn-primary hvr-fill-black"
        type="submit"
        disabled={isUploading}
      >
        {isUploading ? "Téléchargement..." : "Modifier la solution"}
      </button>

      {/* Modal pour ajouter un avantage */}
      {showAvantageModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter un avantage</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAvantageModal(false)}
                />
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Titre"
                  value={newAvantage.titre}
                  onChange={(e) =>
                    setNewAvantage({ ...newAvantage, titre: e.target.value })
                  }
                />
                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={newAvantage.description}
                  onChange={(e) =>
                    setNewAvantage({
                      ...newAvantage,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAvantageModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (newAvantage.titre && newAvantage.description) {
                      setAvantages((prev) => [...prev, newAvantage]);
                      setNewAvantage({ titre: "", description: "" });
                      setShowAvantageModal(false);
                    } else {
                      toast.error("Titre et description requis");
                    }
                  }}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal pour ajouter une certification */}
      {showCertifications && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter une certification</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCertifications(false)}
                />
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Titre"
                  value={newCertification.titre}
                  onChange={(e) =>
                    setNewCertification({
                      ...newCertification,
                      titre: e.target.value,
                    })
                  }
                />
                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={newCertification.description}
                  onChange={(e) =>
                    setNewCertification({
                      ...newCertification,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCertifications(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (
                      newCertification.titre &&
                      newCertification.description
                    ) {
                      setCertifications((prev) => [...prev, newCertification]);
                      setNewCertification({ titre: "", description: "" });
                      setShowCertifications(false);
                    } else {
                      toast.error("Titre et description requis");
                    }
                  }}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal pour ajouter une spécification */}
      {showSpecModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter une spécification</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowSpecModal(false)}
                />
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Label"
                  value={newSpec.label}
                  onChange={(e) =>
                    setNewSpec({ ...newSpec, label: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Valeur"
                  value={newSpec.value}
                  onChange={(e) =>
                    setNewSpec({ ...newSpec, value: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowSpecModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (newSpec.label && newSpec.value) {
                      setSpecifications((prev) => [...prev, newSpec]);
                      setNewSpec({ label: "", value: "" });
                      setShowSpecModal(false);
                    } else {
                      toast.error("Label et valeur requis");
                    }
                  }}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal pour ajouter un processus d'installation */}
      {showProcessusModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter une étape du processus</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowProcessusModal(false)}
                />
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Étape (numéro)"
                  value={newProcessus.etape}
                  onChange={(e) =>
                    setNewProcessus({
                      ...newProcessus,
                      etape: Number(e.target.value),
                    })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Titre"
                  value={newProcessus.titre}
                  onChange={(e) =>
                    setNewProcessus({
                      ...newProcessus,
                      titre: e.target.value,
                    })
                  }
                />
                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={newProcessus.description}
                  onChange={(e) =>
                    setNewProcessus({
                      ...newProcessus,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowProcessusModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (
                      newProcessus.etape &&
                      newProcessus.titre &&
                      newProcessus.description
                    ) {
                      setProcessusInstallation((prev) => [
                        ...prev,
                        newProcessus,
                      ]);
                      setNewProcessus({
                        etape: 0,
                        titre: "",
                        description: "",
                      });
                      setShowProcessusModal(false);
                    } else {
                      toast.error("Tous les champs sont requis");
                    }
                  }}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
