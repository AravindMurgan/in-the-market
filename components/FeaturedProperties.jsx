import FeaturedCarCard from './FeatureCarCard';
import FeaturedPropertyCard from './FeaturedPropertyCard';

const FeaturedProperties = ({data,enitity}) => {
  // NOTE: don't use logical && for conditional rendering especially on the
  // length of an array - https://kentcdodds.com/blog/use-ternaries-rather-than-and-and-in-jsx

  return data.length > 0 ? (
    <section className='bg-blue-50 px-4 pt-6 pb-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
          {`Featured ${enitity}`}
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
         {
          enitity === 'Properties' ? (
            data.map((item) => (
              <FeaturedPropertyCard key={item._id} property={item} />
            ))
          ):(
            data.map((item) => (
              <FeaturedCarCard key={item._id} car={item} />
            ))
          )
         }
        </div>
      </div>
    </section>
  ) : null;
};
export default FeaturedProperties;