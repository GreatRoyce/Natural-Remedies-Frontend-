import React from "react";
import Bottle from "../../assets/Buttle.png";

const steps = [
  {
    id: 1,
    title: "Search",
    subtitle: "Find what you need quickly.",
    actionLabel: "Search by:",
    actionItems: [
      "Symptoms (e.g., headaches, digestion, stress)",
      "Conditions",
      "Plant or herb names",
    ],
    description:
      "Our system helps you navigate traditional remedies without digging through scattered or unreliable sources.",
  },
  {
    id: 2,
    title: "Learn",
    subtitle: "Understand before you use.",
    actionLabel: "Each remedy includes:",
    actionItems: [
      "What it’s commonly used for",
      "How it works in the body",
      "Preparation methods",
      "Dosage guidance",
      "Safety considerations",
    ],
    description: "The goal is informed decisions — not assumptions.",
  },
  {
    id: 3,
    title: "Apply",
    subtitle: "Use with clarity and confidence.",
    actionLabel: "Once you understand the remedy:",
    actionItems: [
      "Prepare it correctly",
      "Follow recommended usage",
      "Be aware of precautions",
    ],
    description:
      "Healing should be intentional. Knowledge reduces risk and improves outcomes.",
  },
];

const WhyAndHow = () => {
  return (
    <section className="mt-16 bg-tertiarybackground font-poppins">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* WHY SECTION */}
            <header className="space-y-4">
              <h1 className="text-3xl lg:text-4xl pt-3 font-bold text-primary font-montserrat">
                Why Natural Remedies
              </h1>
              <p className="text-sm lg:text-base text-accent max-w-xl">
                For centuries, herbal medicine has supported healing across
                cultures. But finding reliable, well-explained information today
                can be difficult.
              </p>
              <p className="text-sm lg:text-base text-accent max-w-xl">
                Natural Remedies brings structure to traditional knowledge.
              </p>
            </header>

            {/* BOTTLE FEATURE BLOCK — with glass effect */}
            <section className="border-2 border-primary rounded-3xl p-6 flex flex-col md:flex-row items-center gap-8 bg-white/10 backdrop-blur-sm">
              <img
                src={Bottle}
                alt="Bottle"
                className=" w-40 md:w-52 object-contain"
              />

              <div className="text-accent space-y-4">
                <h4 className="font-semibold text-base">
                  Each remedy is presented with:
                </h4>

                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Clear explanations of its purpose</li>
                  <li>Documented benefits</li>
                  <li>Preparation guidance</li>
                  <li>Usage considerations and precautions</li>
                </ul>
              </div>
            </section>

            {/* DESCRIPTION */}
            <article className="text-sm lg:text-base text-accent leading-relaxed space-y-4">
              <p>
                We don’t rely on exaggerated claims or vague descriptions. We
                focus on transparency, context, and responsible use.
              </p>
              <p>
                Whether you are exploring natural options for the first time or
                already familiar with herbal practices, the goal is the same: to
                help you understand not just what to use — but why it works and
                how to use it properly.
              </p>
            </article>

            {/* PARTICIPATION */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold text-accent font-montserrat">
                Two Ways to Participate
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-primary">As a User</h3>
                  <ul className="list-disc pl-6 text-sm space-y-2 text-accent">
                    <li>Explore remedies</li>
                    <li>Save helpful treatments</li>
                    <li>Build your understanding of natural medicine</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-primary">As a Herbalist</h3>
                  <ul className="list-disc pl-6 text-sm space-y-2 text-accent">
                    <li>Publish your remedies</li>
                    <li>Share structured knowledge</li>
                    <li>
                      Contribute to a growing library of trusted herbal
                      practices
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN — HOW IT WORKS — with glass effect */}
          <div className="bg-white/20 backdrop-blur-md border border-black/10 rounded-3xl px-8 pb-8 shadow-xl space-y-12">
            <header>
              <h2 className="text-2xl md:text-3xl pt-4 font-bold text-accent font-montserrat">
                How It Works
              </h2>
            </header>

            {steps.map((step) => (
              <div
                key={step.id}
                className="space-y-4 border-b border-primary/30 pb-6 last:border-none last:pb-0"
              >
                <h3 className="text-xl font-semibold text-primary">
                  {step.id}. {step.title}
                </h3>

                <p className="text-sm text-secondarybackground">
                  {step.subtitle}
                </p>

                <div>
                  <p className="pb-2 font-medium text-sm text-accent">
                    {step.actionLabel}
                  </p>

                  <ul className="list-disc list-inside space-y-2 text-sm text-accent">
                    {step.actionItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <p className="text-sm text-secondarybackground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAndHow;
