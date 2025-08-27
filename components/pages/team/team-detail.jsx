import Image from "next/image";
import Link from "next/link";
import ContactForm from "./ui/contact-form";

const social = [
    {
        icon: "/image/icons/facebook.svg",
        link: "/",
    },
    {
        icon: "/image/icons/twitter.svg",
        link: "/",
    },
    {
        icon: "/image/icons/linkedin.svg",
        link: "/",
    },
];

export default function TeamDetail() {
    return (
        <div className="team-details-main-section bg-sand section-padding-140">
            <div className="container">
                <div className="row  gutter-y-40">
                    <div className="col-lg-5">
                        <div className="team-details-image">
                            <Image
                                height={471}
                                width={416}
                                src="/image/common/single-team-image.png"
                                alt="profile image"
                                className="h-auto"
                            />
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="team-single-details-wrapper">
                            <div className="team-member-info padding-bottom-100">
                                <span className="team-member__position">
                                    Technical Director
                                </span>
                                <h3 className="team-member__name">
                                    Halina Zając
                                </h3>
                                {/* social icon start */}
                                <div className="social-list-widget">
                                    {social?.map((item, i) => (
                                        <Link key={i} href={item.link}>
                                            <Image
                                                height={18}
                                                width={18}
                                                src={item.icon}
                                                alt="icon"
                                            />
                                        </Link>
                                    ))}
                                </div>
                                {/* social icon end */}
                                <p>
                                    There are many variations of passages of
                                    Lorem Ipsum available but the majority of
                                    have suffered alteration in that some form
                                    injected humour or randomised words which
                                    don&apos;t look even slightly believable. If
                                    you are Lorem Ipsum you need to be sure
                                    there anything embarrassing.
                                </p>
                                <p>
                                    At Konstruktion, we are passionate about
                                    driving value into every project undertake.
                                    We continue to challenge our people,
                                    projects and the industry. By being
                                    forward-thinking, we are continually finding
                                    new ways to delive
                                </p>
                                <div className="team-member-contact-widgets border-top">
                                    <div className="contact-widget">
                                        <h3 className="contact-widget__title">
                                            Call Me
                                        </h3>
                                        <span className="contact-widget__text">
                                            +123 456789
                                        </span>
                                    </div>
                                    <div className="contact-widget">
                                        <h3 className="contact-widget__title">
                                            Email Me:
                                        </h3>
                                        <span className="contact-widget__text">
                                            h.zajac@arcatec.com
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* contact form start */}
                            <ContactForm />
                            {/* contact form end */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
