import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import CheckoutButton from "./components/CheckoutButton";

const Landing = () => {
  const navigate = useNavigate();
  
  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="landing w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-3">
        <CheckoutButton />
        <p className="text-sm font-light text-neutral-400">
          Already a member ? 
          <span onClick={redirectToLogin} className="transition text-neutral-300 hover:text-white cursor-pointer"> Login</span>.
        </p>
      </div>
    </div>
  )
}

export default Landing;