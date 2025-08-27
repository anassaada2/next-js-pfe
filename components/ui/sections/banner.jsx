import Link from "next/link";

export default function Banner({ title, pathName }) {
    return (
        <div className="inner_banner-section bg-black">
            <div className="container">
                <div className="inner_banner-content-block">
                    <h3 className="inner_banner-title text-sand ">{title}</h3>
                    <ul className="banner__page-navigator">
                        <li>
                            <Link href="/about" className="text-scorpion">
                                Home
                            </Link>
                        </li>
                        <li className="active">
                            <span className="text-sand">{pathName}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
