import Image from "next/image";
import Link from "next/link";

export default function SidebarContact() {
    return (
        <div
            className="offcanvas offcanvas-end"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
        >
            <div className="offcanvas-header">
                <button
                    type="button"
                    className="close-btn"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                >
                    <Image
                        height={32}
                        width={32}
                        src="/image/icons/close.svg"
                        alt="icon"
                    />
                </button>
            </div>
            <div className="offcanvas-body">
                <div className="offcanvas-body-text" id="offcanvasExampleLabel">
                    <div className="brand">
                        <Link href="/" className="brand-link">
                            <Image
                                height={26}
                                width={149}
                                className="brand-logo"
                                src="/image/logo-dark.svg"
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet adipiscing elit. Suspendisse
                        varius enim in eros elementum tristique. Duis cursus, mi
                        quis viverra ornare, eros dolor interdum nulla
                    </p>
                </div>
                <div className="offcanvas-contact-widget">
                    <div className="contact-widget">
                        <h3 className="contact-widget__title">Find us</h3>
                        <span className="contact-widget__text">
                            Dattner Architects 498Seventh Ave20th FloorNew York,
                            NY 10018
                        </span>
                    </div>
                    <div className="contact-widget">
                        <h3 className="contact-widget__title">get in touch</h3>
                        <span className="contact-widget__text">
                            +123 456789 admin@bizdev.com
                        </span>
                    </div>
                </div>
            </div>
            <div className="offcanvas-footer">
                <div className="offcanvas-social-links">
                    <Link href="/">
                        <Image
                            height={27}
                            width={18}
                            src="/image/icons/facebook.svg"
                            alt="facebook"
                        />
                        facebook
                    </Link>
                    <span>/</span>
                    <Link href="/">
                        <Image
                            height={27}
                            width={18}
                            src="/image/icons/twitter.svg"
                            alt="twitter"
                        />
                        twitter
                    </Link>
                    <span>/</span>
                    <Link href="/">
                        <Image
                            height={27}
                            width={18}
                            src="/image/icons/youtube.svg"
                            alt="youtube"
                        />
                        youtube
                    </Link>
                </div>
            </div>
        </div>
    );
}
