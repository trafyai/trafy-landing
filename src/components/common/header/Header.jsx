"use client";
import "@styles/common/header/NavBar.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import whiteLogo from "@public/assets/Images/common/header/blackLogo.png";
import trafyIcon from "@public/assets/Images/common/header/trafy icon.png";
import close1 from "@public/assets/Images/common/header/close.svg";
import blackHamburger from "@public/assets/Images/common/header/hamburger.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const timeoutRef = useRef(null);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null); // New ref for dropdown
  const router = useRouter();

  useEffect(() => {
    const handlePopState = () => {
      setMenuOpen(false);
      setHover(false);
      document.body.classList.remove("overflow");
    };
  
    window.addEventListener("popstate", handlePopState);
  
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        document.body.classList.remove("overflow");
      }
      // Close the dropdown if clicked outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setHover(false);
      }
    };

    if (menuOpen || hover) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, hover]);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
    setHover(false);
    document.body.classList.toggle("overflow");
  }

  function handleNavigation(targetPath) {
    if (targetPath.startsWith("#")) {
      setMenuOpen(false);
      setHover(false);
      document.body.classList.remove("overflow");
      const element = document.querySelector(targetPath);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (targetPath.startsWith("http")) {
      window.location.href = targetPath;
    } else if (router.pathname !== targetPath) {
      setMenuOpen(false);
      setHover(false);
      document.body.classList.remove("overflow");
      router.push(targetPath);
    }
  }

  const handleDropDown = () => {
    setHover(!hover);
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      setHover(false);
      router.push("/");
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-log">
          <Link href="/">
            <Image src={trafyIcon} className="trafy-icon" />
            <Image src={whiteLogo} alt="trafy logo" className="trafy-logo" />
          </Link>
        </div>

        <div className="menu-lg">
          <div className="menu-left">
            <Link
              href="https://trafyai.com/courses"
              className="menu-pathway"
              onClick={() => handleNavigation("https://trafyai.com/courses")}
            >
              Pathway
            </Link>
            <Link
              href="/"
              className="menu-pathway"
              onClick={() => handleNavigation("/")}
            >
              Masterclass
            </Link>
            <Link
              href="https://blog.trafyai.com"
              className="menu-resources"
              onClick={() => handleNavigation("https://blog.trafyai.com")}
            >
              Resources
            </Link>
          </div>
          <div className="menu-right-d">
           
              <Link
                href="http://localhost:3001/login"
                className="menu-signup"
                onClick={() => handleNavigation("http://localhost:3001/login")}
              >
                Get Started
              </Link>
    
          </div>
        </div>

        <div className="menu-mobile">
          <Link
            href="https://trafyai.com/courses"
            className="menu-pathway"
            onClick={() => handleNavigation("https://trafyai.com/courses")}
            style={{ paddingRight: "16px" }}
          >
            Pathway
          </Link>
          <Image
            src={blackHamburger}
            alt=""
            className={`hamburger ${menuOpen ? "hide" : ""}`}
            onClick={toggleMenu}
          />
          <Image
            src={close1}
            alt=""
            className={`exit-icon ${menuOpen ? "show" : ""}`}
            onClick={toggleMenu}
          />

          {menuOpen && (
            <div className="menu-mobile-contents" ref={menuRef}>
              <div className="menu-top-contents">
                <Link
                  href="/"
                  className="menu-pathway"
                  onClick={() => handleNavigation("/")}
                >
                  Masterclass
                </Link>
                <Link
                  href="https://blog.trafyai.com"
                  className="menu-resources"
                  onClick={() => handleNavigation("https://blog.trafyai.com")}
                >
                  Resources
                </Link>
           
              </div>
            
              <div className="menu-right">
                  <Link
                    href="http://localhost:3001/login"
                    className="menu-signup"
                    onClick={() => handleNavigation("http://localhost:3001/login")}
                  >
                    Get Started
                  </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
