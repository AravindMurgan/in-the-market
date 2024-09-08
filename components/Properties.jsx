"use client"
import PropertyCard from "@/components/PropertyCard";
import Sidebar from "./Sidebar";
import { useState } from "react";

// NOTE: This has been changed to a server component and now receives props from
// the page parent so no need to make a fetch request to an API route handler.
  
///properties:propertiesData, total, page, pageSize, removing for eslint
const Properties = ({ properties:propertiesData }) => {
  const [properties, setProperties] = useState(propertiesData);
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
            {/* Sidebar */}
            <aside className='col-span-1 bg-gray-50 p-4'>
              <Sidebar properties={properties} setProperties={setProperties} />
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
    </section>
  );
};
export default Properties;
