const express = require('express')
const app = express();
app.get("/", (req, res) =>{
    res.send("Up and running with graphql")
})
app.listen(5000, () => console.log('Server Running on port 5000'))