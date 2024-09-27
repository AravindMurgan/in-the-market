import { useState } from 'react';
import { Checkbox, Chip } from "@nextui-org/react"; // Assuming you're using NextUI components
import { carFeatures } from '@/data/carData';
import { useGlobalContext } from '@/context/GlobalContext';

const FeaturesSelection = () => {
    const [selectedFeatures, setSelectedFeatures] = useState([]); // Track selected amenities for display
    const { selectedFeaturesWithPriority, setSelectedFeaturesWithPriority } = useGlobalContext(); // Get the context
    
  const handleAmenityChange = (feature) => {
    setSelectedFeatures((prev) => {
        const newSelection = prev.includes(feature)
          ? prev.filter((item) => item !== feature) // If feature exists, remove it
          : [...prev, feature]; // If feature doesn't exist, add it
  
        return newSelection;
      });

      setSelectedFeaturesWithPriority((prev) => {
        const newSelectedFeatures = { ...prev };
        if (newSelectedFeatures[feature]) {
          // Remove the feature if already selected
          delete newSelectedFeatures[feature];

        } 
        return newSelectedFeatures;
      });
  };
  // Handle priority selection
  const handlePriorityChange = (feature, priority) => {
    if(priority === '') return; // If no priority selected, return
    setSelectedFeaturesWithPriority((prev) => ({
      ...prev,
      [feature]: Number(priority), // Update the priority for the specific feature
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
        {/* Iterate over each feature */}
        {carFeatures.map((feature) => (
          <div
            key={feature}
            className='flex items-center justify-between'
          >
            {/* Checkbox for feature selection */}
            <Checkbox
              isSelected={selectedFeatures.includes(feature)}
              onChange={() => handleAmenityChange(feature)}
            >
              {feature}
            </Checkbox>

            {/* Dropdown for priority selection */}
            {selectedFeatures.includes(feature) && (
              <select
                onChange={(e) =>
                  handlePriorityChange(feature, e.target.value)
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
         Object.entries(selectedFeaturesWithPriority).map(([feature, priority]) => (
          <Chip key={feature}>
            {feature} - {priorities.find(p => p.value === priority)?.label || 'No priority'}
          </Chip>
        ))}
        </div>
      </div>
    </>
  );
};

export default FeaturesSelection;
