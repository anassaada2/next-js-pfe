"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

// Schéma de validation Zod
const signUpSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  phone: z.string().optional(),
});

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validation avec Zod
      signUpSchema.parse(form);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Erreur lors de l'inscription");

      toast.success("Inscription réussie !");
      setTimeout(() => router.push("/auth/login"), 1000);
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => toast.error(error.message));
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="container-fluid">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-md-6 d-flex justify-content-center align-items-center text-center flex-column mb-4">
          <h1 className="display-4 fw-bold">Bienvenue !</h1>
          <Image
            src="/image/AFEC/logo.png"
            width={400}
            height={400}
            alt="Logo"
          />
        </div>

        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <h2 className="mb-4 text-center">Inscription</h2>
          <form className="w-75" onSubmit={handleSubmit}>
            {/* Les champs du formulaire restent inchangés */}
            <div className="mb-3">
              <input
                name="name"
                className="form-control"
                placeholder="Nom"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Mot de passe"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                name="phone"
                className="form-control"
                placeholder="Téléphone (optionnel)"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              S'inscrire
            </button>
            <div className="mt-3 text-center">
              <span>Déja j'ai un compte ? &nbsp; </span>
              <Link href="/auth/login     " className="text-decoration-none">
                Se connecter
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
