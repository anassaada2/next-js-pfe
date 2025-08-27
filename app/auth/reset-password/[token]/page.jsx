"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
const passwordSchema = z
  .string()
  .min(8, "Minimum 8 caractères")
  .regex(/[A-Z]/, "Au moins une majuscule")
  .regex(/[0-9]/, "Au moins un chiffre");

export default function ResetPassword({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { token } = params; // Le token JWT dans l'URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation des mots de passe
      passwordSchema.parse(password);
      if (password !== confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas");
      }

      // Envoi de la requête
      const res = await fetch(`/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          confirmPassword,
          token,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erreur serveur");

      toast.success("Mot de passe réinitialisé avec succès !");
      router.push("/aut/login");
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => toast.error(error.message));
      } else {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <Toaster position="top-center" />
        <div className="col-md-6">
          <h1 className="mb-4">Nouveau mot de passe</h1>

          <form onSubmit={handleSubmit}>
            {/*       {phone && (
              <div className="mb-3">
                <label>Code de vérification</label>
                <input
                  type="text"
                  className="form-control"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
            )}*/}

            <div className="mb-3">
              <label>Nouveau mot de passe</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label>Confirmer le mot de passe</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? "Traitement..." : "Réinitialiser"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
