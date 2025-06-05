import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import modules separately (don't destructure from 'swiper')
import { Navigation, Pagination } from "swiper/modules";

// Install modules into SwiperCore
SwiperCore.use([Navigation, Pagination]);

const Listing = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/get/${id}`);
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching listing:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading listing.</p>;

  return (
    <main>
      <h1>{listing.title}</h1>

      <Swiper
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        style={{ width: "100%", height: "400px" }}
      >
        {listing.imageUrls.map((url) => (
          <SwiperSlide key={url}>
            <div
              className="h-[550px]"
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <p>{listing.description}</p>
      <p>Price: {listing.price}</p>
    </main>
  );
};

export default Listing;
