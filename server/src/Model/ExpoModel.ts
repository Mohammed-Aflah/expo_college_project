import mongoose from "mongoose";

const ExpoModel = new mongoose.Schema({
  district: String,
  artForms: [
    {
      title: String,
      image: String,
      seats: Number,
      appliedseat: Number,
    },
  ],
  date: Date,
  coverImage: String,
  description: String,
  title: String,
});

export default mongoose.model("Expo", ExpoModel);
