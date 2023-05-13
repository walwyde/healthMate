const mongoose = require("mongoose")
const config = require("config")
const dbURI = config.get("mongooseURI")

const connectDB = async () => {
  try{
    const connection = (await mongoose.connect(dbURI)).set("strictQuery", true)

    console.log(`connected to database ----> ${connection.connection.host}`)
  } catch(err) {
    console.log(err.message)
    console.log("server error....")
    process.exit(1)
  }
}

module.exports = connectDB