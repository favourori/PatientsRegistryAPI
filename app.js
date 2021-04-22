express = require('express')
app = express()


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