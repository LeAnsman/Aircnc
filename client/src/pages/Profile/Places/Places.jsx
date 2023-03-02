import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../../../components/AccountNav.jsx";
import { UserContext } from "../../../context/UserContext.jsx";
import PlaceForm from "./PlaceForm.jsx";

export default function Places() {
  const { action } = useParams();
  const { user, ready } = useContext(UserContext);

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      const { data } = await axios.get("/places-user");
      setPlaces(data);
    }
    fetchPlaces();
  }, []);

  return (
    <div>
      <AccountNav />
      <Link
        to={"/profile/places/new"}
        className="flex justify-center gap-4 text-white bg-primary max-w-fit px-6 py-2 mx-auto rounded-full shadow-md shadow-gray-200 transition duration-300 hover:bg-primaryDarken hover:shadow-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add a new place
      </Link>
      <div>
        {places.length > 0 &&
          places.map((place) => (
            <Link
              key={place._id}
              to={`/profile/places/${place._id}`}
              className="flex flex-col md:flex-row rounded-lg w-3/4 xl:w-4/6 mx-auto my-8 shadow-xl transition duration-500 hover:shadow-primary/10"
            >
              <div className="rounded-t-lg bg-gray-200 md:rounded-l-lg md:rounded-tr-none md:min-w-[288px] md:w-72 md:h-52">
                {place.photos.length > 0 && (
                  <img
                    className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                    src={`http://localhost:4000/uploads/${place.photos[0]}`}
                    alt="/"
                  />
                )}
              </div>
              <div className="px-5 pt-4">
                <h3 className="text-xl font-medium line-clamp-1">
                  {place.title}
                </h3>
                <p className="text-sm text-gray-600 mt-4 line-clamp-1">
                  {place.address}
                </p>
                <p className="text-sm mt-4 line-clamp-4">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
