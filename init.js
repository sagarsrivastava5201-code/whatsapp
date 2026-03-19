const mongoose = require ("mongoose");
const Chat= require ("./models/chat.js")
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
//function 
main()
  .then(() => {
    console.log("Connected to MongoDB..");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

   //send data according to schema
  
   let allChats = [
    {
     from: "sagar", 
      to:"vishu",
      msg: "send me note for the exam", 
      created_at : new Date(),
   },
     {
     from: "rakesh", 
      to:"mukesh",
      msg: "send me your books", 
      created_at : new Date(),
   },
     {
     from: "rohan", 
      to:"mohan",
      msg: "you r so handsome rohan", 
      created_at : new Date(),
   },
     {
     from: "prakhar", 
      to:"sanju",
      msg: "today is so hot bhai", 
      created_at : new Date(),
   },
     {
     from: "anurag", 
      to:"kushal",
      msg: "would you like to go with me in party", 
      created_at : new Date(),
   },
    

   ];

  Chat.insertMany(allChats)