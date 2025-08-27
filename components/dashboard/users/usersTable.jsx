"use client";

import React from "react";
import styles from "./users.module.scss";
import Image from "next/image";
import { deleteUser, updateUser } from "@/lib/actions";

export default function UsersTable({ users }) {
  return (
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
            <React.Fragment key={user._id}>
              <tr>
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
                      className={`${styles.button} ${styles.view}`}
                      data-bs-toggle="modal"
                      data-bs-target={`#viewUserModal-${user._id}`}
                    >
                      View
                    </button>

                    <form action={deleteUser}>
                      <input type="hidden" name="id" value={user._id} />
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

              {/* Modal par utilisateur */}
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
                        Edit User
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <form action={updateUser}>
                      <div className="modal-body">
                        <input type="hidden" name="id" value={user._id} />

                        <div className="mb-3">
                          <label className="form-label">Username</label>
                          <input
                            type="text"
                            className="form-control"
                            name="username"
                            defaultValue={user.username}
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            defaultValue={user.email}
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Role</label>
                          <select
                            className="form-select"
                            name="role"
                            defaultValue={user.role}
                          >
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                          </select>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Status</label>
                          <select
                            className="form-select"
                            name="status"
                            defaultValue={user.status}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td colSpan="5">No users found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
