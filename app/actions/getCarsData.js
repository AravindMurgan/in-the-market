'use server';

import connectDB from '@/config/database';
import Car from '@/models/Car';
import { convertToObjectWithJSON } from '@/utils/convertToObjectWithJSON';

async function getCarsData(carId) {
  await connectDB();

//   const sessionUser = await getSessionUser();

//   if (!sessionUser || !sessionUser.userId) {
//     return { error: 'User ID is required' };
//   }

//   const { userId } = sessionUser;

  // Find user in database
  let data = await Car.findById(carId);
  console.log('data', data);
  data = convertToObjectWithJSON(data);

  return data;
}

export default getCarsData;