import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompBtn from "../../../shared/components/ui/CompBtn";
import Navbar from "../../../shared/components/layout/Navbar";
import RegisterForm from "../../../shared/components/auth/RegisterForm";
import Footer from "../../../shared/components/layout/Footer";

const Contribute = ({ user }) => {
  const navigate = useNavigate();

  const isLoggedIn = !!user;
  const isHerbalist = user?.role === "herbalist";

  const [showSignUp, setShowSignUp] = useState(false);

  /* =============================
     Redirect Herbalists
  ============================= */
  useEffect(() => {
    if (isLoggedIn && isHerbalist) {
      navigate("/dashboard/submit");
    }
  }, [isLoggedIn, isHerbalist, navigate]);

  return (
    <div className="bg-tertiarybackground font-poppins text-tertiary min-h-screen">
      <Navbar />

      {/* ================= HERO (PUBLIC ONLY) ================= */}
      {!isLoggedIn && (
        <section className="pt-40 pb-20 px-6 text-center bg-gradient-to-t from-primary from-[50%] to-tertiary">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="companyname text-3xl md:text-4xl font-montserrat text-accent font-semibold">
              Share Your Herbal Knowledge
            </h1>

            <p className="text-sm text-primarybackground/90 md:text-lg max-w-xl mx-auto">
              Publish natural remedies and help people make informed health
              choices.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <CompBtn
                text="Join as Herbalist"
                onClick={() => setShowSignUp(true)}
                className="bg-primary text-white hover:opacity-90 transition"
              />

              <CompBtn
                text="Sign In"
                onClick={() => navigate("/auth")}
                className="border border-tertiary text-tertiary hover:bg-tertiary hover:text-white transition"
              />
            </div>
          </div>
        </section>
      )}

      {/* ================= UPGRADE SECTION ================= */}
      {isLoggedIn && !isHerbalist && (
        <section className="py-24 px-6 text-center bg-primarybackground">
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-4xl font-montserrat font-semibold">
              Become a Verified Herbalist
            </h1>

            <p className="text-secondarybackground">
              Upgrade your account to start submitting remedies and share your
              knowledge.
            </p>

            <CompBtn
              text="Upgrade to Herbalist"
              onClick={() => navigate("/upgrade")}
              className="bg-primary text-white hover:opacity-90 transition"
            />
          </div>
        </section>
      )}

      {/* ================= PUBLIC INFORMATION SECTIONS ================= */}
      {!isLoggedIn && (
        <>
          {/* WHAT YOU CAN DO */}
          <section className="py-8 md:py-12 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-center sm:mb-4 mb-10">
                What You Can Do
              </h2>

              <div className="grid md:grid-cols-3 gap-10">
                <div className="space-y-2 sm:space-y-4">
                  <h3 className="text-sm md:text-xl font-semibold">
                    Create Remedies
                  </h3>
                  <p className="text-secondarybackground text-xs sm:text-sm">
                    Submit detailed herbal formulations with benefits and usage
                    instructions.
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-4">
                  <h3 className="text-sm md:text-xl font-semibold">
                    Build Credibility
                  </h3>
                  <p className="text-secondarybackground text-xs sm:text-sm">
                    Showcase your expertise to a growing audience.
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-4">
                  <h3 className="text-sm md:text-xl font-semibold">
                    Help People Heal Naturally
                  </h3>
                  <p className="text-secondarybackground text-xs sm:text-sm">
                    Contribute knowledge rooted in tradition and clarity.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="py-8 md:py-12 px-6 bg-primarybackground">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-center sm:mb-4 mb-10">
                How It Works
              </h2>

              <div className="space-y-4 sm:space-y-6 text-left text-sm sm:text-lg max-w-2xl mx-auto">
                <div>
                  <span className="font-semibold">1.</span> Create an account as
                  a Herbalist
                </div>
                <div>
                  <span className="font-semibold">2.</span> Submit your remedy
                  for review
                </div>
                <div>
                  <span className="font-semibold">3.</span> Get published and
                  reach users
                </div>
              </div>
            </div>
          </section>

          {/* QUALITY & REVIEW */}
          <section className="py-8 md:py-12 px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-center mb-4 sm:mb-10">
                Quality & Review Process
              </h2>

              <p className="text-secondarybackground text-sm sm:text-lg">
                All submissions are reviewed to ensure clarity, safety, and
                responsible herbal guidance.
              </p>
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="pt-10 pb-16 px-6 text-center bg-primarybackground">
            <div className="max-w-2xl mx-auto space-y-6">
              <p className="text-sm sm:text-lg">
                If you have knowledge worth sharing, this is your platform.
              </p>

              <CompBtn
                text="Join as Herbalist"
                onClick={() => setShowSignUp(true)}
                className="bg-primary text-white hover:opacity-90 transition"
              />
            </div>
          </section>
        </>
      )}

      {/* ================= SIGNUP MODAL ================= */}
      {showSignUp && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-8 relative shadow-xl">
            <button
              onClick={() => setShowSignUp(false)}
              className="absolute top-4 right-4 text-secondarybackground text-lg"
            >
              ✕
            </button>

            <RegisterForm defaultRole="herbalist" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Contribute;
