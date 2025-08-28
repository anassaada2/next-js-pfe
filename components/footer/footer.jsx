import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    label: "Acceuil",
    url: "/",
  },
  {
    label: "A propos de nous",
    url: "/about",
  },
  {
    label: "Services",
    url: "/service",
  },
  {
    label: "Réalisations",
    url: "/Réalisations",
  },
  {
    label: "Calculette",
    url: "/Calculette",
  },
  {
    label: "Contact",
    url: "/Contact",
  },
];

const footerSocialLinks = [
  {
    label: "Facebook",
    icon: "fa-brands fa-square-facebook",
    url: "/",
  },
  {
    label: "Twitter",
    icon: "fa-brands fa-twitter",
    url: "/",
  },
  {
    label: "Youtube",
    icon: "fa-brands fa-youtube",
    url: "/",
  },
];

export default function Footer() {
  // date
  const date = new Date().getFullYear();

  return (
    <div className="footer-section bg-black padding-top-140">
      <div className="container">
        <div className="footer-section__shape ">
          <Image
            height={217}
            width={459}
            src="/image/AFEC/logo2.JPG"
            alt="section pattern"
          />
        </div>
        <div className="row row--footer-main gutter-y-50">
          <div className="col-xl-4 col-lg-5 col-md-8">
            <div className="footer-section__content-block">
              <div className="footer-section__content-text">
                {/* <div className="footer-brand">
                  <Image
                    height={57}
                    width={57}
                    src="/image/AFEC/logo.png"
                    alt="image alt"
                    className="h-auto"
                  />
                  <span>AFEC</span>
                </div> */}
                <p>
                  <span className="afec-span"> AFEC</span> est un bureau
                  d'études et de développement spécialisé dans l’ingénierie et
                  les études de projets complexes de génie civil et de sécurité
                  incendie
                </p>
              </div>
              <form action="#" className="newsletter-form-1">
                <input
                  type="email"
                  placeholder="Entrez votre adresse e-mail"
                  className="form-control"
                />
                <button className="submit-button icon-arrow-corner text-primary btn-reset">
                  <i className="fa-solid fa-arrow-right" />
                </button>
              </form>
            </div>
          </div>
          <div className="offset-xl-2 col-xl-6 offset-lg-1 col-lg-6">
            <div className="row row--list-block">
              <div className="col-auto">
                <div className="footer-contact-block">
                  <div className="single-block">
                    <h3 className="footer-title">Trouvez-nous</h3>
                    <p>
                      ZI Menzel Chaker - BP Nº14 <br />
                      3020 / Menzel Chaker
                      <br />
                      Sfax - TUNISIE
                    </p>
                  </div>
                  <div className="single-block">
                    <h3 className="footer-title">Contactez-nous</h3>
                    <ul className="list-style-regular row-gap-8">
                      <li>
                        <Link href="/">+216 97 760 754</Link>
                      </li>
                      <li>
                        <Link href="/">fendri.ayman@gmail.com</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <h3 className="footer-title">Pages </h3>
                <ul className="list-style-regular">
                  {footerLinks?.map((item, i) => (
                    <li key={i}>
                      <Link href={item.url}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-block padding-top-140">
        <div className="container">
          <div className="copyright-row">
            <div className="copyright-text">
              <p>© {date} tous les droits sont réservés </p>
            </div>
            <ul className="divider-navigation-inline footer-social-list">
              {footerSocialLinks?.map((item, i) => (
                <li key={i}>
                  <Link href={item.url}>
                    <i className={item.icon} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
