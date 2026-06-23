import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [credit, setCredit] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const loadCreditsData = async () => {
    if (!token || token === "null" || token === "undefined") return;

    try {
      console.log("Sending Token to Backend:", token);

      const { data } = await axios.post(
        `${backendUrl}/api/user/credits`,
        {},
        {
          headers: {
            token: token,
          },
        },
      );

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.log(
        "Credits Fetch Error:",
        error.response?.data || error.message,
      );
      if (error.response?.data?.error !== "Invalid token") {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const generateImage = async (prompt) => {
    try {
      const {data} = await axios.post(backendUrl + "/api/image/generate-image", {
        prompt,
      }, {headers: {token: token}});
      if(data.success){
        loadCreditsData();
        console.log(data);
        return data.resultImage
      }else{
        toast.error(data.message)
        loadCreditsData();
        if(data.creditBalance === 0){
          navigate("/buy");
        }
      }
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.message);
    }
  }

  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
