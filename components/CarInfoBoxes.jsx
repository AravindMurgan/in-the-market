import React from "react";
import InfoBox from "./InfoBox";

const CarInfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Luxury Car Seekers"
            backgroundColor="bg-gray-100"
            buttonInfo={{
              text: "Browse Luxury Cars",
              link: "/cars",
              backgroundColor: "bg-black",
            }}
          >
            Find your dream luxury car. Search for cars that suit your needs.
          </InfoBox>

          <InfoBox
            heading="For Luxury Car Owners"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: "Add Luxury Car",
              link: "/cars/add",
              backgroundColor: "bg-blue-500",
            }}
          >
            List your luxury cars and reach potential buyers. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default CarInfoBoxes;
