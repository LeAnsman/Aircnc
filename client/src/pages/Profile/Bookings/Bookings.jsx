import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../../../components/AccountNav";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      const { data } = await axios.get("/bookings");
      setBookings(data);
    }
    fetchBookings();
  }, []);

  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/profile/bookings/${booking._id}`}
              key={booking._id}
              className="flex flex-col md:flex-row rounded-lg w-3/4 xl:w-4/6 mx-auto my-8 shadow-xl transition duration-500 hover:shadow-primary/10"
            >
              <div className="rounded-t-lg bg-gray-200 md:rounded-l-lg md:rounded-tr-none md:min-w-[288px] md:w-72 md:h-52">
                {booking.place.photos.length > 0 && (
                  <img
                    className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                    src={`http://localhost:4000/uploads/${booking.place.photos[0]}`}
                    alt="/"
                  />
                )}
              </div>
              <div className="px-5 pt-4">
                <h3 className="text-xl font-medium line-clamp-1">
                  {booking.place.title}
                </h3>
                <p className="text-sm text-gray-800 mt-4 line-clamp-1">
                  {booking.place.address}
                </p>

                <p className="text-sm text-gray-700 mt-4">
                  Number of nights :{" "}
                  {differenceInCalendarDays(
                    new Date(booking.checkOut),
                    new Date(booking.checkIn)
                  )}
                </p>
                <p className="text-sm text-gray-700 mt-4">
                  From {format(new Date(booking.checkIn), "dd/MM/yy")} to{" "}
                  {format(new Date(booking.checkOut), "dd/MM/yy")}
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  Total price : {booking.price} €
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
