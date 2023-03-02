import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import Dropdown from "./components/Dropdown";
import { UserContext } from "./context/UserContext";

export default function Header() {
  const { user, setUser, ready } = useContext(UserContext);

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    toast("See you later! 👋");
  }

  return (
    <header className="p-4 py-6 flex">
      <div className="flex flex-1 justify-start mr-auto ">
        <Link
          to={"/"}
          className="flex  items-center gap-4 text-primary transition duration-300 hover:text-primaryDarken"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 -rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
          <h1 className="font-bold text-3xl hidden md:block">aircnc</h1>
        </Link>
      </div>
      <div className="flex sm:flex-1 justify-center items-center gap-3 max-w-sm border-gray-300 border rounded-full sm:pl-4 sm:pr-3 py-2 shadow-md shadow-gray-100 transition duration-300 hover:cursor-pointer hover:shadow-lg">
        <div className="hidden sm:block">Any&nbsp;where</div>
        <div className="hidden sm:block border-l border-gray-300 pl-3">
          Any&nbsp;week
        </div>
        <div className="hidden sm:block border-l border-gray-300 pl-3">
          Any&nbsp;body
        </div>
        <button className="mx-2 sm:mx-0 sm:ml-2 bg-primary text-white p-[6px] rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 justify-end ml-auto">
        <Dropdown>
          <Dropdown.Trigger>
            <div className="flex items-center gap-2 border border-gray-300 rounded-full px-2 py-1 shadow-md shadow-gray-100 transition duration-300 hover:cursor-pointer hover:shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 hidden sm:block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/* {!ready && <div>Profile</div>}
            {!!user && <div className="capitalize">{user.firstname}</div>} */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`w-10 h-10 ${
                  !!user ? "fill-primary" : "fill-gray-500"
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Dropdown.Trigger>
          <Dropdown.Content>
            {user ? (
              <>
                <Dropdown.Link to={"/profile"} className="rounded-t-md">
                  My Profile
                </Dropdown.Link>
                <Dropdown.Button onClick={logout}>Logout</Dropdown.Button>
              </>
            ) : (
              <>
                <Dropdown.Link to={"/login"} className="hover:rounded-t-md">
                  Login
                </Dropdown.Link>
                <Dropdown.Link to={"/register"} className="rounded-b-md">
                  Register
                </Dropdown.Link>
              </>
            )}
          </Dropdown.Content>
        </Dropdown>
      </div>
    </header>
  );
}
