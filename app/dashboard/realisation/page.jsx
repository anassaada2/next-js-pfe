import styles from "@/components/dashboard/users/users.module.scss"; // Renomme si besoin
import Search from "@/components/dashboard/search/Search";
import PaginationDash from "@/components/dashboard/pagination/PaginationDash";
import Image from "next/image";
import { fetchRealisations } from "@/lib/fetchData";
import { deleteRealisation } from "@/lib/actions";
import FormAddRealisation from "@/components/dashboard/realisation/FormAddRealisation";
import FormModifierRealisation from "@/components/dashboard/realisation/FormModifierRealisation";

export default async function Page({ searchParams }) {
  const { query = "", page: pageParam = "1" } = await searchParams;
  const page = parseInt(pageParam);
  const limit = 5;

  const { realisations, totalRealisations } = await fetchRealisations(page, limit, query);
  const totalPages = Math.ceil(totalRealisations / limit);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Recherche une realisation" />
        <button
          className={`${styles.addButton}  btn btn-primary hvr-fill-black`}
          data-bs-toggle="modal"
          data-bs-target="#addRealisationModal"
        >
          Ajouter
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(realisations) && realisations.length > 0 ? (
            realisations.map((real) => (
              <tr key={real._id}>
                <td>{real.title}</td>
                <td>{real.brief}</td>
                <td>{new Date(real.year).toLocaleDateString()}</td>
                <td>
                  <div className={styles.buttons}>
                    <button
                      className={`${styles.button} ${styles.view} btn btn-primary hvr-fill-black`}
                      data-bs-toggle="modal"
                      data-bs-target={`#viewRealisationModal-${real._id}`}
                    >
                      Voir
                    </button>

                    <button
                      className={`${styles.button} ${styles.delete} btn btn-primary hvr-fill-black`}
                      data-bs-toggle="modal"
                      data-bs-target={`#deleteRealisationModal-${real._id}`}
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Pas de realisations .</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modals par réalisation */}
      {realisations?.map((real) => (
        <div key={`modals-${real._id}`}>
          {/* Modal de modification */}
          <div
            className="modal fade"
            id={`viewRealisationModal-${real._id}`}
            tabIndex="-1"
            aria-labelledby="viewRealisationModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modifier une Realisation</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <FormModifierRealisation
                  realisation={{
                    _id: real._id.toString(),
                    title: real.title,
                    brief: real.brief,
                    year: real.year,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Modal de confirmation suppression */}
          <div
            className="modal fade"
            id={`deleteRealisationModal-${real._id}`}
            tabIndex="-1"
            aria-labelledby="deleteRealisationModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteRealisationModalLabel">
                    Confirmation de suppression
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Êtes-vous sûr de vouloir supprimer la realisation "{real.title}"?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Annuler
                  </button>
                  <form action={deleteRealisation}>
                    <input type="hidden" name="id" value={real._id.toString()} />
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
        </div>
      ))}

      <PaginationDash totalPages={totalPages} currentPage={page} />

      {/* Modal d’ajout */}
      <div
        className="modal fade"
        id="addRealisationModal"
        tabIndex="-1"
        aria-labelledby="addRealisationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Ajouter une Realisation</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <FormAddRealisation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
