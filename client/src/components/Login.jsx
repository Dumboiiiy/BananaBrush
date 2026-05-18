import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [state0, setState0] = useState("Login");

  const {setShowLogin} = useContext(AppContext)

  useEffect(()=>{
    document.body.style.overflow = 'hidden';
    return ()=>{
        document.body.style.overflow = 'unset';
    }
  },[])

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blurr-sm bg-black/30 flex justify-center items-center">
      <form className="relative bg-white p-10 rounded-xl text-slate-500">
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
              />
            </div>
            <input
              type="text"
              placeholder="Full Name"
              required
              className="outline-none text-sm bg-transparent"
            />
          </div>
        )}

        <div className="border border-[#C9B8AA] px-6 py-3 flex items-center gap-3 rounded-full mt-4">
          <div className="w-6 flex justify-center">
            <img src={assets.email_icon} className="w-5 h-5 object-contain" />
          </div>
          <input
            type="email"
            placeholder="Email id"
            required
            className="outline-none text-sm bg-transparent"
          />
        </div>

        <div className="border border-[#C9B8AA] px-6 py-3 flex items-center gap-3 rounded-full mt-4">
          <div className="w-6 flex justify-center">
            <img src={assets.lock_icon} className="w-5 h-5 object-contain" />
          </div>
          <input
            type="password"
            placeholder="Password"
            required
            className="outline-none text-sm bg-transparent"
          />
        </div>
        <p className="text-sm text-[#F04925] my-4 cursor-pointer">
          Forgot Password?
        </p>

        <button className="bg-[#F04925] hover:bg-[#D63F1F] transition-colors duration-300 w-full text-white py-2 rounded-full">
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
          onClick={()=>setShowLogin(false)}
          src={assets.cross_icon}
          className="absolute top-5 right-5 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Login;
