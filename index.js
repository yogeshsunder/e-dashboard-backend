const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/user');
const Product = require('./db/product');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result)
})

app.post("/login", async (req, resp) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            resp.send(user);
        }
        else {
            resp.send("No username found");
        }
    }
    else {
        resp.send("No username found");
    }
})

app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body)
    let result = await product.save();
    resp.send(result);
})

app.get("/products", async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "No Products Found." })
    }
})

app.delete("/product/:id", async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    resp.send(result);
});

app.get("/product/:id", async (req, resp) => {
    let result = await Product.find({ _id: req.params.id });
    if(result.length > 0){
        resp.send(result);
    }else{
        resp.send("Record not found")
    }
});

app.put("/product/:id", async (req, resp)=>{
    let result = await Product.updateOne(
        {_id: req.params.id},
        {
            $set : req.body
        }
    )
    resp.send(result);
})

app.listen("5000");