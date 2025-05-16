import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";  // Ensure this is properly set up

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000; // You can change this to another port if needed

app.use(express.json()); // to parse the incoming requests with JSON payloads
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Fallback route for client-side routing (for React SPA)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start the server and connect to MongoDB
server.listen(PORT, async () => {
    try {
        await connectToMongoDB();  // Ensure this handles the connection properly
        console.log(`Server Running on port ${PORT}`);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);  // Exit the process if MongoDB connection fails
    }
});

// Handle server errors
server.on('error', (error) => {
    console.error("Server error:", error);
});
