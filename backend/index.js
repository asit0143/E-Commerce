const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const http = require('http');

// Middleware
app.use(express.json());
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// API Routes
app.get("/", (req, res) => {
    res.send("E-Commerce Backend is Running");
});

// Database Connection
const MONGODB_URI = "mongodb+srv://asitkumbhakar200:7001018847@asit.cvuw3it.mongodb.net/E-Commerce";

console.log('Attempting to connect to MongoDB...');

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB');
    
    // Start the server
    server.listen(port, '0.0.0.0', () => {
        console.log(`🚀 Server is running on http://localhost:${port}`);
    });
    
    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`Port ${port} is already in use`);
        } else {
            console.error('Server error:', error);
        }
        process.exit(1);
    });
    
}).catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('Error details:', err);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

// Log errors
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Something broke!');
});

//API Creation

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

//Image Storage Engine

const Storage = multer.diskStorage({
    destination: './Upload/Images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const Upload = multer({storage:Storage})

//Creating Upload Endpoint for Images

app.use('/Images',express.static('Upload/Images'))

app.post("/Upload",Upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/Images/${req.file.filename}`
    })
})

//Schema for Creating Products
const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avilable:{
        type:Boolean,
        default:true,
    }
})

app.post('/addproduct',async (req,res)=>{
    let Products = await Product.find({});
    let id;
    if(Products.length>0)
    {
        let last_product_array = Products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price, 
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// Creating API For deleting Products

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

//Creating API for getting all Products
app.get('/allproducts',async (req,res)=>{
    let Products = await Product.find({});
    console.log("All Products Fatched");
    res.send(Products);
})

//Shema creating for user model

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        uique:true, 
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//Creating Endpoint for registering the user
app.post('/signup',async (req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with same email address"})
    }
    let cart = {};
    for (let i =0; i<300;i++){
        cart[i]=0;
    }
    const user = new Users({
    name:req.body.username,
    email:req.body.email,
    password:req.body.password, 
    cartData:cart,
    })
    
    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})

}) 

//creating endpoint for user login
app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
        res.json({sucess:false,errors:"Wrong Email Id"});
    }
})
//creating endpoint for newcollection data

app.get('/newcollections',async (req,res)=>{
    let Products = await Product.find({});
    let newcollection = Products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

//creating endpoint for popular in women section
app.get('/popularinwomen',async (req,res)=>{
    let Products = await Product.find({category:"women"});
    let popular_in_women = Products.slice(0,4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
})

//creating middlelware to fetch user
    const fetchUser = async (req,res,next)=>{
     const token = req.header('auth-token');   
     if(!token){
        res.status(401).send({error:"Please authenticate useing valid token" })
     }
     else{
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch (error){
            res.status(401).send({errors:"Please authenticate useing valid token"})
        }
     }
    }


//creating endpoint for adding products in cartdata
    app.post('/addtocart', fetchUser,async (req,res)=>{
        console.log("Added",req.body.itemId);
        let userData = await Users.findOne({_id:req.user.id});
        userData.cartData[req.body.itemId] += 1;
        await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
        res.send("Added")
    })
    //creating endpoint to remove product from catrdata
    app.post('/removefromcart',fetchUser,async (req,res)=>{
        console.log("Removed",req.body.itemId);
        let userData = await Users.findOne({_id:req.user.id});
        if(userData.cartData[req.body.itemId]>0)
        userData.cartData[req.body.itemId] -= 1;
        await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
        res.send("Removed")
    })

//creating endpoint to get cartdata
app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})   


app.listen(port,(error)=>{
    if(!error) {
        console.log("Server Running on Port "+port)
    }
    else
    {
        console.log("Error : "+error)
    }
})