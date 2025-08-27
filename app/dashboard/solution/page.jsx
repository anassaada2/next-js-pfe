import styles from "@/components/dashboard/users/users.module.scss";
import Search from "@/components/dashboard/search/Search";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import PaginationDash from "@/components/dashboard/pagination/PaginationDash";
import { fetchSolutions } from "@/lib/fetchData";
import { deleteSolution } from "@/lib/actions";
import FormAddSolution from "@/components/dashboard/form/FormAddSolution";
import FormModifierSolution from "@/components/dashboard/form/FormModifierSolution";

export default async function Page({ searchParams }) {
  const { query = "", page: pageParam = "1" } = await searchParams;
  const page = parseInt(pageParam);
  const limit = 5;

  const { solutions, totalsolutions } = await fetchSolutions(page, limit);
  const totalPages = Math.ceil(totalsolutions / limit);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="rechercher solution " />
        <button
          className={`${styles.addButton} btn btn-primary hvr-fill-black`}
          data-bs-toggle="modal"
          data-bs-target="#addsolutionModal"
        >
          Ajouter
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Views</th>
            <th>Likes</th>
            <th>Téléchargements</th>
            <th>PDF</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(solutions) && solutions.length > 0 ? (
            solutions.map((solution) => (
              <tr key={solution._id}>
                <td>{solution.name}</td>
                <td>{solution.views}</td>
                <td>{solution.likes}</td>
                <td>{solution.telechargement}</td>
                <td>
                  {solution.pdf && (
                    <a
                      href={solution.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="d-block mt-2"
                    >
                      Voir le PDF
                    </a>
                  )}
                </td>
                <td>
                  <div className={styles.buttons}>
                    <button
                      className={`${styles.button} ${styles.view} hvr-fill-black`}
                      data-bs-toggle="modal"
                      data-bs-target={`#viewsolutionModal-${solution._id}`}
                    >
                      Voir
                    </button>
                    <button
                      className={`${styles.button} ${styles.delete} hvr-fill-black`}
                      data-bs-toggle="modal"
                      data-bs-target={`#deleteSolutionModal-${solution._id}`}
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Pas de solutions</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modals de modification & suppression */}
      {solutions?.map((solution) => (
        <div key={`modals-${solution._id}`}>
          {/* Modal modification */}
          <div
            className="modal fade"
            id={`viewsolutionModal-${solution._id}`}
            tabIndex="-1"
            aria-labelledby="viewsolutionModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="viewsolutionModalLabel">
                    Modifier une Solution
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <FormModifierSolution solution={solution} />
              </div>
            </div>
          </div>

          {/* Modal suppression */}
          <div
            className="modal fade"
            id={`deleteSolutionModal-${solution._id}`}
            tabIndex="-1"
            aria-labelledby="deleteSolutionModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteSolutionModalLabel">
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
                  Êtes-vous sûr de vouloir supprimer la solution "{solution.name}" ?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Annuler
                  </button>
                  <form action={deleteSolution}>
                    <input type="hidden" name="id" value={solution._id} />
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

      {/* Modal ajout */}
      <div
        className="modal fade"
        id="addsolutionModal"
        tabIndex="-1"
        aria-labelledby="addsolutionModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addsolutionModalLabel">
                Ajouter une Solution
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormAddSolution />
            </div>
          </div>
        </div>
      </div>

      <PaginationDash totalPages={totalPages} currentPage={page} />
    </div>
  );
}