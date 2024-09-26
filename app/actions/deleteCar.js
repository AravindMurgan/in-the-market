"use server";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Car from "@/models/Car";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteCar(propertyId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  await connectDB();

  const car = await Car.findById(propertyId);

  if (car.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  // extract public id's from image url in DB
  const publicIds = car.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });

  // Delete images from Cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("InTheMarket/" + publicId);
    }
  }

  // Proceed with property deletion
  await car.deleteOne();

  // Revalidate the cache
  // NOTE: since properties are pretty much on every page, we can simply
  // revalidate everything that uses our top level layout
  revalidatePath("/", "layout");
}

export default deleteCar;
