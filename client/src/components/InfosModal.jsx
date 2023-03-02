import React from "react";

export default function InfosModal({ showAllInfos, setShowAllInfos, place }) {
  return (
    <div
      className={
        showAllInfos
          ? "fixed top-0 left-0 bg-black/50 h-screen w-screen z-20 "
          : "hidden"
      }
    >
      <div className="relative h-fit w-[50vw] mx-auto mt-20 bg-white rounded-lg animate-fade duration-75">
        <button
          className="absolute top-2 right-2 text-white px-4 py-2 rounded-lg transition duration-300 bg-primary hover:bg-primaryDarken"
          onClick={() => setShowAllInfos(false)}
        >
          Close
        </button>
        <div className="w-5/6 mx-auto pt-8">
          <h3 className="text-center text-2xl mb-4">Description</h3>
          <p>{place.description}</p>
        </div>
        <hr className="w-11/12 mx-auto my-8" />
        <div className="w-5/6 mx-auto pb-12">
          <h3 className="text-center text-2xl mb-4">Extra informations</h3>
          <p>{place.extraInfos}</p>
        </div>
      </div>
    </div>
  );
}
