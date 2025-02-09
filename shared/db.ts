const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            return false;
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connect to database successfully");
    } catch (error) {
        console.error("Failed to connect to database ", error);
    }
};

export default connectToDB;
