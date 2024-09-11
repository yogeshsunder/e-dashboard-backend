const express = require('express');
require('./db/config');
const User = require('./db/user');
const app = express();
app.use(express.json());
app.post('/register',async (req, resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    resp.send(result)
})

app.listen("5000");