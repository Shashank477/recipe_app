import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app=express();
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.ejs",{cat:"Select"});
});


app.post("/precipe",async(req,res)=>{
    try{
        const category=req.body.category_sel;
        const response=await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        res.render("index.ejs",{recipe:response.data,cat:category});
    }
    catch(error){
        console.error("failed to make request:",error.message);
        res.status(500).send("Failed to fetch activity");
    }
});

app.post("/recipemaking",async(req,res)=>{
    try{
        const id=req.body.id;
        const response=await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        var res_data=response.data;
        res.render("recipe.ejs",{recipemaking:res_data});
        
    }
    catch(error){
        console.error("failed to make request:",error.message);
        res.status(500).send("Failed to fetch activity");
    }
});

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
});