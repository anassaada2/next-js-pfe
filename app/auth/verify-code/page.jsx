"use client";

import { useState } from "react";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const phoneSchema = z.string().min(3, "Numéro invalide");
const codeSchema = z.string().length(6, "Code invalide");

export default function VerifyCode() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      phoneSchema.parse(phone);
      codeSchema.parse(code);

      setLoading(true);
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur serveur");

      toast.success("Code vérifié avec succès !");
      router.push(`reset-password/${data.token_reset}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <Toaster position="top-center" />
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-md-6 p-5">
          <h1 className="display-5 fw-bold text-center">
            Vérification du Code
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="tel"
                className="form-control form-control-lg"
                placeholder="06 12 34 56 78"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Entrez votre code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg w-100"
              disabled={loading}
            >
              {loading ? "Vérification..." : "Vérifier"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
