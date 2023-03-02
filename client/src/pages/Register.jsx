import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [redirect, setRedirect] = useState(false);

  let isSamePassword = false;

  const toggleShowPassword = () => {
    setPasswordShown(!passwordShown);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (password === passwordConfirm) {
      try {
        await axios.post("/register", {
          email,
          firstname,
          lastname,
          password,
        });
        toast(
          <div>
            Thanks for being awesome! 🎉
            <br /> You can now login. 🥳
          </div>
        );
        setRedirect(true);
      } catch (err) {
        toast.error(
          <div>
            {err.message}. <br /> Please try again later.
          </div>
        );
      }
    } else {
      toast.error("Passwords must match");
    }
  }

  if (password == passwordConfirm) {
    isSamePassword = true;
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className=" grow flex flex-col items-center justify-center gap-16">
      <h2 className="text-center text-2xl">Register</h2>
      <form
        className="flex flex-col items-center gap-8 mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your@email.com"
          autoFocus
          required
          className="border border-green-500 px-4 py-2 rounded-xl shadow-lg shadow-gray-100 transition duration-300 hover:shadow-xl invalid:border-primary/75 invalid:text-primary focus:invalid:border-primary/75 focus:invalid:ring-primary/75"
        />
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="Firstname"
          required
          minLength="2"
          maxLength="35"
          className="border border-green-500 px-4 py-2 rounded-xl shadow-lg shadow-gray-100 transition duration-300 hover:shadow-xl invalid:border-primary/75 focus:invalid:border-primary/75 focus:invalid:ring-primary/75"
        />
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Lastname"
          required
          minLength="2"
          maxLength="35"
          className="border border-green-500 px-4 py-2 rounded-xl shadow-lg shadow-gray-100 transition duration-300 hover:shadow-xl invalid:border-primary/75 focus:invalid:border-primary/75 focus:invalid:ring-primary/75"
        />
        <input
          type={passwordShown ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          minLength="8"
          maxLength="24"
          className="border border-green-500 px-4 py-2 rounded-xl shadow-lg shadow-gray-100 transition duration-300 hover:shadow-xl invalid:border-primary/75 invalid:text-primary focus:invalid:border-primary/75 focus:invalid:ring-primary/75"
        />
        <input
          type={passwordShown ? "text" : "password"}
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="Password Confirm"
          required
          minLength="8"
          maxLength="24"
          className={`border px-4 py-2 rounded-xl shadow-lg shadow-gray-100 transition duration-300 hover:shadow-xl invalid:border-primary/75
            ${
              isSamePassword
                ? "border-green-500"
                : "text-primary border-primary/75 ring-primary/75 focus:border-primary/75 focus:ring-primary/75"
            }`}
        />
        <div className="flex ">
          <label htmlFor="show_password">
            {passwordShown ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="w-6 h-6 stroke-primary cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="w-6 h-6 stroke-primary cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </label>
          <input
            type="checkbox"
            id="show_password"
            onClick={toggleShowPassword}
            className="hidden"
          />
        </div>

        <button
          type="submit"
          className="uppercase border px-4 py-2 rounded-xl w-full shadow-lg shadow-gray-100 transition duration-300 hover:shadow-xl bg-primary text-white hover:bg-primaryDarken"
        >
          Join the air
        </button>
        <Link
          className="text-lg underline-offset-4 hover:underline "
          to={"/login"}
        >
          Already part of the flight ?
        </Link>
      </form>
    </div>
  );
}
