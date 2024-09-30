'use server';

import connectDB from '@/config/database';
import Car from '@/models/Car';
import { convertToSerializeableObject } from '@/utils/convertToObject';
// import { convertToObjectWithJSON } from '@/utils/convertToObjectWithJSON';

async function fetchCars() {
  await connectDB();

//   const sessionUser = await getSessionUser();

//   if (!sessionUser || !sessionUser.userId) {
//     return { error: 'User ID is required' };
//   }

//   const { userId } = sessionUser;

  // Find user in database
  let data = await Car.find({});
  data = data.map(convertToSerializeableObject)

  return data;
}

export default fetchCars;