"use client";
import Link from "next/link";
import Navigation from "./ui/navigation";
import Image from "next/image";
import useSticky from "@/hooks/useSticky";
import HamburgerBtn from "./ui/hamburger-btn";

export default function Header3() {
    // sticky header
    const scrolling = useSticky(50);
    const sticky = useSticky(650);

    return (
        <header
            className={`site-header site-header--sticky site-header--white site-header--v3 ${
                scrolling ? "scrolling" : ""
            } ${sticky ? "reveal-header" : ""}`}
        >
            <div className="container">
                <nav className="navbar site-navbar">
                    <div className="brand">
                        <Link href="/home-3" className="brand-link">
                            <Image
                                height={26}
                                width={149}
                                className="brand-logo"
                                src="/image/logo-dark.svg"
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div className="menu-block-wrapper ">
                        <div className="menu-overlay" />
                        <nav className="menu-block" id="append-menu-header">
                            
                            {/* navigation menu start */}
                            <Navigation />
                            {/* navigation menu end */}
                        </nav>
                    </div>
                    {/* hamburger menu start */}
                    <HamburgerBtn />
                    {/* hamburger menu end */}
                    <div className="header-cta-btn-wrapper">
                        <div className="header-group-3">
                            <Link
                                href="/home-3"
                                className="btn btn-primary hvr-fill-black"
                            >
                                Get in touch
                                <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
