"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./form.module.scss";
import { ajouterProjet } from "@/lib/actions";

const schema = yup.object().shape({
  titre: yup.string().required("Le titre est requis"),
  taches: yup
    .array()
    .of(yup.string().required("Tâche requise"))
    .min(1, "Au moins une tâche est requise"),
});

function FormAddProjet() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { titre: "", taches: [""] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "taches",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await ajouterProjet(data);

      if (res.success) {
        toast.success("Projet ajouté avec succès");
        reset();
        router.refresh();
      } else {
        toast.error(res.error || "Erreur lors de l'ajout");
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
        {errors.titre && (
          <p className={styles.error}>{errors.titre.message}</p>
        )}
      </div>

   <div className={styles.formGroup}>
  <label>Tâches</label>

  <div className="d-flex flex-column gap-2">
    {fields.map((field, index) => (
      <div key={field.id} className="d-flex">
        <input
          {...register(`taches.${index}`)}
          className="form-control me-2"
          placeholder={`Tâche ${index + 1}`}
        />
        <button
          type="button"
          onClick={() => remove(index)}
          className="btn btn-danger"
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
  </div>

  {errors.taches && (
    <p className={styles.error}>{errors.taches.message}</p>
  )}
</div>


      <button type="submit" disabled={loading} className="btn btn-primary hvr-fill-black mt-3">
        {loading ? "Chargement..." : "Ajouter"}
      </button>
    </form>
  );
}

export default FormAddProjet;
