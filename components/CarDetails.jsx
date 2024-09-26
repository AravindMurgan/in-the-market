
import {
    FaBolt,
    FaCalendarAlt,
    FaCar,
    FaCheck,
    FaCogs,
    FaGasPump,
    FaMapMarker,
    FaTimes,
  } from 'react-icons/fa';
  import PropertyMap from '@/components/PropertyMap';
  
  const CarDetails = ({ car }) => {
    const totalPrice = car.price; // Assuming total price is for 30 nights
    const emiOptions = [
      { months: 12, label: '12 Months' },
      { months: 24, label: '24 Months' },
      { months: 36, label: '36 Months' },
    ];
    return (
      <main>
        <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
          {/* <div className='text-gray-500 mb-4'>{car.type}</div> */}
          <h1 className='text-3xl font-bold mb-4'>{car.brand}</h1>
          <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
            <FaMapMarker className='text-lg text-orange-700 mr-2' />
            <p className='text-orange-700'>
              {car.location.street}, {car.location.city}{' '}
              {car.location.state}
            </p>
          </div>
  
          {/* <div className='flex flex-col md:flex-row justify-around'>
            <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
              <div className='text-gray-500 mr-2 font-bold'>Nightly</div>
              <div className='text-2xl font-bold text-blue-500'>
                {car.rates.nightly ? (
                  `$${car.rates.nightly.toLocaleString()}`
                ) : (
                  <FaTimes className='text-red-700' />
                )}
              </div>
            </div>
            <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
              <div className='text-gray-500 mr-2 font-bold'>Weekly</div>
              <div className='text-2xl font-bold text-blue-500'>
                {car.rates.weekly ? (
                  `$${car.rates.weekly.toLocaleString()}`
                ) : (
                  <FaTimes className='text-red-700' />
                )}
              </div>
            </div>
            <div className='flex items-center justify-center mb-4 pb-4 md:pb-0'>
              <div className='text-gray-500 mr-2 font-bold'>Monthly</div>
              <div className='text-2xl font-bold text-blue-500'>
                {car.rates.monthly ? (
                  `$${car.rates.monthly.toLocaleString()}`
                ) : (
                  <FaTimes className='text-red-700' />
                )}
              </div>
            </div>
          </div> */}
           <div>
      <h3 className='text-lg font-bold my-6 bg-gray-800 text-white p-2'>
        Rates & EMI Options
      </h3>
      <div className='flex flex-col md:flex-row justify-around'>
        <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
          <div className='text-gray-500 mr-2 font-bold'>Total Price: </div>
          <div className='text-2xl font-bold text-blue-500'>
            {totalPrice ? (
              <>
                {`£ ${totalPrice.toLocaleString()}`}
              </>
            ) : (
              <FaTimes className='text-red-700' />
            )}
          </div>
        </div>
        {emiOptions.map((option) => (
          <div key={option.months} className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
            <div className='text-gray-500 mr-2 '>{option.label}: </div>
            <div className='text-medium font-bold text-blue-500'>
              {totalPrice ? (
                <>
                  {/* <FaCreditCard className='inline mr-2' /> */}
                  {`£ ${(totalPrice / option.months).toFixed(2)}/mo`}
                </>
              ) : (
                <FaTimes className='text-red-700' />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>
  
        <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
          <h3 className='text-lg font-bold mb-6'>Description & Details</h3>
          <div className='flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9'>
          {
            <p className="">
              {car.fuel_type.trim().toLowerCase() !== "electric" ? (
                <FaGasPump className='inline mr-2' />
              ) : (
                <FaBolt className='inline mr-2' />
              )}
              <span className='md:hidden lg:inline ml-1'>{car.fuel_type}</span>
            </p>
          }
          <p>
            <FaCogs className='inline mr-2' />
            <span className='md:hidden lg:inline ml-1'>{car.transmission}</span>
          </p>
          <p>
            <FaCar className='inline mr-2' />
            <span className='md:hidden lg:inline ml-1'>{car.model}</span>
          </p>
          <p>
            <FaCalendarAlt className='inline mr-2' />
            <span className='md:hidden lg:inline ml-1'> {car.year}</span>
          </p>
          </div>
          <p className='text-gray-500 mb-4 text-center'>{car.description}</p>
        </div>
  
        <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
          <h3 className='text-lg font-bold mb-6'>Features</h3>
  
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2'>
            {car?.features?.map((amenity, index) => (
              <li key={index}>
                <FaCheck className='inline-block text-green-600 mr-2' /> {amenity}
              </li>
            ))}
          </ul>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
          <PropertyMap data={car}/>
        </div>

        
      </main>
    );
  };
  export default CarDetails;