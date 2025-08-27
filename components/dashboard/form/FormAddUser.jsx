"use client";

import { addUser } from "@/lib/actions";
import { toast } from "react-hot-toast";
import { z } from "zod";

const addUserSchema = z.object({
  username: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  phone: z.string().optional(),
  role: z.enum(["admin", "user"]),
});

function FormAddUser() {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const rawData = {
      username: formData.get("username"),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      password: formData.get("password"),
      role: formData.get("role"),
    };

    try {
      addUserSchema.parse(rawData);
      const result = await addUser(rawData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Utilisateur ajouté avec succès !");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      } else {
        toast.error(error.message || "Une erreur est survenue");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input name="username" type="text" className="form-control" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input name="email" type="email" className="form-control" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          name="phone"
          type="text"
          className="form-control"
          placeholder="Optional"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          name="password"
          type="password"
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Role</label>
        <select name="role" className="form-select" required>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Fermer
        </button>
        <button type="submit" className="btn btn-primary  hvr-fill-black">
          Ajouter
        </button>
      </div>
    </form>
  );
}

export default FormAddUser;
