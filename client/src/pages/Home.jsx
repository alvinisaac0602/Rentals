import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white text-gray-800 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight">
            Find Your Perfect Space
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-600">
            Discover luxurious homes for rent and sale — handpicked to match
            your lifestyle.
            <br className="hidden sm:block" />
            <span className="font-medium text-gray-700">
              {" "}
              Call us: 0789186476 / 0741319191
            </span>
          </p>
        </div>
      </section>

      {/* Listings */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-20">
        {/* Offer Listings */}
        {offerListings.length > 0 && (
          <section>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-700">
                Special Offers
              </h2>
              <Link
                to="/search?offer=true"
                className="text-blue-600 hover:underline text-sm"
              >
                View all offers
              </Link>
            </div>
            <Swiper
              navigation
              spaceBetween={20}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="rounded-lg"
            >
              {offerListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <div className="p-2">
                    <ListingItem listing={listing} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {/* Rent Listings */}
        {rentListings.length > 0 && (
          <section>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-700">
                Properties for Rent
              </h2>
              <Link
                to="/search?type=rent"
                className="text-blue-600 hover:underline text-sm"
              >
                View more rentals
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}

        {/* Sale Listings */}
        {saleListings.length > 0 && (
          <section>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-700">
                Properties for Sale
              </h2>
              <Link
                to="/search?type=sale"
                className="text-blue-600 hover:underline text-sm"
              >
                View more properties
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
