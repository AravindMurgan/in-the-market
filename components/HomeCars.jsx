import React from "react";
import Link from "next/link";
// import { fetchProperties } from "@/utils/requests";
import fetchCars from "@/app/actions/fetchCars";
import CarCard from "./CarCard";



const HomeCars =async () => {
  
  const cars = await fetchCars();
  const recentCars = [...cars]
    .sort(() => Math.random() - Math.random)
    .slice(0, 3);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Cars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cars.length === 0 ? (
              <p>No Properties</p>
            ) : (
              recentCars.map((car) => {
                return <CarCard key={car._id} car={car} />;
              })
            )}
          </div>
        </div>
      </section>

      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/cars"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Cars
        </Link>
      </section>
    </>
  );
};

export default HomeCars;
