import { useState } from "react";
import RevealCard from "../components/ui/RevealCard";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primarybackground px-4">
      <RevealCard className="w-full max-w-md p-6">
        <div className="grid grid-cols-2 border bg-primary/10 rounded-t-2xl mb-6 text-sm">
          <button
            onClick={() => setIsLogin(true)}
            className={`py-2 font-semibold rounded-tl-2xl ${
              isLogin ? "bg-primary text-white" : "opacity-50"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`py-2 font-semibold rounded-tr-2xl ${
              !isLogin ? "bg-primary text-white" : "opacity-50"
            }`}
          >
            Register
          </button>
        </div>

        {isLogin ? <LoginForm /> : <RegisterForm />}
      </RevealCard>
    </div>
  );
};

export default Auth;
