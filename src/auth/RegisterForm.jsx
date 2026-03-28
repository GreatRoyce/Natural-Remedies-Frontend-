import { useState } from "react";
import CompBtn from "../components/ui/CompBtn";
import Stepper from "./Stepper";
import BasicInfoStep from "./steps/BasicInfoStep";
import ProfessionalStep from "./steps/ProfessionalStep";
import AddressStep from "./steps/AddressStep";

const RegisterForm = () => {
  const [isUser, setIsUser] = useState(true);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    website: "",
    bio: "",
    credentials: "",
    yearsOfExperience: "",
    country: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const maxSteps = isUser ? 2 : 3;

  const handleNext = () => {
    if (
      step === 1 &&
      (!formData.name ||
        !formData.email ||
        !formData.password ||
        formData.password !== formData.confirmPassword)
    ) {
      alert("Check required fields and password match.");
      return;
    }

    setStep((prev) => Math.min(prev + 1, maxSteps));
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const role = isUser ? "user" : "herbalist";

    const payload = {
      ...formData,
      role,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      },
    };

    console.log("Register Payload:", payload);
  };

  return (
    <>
      {/* Role Toggle */}
      <div className="grid grid-cols-2 gap-2 mb-6 text-sm">
        <button
          onClick={() => setIsUser(true)}
          className={`py-2 rounded-lg font-semibold ${
            isUser
              ? "bg-primary text-white"
              : "border border-accent text-accent"
          }`}
        >
          As Client
        </button>

        <button
          onClick={() => setIsUser(false)}
          className={`py-2 rounded-lg font-semibold ${
            !isUser
              ? "bg-primary text-white"
              : "border border-accent text-accent"
          }`}
        >
          As Herbalist
        </button>
      </div>

      <Stepper step={step} maxSteps={maxSteps} />

      <form onSubmit={handleSubmit} className="space-y-4 text-sm mt-6">
        {step === 1 && (
          <BasicInfoStep formData={formData} onChange={handleChange} />
        )}

        {step === 2 && !isUser && (
          <ProfessionalStep formData={formData} onChange={handleChange} />
        )}

        {(step === 2 && isUser) || (step === 3 && !isUser) ? (
          <AddressStep formData={formData} onChange={handleChange} />
        ) : null}

        <div className="flex gap-3 pt-2">
          {step > 1 && (
            <CompBtn
              type="button"
              variant="secondary"
              onClick={handlePrev}
              className="flex-1"
            >
              Previous
            </CompBtn>
          )}

          {step < maxSteps ? (
            <CompBtn
              type="button"
              variant="primary"
              onClick={handleNext}
              className="flex-1"
            >
              Next
            </CompBtn>
          ) : (
            <CompBtn type="submit" variant="primary" className="flex-1">
              Register
            </CompBtn>
          )}
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
