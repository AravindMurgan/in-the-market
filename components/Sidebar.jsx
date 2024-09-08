import { amenities } from "@/data/ameneties";
import { BATH_SCORE, BED_SCORE, SQUARE_FEET_SCORE } from "@/utils/priortiyScores";
import { Button, Chip, Input, Select, SelectItem, Slider } from "@nextui-org/react";
import { useEffect, useState } from "react";

const Sidebar = ({properties,setProperties}) => {
    const [beds,setBeds]=useState(0);
    const [baths,setBaths]=useState(0);
    const [squareFeet,setSquareFeet]=useState(0);
    const [selectedAmenities, setSelectedAmenities] = useState({});
    const [price,setPrice]=useState(190000);
    const [minMaxPirce,setMinMaxPrice]=useState({
        min:0,
        max:0
    });


    useEffect(()=>{

        const filterPropertiesByPrice = (properties, maxPrice) => {
             properties.filter((property) => property.price <= maxPrice);

             const results = properties.map((property) => {
                if(property.price <= maxPrice){
                    return {...property,visibility:false};
                }else{
                    return {...property,visibility:true};
                }
             })
            return results;
        };
        if(price){
            const sortPropertiesByPrice = filterPropertiesByPrice(properties, price).sort((a,b)=> a.price - b.price);
           setProperties(sortPropertiesByPrice);
        }

        
    },[price])

    useEffect(()=>{
        const getMinMaxPrice = (properties) => {
            const prices = properties.map((property) => property.price);
            return [Math.min(...prices), Math.max(...prices)];
          }
       const [minPrice, maxPrice] = getMinMaxPrice(properties);
       setMinMaxPrice([minPrice, maxPrice]);
    },[properties])

     // Handle priority change for an amenity
  const handlePriorityChange = (amenityKey, priority) => {
    if(typeof priority === 'string'){
        setSelectedAmenities((prev) => ({
            ...prev,
            [amenityKey]: Number(priority), // Update the priority for the specific amenity
          }));
    }
    
  };

  const handleAmenitiesChange=(items)=>{
    console.log(items)
  }

   // Function to rank and filter properties based on user selections
   const onClickRankProperties = () => {
    const filteredProperties = properties.map((property) => {
      let score = 0;
      let maxScore = 0;
      debugger;

      // 1. Score for Beds
      if (property.beds >= beds) {
        score += BED_SCORE;  // Full points for meeting or exceeding bed requirements
      }
      maxScore += BED_SCORE;

      // 2. Score for Baths
      if (property.baths >= baths) {
        score += BATH_SCORE;  // Full points for meeting or exceeding bath requirements
      }
      maxScore += BATH_SCORE;

      // 3. Score for Square Feet
      if (property.square_feet >= squareFeet) {
        score += SQUARE_FEET_SCORE;  // Full points for meeting or exceeding square feet
      }
      maxScore += SQUARE_FEET_SCORE;

      // 4. Score for Amenities
      const amenityScores = selectedAmenities;
      for (const amenity in amenityScores) {
        if (property?.amenities.includes(amenity)) {
          score += amenityScores[amenity];  // Add score based on the user's priority
        }
        maxScore += amenityScores[amenity];  // Max score includes all priority levels
      }

      // Normalize the score to get a percentage
      const finalScore = (score / maxScore) * 100;
      return {
        ...property,
        score: finalScore,  // Attach the score to each property
      };
    });

    // Sort the properties by score, descending
    const sortedProperties = filteredProperties.sort((a, b) => b.score - a.score);


    // Update the properties list with the ranked properties
    console.log(sortedProperties)
    setProperties(sortedProperties);

  };
  return (
    <div className='flex flex-col gap-10'>
      <h2 className='text-xl mb-4'>Filters</h2>
      {/* Add your filter components here */}

      <div>
        <label htmlFor='Location'>Location</label>
        <Input type='text' placeholder='Enter Your Location' />
      </div>

      <div>
        <label htmlFor='Beds'>Beds</label>
        <Select className='max-w-xs' aria-label='Beds'   value={beds} onChange={(e)=> setBeds(Number(e.target.value))}>
          <SelectItem key={1}>1</SelectItem>
          <SelectItem key={2}>2</SelectItem>
          <SelectItem key={3}>3+</SelectItem>
        </Select>
      </div>

      <div>
        <label htmlFor='Baths' >Baths</label>
        <Select className='max-w-full' aria-label='Baths' value={baths} onChange={(e)=> setBaths(Number(e.target.value))}>
          <SelectItem key={1}>1</SelectItem>
          <SelectItem key={2}>2</SelectItem>
          <SelectItem key={3}>3+</SelectItem>
        </Select>
      </div>

      <div>
        <label htmlFor='Square Feet'>Square Feet</label>
        <Input type='number' placeholder='Enter Your Square Feet' value={squareFeet} onValueChange={(val)=> setSquareFeet(Number(val))}/>
      </div>

      <div>
        <label htmlFor='Amenities'>Amenities</label>
        <Select
          items={amenities}
          variant='bordered'
          selectionMode='multiple'
          placeholder='Select amenities'
          aria-label='Amenities'
          labelPlacement='inside'
          isMultiline={true}
          classNames={{
            base: "max-w-xs",
            trigger: "min-h-12 py-2",
          }}
          renderValue={(items) => {
            return (
              <div className='flex flex-wrap gap-2'>
                {items.map((item) => (
                  <Chip key={item.key}>{item.textValue}</Chip>
                ))}
              </div>
            );
          }}
          onChange={handleAmenitiesChange}
          multiple
        >
          {/* <div>
            <Select>
              <SelectItem value={7}>Important</SelectItem>
              <SelectItem value={2}>Not Important</SelectItem>
              <SelectItem value={9}>Most Important</SelectItem>
            </Select>
            {amenities.map((amenity) => (
              <SelectItem key={amenity.key}>{amenity.value}</SelectItem>
            ))}
          </div> */}
          {(amenity) => (
            <SelectItem key={amenity.key} textValue={amenity.value}>
              <div className='flex items-center flex-row w-full space-x-3'>
                <Select
                  className='w-3/5 text-tiny text-default-400'
                  aria-label='Priority'
                  onChange={(e) =>  handlePriorityChange(amenity.value, e.target.value)
                  
                  }
                >
                  <SelectItem key={10} className='text-tiny text-default-400'>
                    Must Have
                  </SelectItem>
                  <SelectItem key={7} className='text-tiny text-default-400'>
                    Important
                  </SelectItem>
                  <SelectItem key={4} className='text-tiny text-default-400'>
                    Nice to Have
                  </SelectItem>
                  <SelectItem key={0}  className='text-tiny text-default-400'>
                    Not Important
                  </SelectItem>
                </Select>
                <span className='w-2/5 text-tiny text-black'>
                  {amenity.value}
                </span>
              </div>
            </SelectItem>
          )}
        </Select>
      </div>
      <div>
        <Slider
          label='Price'
          step={200}
          maxValue={190000}
          minValue={50000}
          defaultValue={ minMaxPirce.min && minMaxPirce.max ? [minMaxPirce.min, minMaxPirce.max]:[50000, 190000]}
          formatOptions={{ style: "currency", currency: "GBP" }}
          className='max-w-full text-2xl'
          classNames={{
            label: "text-lg",
          }}
          onChange={(value) => setPrice(value[1])}
        />
      </div>
      <div>
        <Button color="primary" block onClick={onClickRankProperties}>Search</Button>
      </div>

    </div>
  );
};

export default Sidebar;
