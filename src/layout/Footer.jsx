import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebookF, FaLeaf } from "react-icons/fa";
import CompBtn from "../components/ui/CompBtn";
import Logo from "../assets/NaturalRemediesLogo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-primary from-[5%] to-tertiary text-tertiarybackground pt-20 pb-10 px-6 font-poppins">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        {/* ================= BRAND SECTION ================= */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-xl font-montserrat font-semibold">
          <img src={Logo} alt="Natural Remedies Logo" className="h-14 object-contain w-auto" />
          </div>

          <p className="text-sm text-primarybackground/80 leading-relaxed">
            A curated platform for natural remedies, structured herbal
            knowledge, and responsible wellness guidance.
          </p>

          <div className="flex gap-4 pt-2">
            <a
              href="#"
              className="p-2 rounded-full border border-primarybackground/40 hover:bg-primary hover:text-white transition"
            >
              <FaInstagram size={14} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full border border-primarybackground/40 hover:bg-primary hover:text-white transition"
            >
              <FaTwitter size={14} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full border border-primarybackground/40 hover:bg-primary hover:text-white transition"
            >
              <FaFacebookF size={14} />
            </a>
          </div>
        </div>

        {/* ================= EXPLORE ================= */}
        <div>
          <h4 className="font-montserrat font-semibold mb-5">Explore</h4>
          <ul className="space-y-2 sm:space-y-3 text-primarybackground/90 text-sm">
            <li>
              <Link to="/explore" className="hover:text-primary transition">
                Browse Remedies
              </Link>
            </li>
            <li>
              <Link
                to="/explore?category=immunity"
                className="hover:text-primary transition"
              >
                Immunity
              </Link>
            </li>
            <li>
              <Link
                to="/explore?category=inflammation"
                className="hover:text-primary transition"
              >
                Inflammation
              </Link>
            </li>
            <li>
              <Link
                to="/explore?category=cold"
                className="hover:text-primary transition"
              >
                Cold & Flu
              </Link>
            </li>
          </ul>
        </div>

        {/* ================= CONTRIBUTE ================= */}
        <div>
          <h4 className="font-montserrat font-semibold mb-5">Contribute</h4>
          <ul className="space-y-2 sm:space-y-3 text-primarybackground/90 text-sm">
            <li>
              <Link to="/contribute" className="hover:text-primary transition">
                Become a Herbalist
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-primary transition">
                Herbalist Dashboard
              </Link>
            </li>
            <li>
              <Link to="/guidelines" className="hover:text-primary transition">
                Submission Guidelines
              </Link>
            </li>
          </ul>
        </div>

        {/* ================= NEWSLETTER ================= */}
        <div>
          <h4 className="font-montserrat font-semibold mb-5">Stay Updated</h4>

          <p className="text-sm text-primarybackground/80 mb-4">
            Get updates on new remedies and trusted herbal insights.
          </p>

          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-lg bg-primarybackground text-tertiary text-sm outline-none"
            />

            <CompBtn
              variant="primary"
              className="bg-primary text-white text-sm hover:opacity-90 transition"
            >
              Subscribe
            </CompBtn>
          </div>
        </div>
      </div>

      {/* ================= DIVIDER ================= */}
      <div className="border-t  border-primarybackground/20 mt-16 pt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-accent">
          <div>
            © {new Date().getFullYear()} NaturalRemedies. All rights reserved.
          </div>

          <div className="flex flex-wrap sm:flex  gap-6">
            <Link to="/privacy" className="hover:text-white/90 transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white/90 transition">
              Terms of Service
            </Link>
            <Link to="/disclaimer" className="hover:text-white/90 transition">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
