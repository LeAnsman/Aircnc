import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestsNumber, setGuestsNumber] = useState(1);
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [redirect, setRedirect] = useState(null);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function handleSubmit() {
    const response = await axios.post("/bookings", {
      place: place._id,
      checkIn,
      checkOut,
      guestsNumber,
      fullname,
      phoneNumber,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/profile/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="w-full lg:w-2/4 rounded-lg border border-gray-300 shadow-xl mb-4 p-6 h-fit">
      <div className="text-center mt-2">
        <p>
          <span className="font-bold text-xl [word-spacing:4px]">
            <span>{place.price}</span>€{" "}
          </span>
          per night
        </p>
      </div>
      {/* Hover effect really good on airBnB */}
      <div className="flex flex-col text-center mt-4  border rounded-t-lg bg-gray-50 py-2">
        <label htmlFor="checkIn">Check In</label>
        <input
          type="date"
          id="checkIn"
          name="checkIn"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="mx-auto mt-2 bg-gray-50"
        />
      </div>
      <div className="flex flex-col text-center border  bg-gray-50  py-2">
        <label htmlFor="checkOut">Check Out</label>
        <input
          type="date"
          id="checkOut"
          name="checkOut"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="mx-auto mt-2 bg-gray-50"
        />
      </div>
      <div className="flex flex-col text-center border  bg-gray-50  py-2">
        <label htmlFor="guestsNumber">Number of guests</label>
        <input
          type="number"
          id="guestsNumber"
          name="guestsNumber"
          value={guestsNumber}
          onChange={(e) => setGuestsNumber(e.target.value)}
          className="w-1/2 mx-auto mt-2 bg-gray-50 text-center"
        />
      </div>

      {numberOfNights > 0 && (
        <div>
          <div className="flex flex-col text-center border  bg-gray-50  py-2">
            <label htmlFor="fullname">Firstname and Lastname</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="mx-auto mt-2 bg-gray-50 text-center"
            />
          </div>
          <div className="flex flex-col text-center border  bg-gray-50  py-2">
            <label htmlFor="phoneNumber">Phone number</label>
            <PhoneInput
              international
              id="phoneNumber"
              name="phoneNumber"
              defaultCountry="BE"
              value={phoneNumber}
              onChange={setPhoneNumber}
              limitMaxLength
              className="px-5 w-3/4 2xl:w-1/2 mx-auto text-center my-2 bg-gray-50"
            />
          </div>
          <p className="flex flex-col text-center border bg-gray-50 py-2 cursor-default transition duration-1000">
            Number of nights <span>{numberOfNights}</span>
          </p>
        </div>
      )}
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-primary transition duration-300  hover:bg-primary/90 cursor-pointer rounded-b-lg shadow-lg"
      >
        <p className="text-center text-white">
          Book{" "}
          {numberOfNights > 0 && (
            <span>for {numberOfNights * place.price} €</span>
          )}
        </p>
      </button>
    </div>
  );
}
