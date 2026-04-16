import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import CompBtn from "../ui/CompBtn";
import { login } from "../../utils/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getDashboardRoute = (user) => {
    const role = user?.role?.toString().toLowerCase();
    if (role === "herbalist") return "/dashboard/herbalist";
    if (role === "admin") return "/system/admin";
    if (role === "superadmin" || role === "super-admin") return "/super-admin";
    return "/dashboard/user";
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const user = await login(formData);
      navigate(getDashboardRoute(user), { replace: true });
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
