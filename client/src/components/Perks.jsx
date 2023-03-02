import React from "react";
import { BsThermometerHalf, BsDoorClosed } from "react-icons/bs";
import { IoSnowOutline } from "react-icons/io5";
import { BiFridge, BiWifi } from "react-icons/bi";
import {
  MdPets,
  MdOutlineDirectionsCarFilled,
  MdPool,
  MdOutdoorGrill,
} from "react-icons/md";

export default function Perks({ setPerks, perks }) {
  function handleCheckbox(e) {
    const { checked, name } = e.target;
    if (checked) {
      setPerks([...perks, name]);
    } else {
      setPerks([...perks.filter((selectedName) => selectedName !== name)]);
    }
  }
  return (
    <div className="grid grid-cols-1 gap-5 my-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <label
        htmlFor="heating"
        className="flex gap-3 border rounded-xl px-2 py-4"
      >
        <input
          type="checkbox"
          checked={perks.includes("heating")}
          name="heating"
          id="heating"
          onChange={handleCheckbox}
        />
        <span className="flex items-center gap-2">
          <BsThermometerHalf size={20} />
          Heating
        </span>
      </label>
      <label
        htmlFor="air_conditioning"
        className="flex gap-3 border rounded-xl px-2 py-4"
      >
        <input
          type="checkbox"
          checked={perks.includes("air_conditioning")}
          name="air_conditioning"
          id="air_conditioning"
          onChange={handleCheckbox}
        />
        <span className="flex items-center gap-2">
          <IoSnowOutline size={20} />
          Air&nbsp;Conditioning
        </span>
      </label>
      <label htmlFor="wifi" className="flex gap-3 border rounded-xl px-2 py-4">
        <input
          type="checkbox"
          checked={perks.includes("wifi")}
          name="wifi"
          id="wifi"
          onChange={handleCheckbox}
        />
        <span className="flex items-center gap-2">
          <BiWifi size={20} />
          Wifi
        </span>
      </label>
      <label htmlFor="tv" className="flex gap-3 border rounded-xl px-2 py-4">
        <input
          type="checkbox"
          checked={perks.includes("tv")}
          name="tv"
          id="tv"
          onChange={handleCheckbox}
        />
        <span className="flex gap-2">
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
              d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          TV
        </span>
      </label>
      <label
        htmlFor="fridge"
        className="flex gap-3 border rounded-xl px-2 py-4"
      >
        <input
          type="checkbox"
          checked={perks.includes("fridge")}
          name="fridge"
          id="fridge"
          onChange={handleCheckbox}
        />
        <span className="flex items-center gap-2">
          <BiFridge size={20} />
          Fridge
        </span>
      </label>
      <label
        htmlFor="pets_allowed"
        className="flex gap-3 border rounded-xl px-2 py-4"
      >
        <input
          type="checkbox"
          checked={perks.includes("pets_allowed")}
          name="pets_allowed"
          id="pets_allowed"
          onChange={handleCheckbox}
        />
        <span className="flex items-center gap-2">
          <MdPets size={20} />
          Pets&nbsp;Allowed
        </span>
      </label>
      <label
        htmlFor="free_parking_spot"
        className="flex gap-3 border rounded-xl px-2 py-4"
      >
        <input
          type="checkbox"
          checked={perks.includes("free_parking_spot")}
          name="free_parking_spot"
          id="free_parking_spot"
          onChange={handleCheckbox}
        />
        <span className="flex items-center gap-2">
          <MdOutlineDirectionsCarFilled size={20} />
          Free&nbsp;Parking&nbsp;Spot
        </span>
      </label>
      <label
        htmlFor="private_entrance"
        className="flex gap-3 border rounded-xl px-2 py-4"
      >
        <input
          type="checkbox"
          checked={perks.includes("private_entrance")}
          name="private_entrance"
          id="private_entrance"
          onChange={handleCheckbox}
        />
        <span className="flex gap-2">
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
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          Private&nbsp;Entrance
        </span>
      </label>
      <label
        htmlFor="swimming_pool"
        className="flex gap-3 border rounded-xl px-2 py-4"
      >
        <input
          type="checkbox"
          checked={perks.includes("swimming_pool")}
          name="swimming_pool"
          id="swimming_pool"
          onChange={handleCheckbox}
        />
        <span className="flex items-center gap-2">
          <MdPool size={20} />
          Swimming&nbsp;Pool
        </span>
      </label>
      <label
        htmlFor="barbecue"
        className="flex gap-3 border rounded-xl px-2 py-4"
      >
        <input
          type="checkbox"
          checked={perks.includes("barbecue")}
          name="barbecue"
          id="barbecue"
          onChange={handleCheckbox}
        />
        <span className="flex items-center gap-2">
          <MdOutdoorGrill size={20} />
          Barbecue
        </span>
      </label>
    </div>
  );
}
