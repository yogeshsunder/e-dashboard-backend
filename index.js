const express = require('express');

const app = express();

app.get("/", (req, resp)=>{
    resp.send("App started with Node.js")
})

app.listen("5000");