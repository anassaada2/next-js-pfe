"use client";
import { useState } from "react";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const emailSchema = z.string().email("Email invalide");
const phoneSchema = z.string().min(3, "Numéro invalide");

export default function ForgotPassword() {
  const router = useRouter();
  const [method, setMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validation des données
      if (method === "email") emailSchema.parse(email);
      else phoneSchema.parse(phone);

      // Envoi de la requête
      const res = await fetch("/api/auth/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(method === "email" ? { email } : { phone }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erreur serveur");

      // Redirection pour le SMS
      if (method === "phone" && data.phone) {
        router.push(`/auth/verify-code`);
      }

      toast.success(
        method === "email"
          ? "Email envoyé ! Vérifiez votre boîte mail."
          : "SMS envoyé ! Vérifiez votre téléphone."
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container-fluid">
      <Toaster position="top-center" />
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-md-6  text-center p-5 d-flex flex-column justify-content-center align-items-center       ">
          <h1 className="display-5 fw-bold  ">
            Réinitialisation de mot de passe
          </h1>
          <Image
            src="/image/AFEC/logo.png"
            width={400}
            height={400}
            alt="Logo"
            className="mb-4"
          />
        </div>

        <div className="col-md-6 p-5">
          <div className="mb-4">
            <button
              className={`btn btn-lg ${
                method === "email" ? "btn-primary" : "btn-outline-primary"
              } me-3`}
              onClick={() => setMethod("email")}
            >
              Email
            </button>
            <button
              className={`btn btn-lg ${
                method === "phone" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setMethod("phone")}
            >
              SMS
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              {method === "email" ? (
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="adresse@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              ) : (
                <input
                  type="tel"
                  className="form-control form-control-lg"
                  placeholder="06 12 34 56 78"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
              {method === "email" ? "Envoyer l'email" : "Envoyer le SMS"}
            </button>

            <div className="text-center">
              <Link href="/auth/login" className="text-decoration-none">
                ← Retour à la connexion
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
