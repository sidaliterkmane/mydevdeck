import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const { setUser }: any = useContext(UserContext);
  
  const loginUser = async (e: {preventDefault: () => void }) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      const response = await axios.post("/auth/login", { email, password });
      const loginData = response.data;

      if (loginData.error) {
        toast.error(loginData.error);
      } else {
        // Fetch user profile and update context
        const profileResponse = await axios.get('/auth/profile');
        setUser(profileResponse.data);
        toast.success("Login successful. Welcome to MyDevDeck!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error
    }
  }

  return (
    <div className="success-page w-screen h-screen flex justify-center items-center bg-neutral-950">
      <div className="border border-neutral-800 w-[400px] rounded-xl p-[2rem] flex flex-col gap-4 justify-between items-center">
        <div className="header w-full flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Login</h3>
          <p className="paragraph font-light text-sm text-neutral-400">
            Login to mydevdeck to access and modify your developer portfolios.
          </p>
        </div>

        <form onSubmit={loginUser} className="w-full flex flex-col">
          <label htmlFor="" className="font-light text-sm mb-1">
            Email Address
          </label>
          <input
            id="email"
            placeholder="mydevdeck@gmail.com"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="p-2 text-neutral-100 text-sm font-light rounded-lg h-[40px] bg-neutral-800 border border-neutral-700 focus:outline-none focus:border-2 focus:border-neutral-600 placeholder:opacity-50"
          />

          <label htmlFor="" className="font-light text-sm mb-1 mt-3">
            Password
          </label>
          <input
            id="password"
            placeholder="••••••••"
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value})}
            className="p-2 text-neutral-100 text-sm font-light rounded-lg h-[40px] bg-neutral-800 border border-neutral-700 focus:outline-none focus:border-2 focus:border-neutral-600 placeholder:opacity-50"
          />

          <button
            type="submit"
            className="w-full h-[40px] rounded-lg border border-neutral-800 bg-neutral-900 pl-4 text-sm text-neutral-300 transition hover:brightness-105 mt-8"
          >
            Login →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
