import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async ({ request }) => {
  try {
    await connectDB();

    const properties = await Property.find({});
    console.log(properties)
    return new Response(JSON.stringify(properties));
  } catch (error) {
    console.error(error);
  }
};
