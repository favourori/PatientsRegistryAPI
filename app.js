express = require('express')
app = express()
require('dotenv').config()


//setup body parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

let cors = require("cors");
app.use(cors());

//allowing cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


app.get("/", (req, res)=>{
    res.status(200).send({
        message: "Server Up"
    })
})



//Spin up dev server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})