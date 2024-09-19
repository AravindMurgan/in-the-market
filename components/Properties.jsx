"use client";
import PropertyCard from "@/components/PropertyCard";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

// NOTE: This has been changed to a server component and now receives props from
// the page parent so no need to make a fetch request to an API route handler.

///properties:propertiesData, total, page, pageSize, removing for eslint
const Properties = ({ properties: propertiesData }) => {
  const [properties, setProperties] = useState(propertiesData);
  const [matchFound, setMatchFound] = useState(null);

  useEffect(() => {
    setProperties(propertiesData);
  }, [propertiesData]);

  // useEffect(() => {
  //   if(Array.isArray(properties) && properties.length > 0) {
  //     for(let property of properties) {
  //       if(property.score === 100) {
  //         setMatchFound(true);
  //         break;
  //       }
  //     }
  //   }
  // }, [properties]);

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <div className='grid grid-cols-1 md:grid-cols-4'>
          {/* Match Found Content */}
          <div className='hidden md:block col-span-1'></div>{" "}
          {/* Placeholder for alignment */}
          <div className='content col-span-3 mb-10 flex w-full'>
            {matchFound !== null &&
              (matchFound ? (
                <div className='bg-green-100 border border-green-400 text-green-700 p-4 rounded'>
                  <p>A perfect match has been found!</p>
                </div>
              ) : (
                <div className='bg-warning-100 border border-warning-400 text-warning-700 p-4 rounded'>
                  <p>Nearest possible match has been found!</p>
                </div>
              ))}
          </div>
          {/* Properties or No Properties Found */}
          {properties.length === 0 ? (
            <div className='col-span-3'>
              <p>No properties found</p>
            </div>
          ) : (
            <div className='col-span-4 grid grid-cols-1 md:grid-cols-4 gap-6'>
              {/* Sidebar */}
              <aside className='col-span-1 bg-gray-50 p-4 sticky top-0 h-screen overflow-y-auto'>
                <Sidebar
                  properties={properties}
                  setProperties={setProperties}
                  setMatchFound={setMatchFound}
                />
              </aside>

              {/* Main Content */}
              <main className='col-span-3'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </div>
              </main>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default Properties;
