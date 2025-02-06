import React from "react";
import { FaBell } from "react-icons/fa";
import hero2 from "../../assets/images/hero2.png";

const Subscribe = () => {
  return (
    <section className="bg-[#f7f7f7] py-20">
      <div
        style={{
          backgroundImage: `url(${hero2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="container mx-auto px-6 md:px-12 lg:px-20 py-16 rounded-lg shadow-md"
      >
        <div className="flex flex-col items-center text-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold leading-snug text-dark">
            10K+ Students are learning from us
          </h1>
          <p className="text-white max-w-xl">
           
          </p>

          <a
            href="#"
            className="bg-blue-500 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-blue-600 transition duration-200"
          >
            Subscribe Now
            <FaBell className="text-lg animate-none hover:animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
