import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import axios from "axios";
import { toast } from "react-toastify"; // 1. Added missing toast import

const Login = () => {
  const [state0, setState0] = useState("Login");

  const { setShowLogin, setToken, setUser } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state0 === "Login") {
        // Double check that import.meta.env.VITE_BACKEND_URL is defined in your .env file
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
          {
            email,
            password,
          },
        );

        // Debugging point: check exactly what your backend returns
        console.log("Login Response Data:", data);

        if (data.success || data.user) {
          // If backend wraps it in data.user, grab it. Otherwise adapt to your API layout.
          const activeUser = data.user || data.userData;

          setToken(data.token);
          setUser(activeUser);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          toast.success("Login successful");
        } else {
          toast.error(data.message || "Invalid Credentials");
        }
      } else if (state0 === "Sign up") {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
          {
            name,
            email,
            password,
          },
        );

        console.log("Register Response Data:", data);

        if (data.success || data.user) {
          const activeUser = data.user || data.userData;

          setToken(data.token);
          setUser(activeUser);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          toast.success("Sign up successful");
        } else {
          toast.error(data.message || "Invalid Credentials");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error logging in");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    // Fixed backdrop-blurr-sm -> backdrop-blur-sm
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={onSubmitHandler} // Crucial! Make sure the form submits handler
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state0}
        </h1>
        {state0 !== "Login" ? (
          <p className="text-sm mt-1">Welcome! Please sign up to continue</p>
        ) : (
          <p className="text-sm mt-1">
            Welcome Back! Please sign in to continue
          </p>
        )}
        {state0 !== "Login" && (
          <div className="border border-[#C9B8AA] px-6 py-3 flex items-center gap-3 rounded-full mt-5">
            <div className="w-6 flex justify-center">
              <img
                src={assets.profile_icon}
                className="w-5 h-5 object-contain"
                alt=""
              />
            </div>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              required
              className="outline-none text-sm bg-transparent"
            />
          </div>
        )}

        <div className="border border-[#C9B8AA] px-6 py-3 flex items-center gap-3 rounded-full mt-4">
          <div className="w-6 flex justify-center">
            <img
              src={assets.email_icon}
              className="w-5 h-5 object-contain"
              alt=""
            />
          </div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email id"
            required
            className="outline-none text-sm bg-transparent"
          />
        </div>

        <div className="border border-[#C9B8AA] px-6 py-3 flex items-center gap-3 rounded-full mt-4">
          <div className="w-6 flex justify-center">
            <img
              src={assets.lock_icon}
              className="w-5 h-5 object-contain"
              alt=""
            />
          </div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
            className="outline-none text-sm bg-transparent"
          />
        </div>
        <p className="text-sm text-[#F04925] my-4 cursor-pointer">
          Forgot Password?
        </p>

        <button
          type="submit"
          className="bg-[#F04925] hover:bg-[#D63F1F] transition-colors duration-300 w-full text-white py-2 rounded-full"
        >
          {state0 === "Login" ? "Login" : "Create Account"}
        </button>

        {state0 === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an Account?{" "}
            <span
              className="text-[#F04925] cursor-pointer"
              onClick={() => setState0("Sign up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an Account?{" "}
            <span
              className="text-[#F04925] cursor-pointer"
              onClick={() => setState0("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          className="absolute top-5 right-5 cursor-pointer"
          alt=""
        />
      </motion.form>
    </div>
  );
};

export default Login;
