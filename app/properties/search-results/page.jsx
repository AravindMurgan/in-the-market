 "use client";
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import getPropertiesQueryResults from '@/app/actions/getPropertiesQueryResults';
import Sidebar from '@/components/Sidebar';


// import getPropertiesQueryResults from '@/app/actions/getpropertiesQueryResults';

// NOTE: This component has been changed to a server component where we can
// query the database directly.
// This will also be a dynamically rendered component as searchParams are not
// known at build time.
// Moving this component to a server component means we can remove our app/api/properties/search/route.js
// route handler as it's no longer used.

function SearchResultsPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location') || '';
  const zipCode = searchParams.get('zipCode') || '';

  const [properties, setProperties] = useState([]);

  useEffect( () => { 
    async function getPropertiesQueryResultsData(){
      const propertiesQueryResults = await getPropertiesQueryResults(location, zipCode);
      // const propertiesData = convertToSerializeableObject(propertiesQueryResults);
      // console.log(propertiesData);
      console.log(propertiesQueryResults)
      setProperties(propertiesQueryResults);
  
    }
    getPropertiesQueryResultsData();

  }, [location,zipCode]);

  // if(!isMounted){
  //   return null;
  // }
  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <Link
            href='/properties'
            className='flex items-center text-blue-500 hover:underline mb-3'
          >
            <FaArrowAltCircleLeft className='mr-2 mb-1' /> Back To Properties
          </Link>
          <h1 className='text-2xl mb-4'>Search Results</h1>
          {properties.length === 0 ? (
            <p>No search results found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <aside className="col-span-1 bg-gray-50 p-4">
                <Sidebar properties={properties} setProperties={setProperties}/>
            </aside>
  
            {/* Main Content */}
            <main className="col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            </main>
          </div>
          )}
        </div>
      </section>
    </>
  );
}
export default SearchResultsPage;