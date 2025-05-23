import mongoose from 'mongoose';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;  // Rethrow error to handle it in server.js
    }
};

export default connectToMongoDB;
