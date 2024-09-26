'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import deleteCar from '@/app/actions/deleteCar';
//import deleteProperty from '@/app/actions/deleteProperty';

function ProfileCars({ cars: initialCars }) {
  const [cars, setProperties] = useState(initialCars);
  

  const handleDeleteProperty = async (propertyId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this car?'
    );

    if (!confirmed) return;

    await deleteCar(propertyId);

    toast.success('Car Deleted');

    const updatedProperties = cars.filter(
      (car) => car._id !== propertyId
    );

    setProperties(updatedProperties);
  };

  return cars.map((car) => (
    <div key={car._id} className='mb-10'>
      <Link href={`/cars/${car._id}`}>
        <Image
          className='h-32 w-full rounded-md object-cover'
          src={car.images[0]}
          alt=''
          width={500}
          height={100}
          priority={true}
        />
      </Link>
      <div className='mt-2'>
        <p className='text-lg font-semibold'>{car.name}</p>
        <p className='text-gray-600'>
          Address: {car.location.street} {car.location.city}{' '}
          {car.location.state}
        </p>
      </div>
      <div className='mt-2'>
        <Link
          href={`/cars/${car._id}/edit`}
          className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
        >
          Edit
        </Link>
        <button
          onClick={() => handleDeleteProperty(car._id)}
          className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
          type='button'
        >
          Delete
        </button>
      </div>
    </div>
  ));
}

export default ProfileCars;