import mongoose from "mongoose";

const j4youSchema = new mongoose.Schema({
  active: Number,
  type: String,
  requestMade: Number,
  tokenList: [String],
});

const J4You = mongoose.models.Value || mongoose.model("Value", j4youSchema);

export default J4You;
