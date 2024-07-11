import mongoose from "mongoose";

const connectMongo = async () => {
  if (mongoose.connection.readyState !== 1) {
    return mongoose.connect(process.env.MONGOURI);
  }
  return null;
};

export default connectMongo;
