import Image from "next/image";
import Link from "next/link";
import React from "react";
import {

  FaMapMarker,
  FaCar,
  FaCalendarAlt,
  FaGasPump,
  FaBolt,
  FaCogs,
} from "react-icons/fa";

const CarCard = ({ car }) => {
  // const { rates } = car;
  // const getRateDisplay = () => {
  //   if (rates.monthly) {
  //     return `${rates.monthly.toLocaleString()}/mo`;
  //   } else if (rates.weekly) {
  //     return `${rates.weekly.toLocaleString()}/wk`;
  //   } else if (rates.nightly) {
  //     return `${rates.nightly.toLocaleString()}/night`;
  //   }
  // };
  return (
    <div className={`rounded-xl shadow-md relative ${car.visibility ? 'hidden':''}`}>
      <Link href={`/cars/${car._id}`}>
        <Image
          src={car.images[0]}
          sizes='100vw'
          height={0}
          width={0}
          alt=''
          className='w-full h-auto rounded-t-xl'
        />
      </Link>
      <div className='p-4'>
        <div className='text-left md:text-center lg:text-left mb-6'>
          <div className=' flex flex-col justify-start items-center gap-3'>
            <h2 className="text-lg font-medium uppercase">{car.brand.toUpperCase()}</h2>
            {car?.score && car.score >=85 ?<span className="text-success-600">{Math.round(car.score * 100) / 100
          }% Match</span>:''}
          {car?.score && (car.score >= 75 && car.score < 85) ?<span className="text-warning-600">{Math.round(car.score * 100) / 100
          }% Match</span>:''}
          {car?.score && (car.score < 75) ?<span className="text-danger-600">{Math.round(car.score * 100) / 100
          }% Match</span>:''}
          </div>
          <h3 className='text-xl font-bold'></h3>
        </div>
        <h3
          className='absolute top-[10px] right-[10px]
               bg-white px-4 py-2 rounded-lg text-blue-500 
               font-bold text-right md:text-center lg:text-right'
        >
          {`£ ${car.price}`}
        </h3>

        <div className='md:hidden lg:flex flex-wrap justify-center gap-4 text-gray-500 mb-4'>
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
        
        {/* Only Show for tabs */}
        <div className='hidden md:flex md:justify-between md:items-center  lg:hidden gap-4 text-gray-500 mb-4'>
          <p>
            <FaCar className='inline mr-1' />
            <span className='ml-1'>{car.model}</span>
          </p>
          <p>
            <FaCalendarAlt className='inline mr-1' />
            <span className='ml-1'> {car.year}</span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          {/* { && (
            <p>
              <FaMoneyBill className="inline mr-2" />
              Nightly
            </p>
          )} */}
        </div>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <FaMapMarker className='text-orange-700 mt-1' />
            <span className='text-orange-700'>
              {" "}
              {`${car?.location?.city} ${car?.location?.state}`}{" "}
            </span>
          </div>
          <Link
            href={`/cars/${car._id}`}
            className='h-[36px] bg-blue-500 hover:bg-blue-600
           text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
