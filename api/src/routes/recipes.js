const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");
const { getApiById, getdbById, getAllRecipe,} = require("../controllers/recipes")
const router = Router()

router.get("/" , async(req,res) =>{
    try{
        const {name} = req.query;
        let allRecipe = await getAllRecipe();

        if(name){
            let recipeByName = await allRecipe.filter((e) =>
            e.name.toLowerCase().includes(name.toString().toLowerCase())
            );

            if(recipeByName.length){
                let recipe = recipeByName.map((e)=>{
                    return{
                        img : e.img,
                        name : e.name,
                       dietTypes : e.dietTypes? e.dietTypes : e.diets.map((e)=> e.name), 
                        id: e.id,
                    };
                });
                return res.status(200).send(recipe)
            }
            res.status(404).send("recipe not found")
        }else{
            let recipes = allRecipe.map((e)=>{
                return {
                    img : e.img,
                    name : e.name,
                    dietTypes : e.dietTypes? e.dietTypes : e.diets.map((e)=> e.name), 
                    id: e.id,
                };
            });
            return res.status(200).send(recipes)
        }
    }
    catch {
        console.error()
        return res.status(400).send("invalid input");
      }
});


router.get("/:id" , async(req,res)=>{
    const {id} = req.params;
    try{
        if(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)){
            let dbRecipeById = await getdbById(id)
            return res.status(200).send(dbRecipeById);
        }else{
            apiRecibeById = await getApiById(id);
            if(apiRecibeById.data.id){
                let recipeDetail = {
                    img:  apiRecibeById.data.image,
                    name: apiRecibeById.data.title,
                    id: apiRecibeById.data.id,
                    summary: apiRecibeById.data.summary,
                    healthScore: apiRecibeById.data.healthScore,
                    dietTypes: apiRecibeById.data.diets,
                    steps: apiRecibeById.data.analyzedInstructions[0]?.steps.map((e) => {
                        return {
                          number: e.number,
                          step: e.step,
                        };
                      }), 
                }
                return res.status(200).send(recipeDetail)
            }
        }
    }catch{
        return res.status(404).send("Recipe not found");
    }

})


router.post("/" , async(req,res,next)=>{
    try {
        const {name, summary,healthScore,steps, dietTypes, img} = req.body;
        const recipeCreate = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            dietTypes,
            img,
        })
        //hago la relacion de la dieta con el nombre que me llega por parametro
        //para encontrar la dieta que matchee
        let RecipeTypeDietdb = await Diet.findAll({
            where: {name: dietTypes}
        });
        //agrego la dieta de la tabla diets a la nueva receta que cree
        recipeCreate.addDiet(RecipeTypeDietdb);
        res.status(200).send(recipeCreate)
        
    }catch (error) {
        console.log(error)
        next(error)
    }
})















module.exports = router;