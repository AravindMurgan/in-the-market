'use server';

import connectDB from '@/config/database';
import Car from '@/models/Car';
import { convertToSerializeableObject } from '@/utils/convertToObject';

async function getCarsData(id) {
  console.log('id', id);
  await connectDB();

//   const sessionUser = await getSessionUser();

//   if (!sessionUser || !sessionUser.userId) {
//     return { error: 'User ID is required' };
//   }

//   const { userId } = sessionUser;

  // Find user in database
  let data = await Car.findById(id);
  console.log('data', data);
  data = convertToSerializeableObject(data);

  return data;
}

export default getCarsData;