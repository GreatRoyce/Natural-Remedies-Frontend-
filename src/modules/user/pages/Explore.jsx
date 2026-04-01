import React, { useState } from "react";
import CompBtn from "../../../shared/components/ui/CompBtn";
import { remedyData } from "../../../shared/utils/remedyData";
import Navbar from "../../../shared/components/layout/Navbar";
import RegisterForm from "../../../shared/components/auth/RegisterForm";
import Footer from "../../../shared/components/layout/Footer";

const allCategories = ["All", ...new Set(remedyData.map((r) => r.category))];

/* =========================
   Remedy Card
========================= */
const RemedyCard = ({ remedy, onPreview }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
      <div className="h-56 overflow-hidden relative">
        <img
          src={remedy.image}
          alt={remedy.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <span className="absolute top-4 left-4 bg-primary text-tertiarybackground text-xs px-3 py-1 rounded-full">
          {remedy.category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-tertiary mb-2">
          {remedy.title}
        </h3>

        <p className="text-sm text-secondarybackground mb-3">
          Duration: {remedy.duration}
        </p>

        <p className="text-xs text-secondarybackground mb-6">
          Contributor: {remedy.contributor}
        </p>

        <button
          onClick={onPreview}
          className="text-primary font-medium text-sm hover:underline"
        >
          View Preview
        </button>
      </div>
    </div>
  );
};

/* =========================
   Preview Modal
========================= */
const PreviewModal = ({ remedy, onClose, onSignUp }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white max-w-lg w-full rounded-2xl p-8 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondarybackground text-lg"
        >
          ✕
        </button>

        <h2 className="text-lg sm:text-xl font-semibold text-tertiary mb-4">
          {remedy.title}
        </h2>

        <p className="text-xs sm:text-sm text-secondarybackground mb-6">
          Full preparation steps and ingredient details are available after sign up.
        </p>

        <div className="flex text-xs sm:text-sm md:text-lg gap-4">
          <CompBtn variant="primary" onClick={onSignUp}>
            Sign Up
          </CompBtn>

          <CompBtn variant="secondary">
            Join as Herbalist
          </CompBtn>
        </div>
      </div>
    </div>
  );
};

/* =========================
   Explore Page
========================= */
const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeRemedy, setActiveRemedy] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);

  const filteredRemedies = remedyData.filter(
    (remedy) =>
      selectedCategory === "All" || remedy.category === selectedCategory
  );

  const previewRemedies = filteredRemedies.slice(0, 4);

  return (
    <section className="min-h-screen bg-primary/20 font-poppins pt-40">
      <Navbar />

      <div className="container mx-auto px-4 max-w-6xl">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="companyname text-3xl md:text-4xl font-semibold text-tertiary font-montserrat mb-4">
            Explore Natural Remedies
          </h1>
          <p className="text-secondarybackground max-w-xl mx-auto">
            A curated preview of trusted herbal solutions.
          </p>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex justify-center gap-3 flex-wrap mb-14">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 text-sm rounded-full border transition-all duration-200
                ${
                  selectedCategory === category
                    ? "bg-primary text-tertiarybackground border-primary shadow-md"
                    : "border-primary text-primary hover:bg-primary hover:text-tertiarybackground"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {previewRemedies.map((remedy) => (
              <RemedyCard
                key={remedy.id}
                remedy={remedy}
                onPreview={() => setActiveRemedy(remedy)}
              />
            ))}
          </div>

          {/* FADE LOCK EFFECT */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-tertiarybackground to-transparent pointer-events-none" />
        </div>

        {/* LOCKED SECTION CTA */}
        <div className="mt-24 mb-14 text-center">
          <h2 className="text-2xl font-semibold text-tertiary mb-4">
            Unlock Full Access
          </h2>

          <p className="text-secondarybackground mb-8 max-w-lg mx-auto">
            Sign up to access full preparation steps, ingredients, and 100+
            additional remedies.
          </p>

          <CompBtn variant="primary" onClick={() => setShowSignUp(true)}>
            Sign Up Now
          </CompBtn>
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {activeRemedy && (
        <PreviewModal
          remedy={activeRemedy}
          onClose={() => setActiveRemedy(null)}
          onSignUp={() => {
            setActiveRemedy(null);
            setShowSignUp(true);
          }}
        />
      )}

      {/* SIGN UP MODAL */}
      {showSignUp && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-8 relative shadow-xl">
            <button
              onClick={() => setShowSignUp(false)}
              className="absolute top-4 right-4 text-secondarybackground text-lg"
            >
              ✕
            </button>

            <RegisterForm />
          </div>
        </div>
      )}
      <Footer />
    </section>
  );
};

export default Explore;
