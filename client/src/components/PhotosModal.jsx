import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function PhotosModal({ place, setShowAllPhotos }) {
  return (
    <div className="absolute w-screen h-screen left-0 bg-black/95 overflow-hidden">
      <div className="text-white z-10">
        <button
          onClick={() => setShowAllPhotos(false)}
          className="absolute top-5 right-5 text-white px-4 py-2 rounded-lg transition duration-300 bg-primary hover:bg-primaryDarken z-20 animate-fadeTop"
        >
          Close
        </button>
      </div>
      {/* <p className="text-center text-white font-bold underline mt-10 text-xl">
          Photos of {place.title}
        </p> */}

      <div className="mt-20 animate-fade">
        <Swiper
          modules={[Navigation, Pagination, A11y, Keyboard]}
          spaceBetween={5}
          slidesPerView={1}
          navigation
          keyboard
          pagination={{ clickable: true }}
          className="rounded-lg"
          style={{
            "--swiper-pagination-color": "white",
            "--swiper-pagination-bullet-inactive-color": "#999999",
            "--swiper-pagination-bullet-inactive-opacity": "0.9",
            "--swiper-pagination-bullet-size": "14px",
            "--swiper-pagination-bullet-horizontal-gap": "6px",
          }}
        >
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <SwiperSlide
                key={photo}
                className="rounded-lg cursor-grab active:cursor-grabbing"
              >
                <img
                  className="rounded-lg max-h-[calc(100vh-150px)] w-auto mx-auto z-50"
                  src={`http://localhost:4000/uploads/${photo}`}
                  alt=""
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
