const express = require("express");
const app = express();
const port = process.env.port || 5000;
const mongoose = require("mongoose");
const {mongoURL} = require("./keys.js");
const cors = require("cors");
const path = require("path");

require("./models/model.js");
require("./models/post.js");

app.use(cors())
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/createPost.js"));
app.use(require("./routes/user.js"));

mongoose.set("strictQuery", false);
mongoose.connect(mongoURL);

mongoose.connection.on("connected",()=>{
    console.log("successfully connected to mongo");
})

mongoose.connection.on("error",()=>{
    console.log("not connected to mongo");
})

//serving the frontend
app.use(express.static(path.join(__dirname,"./frontend/build")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./frontend/build/index.html")),
    function(err){
        res.status(500).send(err)
    }
})

app.listen(port, () => {
    console.log("server running on " + port);
})
