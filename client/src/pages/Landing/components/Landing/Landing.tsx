import { useNavigate } from "react-router-dom";

// Component imports
import Navbar from "./components/Navbar";
import CheckoutButton from "./components/CheckoutButton";

const Landing = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="landing w-screen h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col w-full h-full justify-center items-center gap-3">
        <div className="flex flex-col gap-2">
          <CheckoutButton />
          <p className="text-sm font-light text-neutral-400">
            Already a member ?
            <span
              onClick={redirectToLogin}
              className="transition text-neutral-300 hover:text-white cursor-pointer"
            >
              {" "}
              Login
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
