import {
  BATH_SCORE,
  BED_SCORE,
  SQUARE_FEET_SCORE,
} from "@/utils/priortiyScores";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Slider,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { FaCar } from "react-icons/fa";
import AdvancedCarSearch from "./AdvancedCarSearch";

const SidebarCar = ({ cars, setCars ,setMatchFound}) => {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [transmission, setTransmission] = useState('');
    
    const [carBrands, setCarBrands] = useState([]);
    const [carModels, setCarModels] = useState([]);
    const [carYears, setCarYears] = useState([]);
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [squareFeet, setSquareFeet] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [price, setPrice] = useState(190000);
  const [minMaxPirce, setMinMaxPrice] = useState({
    min: 0,
    max: 0,
  });
  // const [isEnablePriority, setIsEnablePriority] = useState(false);
  const [errors, setErrors] = useState({
    beds: "",
    baths: "",
    squareFeet: "",
  });

  useEffect(()=>{
    const filterBrands=()=>{
        const results = cars.map((car) => car.brand);
         setCarBrands([...new Set(results)]);
    }
   
    if(Array.isArray(cars) && cars.length > 0){
        filterBrands()
    }
  },[cars])

  useEffect(()=>{
    const filterModelBasedOnBrand = (brand) => {
        const results = cars.filter((car) => car.brand === brand);
        const models = results.map((car) => car.model);
        setCarModels([...new Set(models)]);
    }
    const filterYearBasedOnModel = (model) => {
        const results = cars.filter((car) => car.model === model);
        const years = results.map((car) => car.year);
        setCarYears([...new Set(years)]);
    }
    if(selectedBrand){
        filterModelBasedOnBrand(selectedBrand)
    }

    if(selectedModel){
   
        filterYearBasedOnModel(selectedModel)
    }

  },[selectedBrand,selectedModel])
  

  useEffect(() => {
    const filterCarsByPrice = (cars, maxPrice) => {
      cars.filter((car) => car.price <= maxPrice);

      const results = cars.map((car) => {
        if (car.price <= maxPrice) {
          return { ...car, visibility: false };
        } else {
          return { ...car, visibility: true };
        }
      });
      return results;
    };
    if (price) {
      const sortCarsByPrice = filterCarsByPrice(
        cars,
        price
      );
      [...sortCarsByPrice].sort((a, b) => a.price - b.price);
      setCars(sortCarsByPrice);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);

  useEffect(() => {
    const getMinMaxPrice = (cars) => {
      const prices = cars.map((car) => car.price);
      return [Math.min(...prices), Math.max(...prices)];
    };
    const [minPrice, maxPrice] = getMinMaxPrice(cars);
    setMinMaxPrice([minPrice, maxPrice]);
  }, [cars]);

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!beds) {
      newErrors.beds = "Beds are required";
    }

    // Password validation
    if (!baths) {
      newErrors.baths = "Baths are required";
    }

    // Confirm Password validation
    if (!squareFeet || squareFeet <= 0) {
      newErrors.squareFeet = "Square Feet is required";
    }
    if(Object.keys(selectedAmenitiesWithPriority).length <=0){
      newErrors.features = "At least one amenity must be selected";
    }

    setErrors(newErrors);

    // If there are no errors, return true (form is valid)
    return Object.keys(newErrors).length === 0;
  };

  // Function to rank and filter cars based on user selections
  const onClickRankProperties = () => {
    if(!validateForm()) return; // Validate the form before proceeding
    const filteredProperties = cars.map((car) => {
      let score = 0;
      let maxScore = 0;

      // 1. Score for Beds
      if (car.beds >= Number(beds)) {
        score += BED_SCORE; // Full points for meeting or exceeding bed requirements
      }
      maxScore += BED_SCORE;

      // 2. Score for Baths
      if (car.baths >= Number(baths)) {
        score += BATH_SCORE; // Full points for meeting or exceeding bath requirements
      }
      maxScore += BATH_SCORE;

      // 3. Score for Square Feet
      if (car.square_feet >= Number(squareFeet)) {
        score += SQUARE_FEET_SCORE; // Full points for meeting or exceeding square feet
      }
      maxScore += SQUARE_FEET_SCORE;

      // 4. Score for Amenities
      const amenityScores = selectedAmenitiesWithPriority;
      for (const amenity in amenityScores) {
        if (car?.features.includes(amenity)) {
          score += amenityScores[amenity]; // Add score based on the user's priority
        }
        maxScore += amenityScores[amenity]; // Max score includes all priority levels
      }

      // Normalize the score to get a percentage
      const finalScore = (score / maxScore) * 100;
      return {
        ...car,
        score: finalScore, // Attach the score to each car
      };
    });

    // Sort the cars by score, descending
    const sortedCars = filteredProperties.sort(
      (a, b) => b.score - a.score
    );

    // Update the cars list with the ranked cars
    console.log(sortedCars);
    setCars(sortedCars);
    const isMatchFound = sortedCars.find((car) => car.score === 100);
    if (isMatchFound) {
      setMatchFound(true);
    }else{
      setMatchFound(false);
    }
    setErrors({});
    setSelectedAmenitiesWithPriority({});
    setBeds(null);
    setBaths('');
    setSquareFeet('');
  };
  return (
    <div className='flex flex-col gap-10'>
      <h2 className='text-xl mb-4'>Filters</h2>
      {/* Add your filter components here */}
      <div>
        <label htmlFor='Brand'>Brand</label>
        <Select
          className='max-w-xs'
          aria-label='Car Brand'
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          startContent={<FaCar />}
          scrollShadowProps={{
            isEnabled: false,
          }}
        >
          {carBrands &&
            carBrands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
        </Select>
      </div>
      <div>
        <label htmlFor='Models'>Models</label>
        <Select
          className='max-w-xs'
          aria-label='Car Models'
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          startContent={<FaCar />}
          scrollShadowProps={{
            isEnabled: false,
          }}
        >
          {carModels &&
            carModels.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
        </Select>
      </div>

      <div>
        <label htmlFor='Models'>Year</label>
        <Select
          className='max-w-xs'
          aria-label='Car Year'
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value.toString())}
          scrollShadowProps={{
            isEnabled: false,
          }}
        >
          {carYears &&
            carYears.map((yr) => {
              const year = yr.toString();
              return (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              );
            })}
        </Select>
      </div>
      <div>
        <Accordion err>
          <AccordionItem key='2' aria-label='Advanced Search' title='Advanced Search'>
            <AdvancedCarSearch
              fuelType
              setFuelType
              transmission
              setTransmission
              errors
            />
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Button color='primary' block onClick={onClickRankProperties}>
          Search
        </Button>
      </div>

      <div>
        <Slider
          label='Price'
          step={1000}
          maxValue={800000}
          minValue={100000}
          defaultValue={
            minMaxPirce.min && minMaxPirce.max
              ? [minMaxPirce.min, minMaxPirce.max]
              : [100000, 800000]
          }
          formatOptions={{ style: "currency", currency: "GBP" }}
          className='max-w-full text-2xl'
          classNames={{
            label: "text-lg",
          }}
          onChange={(value) => setPrice(value[1])}
        />
      </div>
    </div>
  );
};

export default SidebarCar;
