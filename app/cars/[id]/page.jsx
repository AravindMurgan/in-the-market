"use client";
import getCarsData from "@/app/actions/getCarsData";
import BookmarkButton from "@/components/BookmarkButton";
import CarContactForm from "@/components/CarContactForm";
import CarDetails from "@/components/CarDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import ShareButtonCars from "@/components/ShareButtonCars";
// import { fetchProperty } from "@/utils/requests";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const CarPage = () => {
  const { id } = useParams();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchPropertyData = async () => {
      try {
        const carData = await getCarsData(id);
        setCarData(carData);
      } catch (error) {
        // throw new Error("Error fetching property.")
        console.log('Error fetching property')
      } finally {
        setLoading(false);
      }
    };

    if (carData === null) {
      fetchPropertyData();
    }
  }, [id, carData]);

  return (
    <>
      {!loading && carData && (
        <div>
          <PropertyHeaderImage image={carData.images[0]} />

          <section>
            <div className="container m-auto py-6 px-6">
              <a
                href="/"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Cars
              </a>
            </div>
          </section>

          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <CarDetails car={carData} />
                <aside className="space-y-4">
                <BookmarkButton data={carData} identifier={'Car'}/>
                <ShareButtonCars car={carData} PUBLIC_DOMAIN={process.env.NEXT_PUBLIC_DOMAIN}/>
                <CarContactForm car={carData} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={carData.images} />
        </div>
      )}
    </>
  );
};

export default CarPage;
