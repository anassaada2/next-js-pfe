import Image from "next/image";
import Link from "next/link";

export default function PageNotFound() {
    return (
        <section className="error-section ">
            <div className="container">
                <div className="error-section-shape">
                    <Image
                        height={357}
                        width={728}
                                    src="/image/AFEC/logo.png"
                        alt="bg-obj"
                        className="h-auto"
                    />
                </div>
                <div className="row justify-content-center">
                    <div className="col-xxl-6 col-lg-7 col-md-8 col-xs-11">
                        <div className="error-content">
                            <div className="error-content__image">
                                <Image
                                    height={220}
                                    width={572}
                                    src="/image/common/error.png"
                                    alt="error"
                                    className="h-auto"
                                />
                            </div>
                            <h2 className="heading-md text-black mb-res-60">
                                The page you were looking for does not exist
                            </h2>
                            <Link
                                href="/"
                                className="btn btn-primary hvr-fill-black"
                            >
                                Back to home
                                <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
