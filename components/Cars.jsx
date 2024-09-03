// import PropertyCard from '@/components/PropertyCard';
// import Pagination from '@/components/Pagination';
import CarCard from './CarCard';

// NOTE: This has been changed to a server component and now receives props from
// the page parent so no need to make a fetch request to an API route handler.

// const Cars = ({ cars, total, page, pageSize }) => {
  //just following es lint rule

const Cars = ({ cars }) => {
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {cars.length === 0 ? (
          <p>No cars found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
};
export default Cars;