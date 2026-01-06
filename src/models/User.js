import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    /* =========================
       AUTH
    ========================= */
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["customer", "provider", "donor", "seller", "admin"],
      default: "customer"
    },

    /* =========================
       ADMIN CONTROL (NEW)
    ========================= */
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active"
    },

    /* =========================
       PROVIDER SECTION
    ========================= */
    profile: {
      phone: String,
      about: String,
      state: String,
      district: String,
      area: String,
      coverageAreas: String,
      showPhone: { type: Boolean, default: true },
      photo: String
    },

    services: {
      type: [
        {
          title: String,
          description: String,
          basePrice: Number,
          hourlyRate: Number,
          emergencyCharge: Number,
          active: { type: Boolean, default: true }
        }
      ],
      default: []
    },

    availability: {
      days: [String],
      from: String,
      to: String
    },

    bookings: {
      type: [
        {
          customerName: String,
          serviceName: String,
          address: String,
          day: String,
          status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected", "In Progress", "Completed"],
            default: "Pending"
          },
          createdAt: { type: Date, default: Date.now }
        }
      ],
      default: []
    },

    wallet: {
      balance: { type: Number, default: 0 },
      pending: { type: Number, default: 0 },
      totalEarned: { type: Number, default: 0 }
    },

    kyc: {
      documentType: String,
      documentNumber: String,
      documentFile: String,
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
      }
    },

    ratings: {
      type: [
        {
          customerName: String,
          rating: Number,
          review: String,
          createdAt: { type: Date, default: Date.now }
        }
      ],
      default: []
    },

    disputes: {
      type: [
        {
          category: String,
          message: String,
          status: {
            type: String,
            enum: ["open", "resolved"],
            default: "open"
          },
          createdAt: { type: Date, default: Date.now }
        }
      ],
      default: []
    },

    /* =========================
       DONOR SECTION
    ========================= */
    foodDonations: {
      type: [
        {
          foodName: { type: String, required: true },
          quantity: { type: String, required: true },
          foodType: { type: String, enum: ["Veg", "Non-Veg"] },
          expiry: { type: Date, required: true },
          address: { type: String, required: true },
          phone: { type: String, required: true },
          note: String,
          status: {
            type: String,
            enum: ["Available", "Collected", "Expired"],
            default: "Available"
          },
          createdAt: { type: Date, default: Date.now }
        }
      ],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
