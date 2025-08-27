"use client";
import useSticky from "@/hooks/useSticky";
import Image from "next/image";
import Link from "next/link";
import Navigation from "./ui/navigation";
import Card2 from "./ui/card-2";
import HamburgerBtn from "./ui/hamburger-btn";

export default function Header2() {
    // sticky header
    const scrolling = useSticky(50);
    const sticky = useSticky(650);

    return (
        <header
            className={`site-header site-header--sticky site-header--black ${
                scrolling ? "scrolling" : ""
            } ${sticky ? "reveal-header" : ""}`}
        >
            <div>
                <nav className="navbar site-navbar border-none">
                    <div className="brand">
                        <Link href="/home-2" className="brand-link">
                            <Image
                                priority="true"
                                height={26}
                                width={149}
                                className="brand-logo"
                                src="/image/logo.svg"
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div className="menu-block-wrapper ">
                        <div className="menu-overlay" />
                        <nav className="menu-block">
                            {/* navigation menu start */}
                            <Navigation />
                            {/* navigation menu end */}
                        </nav>
                    </div>
                    {/* hamburger menu start */}
                    <HamburgerBtn />
                    {/* hamburger menu end */}
                    <div className="header-cta-btn-wrapper">
                        <div className="header-group-2">
                            <Card2 />
                            <a
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                                className="menu-link-item"
                            >
                                <div className="menu-btn">
                                    <Image
                                        height={22}
                                        width={22}
                                        src="/image/icons/app-grid.svg"
                                        alt="icon"
                                    />
                                </div>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
