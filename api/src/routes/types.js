const {Router} = require("express");
const {dietTypeDB} =  require("../controllers/dietTypeDB");
const {Diet} = require("../db");

const router =  Router();

router.get("/", async(req,res)=>{
    try{

        dietTypeDB.forEach((e)=>{
            Diet.findOrCreate({
                where: {name : e},
            })
        })

        const dietTypes = await Diet.findAll();
        res.send(dietTypes)

    }catch(error){
        console.log(error);
    }
});

module.exports = router;