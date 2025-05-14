import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../assets/page2.jpg";
const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-md font-semibold transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
    {children}
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="relative h-screen flex items-center justify-center py-16 md:py-24">
          {/* Background Image with reduced opacity */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
            style={{ backgroundImage: `url(${Image})` }}
          ></div>
          <div className="relative z-10 w-full">
            <div className="container mx-auto px-4 justify-between flex flex-col md:flex-row items-center">
              {/* Text Content */}
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                  Premium Notebooks for Every Purpose
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Discover our collection of high-quality notebooks designed for
                  students, professionals, and creatives.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="px-8 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors shadow-md"
                    onClick={() => navigate("/shop")}
                  >
                    Shop Now
                  </button>
                  <button
                    className="px-8 py-3 bg-white text-yellow-700 border border-yellow-600 rounded-md hover:bg-yellow-100 transition-colors"
                    onClick={() => navigate("/custom")}
                  >
                    Custom Order
                  </button>
                </div>
              </div>
            </div>

            {/* Image */}
            {/* <div className="">
              <div className="relative h-96 md:h-[32rem] w-[24rem] md:w-[40rem] rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={Image}
                  alt="Premium notebooks collection"
                  className="object-cover w-full h-full"
                />
              </div>
            </div> */}
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white text-center">
          <h2 className="text-3xl font-bold sm:text-5xl">Why Choose Us</h2>
          <p className="max-w-2xl mx-auto text-gray-600 mt-4">
            We provide premium quality notebooks with customizable options at
            wholesale prices.
          </p>
          <div className="grid gap-6 md:grid-cols-3 mt-12">
            {[
              {
                title: "Premium Quality",
                desc: "Durable and elegant notebooks.",
              },
              {
                title: "Customizable",
                desc: "Choose paper types, sizes, and covers.",
              },
              { title: "Fast Shipping", desc: "Quick delivery with tracking." },
            ].map((feature, i) => (
              <div key={i} className="p-20 bg-gray-100 rounded-lg">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-6 text-center">
        <p className="text-sm text-gray-600">
          © 2025 NotebookWholesale. All rights reserved.
        </p>
        <p className="text-sm text-gray-600">Contact : +91 80127401038</p>
      </footer>
    </div>
  );
};

export default Home;
