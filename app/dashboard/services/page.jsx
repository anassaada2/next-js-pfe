import styles from "@/components/dashboard/users/users.module.scss"; // tu peux créer un style dédié au besoin
import Search from "@/components/dashboard/search/Search";
import PaginationDash from "@/components/dashboard/pagination/PaginationDash";
import { fetchServices } from "@/lib/fetchData";
import { deleteService } from "@/lib/actions";
import FormModifierService from "@/components/dashboard/services/FormModifierService";
import FormAddService from "@/components/dashboard/services/FormAddService";
import Image from "next/image";

export default async function Page({ searchParams }) {
  const { query = "", page: pageParam = "1" } = await searchParams;
  const page = parseInt(pageParam);
  const limit = 5;

  const { services, totalServices } = await fetchServices(page, limit, query);
  const totalPages = Math.ceil(totalServices / limit);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a service" />
        <button

          className={`${styles.addButton} btn btn-primary hvr-fill-black`}

          data-bs-toggle="modal"
          data-bs-target="#addServiceModal"
        >
          Ajouter
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Icon</th>
            <th>Titre</th>
            <th>Resumé</th>
            <th>Animation</th>
            <th >Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(services) && services.length > 0 ? (
            services.map((service) => (
              <tr key={service._id}>
                <td>
                  <Image
                    src={service.icon}
                    height={50}
                    width={50}
                    alt="service icon"
                  />
                </td>
                <td>{service.title}</td>
                <td>{service.brief}</td>
                <td>{service.animation}ms</td>
                <td>
                  <div className={styles.buttons}>
                    <button
                      className={`${styles.button} ${styles.view} btn btn-primary hvr-fill-black`}
                      data-bs-toggle="modal"
                      data-bs-target={`#editServiceModal-${service._id}`}
                    >
                      Voir
                    </button>
                    <button
                      className={`${styles.button} ${styles.delete} btn btn-primary hvr-fill-black`}
                      data-bs-toggle="modal"
                      data-bs-target={`#deleteServiceModal-${service._id}`}
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Pas de services </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modals de modification et suppression */}
      {services.map((service) => (
        <div key={`modals-${service._id}`}>
          {/* Modal de modification */}
          <div
            className="modal fade"
            id={`editServiceModal-${service._id}`}
            tabIndex="-1"
            aria-labelledby="editServiceModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modifier un Service</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  />
                </div>
                <div className="modal-body">
                  <FormModifierService
                    service={{
                      _id: service._id.toString(),
                      icon: service.icon,
                      title: service.title,
                      brief: service.brief,
                      description: service.description,
                      animation: service.animation,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modal de confirmation de suppression */}
          <div
            className="modal fade"
            id={`deleteServiceModal-${service._id}`}
            tabIndex="-1"
            aria-labelledby="deleteServiceModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteServiceModalLabel">
                    Confirmation de suppresion 
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  Êtes-vous sûr de vouloir supprimer la realisation "{service.title}"?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Annuler
                  </button>
                  <form action={deleteService}>
                    <input
                      type="hidden"
                      name="id"
                      value={service._id.toString()}
                    />
                    <button
                      type="submit"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      suppression
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Modal d’ajout */}
      <div
        className="modal fade"
        id="addServiceModal"
        tabIndex="-1"
        aria-labelledby="addServiceModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Ajouter un Service</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <FormAddService />
            </div>
          </div>
        </div>
      </div>

      <PaginationDash totalPages={totalPages} currentPage={page} />
    </div>
  );
}
