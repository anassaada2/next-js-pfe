import Link from "next/link";

export default function Cta() {
    return (
        <div className="cta-section padding-bottom-140">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-8 col-xs-9">
                        <div className="cta-content-04 text-center">
                            <div className="cta-content-04__text-block">
                                <span className="subtitle">
                                    Have any question?
                                </span>
                                <h2 className="cta-content-04__title heading-md text-black mb-res-60">
                                    Fell free to ask us any type of questions
                                </h2>
                            </div>
                            <div className="cta-content-04__button">
                                <Link
                                    href="/"
                                    className="btn btn-primary hvr-fill-black"
                                >
                                    Have any question?
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
