const express=require('express');
const router=express.Router();

router.use('/api',require('./api/index'));
//router.use('/options',require('./api/v1/option'));

module.exports=router;