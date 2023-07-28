const mongoose  = require("mongoose");
// const MONGO_URL = `mongodb+srv://meadmin:pass12345@cluster0.j1eweco.mongodb.net/bloodbank`;
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connect to the db ${process.env.MONGO_URL} and ${mongoose.connection.host}`.bgBlack.white);
    }
    catch(error) {
        console.log(`Not connected ${error}`.bgBlack.white);
    }
};

module.exports = connectdb;