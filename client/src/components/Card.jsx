import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { UserContext } from "../context/UserContext";

export default function Card({ title, address, photos, price, id }) {
  const { user } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="card relative rounded-lg shadow-xl transition duration-500 hover:shadow-primary/10">
      {user && (
        <div
          className="absolute right-3 top-3 z-40 cursor-pointer"
          onClick={() => setIsLiked(!isLiked)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className={`w-7 h-7 stroke-white/90 ${
              isLiked ? "fill-primary" : "fill-gray-400/30"
            } `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </div>
      )}

      <Link to={`/place/${id}`}>
        <div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={5}
            slidesPerView={1}
            navigation
            // draggable
            pagination={{ clickable: true }}
            // // scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log("slide change")}
            className="h-[250px] mb-2 rounded-t-lg"
            style={{
              "--swiper-pagination-color": "white",
              "--swiper-pagination-bullet-inactive-color": "#999999",
              "--swiper-pagination-bullet-inactive-opacity": "0.9",
              "--swiper-pagination-bullet-size": "6px",
              "--swiper-pagination-bullet-horizontal-gap": "4px",
            }}
          >
            {photos.map((photo) => (
              <SwiperSlide key={photo}>
                <img
                  loading="lazy"
                  src={`http://localhost:4000/uploads/${photo}`}
                  alt="/"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="p-5 space-y-4">
          <p className="font-medium line-clamp-1">{title}</p>
          <p className="text-gray-600 line-clamp-1 mt-1">{address}</p>
          <p className="mt-2 ">
            <span className="font-bold [word-spacing:4px]">
              <span>{price}</span>€{" "}
            </span>
            per night
          </p>
        </div>
      </Link>
    </div>
  );
}
