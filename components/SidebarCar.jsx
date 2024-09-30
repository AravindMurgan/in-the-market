import { Button, Select, SelectItem, Slider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import AdvancedCarSearch from "./AdvancedCarSearch";
import { BRAND_SCORE, YEAR_SCORE ,FUEL_SCORE,TRANSMISSION_SCORE, MODEL_SCORE } from "../utils/priortiyScores";
import { useGlobalContext } from "@/context/GlobalContext";

const SidebarCar = ({ cars, setCars,setPerfectMatchCar}) => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");

  const [carBrands, setCarBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [carYears, setCarYears] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [price, setPrice] = useState(190000);
  const [minMaxPirce, setMinMaxPrice] = useState({
    min: 0,
    max: 0,
  });
  // const [isEnablePriority, setIsEnablePriority] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({
    beds: "",
    baths: "",
    squareFeet: "",
  });

  // eslint-disable-next-line no-unused-vars
  const { selectedFeaturesWithPriority , setSelectedFeaturesWithPriority}=useGlobalContext();

  useEffect(() => {
    const filterBrands = () => {
      const results = cars.map((car) => car.brand);
      setCarBrands([...new Set(results)]);
    };

    if (Array.isArray(cars) && cars.length > 0) {
      filterBrands();
    }
  }, [cars]);

  useEffect(() => {
    const filterModelBasedOnBrand = (brand) => {
      const results = cars.filter((car) => car.brand === brand);
      const models = results.map((car) => car.model);
      setCarModels([...new Set(models)]);
    };
    const filterYearBasedOnModel = (model) => {
      const results = cars.filter((car) => car.model === model);
      const years = results.map((car) => car.year);
      setCarYears([...new Set(years)]);
    };
    if (selectedBrand) {
      filterModelBasedOnBrand(selectedBrand);
    }

    if (selectedModel) {
      filterYearBasedOnModel(selectedModel);
    }
  }, [selectedBrand, selectedModel]);

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
      const sortCarsByPrice = filterCarsByPrice(cars, price);
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
    if (!selectedBrand) {
      newErrors.brand = "Brand is required";
    }


    // Password validation
    if (!selectedModel) {
      newErrors.model = "Model is required";
    }

    if(!selectedYear){
      newErrors.year = "Year is required";
    }

    // if (Object.keys(selectedFeaturesWithPriority).length <= 0) {
    //   newErrors.features = "At least one amenity must be selected";
    // }

    setErrors(newErrors);

    // If there are no errors, return true (form is valid)
    return Object.keys(newErrors).length === 0;
  };


  const rankCars = () => {
    return cars.map((car) => {
      let score = 0;
      let maxScore = 0;


      // 1. Brand Score
      if (selectedBrand.includes(car.brand)) {
        score += BRAND_SCORE;
      }
      maxScore += BRAND_SCORE;

      if (selectedModel.includes(car.model)) {
        score += MODEL_SCORE;
      }
      maxScore += MODEL_SCORE;

      // 2. Year Score (newer cars are preferred)
      if (car.year >= selectedYear) {
        score += YEAR_SCORE;
      }
      maxScore += YEAR_SCORE;

      // // 3. Mileage Score (lower mileage preferred)
      // if (car.mileage <= preferences.maxMileage) {
      //   score += MILEAGE_SCORE;
      // }
      // maxScore += MILEAGE_SCORE;

      // 4. Fuel Type Score
      if (fuelType.includes(car.fuel_type)) {
        score += FUEL_SCORE;
      }
      maxScore += FUEL_SCORE;

      // 5. Transmission Type Score
      if (transmission.includes(car.transmission)) {
        score += TRANSMISSION_SCORE;
      }
      maxScore += TRANSMISSION_SCORE;

      // Add additional feature scoring logic if needed
      // 4. Score for Amenities
            const featureScores = selectedFeaturesWithPriority;
            for (const feature in featureScores) {
              const cleanedFeature = feature
                .replace(/[^a-zA-Z]/g, "")
                .toLowerCase();
              const carFeatures = car?.features.map((f) =>
                f.replace(/[^a-zA-Z]/g, "").toLowerCase()
              );

              if (carFeatures.includes(cleanedFeature)) {
                score += featureScores[feature]; // Add score based on the user's priority
              }
              maxScore += featureScores[feature]; // Max score includes all priority levels
            }

      // Calculate final score as a percentage
      const finalScore = (score / maxScore) * 100;
      return {
        ...car,
        score: finalScore,
      };
    });
  };

  // Function to rank and filter cars based on user selections
  const onClickRankCars = () => {
    if (!validateForm()) return; // Validate the form before proceeding
    const findPerfectMatch = cars.find((car) => {

      return (
        car.brand === selectedBrand &&
        car.model === selectedModel 
      );
    });
    if(findPerfectMatch && Object.keys(findPerfectMatch).length > 0){
      delete findPerfectMatch.score;

      setPerfectMatchCar(findPerfectMatch);
    }

    const filteredCars = rankCars();
    // Sort the cars by score, descending
    const sortedCars = filteredCars.sort((a, b) => b.score - a.score);

    setCars(sortedCars);
    // const isMatchFound = sortedCars.find((car) => car.score === 100);
    // if (isMatchFound) {
    //   setMatchFound(true);
    // } else {
    //   setMatchFound(false);
    // }
    setErrors({});
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
          <AccordionItem
            key='2'
            aria-label='Advanced Search'
            title='Advanced Search'
          >
            <AdvancedCarSearch
              fuelType={fuelType}
              setFuelType={setFuelType}
              transmission={transmission}
              setTransmission={setTransmission}
              errors
            />
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Button color='primary' block onClick={onClickRankCars}>
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
