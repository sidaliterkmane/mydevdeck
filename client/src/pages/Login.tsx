import React from "react";

const Login = () => {
  return (
    <div className="success-page w-screen h-screen flex justify-center items-center bg-neutral-950">
      <div className="border border-neutral-800 w-[400px] rounded-xl p-[2rem] flex flex-col gap-4 justify-between items-center">
        <div className="header w-full flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Login</h3>
          <p className="paragraph font-light text-sm text-neutral-400">
            Login to mydevdeck to access and modify your developer portfolios.
          </p>
        </div>

        <form action={""} className="w-full flex flex-col">
          <label htmlFor="" className="font-light text-sm mb-1">
            Email Address
          </label>
          <input
            placeholder="mydevdeck@gmail.com"
            type="text"
            className="p-2 text-neutral-100 text-sm font-light rounded-lg h-[40px] bg-neutral-800 border border-neutral-700 focus:outline-none focus:border-2 focus:border-neutral-600 placeholder:opacity-50"
          />

          <label htmlFor="" className="font-light text-sm mb-1 mt-3">
            Password
          </label>
          <input
            placeholder="********"
            type="password"
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
