const mongoose = require('mongoose');
const mongoURI ="mongodb://127.0.0.1/test";


const connectToMongo = async ()=>{
   await mongoose.connect(mongoURI).then(()=>{
console.log("Morya!")
   }).catch((err)=>{
console.log("error agaya vai!")
   })
}

module.exports =connectToMongo;
