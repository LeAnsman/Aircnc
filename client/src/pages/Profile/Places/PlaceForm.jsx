import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Navigate, useParams } from "react-router-dom";
import PhotoUploader from "../../../components/PhotoUploader.jsx";
import Perks from "../../../components/Perks.jsx";
import AccountNav from "../../../components/AccountNav.jsx";
import { UserContext } from "../../../context/UserContext.jsx";

export default function PlaceForm() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfos, setExtraInfos] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  const { user, ready } = useContext(UserContext);

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  useEffect(() => {
    async function fetchSinglePlace() {
      if (!id) {
        return;
      }
      const { data } = await axios.get(`/places/${id}`);
      setTitle(data.title);
      setAddress(data.address);
      setPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfos(data.extraInfos);
      setCheckInTime(data.checkInTime);
      setCheckOutTime(data.checkOutTime);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    }
    fetchSinglePlace();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (photos.length < 1) {
      return toast.error("Place add at least one photo");
    }
    if (id) {
      // update
      try {
        await axios.put("/places", {
          id,
          title,
          address,
          description,
          photos,
          perks,
          extraInfos,
          checkInTime,
          checkOutTime,
          maxGuests,
          price,
        });
        setRedirect(true);
        toast("You have modified the place!");
      } catch (err) {
        console.log(err);
        toast.error("Unable to modify the place...");
      }
    } else {
      // create
      try {
        await axios.post("/places", {
          title,
          address,
          description,
          photos,
          perks,
          extraInfos,
          checkInTime,
          checkOutTime,
          maxGuests,
          price,
        });
        setRedirect(true);
        toast("Thanks for creating a new place!");
      } catch (err) {
        console.log(err);
        toast.error("Unable to create the place...");
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/profile/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form className="flex flex-col xl:w-3/4 mx-auto" onSubmit={handleSubmit}>
        <label htmlFor="title" className="text-xl">
          Title
        </label>
        <p className="text-gray-500 my-2">
          Title for the place, should be short and catchy.
        </p>
        <input
          type="text"
          name="title"
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My lovely apartment"
          className="p-2 border border-gray-400 rounded-lg focus-within:outline-primary/30"
        />

        <label htmlFor="address" className="mt-8 text-xl">
          Address
        </label>
        <p className="text-gray-500 my-2">Address to the place.</p>
        <input
          type="text"
          name="address"
          id="address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Canterbury, Kent, Royaume-Uni"
          className="p-2 border border-gray-400 rounded-lg focus-within:outline-primary/30"
        />
        <label htmlFor="description" className="mt-8 text-xl">
          Description
        </label>
        <p className="text-gray-500 my-2">
          Describe your place so that everybody can picture it.
        </p>

        <textarea
          name="description"
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="10"
          className="p-2 border border-gray-400 rounded-lg focus-within:outline-primary/30"
          placeholder="This is a short description of my place"
        ></textarea>
        <h3 className="mt-8 text-xl">Photos</h3>
        <p className="text-gray-500 my-2">The more, the better.</p>
        <PhotoUploader photos={photos} setPhotos={setPhotos} />
        <h3 className="mt-8 text-xl">Perks</h3>
        <Perks setPerks={setPerks} perks={perks} />
        <div>
          <label htmlFor="extra_infos" className="mt-8 text-xl">
            Extra informations
          </label>
          <p className="text-gray-500 my-2">
            More informations about the place, house rules, ...
          </p>
          <textarea
            name="extra_infos"
            id="extra_infos"
            value={extraInfos}
            onChange={(e) => setExtraInfos(e.target.value)}
            rows="10"
            className="p-2 border border-gray-400 rounded-lg w-full focus-within:outline-primary/30 "
            placeholder="Please, verify that you double lock the door before leaving the apartment"
          ></textarea>
        </div>
        <h3 className="mt-8 text-xl">Check In & Out Times</h3>
        <p className="text-gray-500 my-2">
          Specify a check in and out time, remember to have some time window for
          cleaning the room between guests.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 my-8 space-y-4 md:space-y-0">
          <div className="flex flex-col text-center">
            <label htmlFor="check_in">Check in time</label>

            <input
              type="time"
              id="check_in"
              required
              min="09:00"
              max="18:00"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
              className="text-center w-1/2 mx-auto py-4"
            />
          </div>
          <div className="flex flex-col text-center">
            <label htmlFor="check_out">Check out time</label>
            <input
              type="time"
              id="check_out"
              required
              min="09:00"
              max="18:00"
              value={checkOutTime}
              onChange={(e) => setCheckOutTime(e.target.value)}
              className="text-center w-1/2 mx-auto py-4"
            />
          </div>
        </div>
        <h3 className="mt-8 text-xl">Max Guests & Price</h3>
        <p className="text-gray-500 my">
          Specify a number of maximum guests and a price for the night.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 my-8 space-y-4 md:space-y-0">
          <div className="flex flex-col text-center">
            <label htmlFor="max_guests" className="text-center">
              Maximum number of guests
            </label>
            <input
              type="number"
              id="max_guests"
              required
              min="1"
              max="50"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              placeholder="4"
              className="text-center w-1/2 mx-auto py-4"
            />
          </div>
          <div className="flex flex-col text-center">
            <label htmlFor="price" className="text-center">
              Price per night
            </label>
            <input
              type="number"
              id="price"
              required
              min="1"
              max="1200"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="125"
              className="text-center w-1/2 mx-auto py-4"
            />
          </div>
        </div>
        <button className="flex justify-center uppercase tracking-widest text-lg font-bold gap-4 text-white bg-primary max-w-fit px-10 py-4 my-10 mx-auto rounded-full shadow-md shadow-gray-200 transition duration-300 hover:bg-primaryDarken hover:shadow-gray-500">
          Save
        </button>
      </form>
    </div>
  );
}
