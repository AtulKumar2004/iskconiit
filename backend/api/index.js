import app from "../app.js";
import connectDB from "../config/db.js";

export default async (req, res) => {
  await connectDB();
  return app(req, res);
};