"use server";
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';

async function getPropertiesQueryResults(location, zipCode) {
  await connectDB();

  //   const sessionUser = await getSessionUser();

  //   if (!sessionUser || !sessionUser.user) {
  //     return { error: 'You must be logged in to send a message' };
  //   }

  //   const { user } = sessionUser;

  //   const recipient = formData.get('recipient');

  //   if (user.id === recipient) {
  //     return { error: 'You can not send a message to yourself' };
  //   }
  const locationPattern = new RegExp(location, "i");
  const zipCodePattern = zipCode.length > 0 ? new RegExp(zipCode, "i") : null;
  let query = {};

  // Match location pattern against database fields
  query = {
    $or: [
      {
        $or: [
          { name: locationPattern },
          { description: locationPattern },
          { "location.street": locationPattern },
          { "location.city": locationPattern },
          { "location.state": locationPattern },
        ],
      },
    ],
  };

  if (zipCodePattern) {
    query.$or.unshift({ "location.zipcode": zipCodePattern });
  }

  // // Only check for property if its not 'All'
  // if (propertyType && propertyType !== 'All') {
  //   const typePattern = new RegExp(propertyType, 'i');
  //   query.type = typePattern;
  // }

  const getPropertiesQueryResults = await Property.find(query).lean();
  const data = getPropertiesQueryResults.map((property) =>
    convertToSerializeableObject(property)
  );

  return data;
}


export default getPropertiesQueryResults;