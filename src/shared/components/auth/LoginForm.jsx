import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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

      {/* Password field with reveal toggle */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-secondarybackground rounded-lg bg-tertiarybackground focus:outline-none focus:ring-2 focus:ring-primary/50 pr-10"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-secondarybackground hover:text-primary transition"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

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