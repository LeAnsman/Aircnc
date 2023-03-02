import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { FiMapPin, FiUser } from "react-icons/fi";
import { MdOutlineNightsStay } from "react-icons/md";
import { BsDoorOpen, BsDoorClosed, BsTelephone } from "react-icons/bs";
import { IoPricetagOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import PhotosModal from "../../../components/PhotosModal";

export default function SingleBooking() {
  const [booking, setBooking] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      async function fetchSingleBooking() {
        const data = await axios.get(`/bookings/${id}`);
        setBooking(data);
      }
      fetchSingleBooking();
    }
  }, [id]);

  if (!booking) return "";

  if (showAllPhotos) {
    return (
      <PhotosModal
        place={booking.data.place}
        setShowAllPhotos={setShowAllPhotos}
      />
    );
  }

  return (
    <div className="w-3/4 mx-auto">
      <div className="space-y-4 text-lg">
        <Link
          to={`/place/${booking.data.place._id}`}
          className="text-2xl hover:animate-pulse"
        >
          Your reservation for{" "}
          <span className="font-bold text-primary">
            {booking.data.place.title}
          </span>
        </Link>
        <p className="flex items-center gap-4 underline text-gray-900 ">
          <FiMapPin size={20} className="stroke-primary" />{" "}
          {booking.data.place.address}
        </p>
        <p className="flex items-center gap-4 text-gray-900 text-lg">
          <FiUser size={20} className="stroke-primary" />
          You made this booking under the name of {booking.data.fullname}
        </p>
        <p className="flex items-center gap-4 text-gray-900 text-lg">
          <BsTelephone size={20} className="fill-primary" />
          The following phone number was send to the owner :{" "}
          {booking.data.phoneNumber}
        </p>

        <p className="text-gray-700 flex items-center gap-4">
          <MdOutlineNightsStay size={20} className="fill-primary" />
          {differenceInCalendarDays(
            new Date(booking.data.checkOut),
            new Date(booking.data.checkIn)
          ) === 1
            ? differenceInCalendarDays(
                new Date(booking.data.checkOut),
                new Date(booking.data.checkIn)
              ) + " night"
            : differenceInCalendarDays(
                new Date(booking.data.checkOut),
                new Date(booking.data.checkIn)
              ) + " nights"}
        </p>
        <p className="text-gray-700 flex items-center gap-4">
          <BsDoorOpen size={20} className="fill-primary" />
          You can check in from {booking.data.place.checkInTime} on{" "}
          {format(new Date(booking.data.checkIn), "eeee dd")}
        </p>
        <p className="text-gray-700 flex items-center gap-4">
          <BsDoorClosed size={20} className="fill-primary" />
          You will need to check out before {
            booking.data.place.checkInTime
          } on {format(new Date(booking.data.checkOut), "eeee dd")}
        </p>

        <p className="text-gray-700 flex items-center gap-4">
          <IoPricetagOutline
            size={20}
            className="stroke-primary fill-primary"
          />
          Total price : {booking.data.price} €
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 my-8">
        <img
          src={`http://localhost:4000/uploads/${booking.data.place.photos[0]}`}
          alt="/"
          className="rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none brightness-90 hover:brightness-100 object-cover"
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 relative">
          <img
            src={`http://localhost:4000/uploads/${booking.data.place.photos[1]}`}
            alt="No photo"
            className="lg:rounded-tr-lg xl:rounded-tr-none brightness-90 hover:brightness-100 max-h-[250px] object-cover"
          />
          <img
            src={`http://localhost:4000/uploads/${booking.data.place.photos[2]}`}
            alt="No photo"
            className="hidden xl:flex brightness-90 rounded-tr-lg hover:brightness-100 max-h-[250px] object-cover"
          />
          <img
            src={`http://localhost:4000/uploads/${booking.data.place.photos[3]}`}
            alt="No photo"
            className="hidden xl:flex brightness-90 hover:brightness-100 max-h-[250px] object-cover"
          />
          <img
            src={`http://localhost:4000/uploads/${booking.data.place.photos[4]}`}
            alt="No photo"
            className="rounded-b-lg brightness-90 lg:rounded-bl-none hover:brightness-100 max-h-[250px] object-cover"
          />
          <button
            onClick={() => setShowAllPhotos(true)}
            className="flex items-center gap-4 absolute bottom-5 right-5 bg-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary hover:text-white"
          >
            <p className="text-sm">View all photos</p>
          </button>
        </div>
      </div>
    </div>
  );
}
