import mongoose from "mongoose";
import { config } from "../config/config";

export const dbConnection = async () => {
  const dbUrl = config.dbUrl;
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`${"[DB]".blue}: DB connected`);
  } catch (err) {
    console.log(`${"[Error]".red}: ${err}`);
    throw new Error(
      "Error while initiating the DB, please contact with an admin"
    );
  }
};
