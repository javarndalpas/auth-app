 const mongoose = require('mongoose');

const mongo_url = process.env.MONGOURL;


mongoose.connect(mongo_url)
.then(()=>{
    console.log("MongoDB Connected....")
}).catch((err)=>{
    console.log("MongoDB connection error : " , err);
})







