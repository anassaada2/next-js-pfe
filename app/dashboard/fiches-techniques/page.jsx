// app/dashboard/ficheTechniques/page.jsx
import styles from "@/components/dashboard/users/users.module.scss";
import Search from "@/components/dashboard/search/Search";
import Image from "next/image";
import PaginationDash from "@/components/dashboard/pagination/PaginationDash";
import FormAddficheTechnique from "@/components/dashboard/form/FormAddficheTechnique";
import Link from "next/link";
import { fetchficheTechniques } from "@/lib/fetchData";
import { deleteficheTechnique, updateficheTechnique } from "@/lib/actions";
import FormModifierficheTechnique from "@/components/dashboard/form/FormModifierficheTechnique";

export default async function Page({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const limit = 5;

  const { ficheTechniques, totalficheTechniques } = await fetchficheTechniques(
    page,
    limit
  );
  const totalPages = Math.ceil(totalficheTechniques / limit);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="rechercher une fiche technique " />
        <button
          className={styles.addButton}
          data-bs-toggle="modal"
          data-bs-target="#addficheTechniqueModal"
        >
          Add New
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>name</th>
            <th>Views</th>

            <th>Likes</th>
            <th>Telechargér</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(ficheTechniques) && ficheTechniques.length > 0 ? (
            ficheTechniques.map((ficheTechnique) => (
              <tr key={ficheTechnique._id}>
                <td>
                  <div className={styles.ficheTechnique}>
                    <span>{ficheTechnique.name}</span>
                  </div>
                </td>
                <td>{ficheTechnique.name}</td>
                <td>{ficheTechnique.name}</td>
                <td>{ficheTechnique.name}</td>
                <td>
                  <div className={styles.buttons}>
                    <button
                      className={`${styles.button} ${styles.view}`}
                      data-bs-toggle="modal"
                      data-bs-target={`#viewficheTechniqueModal-${ficheTechnique._id}`}
                    >
                      View
                    </button>

                    <form action={deleteficheTechnique}>
                      <input
                        type="hidden"
                        name="id"
                        value={ficheTechnique._id.toString()}
                      />
                      <button
                        className={`${styles.button} ${styles.delete}`}
                        type="submit"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No ficheTechniques found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modals placés en dehors du tableau */}
      {ficheTechniques?.map((ficheTechnique) => (
        <div
          key={`modal-${ficheTechnique._id}`}
          className="modal fade"
          id={`viewficheTechniqueModal-${ficheTechnique._id.toString()}`}
          tabIndex="-1"
          aria-labelledby="viewficheTechniqueModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered  modal-xl ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="viewficheTechniqueModalLabel">
                  Edit ficheTechnique
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <FormModifierficheTechnique
                ficheTechnique={{
                  _id: ficheTechnique._id.toString(),
                  name: ficheTechnique.name,
                  description: ficheTechnique.description || "",
                  caracteristiques: ficheTechnique.caracteristiques || {},
                  exigences_qualite: ficheTechnique.exigences_qualite || {},
                  avantages: ficheTechnique.avantages || [],
                  dessin_technique: ficheTechnique.dessin_technique || {},
                  support_technique: ficheTechnique.support_technique || {},
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <PaginationDash totalPages={totalPages} currentPage={page} />

      {/* Modal d'ajout d'utilisateur */}
      <div
        className="modal fade"
        id="addficheTechniqueModal"
        tabIndex="-1"
        aria-labelledby="addficheTechniqueModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered  modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addficheTechniqueModalLabel">
                Add New ficheTechnique
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormAddficheTechnique />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
