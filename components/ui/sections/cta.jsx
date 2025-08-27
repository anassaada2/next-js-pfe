import Link from "next/link";

export default function Cta() {
  return (
    <>
      <div className="cta-section-02 padding-bottom-140">
        <div className="container">
          <div className="cta-section-02__wrapper">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="cta-content-02">
                  <div className="col-9  ">
                    <h3 className="text-uppercase mb-2">
                      Réservez votre consultation
                    </h3>
                    <h2 className="cta-content-02__title heading-md text-black">
                      De l'esquisse à la réalisation : des constructions sûres,
                      durables et innovantes
                    </h2>
                  </div>
                  <div className="cta-content-02__button">
                    <Link
                      href="/contact"
                      className="btn btn-black hvr-black-white"
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
      </div>
    </>
  );
}
