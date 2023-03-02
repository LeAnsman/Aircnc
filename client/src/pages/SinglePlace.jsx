import axios from "axios";
import React, { useEffect, useState } from "react";

import { BsThermometerHalf } from "react-icons/bs";
import { TbGridDots } from "react-icons/tb";
import { FiMapPin } from "react-icons/fi";
import { useParams } from "react-router-dom";
import PhotosModal from "../components/PhotosModal";
import InfosModal from "../components/InfosModal";
import PerksModal from "../components/PerksModal";
import BookingWidget from "../components/BookingWidget";

export default function SinglePlace() {
  const [isLiked, setIsLiked] = useState(false);
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showAllInfos, setShowAllInfos] = useState(false);
  const [showAllPerks, setShowAllPerks] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function fetchSinglePlace() {
      const { data } = await axios.get(`/places/${id}`);
      setPlace(data);
    }
    fetchSinglePlace();
  }, [id]);

  if (!place) return "";

  if (showAllPhotos) {
    return <PhotosModal place={place} setShowAllPhotos={setShowAllPhotos} />;
  }

  return (
    <div className="w-3/4 mx-auto">
      <InfosModal
        place={place}
        setShowAllInfos={setShowAllInfos}
        showAllInfos={showAllInfos}
      />
      <PerksModal
        place={place}
        setShowAllPerks={setShowAllPerks}
        showAllPerks={showAllPerks}
      />
      <h2 className="font-bold text-xl my-4">{place.title}</h2>
      <div className="flex justify-between">
        <div className="flex gap-8">
          {/* <p className="flex items-center gap-2 text-sm">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="w-5 h-5 fill-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </span>
            4,6
          </p> */}
          <p className="flex items-center gap-2 font-medium underline ">
            <FiMapPin className="stroke-primary" /> {place.address}
          </p>
        </div>
        <div
          className="cursor-pointer flex gap-2 items-center"
          onClick={() => setIsLiked(!isLiked)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className={`w-5 h-5 transition duration-300  ${
              isLiked ? "fill-primary stroke-primary" : "stroke-black/50"
            } `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <p>Save</p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 my-8">
        <img
          src={`http://localhost:4000/uploads/${place.photos[0]}`}
          alt="/"
          className="rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none brightness-90 hover:brightness-100 object-cover"
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 relative">
          <img
            src={`http://localhost:4000/uploads/${place.photos[1]}`}
            alt="No photo"
            className="lg:rounded-tr-lg xl:rounded-tr-none brightness-90 hover:brightness-100 max-h-[250px] object-cover"
          />
          <img
            src={`http://localhost:4000/uploads/${place.photos[2]}`}
            alt="No photo"
            className="hidden xl:flex brightness-90 rounded-tr-lg hover:brightness-100 max-h-[250px] object-cover"
          />
          <img
            src={`http://localhost:4000/uploads/${place.photos[3]}`}
            alt="No photo"
            className="hidden xl:flex brightness-90 hover:brightness-100 max-h-[250px] object-cover"
          />
          <img
            src={`http://localhost:4000/uploads/${place.photos[4]}`}
            alt="No photo"
            className="rounded-b-lg brightness-90 lg:rounded-bl-none hover:brightness-100 max-h-[250px] object-cover"
          />
          <button
            onClick={() => setShowAllPhotos(true)}
            className="flex items-center gap-2 absolute bottom-5 right-5 bg-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary hover:text-white"
          >
            <TbGridDots />
            <p className="text-sm">View all photos</p>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center lg:flex-row gap-8">
        <div className="w-full lg:w-3/4 mb-4">
          <p className="w-5/6 line-clamp-6">{place.description}</p>
          <button
            onClick={() => setShowAllInfos(true)}
            className="font-medium underline my-4"
          >
            More infos
          </button>
          <hr className="w-11/12" />
          <h3 className="font-medium text-xl my-8">Perks</h3>
          <div className="grid grid-cols-2 gap-y-4">
            {place.perks?.map((perk) => (
              <div key={perk}>{perk}</div>
            ))}
          </div>
          <div
            onClick={() => setShowAllPerks(true)}
            className="my-8 w-fit border border-black rounded-lg px-6 py-2 cursor-pointer font-medium hover:bg-gray-100"
          >
            See all perks
          </div>
          <hr className="w-11/12" />
          <h3 className="font-medium text-xl my-8">Usefull informations</h3>

          <div className="space-y-4">
            <p className="flex gap-2">
              Check In : <span> {place.checkInTime}</span>
            </p>

            <p className="flex gap-2">
              Check Out : <span> {place.checkOutTime}</span>
            </p>
            <p className="flex gap-2">
              Maximum number of guests : <span>{place.maxGuests}</span>
            </p>
          </div>
        </div>
        <BookingWidget place={place} />
      </div>

      <hr className="w-full my-8" />
      <h3 className="font-medium text-xl my-8">Localisation</h3>
      <div className="mb-8">FAT GOOGLE MAP</div>
    </div>
  );
}
