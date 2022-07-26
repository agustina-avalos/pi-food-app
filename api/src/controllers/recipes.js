const axios = require("axios")
const {Diet , Recipe} = require("../db")
const {API_KEY} = process.env;



const getApiInfo = async () =>{
    const apiurl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
);

    const apiInfo = await apiurl.data.results.map((e)=>{
        return {
            id:e.id,
            name: e.title,
            dietTypes: e.diets,
            summary: e.summary,
            healthScore: e.healthScore,
            img: e.image,
            steps: e.analyzedInstructions[0]?.steps.map((e)=>{
                return{
                    number : e.number,
                    step : e.step
                };
            }),
        };
    });
    return apiInfo;
};

const getdbInfo = async () => {
    return await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  };


const getApiById = async (id) => {
    return await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
};

const getdbById = async (id) => {
    return await  Recipe.findByPk(id, {
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  };

const getAllRecipe = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getdbInfo();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo;
  };
  

module.exports = {
    getApiInfo,
    getdbInfo,
    getAllRecipe,
    getdbById,
    getApiById,
}