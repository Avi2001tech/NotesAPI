//console.log("working");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// const quotes = require('./quotes.json');

const userRouter = require("./routes/userRoute");
const noteRouter = require("./routes/noteRoute");

const cors = require("cors");


app.use(express.json());

app.use(cors());

app.use((req,res,next)=>{
    console.log("HTTP request:" + req.method + ", URL " + req.url);
    next();
})

app.use("/users",userRouter);  
app.use("/note",noteRouter);

app.get("/",(req,res) => {
    res.send("Notes api");
})

/*  app.get("/",(req,res) => {
    res.send("hello");
})

app.get("/quote",(req,res)=>{
    res.status(200).json(quotes);
})

app.get("/random",(req,res) =>{
    let index = Math.floor(Math.random()* quotes.length)
    let quote = quotes[index]
    res.status(200).json(quote);
})  */


const PORT = process.env.PORT || 5000;

/*mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT, () => {
         console.log("Server is working");
        
     });
})*/
const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URL, {

            useNewUrlParser: "true",
            useUnifiedTopology: "true"
          
          });
       // console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

connectDB().then(() => {

    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`);
    })
})


