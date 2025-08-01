import mongoose from "mongoose";

const connectdb = async () => {
  try {
    console.log("Connecting to:", process.env.MONGODB_URL);
    const conn = await mongoose.connect(process.env.MONGODB_URL);

    console.log(` \n MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectdb;
