"use server";
import connectDB from '@/config/database';
import Car from '@/models/Car';
import { convertToSerializeableObject } from '@/utils/convertToObject';

async function getCarsQueryResults(location, zipCode) {
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
//   const locationPattern = new RegExp(`^${location}`, "i");  // Matches if the string starts with 'fer'
// const locationPattern = new RegExp(`^${location}`, "i"); 
const locationPattern = `^${location}`;
  const zipCodePattern = zipCode.length > 0 ? new RegExp(zipCode, "i") : null;
  let query = {};
  

  // Match location pattern against database fields
//   query = {
//         $or: [
//           { brand:  { $regex: locationPattern } },
//           { model:  { $regex: locationPattern } },
//           {transform:  { $regex: locationPattern }},
//           { description:  { $regex: locationPattern } },
//           { "location.street":  { $regex: locationPattern } },
//           { "location.city":  { $regex: locationPattern } },
//           { "location.state":  { $regex: locationPattern } },
//         ],
//   };

//   if (zipCodePattern) {
//     query.$or.push({ "location.zipcode": zipCodePattern });
//   }
 query = {
    $or: [
      { brand: { $regex: locationPattern, $options: "i" } },             // Match 'brand' from the start
      { model: { $regex: locationPattern, $options: "i" } },             // Match 'model' from the start
      { transform: { $regex: locationPattern, $options: "i" } },         // Match 'transform' from the start
      { description: { $regex: locationPattern, $options: "i" } },       // Match 'description' from the start
      { "location.street": { $regex: locationPattern, $options: "i" } }, // Match 'location.street' from the start
      { "location.city": { $regex: locationPattern, $options: "i" } },   // Match 'location.city' from the start
      { "location.state": { $regex: locationPattern, $options: "i" } }   // Match 'location.state' from the start
    ]
  };
  
  // If zip code is provided, add it to the query
  if (zipCodePattern) {
    query.$or.push({ "location.zipcode": { $regex: zipCodePattern, $options: "i" } });
  }
  

  const getCarsQueryResults = await Car.find(query).lean();
  // Sort results: first prioritize exact match on 'location' for brand, model, or other fields, then show others
  const sortedResults = getCarsQueryResults.sort((a, b) => {
    // Check if 'location' matches any of the relevant fields (brand, model, etc.)
    const aMatches =
      a.brand?.toLowerCase() === location.toLowerCase() ||
      a.model?.toLowerCase() === location.toLowerCase() ||
      a.description?.toLowerCase().includes(location.toLowerCase()) ||
      a.location?.city?.toLowerCase() === location.toLowerCase() ||
      a.location?.state?.toLowerCase() === location.toLowerCase();

    const bMatches =
      b.brand?.toLowerCase() === location.toLowerCase() ||
      b.model?.toLowerCase() === location.toLowerCase() ||
      b.description?.toLowerCase().includes(location.toLowerCase()) ||
      b.location?.city?.toLowerCase() === location.toLowerCase() ||
      b.location?.state?.toLowerCase() === location.toLowerCase();

    // Prioritize results where 'location' matches brand, model, or other fields
    if (aMatches && !bMatches) return -1; // a comes first
    if (!aMatches && bMatches) return 1; // b comes first
    return 0; // keep order for non-prioritized items
  });

  const data = sortedResults.map((property) =>
    convertToSerializeableObject(property)
  );

  return data;
}


export default getCarsQueryResults;