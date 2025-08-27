"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./form.module.scss";
import { updateProjet } from "@/lib/actions";

const schema = yup.object().shape({
  titre: yup.string().required("Le titre est requis"),
  taches: yup
    .array()
    .of(yup.string().required("Tâche requise"))
    .min(1, "Au moins une tâche est requise"),
});

function FormModifierProjet({ projet }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      titre: projet?.titre || "",
      taches: projet?.taches?.length ? projet.taches : [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "taches",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await updateProjet(projet._id, data);

      if (res.success) {
        toast.success("Projet modifié avec succès");
        router.refresh();
      } else {
        toast.error(res.error || "Erreur lors de la modification");
      }
    } catch (err) {
      toast.error("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label>Titre du projet</label>
        <input {...register("titre")} className="form-control" />
        {errors.titre && <p className={styles.error}>{errors.titre.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label>Tâches</label>
        {fields.map((field, index) => (
          <div key={field.id} className="d-flex mb-2">
            <input
              {...register(`taches.${index}`)}
              className="form-control me-2"
              placeholder={`Tâche ${index + 1}`}
            />
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              &times;
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append("")}
          className="btn btn-secondary"
        >
          Ajouter une tâche
        </button>
        {errors.taches && (
          <p className={styles.error}>{errors.taches.message}</p>
        )}
      </div>

      <button type="submit" disabled={loading} className="btn btn-primary mt-3">
        {loading ? "Enregistrement..." : "Modifier"}
      </button>
    </form>
  );
}

export default FormModifierProjet;
