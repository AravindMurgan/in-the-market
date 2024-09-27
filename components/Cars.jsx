// import PropertyCard from '@/components/PropertyCard';
// import Pagination from '@/components/Pagination';
"use client";
import { useEffect, useState } from 'react';
import CarCard from './CarCard';
import SidebarCar from './SidebarCar';

// NOTE: This has been changed to a server component and now receives props from
// the page parent so no need to make a fetch request to an API route handler.

// const Cars = ({ cars, total, page, pageSize }) => {
  //just following es lint rule

const Cars = ({ cars:carsData }) => {
  const [cars, setCars] = useState(carsData);
  const [perfectMatchCar, setPerfectMatchCar] = useState(null);

  useEffect(() => {
    setCars(carsData);
  }, [carsData]);

  useEffect(()=>{
    console.log(cars)
  },[cars]);
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <div className='grid grid-cols-1 md:grid-cols-4'>
          {/* Match Found Content */}
          <div className='hidden md:block col-span-1'></div>{" "}
          {/* Placeholder for alignment */}
          {/* Properties or No Properties Found */}
          {cars.length === 0 ? (
            <div className='col-span-3'>
              <p>No cars found</p>
            </div>
          ) : (
            <div className='col-span-4 grid grid-cols-1 md:grid-cols-4 gap-6'>
              {/* Sidebar */}
              <aside className='col-span-1 bg-gray-50 p-4 sticky top-0 h-screen overflow-y-auto'>
                <SidebarCar
                  cars={cars}
                  setCars={setCars}
                  setPerfectMatchCar={setPerfectMatchCar}
                />
              </aside>

              {/* Main Content */}
              <main className='col-span-3'>
                {perfectMatchCar && (
                  <div>
                    <p className='bg-green-100 border border-green-400 text-green-700 p-4 rounded mb-3'>
                      A perfect match has been found!
                    </p>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5'>
                      {
                        <CarCard
                          key={perfectMatchCar._id}
                          car={perfectMatchCar}
                        />
                      }
                    </div>
                  </div>
                )}
                {Array.isArray(cars) && cars.length > 0 && (
                  <div className='grid grid-cols-1 gap-4'>
                    {
                      cars.find(car=> car.score) &&
                      <div>
                      <p className='bg-warning-100 border border-warning-400 text-warning-700 p-4 rounded block'>
                        Similar matches you will like !
                      </p>
                    </div>
                    }
                   
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                      { cars.filter(car=> car._id !== perfectMatchCar?._id ?? '').map((car) => (
                        <CarCard key={car._id} car={car} />
                      ))}
                    </div>
                  </div>
                )}
              </main>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default Cars;