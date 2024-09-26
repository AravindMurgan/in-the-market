import CarInfoBoxes from "@/components/CarInfoBoxes";
import FeaturedProperties from "@/components/FeaturedProperties";
import Hero from "@/components/Hero";
import HomeCars from "@/components/HomeCars";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";
import connectDB from "@/config/database";
import Car from "@/models/Car";
import Property from "@/models/Property";
import React from "react";

const page =async () => {

    // NOTE: here we can use a server component and simply query the database
  // directly.

  await connectDB();

  const listings = await Property.find({
    is_featured: true,
  }).lean();

  const carListings = await Car.find({
    is_featured: true,
  }).lean();

  return (
    <>
      <Hero />

      {/* Properties */}
      <section>
        <InfoBoxes />
        <FeaturedProperties data={listings} enitity="Properties" />
        <HomeProperties />
      </section>

      {/* Luxury Cars */}
      <section className="mt-32">
        <CarInfoBoxes />
        <FeaturedProperties data={carListings} enitity="Cars"/>
        <HomeCars />
      </section>


    </>
  );
};

export default page;
