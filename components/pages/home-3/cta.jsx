import Link from "next/link";

export default function Cta() {
    return (
        <div
            className="cta-section-03 overlay-07 section-padding-140"
            style={{
                backgroundImage: 'url("image/home-3/cta-background-image.png")',
            }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="cta-content-03">
                            <div className="cta-content-03__text-block">
                                <span className="cta-content-03__subtitle">
                                    Get a consultation with our skilled designer
                                </span>
                                <h1 className="cta-content-03__title heading-xxl text-sand">
                                    Let&apos;s make something great together
                                </h1>
                            </div>
                            <div className="cta-content-03__button">
                                <Link
                                    href="/home-3"
                                    className="btn btn-primary hvr-fill-black"
                                >
                                    Build a project with us
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
