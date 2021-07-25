var express = require('express')
var router = express.Router()

router.get('/Class6/Maths/Chapter14',(req,res)=>{
    res.render('coursedetail-cls-6-math-c14.html')
})

// router.get('/Class6/Science',(req,res)=>{
//     res.render('chapters-6-science.html')
// })
module.exports = router