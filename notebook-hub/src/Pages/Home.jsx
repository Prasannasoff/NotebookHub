import React from "react";

const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded-md font-semibold transition ${className}`} {...props}>
    {children}
  </button>
);

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>{children}</div>
);

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white text-center">
          <h1 className="text-3xl font-bold sm:text-5xl xl:text-6xl">
            Premium Wholesale Notebooks for Your Business
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 mt-4">
            High-quality notebooks at wholesale prices. Customizable options for businesses of all sizes.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button className="bg-white text-black hover:bg-gray-200">Shop Now</Button>
            <Button className="border border-white text-white hover:bg-white/10">Custom Orders</Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white text-center">
          <h2 className="text-3xl font-bold sm:text-5xl">Why Choose Us</h2>
          <p className="max-w-2xl mx-auto text-gray-600 mt-4">
            We provide premium quality notebooks with customizable options at wholesale prices.
          </p>
          <div className="grid gap-6 md:grid-cols-3 mt-12">
            {[
              { title: "Premium Quality", desc: "Durable and elegant notebooks." },
              { title: "Customizable", desc: "Choose paper types, sizes, and covers." },
              { title: "Fast Shipping", desc: "Quick delivery with tracking." }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-gray-100 rounded-lg">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 text-center">
          <h2 className="text-3xl font-bold sm:text-5xl">Featured Products</h2>
          <p className="max-w-2xl mx-auto text-gray-600 mt-4">Explore our most popular notebook collections.</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-4">
                <h3 className="text-lg font-bold">Premium Notebook {i}</h3>
                <p className="text-gray-600">High-quality paper, durable cover</p>
                <div className="text-lg font-bold mt-2">${(19.99 * i).toFixed(2)}</div>
                <Button className="mt-4 bg-black text-white hover:bg-gray-800">Add to Cart</Button>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center">
        <p className="text-sm text-gray-600">© 2025 NotebookWholesale. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
