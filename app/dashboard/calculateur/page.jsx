import styles from "@/components/dashboard/users/users.module.scss";
import Search from "@/components/dashboard/search/Search";
import { fetchCalculateur } from "@/lib/fetchData";
import { deleteCalculateur, deletePinataFile } from "@/lib/actions";
import FormAddCalculateur from "@/components/dashboard/form/FormAddCalculateur";
import FormModifierCalculateur from "@/components/dashboard/form/FormModifierCalculateur";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { pinata } from "@/utils/config"; // <-- utiliser la bonne instance

const extractCID = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 1];
};

export default async function Page() {
  const calculateurData = await fetchCalculateur();
  const calculateur = calculateurData || null;

  let fileName = "N/A";
  if (calculateur?.url) {
    try {
      const cid = extractCID(calculateur.url);
      const response = await pinata.files.public.list({ cid });

      if (response && response.items && response.items.length > 0) {
        fileName = response.items[0].name;
      }
    } catch (error) {
      console.error("Error fetching Pinata file name:", error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="rechercher un calculateur" />
        <button
          className={`${styles.addButton} btn btn-primary hvr-fill-black`}
          data-bs-toggle="modal"
          data-bs-target="#addCalculateurModal"
        >
          Ajouter
        </button>
      </div>

      {calculateur ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>View</th>
              <th>Telecharger</th>
              <th>Excel</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr key={calculateur._id}>
              <td>
                <div className={styles.calculateur}>
                  <span>{calculateur.name}</span>
                </div>
              </td>
              <td>{calculateur.view || "0"}</td>
              <td>{calculateur.telechargement || "0"}</td>
              <td>
                {calculateur.url ? (
                  <div className={styles.excelContainer}>
                    <a
                      href={calculateur.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.excelLink}
                    >
                      {fileName}
                    </a>
                    <button
                      className={styles.deleteButton}
                      data-bs-toggle="modal"
                      data-bs-target={`#deleteFileModal-${calculateur._id}`}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ) : (
                  <button>
                    <FaPlus />
                  </button>
                )}
              </td>
              <td>
                <div className={styles.buttons}>
                  <button
                     className={`${styles.button} ${styles.view} btn btn-primary hvr-fill-black`}
                    data-bs-toggle="modal"
                    data-bs-target={`#viewCalculateurModal-${calculateur._id}`}
                  >
                    Voir
                  </button>
                  <button
                    className={`${styles.button} ${styles.delete} btn btn-primary hvr-fill-black`}
                    data-bs-toggle="modal"
                    data-bs-target={`#deleteCalculateurModal-${calculateur._id}`}
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>Pas de calculateur.</div>
      )}

      {/* Modal for editing the calculateur */}
      {calculateur && (
        <div
          key={`modal-${calculateur._id}`}
          className="modal fade"
          id={`viewCalculateurModal-${calculateur._id.toString()}`}
          tabIndex="-1"
          aria-labelledby="viewCalculateurModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="viewCalculateurModalLabel">
                  Modifier le Calculateur
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <FormModifierCalculateur
                  calculateur={{
                    _id: calculateur._id.toString(),
                    name: calculateur.name,
                    url: calculateur.url || "",
                    telechargement: calculateur.telechargement || 0,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for confirming calculateur deletion */}
      {calculateur && (
        <div
          key={`delete-calculateur-modal-${calculateur._id}`}
          className="modal fade"
          id={`deleteCalculateurModal-${calculateur._id.toString()}`}
          tabIndex="-1"
          aria-labelledby="deleteCalculateurModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteCalculateurModalLabel">
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
                Êtes-vous sûr de vouloir supprimer le calculateur "
                {calculateur.name}"?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Annuler
                </button>
                <form action={deleteCalculateur}>
                  <input
                    type="hidden"
                    name="id"
                    value={calculateur._id.toString()}
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
      )}

      {/* Modal for confirming file deletion */}
      {calculateur && calculateur.url && (
        <div
          key={`delete-modal-${calculateur._id}`}
          className="modal fade"
          id={`deleteFileModal-${calculateur._id.toString()}`}
          tabIndex="-1"
          aria-labelledby="deleteFileModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteFileModalLabel">
                  Confirm Deletion
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Êtes-vous sûr de vouloir supprimer le fichier "{fileName}"?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Annuler
                </button>
                <form action={deletePinataFile}>
                  <input
                    type="hidden"
                    name="id"
                    value={calculateur._id.toString()}
                  />
                  <input type="hidden" name="url" value={calculateur.url} />
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
      )}

      {/* Modal for adding new calculateur */}
      <div
        className="modal fade"
        id="addCalculateurModal"
        tabIndex="-1"
        aria-labelledby="addCalculateurModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCalculateurModalLabel">
                Ajouter un Calculateur
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormAddCalculateur />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
