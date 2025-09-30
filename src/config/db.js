// src/config/db.js
import mongoose from "mongoose";

export async function connectDB(uri) {
  if (!uri) throw new Error("MONGODB_URI is missing in .env");
  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 30000, // wait up to 30s for Mongo to respond
    socketTimeoutMS: 60000,          // keep sockets open for long ops
    connectTimeoutMS: 30000          // handshake timeout
  });

  console.log("✅ MongoDB connected");
}
