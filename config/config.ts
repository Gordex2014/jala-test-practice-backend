import dotenv from "dotenv";

dotenv.config();

export const config = {
  apiVersion: "/api/v1",
  dbUrl: process.env.MONGODB_CNN || "mongodb://localhost:27017/videosApp",
  port: process.env.PORT || "8080",
};