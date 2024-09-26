import { useState } from 'react';
import { Checkbox, Chip } from "@nextui-org/react"; // Assuming you're using NextUI components
import { carFeatures } from '@/data/carData';
import { useGlobalContext } from '@/context/GlobalContext';

const FeaturesSelection = () => {
    const [selectedFeatures, setSelectedFeatures] = useState([]); // Track selected amenities for display
    const { selectedFeaturesWithPriority, setSelectedFeaturesWithPriority } = useGlobalContext(); // Get the context
    
  const handleAmenityChange = (amenity) => {
    setSelectedFeatures((prev) => {
        const newSelection = prev.includes(amenity)
          ? prev.filter((item) => item !== amenity) // If amenity exists, remove it
          : [...prev, amenity]; // If amenity doesn't exist, add it
  
        return newSelection;
      });

      setSelectedFeaturesWithPriority((prev) => {
        const newSelectedFeatures = { ...prev };
        if (newSelectedFeatures[amenity]) {
          // Remove the amenity if already selected
          delete newSelectedFeatures[amenity];

        } 
        return newSelectedFeatures;
      });
  };
  // Handle priority selection
  const handlePriorityChange = (amenity, priority) => {
    if(priority === '') return; // If no priority selected, return
    setSelectedFeaturesWithPriority((prev) => ({
      ...prev,
      [amenity]: Number(priority), // Update the priority for the specific amenity
    }));
  };

  // Priority options
  const priorities = [
    { label: "Must Have", value: 10 },
    { label: "Important", value: 7 },
    { label: "Nice to Have", value: 4 },
    { label: "Not Important", value: 0 },
  ];

  return (
    <>
      <div className='mt-2 space-y-4'>
        {/* Iterate over each amenity */}
        {carFeatures.map((amenity) => (
          <div
            key={amenity.value}
            className='flex items-center justify-between'
          >
            {/* Checkbox for amenity selection */}
            <Checkbox
              isSelected={selectedFeatures.includes(amenity.value)}
              onChange={() => handleAmenityChange(amenity.value)}
            >
              {amenity.value}
            </Checkbox>

            {/* Dropdown for priority selection */}
            {selectedFeatures.includes(amenity.value) && (
              <select
                onChange={(e) =>
                  handlePriorityChange(amenity.value, e.target.value)
                }
                className='border rounded p-1 text-sm'
              >
                <option value='' defaultValue={'Select Priority'}>
                  Select priority
                </option>
                {priorities.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        {/* Display selected amenities with chips */}
        <div className='mt-4 flex flex-wrap gap-2'>
        {selectedFeaturesWithPriority &&
         Object.entries(selectedFeaturesWithPriority).map(([amenity, priority]) => (
          <Chip key={amenity}>
            {amenity} - {priorities.find(p => p.value === priority)?.label || 'No priority'}
          </Chip>
        ))}
        </div>
      </div>
    </>
  );
};

export default FeaturesSelection;
