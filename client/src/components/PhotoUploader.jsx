import React, { useState } from "react";
import axios from "axios";
import { BsStar, BsStarFill, BsTrash } from "react-icons/bs";

export default function PhotoUploader({ photos, setPhotos }) {
  const [photoLink, setPhotoLink] = useState("");
  async function addPhotoByLink(e) {
    e.preventDefault();
    try {
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      setPhotos((prev) => {
        return [...prev, filename];
      });
      setPhotoLink("");
    } catch (err) {
      console.log(err);
    }
  }

  async function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    const { data: filename } = await axios.post("/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setPhotos((prev) => {
      return [...prev, ...filename];
    });
  }

  function removePhoto(e, filename) {
    e.preventDefault();
    setPhotos([...photos.filter((photo) => photo !== filename)]);
  }

  function selectMainPhoto(e, filename) {
    e.preventDefault();
    const newPhotos = [
      filename,
      ...photos.filter((photo) => photo !== filename),
    ];
    setPhotos(newPhotos);
  }

  return (
    <>
      <div className="flex justify-center gap-4">
        <input
          type="text"
          placeholder="Add a photo using a link"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          className="p-2 border border-gray-400 rounded-lg focus-within:outline-primary/30 w-full"
        />
        <button
          onClick={addPhotoByLink}
          className="p-2 px-4 border border-gray-400 rounded-lg bg-transparent shadow-md shadow-gray-200 hover:bg-primary hover:text-white hover:shadow-gray-500 hover:border-primary"
        >
          Add&nbsp;photo
        </button>
      </div>

      <div className="grid grid-cols-1 mt-4 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {photos.length > 0 &&
          photos.map((link) => {
            return (
              <div key={link} className="imgCard h-full w-full relative">
                <img
                  src={"http://localhost:4000/uploads/" + link}
                  alt=""
                  className=" shadow-md object-cover rounded-lg"
                />
                <button
                  onClick={(e) => removePhoto(e, link)}
                  className="btnCard opacity-0 absolute right-2 bottom-2 bg-black/50 p-1.5 text-white rounded-full transition duration-500 hover:bg-black/70 hover:text-primary cursor-pointer "
                >
                  <BsTrash />
                </button>
                <button
                  onClick={(e) => selectMainPhoto(e, link)}
                  className="btnCard opacity-0 absolute left-2 bottom-2 bg-black/50 p-1.5 text-white rounded-full transition duration-500 hover:bg-black/70 hover:text-yellow-200 cursor-pointer "
                >
                  {link === photos[0] && (
                    <BsStarFill className="fill-yellow-300" />
                  )}
                  {link !== photos[0] && <BsStar />}
                </button>
              </div>
            );
          })}
        <label className="flex items-center h-full justify-center gap-2 mb-8 border-2 border-gray-400 bg-transparent rounded-2xl shadow-md shadow-gray-200 hover:bg-primary hover:text-white hover:shadow-gray-500 hover:border-primary cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={uploadPhoto}
          />
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
              d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
}
