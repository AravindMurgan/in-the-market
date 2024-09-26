'use client';
//import { toast } from 'react-toastify';
import SubmitButton from './SubmitButton';
import { carBrands, fuelTypeData } from '@/data/carData';
import addCar from '@/app/actions/addCar';

const CarAddForm = () => {
  // NOTE: checking for component is mounted is unnecessary so has been removed.
  // We don't need state here as we are submitting the form with a server
  // action so we are not doing anything with the local state.

  const handleImageChange = (e) => {
    // NOTE: Code here has changed to limit user to 4 images
    // as per the instructions to the user
    if (e.target.files.length > 4) {
      e.target.value = '';
      // toast.error('You can select up to 4 images in total.');
    }
  };

  // NOTE: this component has been changed to use a server action so we no
  // longer need a API route handler for a POST at app/api/properites/route.js

  return (
    <form action={addCar}>
      <h2 className='text-3xl text-center font-semibold mb-6'>Add Car</h2>

      <div className='mb-4'>
        <label htmlFor='brand' className='block text-gray-700 font-bold mb-2'>
          Brand
        </label>
        <select
          id='brand'
          name='brand'
          className='border rounded w-full py-2 px-3'
          required
        >
          {
            carBrands.map((brand,idx)=>  <option key={idx} value={brand}>{brand}</option>)
          }
        </select>
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>
          Model
        </label>
        <input
          type='text'
          id='model'
          name='model'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='eg. Audi'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>
          Year
        </label>
        <input
          type='number'
          id='year'
          name='year'
          className='border rounded w-full py-2 px-3 mb-2'
          required
        />
      </div>
      
      <div className='mb-4'>
        <label htmlFor='transmission' className='block text-gray-700 font-bold mb-2'>
        Transmission
        </label>
        <select
          id='transmission'
          name='transmission'
          className='border rounded w-full py-2 px-3'
          required
        >
         <option value='Automatic'>Automatic</option>
         <option value='Manual'>Manual</option>
         <option value='Continuously Variable Transmission'>Continuously Variable Transmission</option>
         <option value='Dual-Clutch Transmission'>Dual-Clutch Transmission</option>
        </select>
      </div>
      
      <div className='mb-4'>
        <label htmlFor='fuel-type' className='block text-gray-700 font-bold mb-2'>
        Fuel Type
        </label>
        <select
          id='fuel_type'
          name='fuel_type'
          className='border rounded w-full py-2 px-3'
          required
        >
           {
            fuelTypeData.map((type,idx)=>  <option key={idx} value={type}>{type}</option>)
          }
        </select>
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>
          Color
        </label>
        <input
          type='text'
          id='color'
          name='color'
          className='border rounded w-full py-2 px-3 mb-2'
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>
          Condition
        </label>
        <input
          type='text'
          id='condition'
          name='condition'
          className='border rounded w-full py-2 px-3 mb-2'
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>
          Previous Owners
        </label>
        <input
          type='number'
          id='previous_owners'
          name='previous_owners'
          className='border rounded w-full py-2 px-3 mb-2'
          required
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='description'
          className='block text-gray-700 font-bold mb-2'
        >
          Description
        </label>
        <textarea
          id='description'
          name='description'
          className='border rounded w-full py-2 px-3'
          rows='4'
          placeholder='Add an optional description of your property'
        ></textarea>
      </div>

      <div className='mb-4 bg-blue-50 p-4'>
        <label className='block text-gray-700 font-bold mb-2'>Location</label>
        <input
          type='text'
          id='street'
          name='location.street'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Street'
        />
        <input
          type='text'
          id='city'
          name='location.city'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='City'
          required
        />
        <input
          type='text'
          id='state'
          name='location.state'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='State'
          required
        />
        <input
          type='text'
          id='zipcode'
          name='location.zipcode'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Zipcode'
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>Features</label>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
          <div>
            <input
              type='checkbox'
              id='feature_adaptive_cruise'
              name='features'
              value='Adaptive Cruise'
              className='mr-2'
            />
            <label htmlFor='feature_adaptive_cruise'>Adaptive Cruise</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='feature_leather_upholstery'
              name='features'
              value='Leather Upholstery'
              className='mr-2'
            />
            <label htmlFor='feature_leather_upholstery'>Leather Upholstery</label>
          </div>
          <div >
            <input
              type='checkbox'
              id='feature_driver_assistance'
              name='features'
              value='Driver Assistance'
              className='mr-2'
            />
            <label 
            htmlFor='feature_driver_assistance'>Driver Assistance</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='feature_heated_seats' name='features'
              value='Heated Seats'
              className='mr-2'
            />
            <label htmlFor='feature_heated_seats'>Heated Seats</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='feature_panoamic_sunroof'
              name='features'
              value='Panoramic Sunroof'
              className='mr-2'
            />
            <label htmlFor='feature_panoamic_sunroof'>Panoramic Sunroof</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='feature_massaging_seats'
              name='features'
              value='Massaging Seats'
              className='mr-2'
            />
            <label htmlFor='feature_massaging_seats'>Massaging Seats</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='feature_premium_sound'
              name='features'
              value='Premium Sound'
              className='mr-2'
            />
            <label htmlFor='feature_premium_sound'>Premium Sound</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='feature_wireless_charging'
              name='features'
              value='Wireless Charging'
              className='mr-2'
            />
            <label htmlFor='feature_wireless_charging'>
              Wireless Charging
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='feature_360_camera'
              name='features'
              value='360 Camera'
              className='mr-2'
            />
            <label htmlFor='feature_360_camera'>360 Camera</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='feature_parking_assist'
              name='features'
              value='Parking Assist'
              className='mr-2'
            />
            <label htmlFor='feature_parking_assist'>Parking Assist</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='feature_head-up_display'
              name='features'
              value='Head-Up Display'
              className='mr-2'
            />
            <label htmlFor='feature_head-up_display'>
              Head-Up Display
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='feature_ambient_lighting'
              name='features'
              value='Ambient Lighting'
              className='mr-2'
            />
            <label htmlFor='feature_ambient_lighting'>Ambient Lighting</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='feature_keyless_entry'
              name='features'
              value='Keyless Entry'
              className='mr-2'
            />
            <label htmlFor='feature_keyless_entry'>Keyless Entry</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='feature_air_suspension'
              name='features'
              value='Air Suspension'
              className='mr-2'
            />
            <label htmlFor='feature_air_suspension'>Air Suspension</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='feature_night_version'
              name='features'
              value='Night Vision'
              className='mr-2'
            />
            <label htmlFor='feature_night_version'>Night Vision</label>
          </div>
        </div>
      </div>

      <div className='mb-4 bg-blue-50 p-4'>
        <div className='flex flex-col 
        space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 
        justify-center items-center gap-x-4 md:max-w-[300px]'>
            <label htmlFor='weekly_rate' className='mr-2 text-gray-700 font-bold'>
              Price
            </label>
            <input
              type='number'
              id='price'
              name='price'
              className='border rounded w-full py-2 px-3'
            />
        </div>
      </div>

      <div className='mb-4'>
        <label
          htmlFor='seller_name'
          className='block text-gray-700 font-bold mb-2'
        >
          Seller Name
        </label>
        <input
          type='text'
          id='seller_name'
          name='seller_info.name'
          className='border rounded w-full py-2 px-3'
          placeholder='Name'
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='seller_email'
          className='block text-gray-700 font-bold mb-2'
        >
          Seller Email
        </label>
        <input
          type='email'
          id='seller_email'
          name='seller_info.email'
          className='border rounded w-full py-2 px-3'
          placeholder='Email address'
          required
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='seller_phone'
          className='block text-gray-700 font-bold mb-2'
        >
          Seller Phone
        </label>
        <input
          type='tel'
          id='seller_phone'
          name='seller_info.phone'
          className='border rounded w-full py-2 px-3'
          placeholder='Phone'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='images' className='block text-gray-700 font-bold mb-2'>
          Images (Select up to 4 images)
        </label>
        <input
          type='file'
          id='images'
          name='images'
          className='border rounded w-full py-2 px-3'
          accept='image/*'
          multiple
          onChange={handleImageChange}
          required
        />
      </div>

      <div>
        <SubmitButton />
      </div>
    </form>
  );
};
export default CarAddForm;