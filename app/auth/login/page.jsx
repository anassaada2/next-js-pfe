"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { Facebook, Globe } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const role = session.user.role;
      if (role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }
   
  }, [status, session, router]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      loginSchema.parse(form);

      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success("Connexion réussie !");

            

    } catch (err) {
      toast.dismiss();
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => toast.error(error.message));
      } else {
        toast.error(err.message || "Erreur de connexion");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider, e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await signIn(provider, { callbackUrl: "/dashboard" });
      if (result?.error) throw new Error(result.error);
    } catch (err) {
      toast.dismiss();
      toast.error(err.message || "Erreur de connexion");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid">
      <Toaster position="top-center" />

      <div className="row vh-100 justify-content-center align-items-center">
<div className="col-md-6 mb-1 mb-md-5">
  <h1 className="display-4 fw-bold text-center  mb-md-5">Content de vous revoir !</h1>
  <Image
    src="/image/AFEC/logo.png"
    width={300}
    height={300}
    alt="Logo"
    className="mx-auto d-block"
  />
</div>



        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <h2 className="mb-4 text-center">Connexion</h2>
          <form className="w-75" onSubmit={handleSubmit}>
            <fieldset disabled={isSubmitting}>
              <div className="mb-3">
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Mot de passe"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
              <div className="mb-3 text-end">
                <Link href="/auth/forgot-password" className="text-decoration-none">
                  Mot de passe oublié ?
                </Link>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                {isSubmitting ? "Connexion..." : "Se connecter"}
              </button>
              <div className="mt-3 text-center">
                <span>Ou connectez-vous avec</span>
              </div>
              <div className="d-flex gap-2 mt-3">
                <button
                  onClick={(e) => handleSocialLogin("google", e)}
                  className="btn btn-outline-danger w-50 d-flex align-items-center justify-content-center gap-2 shadow-lg rounded-4"
                >
                  <Globe size={18} /> Google
                </button>
                <button
                  onClick={(e) => handleSocialLogin("facebook", e)}
                  className="btn btn-outline-primary w-50 d-flex align-items-center justify-content-center gap-2 shadow-lg rounded-4"
                >
                  <Facebook size={18} /> Facebook
                </button>
              </div>
              <div className="mt-3 text-center">
                <span>Pas de compte ?&nbsp;</span>
                <Link href="/auth/register" className="text-decoration-none">
                  S'inscrire
                </Link>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
