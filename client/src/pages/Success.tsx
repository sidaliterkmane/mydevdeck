import { useNavigate } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";

const Success = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="success-page w-screen h-screen flex justify-center items-center bg-neutral-950">
      <div className="border border-neutral-800 w-[550px] h-[450px] rounded-xl p-[2rem] flex flex-col justify-between items-center">
        <div className="flex justify-center items-center relative">
          <div className="absolute w-[50px] h-[50px] rounded-full bg-white"></div>
          <FaCircleCheck size={"60px"} color="#302a3b" className="z-[1]" />
        </div>
        <h2 className="text-3xl font-semibold">Congratulations</h2>
        <p className="font-light text-neutral-200 text-center">
          Your payment was successful and you have officially registered to
          MyDevDeck.
        </p>

        <div className="w-full flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 bg-neutral-900 rounded-lg p-[1rem]">
              <h4 className="text-sm font-semibold">WHAT'S NEXT?</h4>
              <p className="paragraph font-light text-xs text-neutral-400">
                We've reached out to you via email with your temporary password.
                You will have to use it upon the first time you log in the
                application. You will then be able to set your own password and
                begin using MyDevDeck.
              </p>
            </div>

            <button
              onClick={redirectToLogin}
              className="w-full h-[40px] rounded-lg border border-neutral-800 bg-neutral-900 pl-4 text-sm text-neutral-300 transition hover:brightness-105"
            >
              Login →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
