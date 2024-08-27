"use server";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Car from "@/models/Car";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

async function addCar(formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required");
  }

  const { userId } = sessionUser;

  const features = formData.getAll("features");

  const images = formData.getAll("images").filter((image) => image.name !== "");

  // Create carData object for database
  const carData = {
    brand: formData.get("brand"),
    model: formData.get("model"),
    year: formData.get("year"),
    transmission: formData.get("transmission"),
    fuel_type: formData.get("fuel_type"),
    color: formData.get("color"),
    condition: formData.get("condition"),
    previous_owners: formData.get("previous_owners"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    features,
    price: formData.get("price"),
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
    owner: userId,
  };

  // Upload image(s) to Cloudinary
  // NOTE: this will be an array of strings, not a array of Promises
  // So imageUploadPromises has been changed to imageUrls to more
  // declaratively represent it's type.

  const imageUrls =[];

  for(const imageFile of images){
    const imageBuffer = await imageFile.arrayBuffer()
    const imageArray = Array.from(new Uint8Array(imageBuffer))
    // eslint-disable-next-line no-undef
    const imageData = Buffer.from(imageArray)

    const imageBase64 = imageData.toString('base64')

     // Make request to upload to Cloudinary
     const result = await cloudinary.uploader.upload(
      `data:${imageFile.type};base64,${imageBase64}`,
      {
        folder: 'InTheMarket',
      }
    );

    imageUrls.push(result.secure_url)

  }

  carData.images = imageUrls;

  const newCar = new Car(carData)
  newCar.save();

  revalidatePath('/','layout');
  // redirect(`/properties/${newCar._id}`)


}

export default addCar;
