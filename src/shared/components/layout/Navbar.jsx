import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import {
  motion as Motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import CompBtn from "../ui/CompBtn";
import logo from "../../../assets/NaturalRemediesLogo.png";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const openAuthModal = (mode = "login") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setMenuOpen(false);
  };

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        setAuthModalOpen(false);
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <Motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className={`fixed top-0 left-0 w-full h-16 z-50 
      flex items-center justify-between px-6
      transition-all duration-300
      ${scrolled ? " shadow-md backdrop-blur-md bg-gradient-to-b from-primary from-[60%] to-tertiary" : "bg-gradient-to-b from-primary from-[80%] to-tertiary"}
      `}
    >
      {/* 🔹 Logo → Homepage */}
      <div className="flex items-center">
        <Link to="/">
          <img
            src={logo}
            alt="Natural Remedies Logo"
            className="h-12 object-contain cursor-pointer"
          />
        </Link>
      </div>

      {/* 🔹 Desktop Nav */}
      <div className="hidden md:flex items-center space-x-10">
        <ul className="flex text-sm space-x-8 font-medium">
          <li className="group relative">
            <Link
              to="/explore"
              className="text-primarybackground transition-colors duration-300 hover:text-green-700"
            >
              Explore
              <span className="absolute left-1/2 -bottom-1 h-[2px] w-0 -translate-x-1/2 bg-primarybackground transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>

          <li className="group relative">
            <Link
              to="/contribute"
              className="text-primarybackground transition-colors duration-300 hover:text-green-700"
            >
              Contribute
              <span className="absolute left-1/2 -bottom-1 h-[2px] w-0 -translate-x-1/2 bg-primarybackground transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>

        <CompBtn
          variant="primary"
          onClick={() => openAuthModal("login")}
          className="flex items-center gap-2 bg-transparent text-sm font-medium active:scale-95"
        >
          <CgProfile className="text-lg" />
          Account
        </CompBtn>
      </div>

      {/* 🔹 Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => {
            setMenuOpen(!menuOpen);
            setAuthModalOpen(false);
          }}
          className="text-sm font-semibold text-primarybackground focus:outline-none"
        >
          Menu
        </button>
      </div>

      {/* 🔹 Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <Motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-16 left-0 w-full bg-white border-t shadow-md md:hidden overflow-hidden"
          >
            <ul className="flex flex-col text-sm font-medium">
              <li className="border-b">
                <Link
                  to="/explore"
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  Explore
                </Link>
              </li>

              <li className="border-b">
                <Link
                  to="/contribute"
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  Contribute
                </Link>
              </li>

              <li
                onClick={() => openAuthModal("login")}
                className="px-6 py-4 border-b hover:bg-gray-50 cursor-pointer transition-colors"
              >
                Login
              </li>

              <li
                onClick={() => openAuthModal("register")}
                className="px-6 py-4 border-b hover:bg-gray-50 cursor-pointer transition-colors"
              >
                Register
              </li>
            </ul>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Auth Modal */}
      <AnimatePresence>
        {authModalOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center px-4"
            onClick={() => setAuthModalOpen(false)}
          >
            <Motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="grid grid-cols-2 border bg-primary/10 rounded-t-2xl mb-6 text-sm">
                <button
                  onClick={() => setAuthMode("login")}
                  className={`py-2 font-semibold rounded-tl-2xl ${
                    authMode === "login" ? "bg-primary text-white" : "opacity-50"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthMode("register")}
                  className={`py-2 font-semibold rounded-tr-2xl ${
                    authMode === "register" ? "bg-primary text-white" : "opacity-50"
                  }`}
                >
                  Register
                </button>
              </div>

              {authMode === "login" ? <LoginForm /> : <RegisterForm />}

              <CompBtn
                variant="secondary"
                onClick={() => setAuthModalOpen(false)}
                className="w-full mt-4"
              >
                Close
              </CompBtn>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.nav>
  );
};

export default Navbar;
