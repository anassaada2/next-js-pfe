"use client";
import Link from "next/link";
import React from "react";
import Navigation from "./ui/navigation";
import Cart from "./ui/cart";
import useSticky from "@/hooks/useSticky";
import Image from "next/image";
import HamburgerBtn from "./ui/hamburger-btn";

export default function Header() {
  // sticky header
  const scrolling = useSticky(50);
  const sticky = useSticky(650);

  return (
    <header
      className={`site-header site-header--sticky site-header--black site-header--menu-left  ${
        scrolling ? "scrolling" : ""
      } ${sticky ? "reveal-header" : ""}`}
    >
      <div>
        <nav className="navbar site-navbar">
          <div className="brand">
            <Link href="/" className="brand-link">
              <img
                height={106}
                width={106}
                src="../image/AFEC/logo-.png"
                alt="logo"
              />
            </Link>
            <h1>AFEC</h1>
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
            <div className="header-group-1">
              <a className="menu-link-item" href="tel:+21697760754">
                <div className="menu-btn">+216 97 760 754</div>
              </a>

              {/*    <Cart />*/}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
