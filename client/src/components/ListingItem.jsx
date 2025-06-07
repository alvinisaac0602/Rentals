import { Link } from "react-router-dom";

export default function ListingItem({ listing }) {
  if (!listing) return null;

  // Determine the price to display
  const price =
    listing.offer && typeof listing.discountPrice === "number"
      ? listing.discountPrice
      : listing.regularPrice;

  const formattedPrice =
    typeof price === "number"
      ? price.toLocaleString("en-US")
      : "Price unavailable";

  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls?.[0] || "/default-image.jpg"}
          alt={listing.name}
          className="h-[220px] sm:h-[200px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {listing.name || "Unnamed listing"}
          </p>
          <p className="text-sm text-gray-600">
            {listing.address || "No address provided"}
          </p>
          <p className="text-sm text-slate-500">
            UG shs {formattedPrice}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex gap-4 text-sm font-bold text-slate-700">
            <p>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Beds`
                : `${listing.bedrooms} Bed`}
            </p>
            <p>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Baths`
                : `${listing.bathrooms} Bath`}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
