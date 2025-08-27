'use client';
import { useEffect } from 'react';
import { useActionState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { addMessage } from '@/lib/actions';

export default function ContactForm() {
  const initialState = { success: null, error: null };
  const [state, formAction, pending] = useActionState(addMessage, initialState);

  // Affiche le toast de succès ou d'erreur
  useEffect(() => {
    if (state.success) {
      toast.success('Message envoyé avec succès !');
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div className="contact-form-box">
      <h3 className="contact-form__title">CONTACTEZ NOUS</h3>
      <form action={formAction}>
        <div className="row gutter-y-default justify-content-center">
          <div className="col-lg-6">
            <input type="text" name="name" placeholder="Nom complet" className="form-control" required />
          </div>
          <div className="col-lg-6">
            <input type="text" name="phone" placeholder="Téléphone" className="form-control" required />
          </div>
          <div className="col-lg-12">
            <input type="email" name="email" placeholder="Email" className="form-control" required />
          </div>
          <div className="col-lg-12">
            <textarea name="message" placeholder="Votre message" className="form-control" required />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary hvr-fill-black" type="submit" disabled={pending}>
              {pending ? 'Envoi en cours...' : 'Envoyez'}
              <i className="fa-solid fa-arrow-right icon-arrow-corner" />
            </button>
          </div>
        </div>
      </form>
      <Toaster />
    </div>
  );
}
