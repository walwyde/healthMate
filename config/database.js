const mongoose = require("mongoose")
const config = require("config")


const connectDB = async () => {
  try{
    mongoose.set("strictQuery", true)
    const connection = await mongoose.connect(config.get("mongo_URI"))


    console.log(`connected to database ----> ${connection.connection.host}`)
  } catch(err) {
    console.log(err.message)
    console.log("server error....")
    process.exit(1)
  }
}

module.exports = connectDB