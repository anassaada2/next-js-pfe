import { fetchMessages } from '@/lib/fetchData';
import {
  markMessageAsRead,
  deleteMessage,
} from '@/lib/actions';
import styles from "@/components/dashboard/users/users.module.scss";
import Search from "@/components/dashboard/search/Search";
import Image from "next/image";
import PaginationDash from "@/components/dashboard/pagination/PaginationDash";
import FormAddUser from "@/components/dashboard/form/FormAddUser";
import FormModifierMessage from '@/components/dashboard/form/FormModifierMessage';
import React from 'react';
import { revalidatePath } from 'next/cache';
import FormAddContact from '@/components/dashboard/form/contact/FormAddContact';

async function page({ searchParams }) {
  const { query = "", page: pageParam = "1" } = await searchParams;
  const page = parseInt(pageParam);
  const limit = 5;

  const { messages, totalMessages } = await fetchMessages(page, limit, query);
  const totalPages = Math.ceil(totalMessages / limit);

  async function handleClickView(formData) {
    "use server";
    const id = formData.get("id");
    await markMessageAsRead(id);
    revalidatePath('/dashboard/messages');
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Recherche un message" />
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
            <th>Nom</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((message) => (
              <tr key={message._id}>
                <td>
                  <div className={styles.user}>
                    <Image
                      src="/image/AFEC/logo.png"
                      alt="user"
                      width={50}
                      height={50}
                    />
                    <span>{message.name}</span>
                  </div>
                </td>
                <td>{message.email}</td>
                <td>{message.phone}</td>
                <td>
                  {message.isRead ? (
                    <span style={{ color: "green" }}>
                      Vu {message.readAt ? new Date(message.readAt).toLocaleString() : ""}
                    </span>
                  ) : (
                    <span style={{ color: "red" }}>Non lu</span>
                  )}
                </td>
                <td>
                  <div className={styles.buttons}>
                    <form action={handleClickView}>
                      <input type="hidden" name="id" value={message._id.toString()} />
                      <button
                        className={`${styles.button} ${styles.view} btn btn-primary hvr-fill-black`}
                        data-bs-toggle="modal"
                        data-bs-target={`#viewUserModal-${message._id}`}
                        type="submit"
                      >
                        Voir
                      </button>
                    </form>

                    <button
                      className={`${styles.button} ${styles.delete} btn btn-primary hvr-fill-black`}
                      data-bs-toggle="modal"
                      data-bs-target={`#confirmDeleteModal-${message._id}`}
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Pas de messages.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modals d’édition */}
      {messages?.map((message) => (
        <div
          key={`modal-edit-${message._id}`}
          className="modal fade"
          id={`viewUserModal-${message._id}`}
          tabIndex="-1"
          aria-labelledby={`viewUserModalLabel-${message._id}`}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`viewUserModalLabel-${message._id}`}>
                  Voir le message
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <FormModifierMessage
                message={{
                  _id: message._id.toString(),
                  name: message.name,
                  email: message.email,
                  phone: message.phone || "",
                  message: message.message,
                }}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Modals suppression (identique à calculateur) */}
      {messages?.map((message) => (
        <div
          key={`modal-delete-${message._id}`}
          className="modal fade"
          id={`confirmDeleteModal-${message._id}`}
          tabIndex="-1"
          aria-labelledby={`confirmDeleteLabel-${message._id}`}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`confirmDeleteLabel-${message._id}`}>
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
                 Êtes-vous sûr de vouloir supprimer le message from <strong>{message.name}</strong>?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Annuler
                </button>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={message._id.toString()} />
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

      {/* Pagination */}
      <PaginationDash totalPages={totalPages} currentPage={page} />

      {/* Modal ajout message */}
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
                Ajouter un message
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <FormAddContact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
