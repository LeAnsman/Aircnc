import React, { useContext } from "react";
import { Navigate, NavLink, useParams } from "react-router-dom";
import AccountNav from "../../components/AccountNav";
import { UserContext } from "../../context/UserContext";
import PlacesPage from "./Places/Places";

export default function Profile() {
  const { user, ready } = useContext(UserContext);
  const { subpage } = useParams();

  // return a loader ?
  if (!ready) {
    return "Loading ...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === undefined && (
        <div className="text-center">
          Logged in as{" "}
          <span className="capitalize">
            {user.firstname} {user.lastname}
          </span>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
