var express = require('express')
var router = express.Router()

router.get('/Class6/Maths',(req,res)=>{
    res.render('chapters-6-math.html')
})

router.get('/Class6/Science',(req,res)=>{
    res.render('chapters-6-science.html')
})
module.exports = router