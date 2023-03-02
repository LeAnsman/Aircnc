import React from "react";

export default function PerksModal({ place, showAllPerks, setShowAllPerks }) {
  return (
    <div
      className={
        showAllPerks
          ? "fixed top-0 left-0 bg-black/50 h-screen w-screen z-20"
          : "hidden"
      }
    >
      <div className="relative h-fit w-[50vw] mx-auto mt-20 bg-white rounded-lg animate-fade">
        <button
          className="absolute top-2 right-2 text-white px-4 py-2 rounded-lg transition duration-300 bg-primary hover:bg-primaryDarken"
          onClick={() => setShowAllPerks(false)}
        >
          Close
        </button>
        <h3>Perks</h3>
      </div>
    </div>
  );
}
