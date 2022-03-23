
const mongoose = require("mongoose");
let mongoURI = "mongodb+srv://Devansh:Admin@cluster0.8tfvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// app.use(express.json());
const connectToMongo = async()=>{
    console.log('connecting to the mongodb...')
    try{
        await mongoose.connect(mongoURI);
        console.log('connected to mongo successfully')
    }catch (error){
        console.log(error.message);
    }
}
module.exports = connectToMongo