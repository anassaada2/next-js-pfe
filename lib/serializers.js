// lib/serializers.js
export function serializeFicheTechnique(fiche) {
  return {
    ...fiche.toObject(), // Utilisez toObject() pour récupérer un objet JavaScript pur
    _id: fiche._id.toString(), // Conversion de l'ID en string
    dessin_technique: fiche.dessin_technique
      ? {
          ...fiche.dessin_technique,
          section_blocs: fiche.dessin_technique.section_blocs || "",
          section_dalle: fiche.dessin_technique.section_dalle || "",
        }
      : {},
    caracteristiques: fiche.caracteristiques
      ? {
          ...fiche.caracteristiques,
          materiaux: fiche.caracteristiques.materiaux || "",
          densite: fiche.caracteristiques.densite || 0,
          couleurs: fiche.caracteristiques.couleurs || [],
          dimensions_cm: fiche.caracteristiques.dimensions_cm || "",
          poids_kg: fiche.caracteristiques.poids_kg || 0,
          volume_bloc_m3: fiche.caracteristiques.volume_bloc_m3 || 0,
          temps_pose_m2_h_ouvrier:
            fiche.caracteristiques.temps_pose_m2_h_ouvrier || 0,
          entraxes_cm: fiche.caracteristiques.entraxes_cm || [],
          distance_entre_blocs_cm:
            fiche.caracteristiques.distance_entre_blocs_cm || [],
          resistance_poinconnement_daN:
            fiche.caracteristiques.resistance_poinconnement_daN || 0,
          classement_feu: fiche.caracteristiques.classement_feu || "",
          conductivite_thermique_W_mK:
            fiche.caracteristiques.conductivite_thermique_W_mK || 0,
        }
      : {},
    exigences_qualite: fiche.exigences_qualite
      ? {
          ...fiche.exigences_qualite,
          document_CSTB: fiche.exigences_qualite.document_CSTB || "",
          norme: fiche.exigences_qualite.norme || "",
        }
      : {},
    avantages: fiche.avantages || [],
    support_technique: fiche.support_technique
      ? {
          ...fiche.support_technique,
          bureau_etudes: fiche.support_technique.bureau_etudes || "",
          assistance: fiche.support_technique.assistance || [],
        }
      : {},
  };
}
