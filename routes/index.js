const express = require('express');
const router = express();

router.get("/", (req,res)=>{
// return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
res.render("home");
});

module.exports=router;