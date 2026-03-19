
//express setting

const express = require("express");
const app = express(); 
let port = 8080;
const path = require("path")
const Chat= require ("./models/chat.js")

app.set("views", path.join(__dirname, "views"))
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended: true}));


app.listen(port,(req, res)=>{
    console.log ("listning starting..")
})
app.get("/", (req,res)=>{
    res.send("server is setting");
})

//index route
app.get ("/Chats", async (req,res)=>{
  let Chats = await Chat.find();
  console.log (Chats)
  res.render("index.ejs",{Chats} )
    
})

app.get("/Chat/new", (req,res)=>{
    res.render("new.ejs")
})

app.post("/Chats", (req,res)=>{
    let {from , to , msg}= req.body;
    let newChat = new Chat({
      from : from ,
      to : to ,
      msg : msg,
      created_at : new Data()
    });
     console.log (newChat);
     res.send("working")

})
//mongoose setting
 const mongoose = require ("mongoose");

 async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
  .then(() => {
    console.log("Connected to MongoDB..");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

  let Chat1 = new Chat({
    from: "sagar", 
    to: "anshika", 
    msg: "send me your exam sheets",
    created_at: new Date(),
  });

  Chat1.save().then((res)=>{
    console.log (res)
  }).catch((err)=>{
    console.log (err)
  })
  