import styles from "@/components/dashboard/users/users.module.scss";
import Search from "@/components/dashboard/search/Search";
import PaginationDash from "@/components/dashboard/pagination/PaginationDash";
import { fetchProjets } from "@/lib/fetchData";
import { deleteProjet } from "@/lib/actions";

import FormAddProjet from "@/components/dashboard/form/projets/FormAddProjet";
import FormModifierProjet from "@/components/dashboard/form/projets/FormModifierProjet";

export default async function Page({ searchParams }) {
  const { query = "", page: pageParam = "1" } = await searchParams;
  const page = parseInt(pageParam);
  const limit = 5;

  const { projets, totalProjets } = await fetchProjets(page, limit, query);
  const totalPages = Math.ceil(totalProjets / limit);

  return (
    <div className={styles.container}>
      {/* Top: barre de recherche + bouton ajout */}
      <div className={styles.top}>
        <Search placeholder="Rechercher un projet" />
        <button
        
           className={`${styles.addButton} btn btn-primary hvr-fill-black`}
          data-bs-toggle="modal"
          data-bs-target="#addProjetModal"
        >
          Ajouter
        </button>
      </div>

      {/* Table des projets */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Taches</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(projets) && projets.length > 0 ? (
            projets.map((projet) => (
              <tr key={projet._id}>
                <td>{projet.titre}</td>
                <td>
                  {Array.isArray(projet.taches) && projet.taches.length > 0 ? (
                    projet.taches.map((tache, index) => (
                      <div key={index}>- {tache}</div>
                    ))
                  ) : (
                    "Pas de taches"
                  )}
                </td>
                <td>
                  <div className={styles.buttons}>
                    <button
                      className={`${styles.button} ${styles.view} btn btn-primary hvr-fill-black`}
                      data-bs-toggle="modal"
                      data-bs-target={`#viewProjetModal-${projet._id}`}
                    >
                      voir
                    </button>

                    <button
                      className={`${styles.button} ${styles.delete} btn btn-danger hvr-fill-black`}
                      data-bs-toggle="modal"
                      data-bs-target={`#confirmDeleteModal-${projet._id}`}
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Pas de projets .</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modals d'édition */}
      {projets?.map((projet) => (
        <div
          key={`edit-modal-${projet._id}`}
          className="modal fade"
          id={`viewProjetModal-${projet._id}`}
          tabIndex="-1"
          aria-labelledby="viewProjetModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier un Projet</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <FormModifierProjet
                  projet={{
                    _id: projet._id.toString(),
                    titre: projet.titre,
                    taches: projet.taches || [],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Modals de suppression (style calculateur) */}
      {projets?.map((projet) => (
        <div
          key={`delete-modal-${projet._id}`}
          className="modal fade"
          id={`confirmDeleteModal-${projet._id}`}
          tabIndex="-1"
          aria-labelledby="deleteProjetModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteProjetModalLabel">
                  Confirmation de suppression
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                Êtes-vous sûr de vouloir supprimer le projet
                <strong>{projet.titre}</strong>"?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Annuler
                </button>
                <form action={deleteProjet}>
                  <input
                    type="hidden"
                    name="id"
                    value={projet._id.toString()}
                  />
                  <button
                    type="submit"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Supprimer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Modal d'ajout */}
      <div
        className="modal fade"
        id="addProjetModal"
        tabIndex="-1"
        aria-labelledby="addProjetModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjetModalLabel">
                Ajouter un Projet
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormAddProjet />
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <PaginationDash totalPages={totalPages} currentPage={page} />
    </div>
  );
}
