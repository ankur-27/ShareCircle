import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import providerRoutes from "./routes/provider.js";
import customerRoutes from "./routes/customer.js";
import donorRoutes from "./routes/donor.js";
import adminRoutes from "./routes/adminRoutes.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/customer", (req, res, next) => {
  console.log("✅ CUSTOMER ROUTE HIT:", req.originalUrl);
  next();
});
app.use("/api/customer", customerRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/admin", adminRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
