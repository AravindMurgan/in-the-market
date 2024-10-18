'use server';

import connectDB from '@/config/database';
import Property from '@/models/Property';
// import { convertToSerializeableObject } from '@/utils/convertToObject';
import { convertToObjectWithJSON } from '@/utils/convertToObjectWithJSON';

async function fetchProperties() {
  await connectDB();
  let data = await Property.find({});
  data = data.map((property) => convertToObjectWithJSON(property));

  return data;
}

export default fetchProperties;