var express = require('express')
var router = express.Router()

router.get('/Class12',(req,res)=>{
        res.render('courses-class-12.html')
})

router.get('/Class11',(req,res)=>{
    res.render('courses-class-11.html')
})

router.get('/Class10',(req,res)=>{
    res.render('courses-class-10.html')
})

router.get('/Class9',(req,res)=>{
    res.render('courses-class-9.html')
})

router.get('/Class8',(req,res)=>{
    res.render('courses-class-8.html')
})

router.get('/Class7',(req,res)=>{
    res.render('courses-class-7.html')
})

router.get('/Class6',(req,res)=>{
    res.render('courses-class-6.html')
})
module.exports = router