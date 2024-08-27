import SearchForm from "@/components/PropertySearchForm";
import connectDB from "@/config/database";
import Cars from "@/components/Cars";
import Car from "@/models/Car";

// NOTE: this is a server component so we can use the url search parameters here
// to query our database directly and then pass the properties to our Properties
// component. This then means the Properties component can be rendered server
// side and no longer needs to make a fetch request to an API route handler.

const CarsPage = async ({ searchParams: { pageSize = 6, page = 1 } }) => {
  await connectDB();

  const skip = (page - 1) * pageSize;

  const total = await Car.countDocuments({});
  const cars = await Car.find({}).skip(skip).limit(pageSize);

  const showPagination = total > pageSize;
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <SearchForm />
        </div>
      </section>
      <Cars
        cars={cars}
        total={total}
        page={parseInt(page)}
        pageSize={parseInt(pageSize)}
      />
      {showPagination && (
        <Pagination page={page} pageSize={pageSize} totalItems={total} />
      )}
    </>
  );
};
export default CarsPage;
