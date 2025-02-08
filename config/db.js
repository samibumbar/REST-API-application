import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Connected to MongoDB: ${connection.connection.host}`);
    console.log(`📂 Using database: ${connection.connection.name}`);
    console.log("✅ Database connection successful");
  } catch (error) {
    console.error(`❌ Database connection error: ${error.message}`);
    process.exit(1);
  }
};
