// frontend\src\auth\LoginForm.jsx
import { useState } from "react";
import FormInput from "./FormInput";
import CompBtn from "../components/ui/CompBtn";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <FormInput
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <CompBtn type="submit" variant="primary" className="w-full">
        Login
      </CompBtn>
    </form>
  );
};

export default LoginForm;
