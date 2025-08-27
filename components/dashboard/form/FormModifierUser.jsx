"use client";

import { updateUser } from "@/lib/actions";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

// Ajout du champ status
const updateUserSchema = z.object({
  id: z.string(),
  username: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z
    .string()
    .optional()
    .refine((val) => (val ? isValidPhoneNumber(val) : true), {
      message: "Numéro de téléphone invalide",
    }),
  password: z.string().optional(),
  role: z.enum(["admin", "user"]),
  status: z.enum(["active", "inactive"]),
});

function FormModifierUser({ user }) {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const rawData = {
      id: formData.get("id"),
      username: formData.get("username"),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      password: formData.get("password") || undefined,
      role: formData.get("role").toLowerCase(), // pour correspondre à zod enum
      status: formData.get("status"),
    };

    try {
      updateUserSchema.parse(rawData);
      const result = await updateUser(rawData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Utilisateur modifié avec succès !");
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
      <div className="modal-body">
        <input type="hidden" name="id" value={user._id.toString()} />

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            defaultValue={user.username}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            defaultValue={user.email}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            defaultValue={user.phone || ""}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nouveau mot de passe (optionnel)</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Laisser vide pour ne pas changer"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            name="role"
            defaultValue={user.role}
            required
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="status"
            defaultValue={user.status}
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Fermer
        </button>
        <button type="submit" className="btn btn-primary hvr-fill-black">
          Sauvegarder
        </button>
      </div>
    </form>
  );
}

export default FormModifierUser;
