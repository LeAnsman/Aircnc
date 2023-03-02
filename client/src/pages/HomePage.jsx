import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../Header";

export default function HomePage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      const { data } = await axios.get("/places");
      setPlaces(data);
    }
    fetchPlaces();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 gap-y-12">
        {places.length > 0 &&
          places.map((place) => (
            <Card
              title={place.title}
              address={place.address}
              photos={place.photos}
              price={place.price}
              id={place._id}
              key={place._id}
            />
          ))}
      </div>
    </div>
  );
}
