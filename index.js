//<!--require library-->
const express =require('express');
const app=express();

const PORT=process.env.PORT || 3000;

const db=require('./config/mongoose');

//<!--middleware for parse from data-->
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//<!--route for home-->

app.use("/",require("./routes/index"));

app.listen(PORT, function(err){
    if(err){
        console.log("error while running server", err);
        return;
    }
    console.log(`server running on port ${PORT}`);
});