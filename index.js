
//express setting

const express = require("express");
const app = express(); 
let port = 8080;
const path = require("path")
const Chat= require ("./models/chat.js")
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"))
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


app.listen(port,(req, res)=>{
    console.log ("listning starting..")
})
app.get("/", (req,res)=>{
    res.send("server is setting");
})

//index route
app.get ("/Chats", async (req,res)=>{
  let Chats = await Chat.find(); 
  res.render("index.ejs",{Chats} )
    
})

app.get("/Chat/new", (req,res)=>{
    res.render("new.ejs")
})

app.get("/Chats/:id/edit", async (req,res)=>{
  let {id} = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", {chat})
})
//update route 

app.put("/Chats/:id", async (req,res)=>{
  let {id} = req.params;
  let {newMsg}= req.body;
  let updatedChat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators: true ,new : true});
  console.log (updatedChat);
  res.redirect("/Chats")
  console.log(req.body);
  
});
//DISTROY ROUTE

app.delete("/Chats/:id", async (req,res)=>{
  let {id}= req.params;
  chatToBeDeleted = await Chat.findByIdAndDelete(id)
  console.log (chatToBeDeleted);
  res.redirect("/Chats")
})


app.post("/Chats", (req,res)=>{
    let {from , to , msg}= req.body;
    let newChat = new Chat({
      from : from ,
      to : to ,
      msg : msg,
      created_at : new Date()
    })
     newChat.save().then((res)=>{
      console.log("chat was saved")
     }).catch((err)=>{
         console.log(err)
     })

 res.redirect("/Chats")
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

  // let Chat1 = new Chat({
  //   from: "sagar", 
  //   to: "anshika", 
  //   msg: "send me your exam sheets",
  //   created_at: new Date(),
  // });

  // Chat1.save().then((res)=>{
  //   console.log (res)
  // }).catch((err)=>{
  //   console.log (err)
  // })
  