// app/dashboard/users/page.jsx

import styles from "@/components/dashboard/users/users.module.scss";
import Search from "@/components/dashboard/search/Search";
import Image from "next/image";
import PaginationDash from "@/components/dashboard/pagination/PaginationDash";
import FormAddUser from "@/components/dashboard/form/FormAddUser";
import Link from "next/link";
import { fetchUsers } from "@/lib/fetchData";
import { deleteUser } from "@/lib/actions";
import FormModifierUser from "@/components/dashboard/form/FormModifierUser";

export default async function Page({ searchParams }) {
  const { query = "", page: pageParam = "1" } = await searchParams;
  const page = parseInt(pageParam);
  const limit = 5;

  const { users, totalUsers } = await fetchUsers(page, limit, query);
  const totalPages = Math.ceil(totalUsers / limit);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Recherche un utilisateur" />
        <button
          className={`${styles.addButton} btn btn-primary hvr-fill-black`}
                              

          data-bs-toggle="modal"
          data-bs-target="#addUserModal"
        >
          Ajouter
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className={styles.user}>
                    <Image
                      src="/image/AFEC/logo.png"
                      alt="user"
                      width={50}
                      height={50}
                    />
                    <span>{user.username}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <div className={styles.buttons}>
                    <button
                      className={`${styles.button} ${styles.view} btn btn-primary hvr-fill-black`}
                      data-bs-toggle="modal"
                      data-bs-target={`#viewUserModal-${user._id}`}
                    >
                      Voir
                    </button>

                    <button
                      className={`${styles.button} ${styles.delete} btn btn-primary hvr-fill-black`}
                      data-bs-toggle="modal"
                      data-bs-target={`#deleteUserModal-${user._id}`}
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Pas des utilisateurs.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modals pour chaque utilisateur */}
      {users?.map((user) => (
        <div key={`modals-${user._id}`}>
          {/* Modal de modification */}
          <div
            className="modal fade"
            id={`viewUserModal-${user._id}`}
            tabIndex="-1"
            aria-labelledby="viewUserModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="viewUserModalLabel">
                    Modifier l'utilisateur
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <FormModifierUser
                  user={{
                    _id: user._id.toString(),
                    username: user.username,
                    email: user.email,
                    phone: user.phone || "",
                    status: user.status,
                    role: user.role,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Modal de confirmation de suppression */}
          <div
            className="modal fade"
            id={`deleteUserModal-${user._id}`}
            tabIndex="-1"
            aria-labelledby="deleteUserModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteUserModalLabel">
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
               
          Êtes-vous sûr de vouloir supprimer l'utilisateur "{user.username}"?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Annuler
                  </button>
                  <form action={deleteUser}>
                    <input
                      type="hidden"
                      name="id"
                      value={user._id.toString()}
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
        </div>
      ))}

      {/* Pagination */}
      <PaginationDash totalPages={totalPages} currentPage={page} />

      {/* Modal d'ajout d'utilisateur */}
      <div
        className="modal fade"
        id="addUserModal"
        tabIndex="-1"
        aria-labelledby="addUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addUserModalLabel">
                Ajouter nouvel utilisateur
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormAddUser />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
