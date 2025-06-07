import React from "react";

const About = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="h-72 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
        }}
      >
        <h1 className="text-5xl font-bold text-white bg-black/50 px-6 py-2 rounded-md">
          About Space Estates
        </h1>
      </div>

      {/* Content Section */}
      <div className="bg-gray-50 py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 mb-6">
            Welcome to{" "}
            <span className="font-semibold text-blue-600">Space Estates</span> —
            Your Trusted Partner in Finding the Perfect Place to Call Home.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            At Space Estates, we believe that everyone deserves more than just a
            place to stay — they deserve a space that fits their lifestyle,
            goals, and dreams. Whether you're searching for a cozy apartment, a
            spacious family home, or a commercial space to grow your business,
            we're here to make that journey smooth, stress-free, and successful.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Founded on the values of <span className="italic">trust</span>,{" "}
            <span className="italic">transparency</span>, and{" "}
            <span className="italic">convenience</span>, Space Estates connects
            renters with verified, high-quality properties across{" "}
            <span className="font-medium">Uganda</span>.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Our team works closely with property owners, agents, and developers
            to ensure that every listing on our platform is real, reliable, and
            ready for you.
          </p>
          <p className="text-lg text-gray-700">
            We’re not just about finding spaces — we’re about helping you feel
            confident and comfortable in your next chapter.
            <br />
            <span className="font-semibold text-blue-600 mt-2 block">
              Space Estates — More than property. It's possibility.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-xl font-semibold">Space Estates</h3>
          <p className="text-sm mt-1">Your trusted space rental partner</p>
        </div>

        <div className="flex space-x-4 text-sm">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </div>

        <div className="text-sm mt-4 md:mt-0 text-center md:text-right">
          &copy; {new Date().getFullYear()} Space Estates. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default About;
