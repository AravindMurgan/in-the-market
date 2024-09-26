"use client";
import { fuelTypeData, transmissionData } from "@/data/carData";
import { Accordion, AccordionItem, Select, SelectItem } from "@nextui-org/react";
import React from "react";
import FeaturesSelection from "./FeaturesSelection";

const AdvancedCarSearch = ({fuelType,setFuelType,transmission,setTransmission,errors}) => {
  return (
    <>
      <div>
        <label htmlFor='Models'>Fuel Type</label>
        <Select
          className='max-w-xs'
          aria-label='Car Year'
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
          scrollShadowProps={{
            isEnabled: false,
          }}
        >
          {fuelTypeData &&
            fuelTypeData.map((type) => {
              return (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              );
            })}
        </Select>
      </div>
      <div>
        <label htmlFor='Models'>Transmission</label>
        <Select
          className='max-w-xs'
          aria-label='Car Year'
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
          scrollShadowProps={{
            isEnabled: false,
          }}
        >
          {transmissionData &&
            transmissionData.map((transmissionItem) => {
              return (
                <SelectItem key={transmissionItem} value={transmissionItem}>
                  {transmissionItem}
                </SelectItem>
              );
            })}
        </Select>
      </div>

      <div>
        <p className='text-tiny text-red-500'>
          {errors?.features?.length > 0 ? errors.features : ""}
        </p>
        <Accordion err>
          <AccordionItem key='1' aria-label='Amenities' title='Amenities'>
            <FeaturesSelection />
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default AdvancedCarSearch;
