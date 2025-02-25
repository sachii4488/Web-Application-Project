const port = 5000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://sachinipubu934:ywl7vhoytAgJOnef@cluster0.vyxvamv.mongodb.net/PetApp", {
 
})
.then(() => console.log("MongoDB connected"))
.catch((error) => console.error("MongoDB connection error:", error));

// API Creation
app.get("/", (req, res) => {
  res.send("Express app is running");
});

// Image Storage Engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});


const upload = multer({ storage: storage });

// Creating upload Endpoint for images
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});

// Schema for creating products
const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

app.post('/addproduct', async (req, res) => {
  let products = await Product.find({});
  let id;
  if(products.length>0){
    let last_product_array=products.slice(-1);
    let last_product = last_product_array[0];
    id=last_product.id+1;
  }
  else{
    id=1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    available: req.body.available,
  });
  try {
    await product.save();
    console.log("Product saved:", product);
    res.json({
      success: 1,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ success: 0, error: error.message });
  }
});

//create API For deleting product
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({ 
    success: true,
    name:req.body.name
  })
})

//create API For getting all products
app.get('/allproduct', async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
});

// shema creating for user model

const users = mongoose.model('users', {
  name:{
    type:String,
    
  },
  email:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
  },
  cartData:{
    type:Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

//creating Endpoint for registering the user 


app.post('/signup', async (req, res) => {
  let check = await users.findOne({email:req.body.email});
  if(check){
    return res.status(400).json({success:false,errors:"existing user found with same email address"})
  }
  let cart={};
  for(let i=0;i<300;i++){
    cart[i]=0;
  }
  const user= new users({
    name:req.body.username,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
  })

  await user.save();

  const data ={
    user:{
      id:user.id
    }
  
  }
  const token= jwt.sign(data, 'secret_ecom');
  res.json({success:true,token})
}),

// creatind endpoint for user login

app.post('/login', async (req, res) => {
  let user= await users.findOne({email:req.body.email});
  if(user){
    const passCompare= req.body.password===user.password;
    if(passCompare){
      const data={
        user:{
          id:user.id
        
        }
      }
      const token= jwt.sign(data, 'secret_ecom');
      res.json({success:true,token});
    }
  else{
        res.json({success:false,errors:"wrong password"});
      }
  }
  else{
    res.json({success:false,errors:"Wrong Email Id"})
  }
}),
//Creating Endpoint for Newcollection data
app.get('/newcollection',async (req,res)=>{
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("Newcollection Fetched");
  res.send(newcollection);
})

//Creating endpoint for popular in women section
app.get('/popularinwomen',async (req,res)=>{
  let products = await Product.find({catagory:"women"});
  let popular_in_women = products.slice(0,4);
  console.log("Popular in Women fetched");
  res.send(popular_in_women);
})

//Creating middleware to fetch user
const fetchUser = async(req,res,next)=>{
  
  const token =req.header('auth-token');
  if(!token){
    res.status(401).send({errors:"Please authenticate using a valid token"});
  }
  else{
    try{
      const data= jwt.verify(token,'secret_ecom');
      req.user=data.user;
      next();

    }catch(error){
      res.status(401).send({errors:"Please authenticate using a valid token"});

    }
}
}

//Creating endpoint for adding in cartdata
app.post('/addtocart',fetchUser,async (req,res)=>{
 console.log("Added",req.body.itemId);
 let userData = await users.findOne({_id:req.user.id});
 userData.cartData[req.body.itemId] +=1;
 await users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
 res.send("Added");
   
})

//Creating endpoint for removing from cartdata

app.post('/removefromcart',fetchUser,async (req,res)=>{
  console.log("removed",req.body.itemId);
  let userData = await users.findOne({_id:req.user.id});
  if(userData.cartData[req.body.itemId]>0)
 userData.cartData[req.body.itemId] -=1;
 await users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
 res.send("Removed");
})


//Creating endpoint to get cartData

app.post('/getcart',fetchUser,async(req,res)=>{
  console.log("Get Cart");
  let userData = await users.findOne({_id:req.user.id});
  res.json(userData.cartData);

})


app.listen(port, (error) => {
  if (!error) {
    console.log("Server is running on port " + port);
  } else {
    console.log("Error: " + error);
  }
})
