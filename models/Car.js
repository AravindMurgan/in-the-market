import { Schema, model, models } from "mongoose";

const CarSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    transmission: {
      type: String,
    },
    fuel_type: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    previous_owners: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
    },
    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },
    features: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    seller_info: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    images: [
      {
        type: String,
      },
    ],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Car = models.Car || model("Car", CarSchema);

export default Car;
