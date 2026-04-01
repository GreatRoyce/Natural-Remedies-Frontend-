import { useState } from "react";
import FormInput from "./FormInput";
import CompBtn from "../ui/CompBtn";
import { login } from "../../utils/auth";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(formData);
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Login failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
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

      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}

      <CompBtn
        type="submit"
        variant="primary"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </CompBtn>
    </form>
  );
};

export default LoginForm;
