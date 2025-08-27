import Link from "next/link";

export default function Cta() {
  return (
    <div className="cta-section bg-sand padding-top-100 padding-bottom-140">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="cta-content">
              <div className="cta-content__text-block">
                <span className="anas-title">Réservez votre consultation</span>
                <h6 className="cta-content__title heading-md  text-black">
                  De l'esquisse à la réalisation : des constructions sûres,
                  durables et innovantes
                </h6>
              </div>
              <div className="cta-content__button">
                <Link
                  href="/contact"
                  className="btn btn-primary hvr-fill-black"
                >
                  Passons à l'action
                  <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
