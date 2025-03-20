const express = require('express');
const app = express();
const port = 5000;

const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();

//MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true // Allow cookies if needed
}))


//all middleware file import here
const connectDB = require('./config/database');


//import all routes here
const userRoute = require('./Routes/user.route');
const recipeRoute = require('./Routes/recipe.route');
const nutritionRoute = require('./Routes/nutrition.route');


//all middleware file use here
connectDB();


app.get('/', (req, res)=>{
    res.send("helloo... this is my app");
})

//use all route files here
app.use('/api/user', userRoute);
app.use('/api/recipe', recipeRoute);
app.use('/api/nutrition', nutritionRoute);

app.listen(port, ()=>{
    console.log("this app is running on port", port);
})