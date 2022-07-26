const initialState = {
    recipes: [],
    copyRecipes: [],
    recipeDetails: [],
    dietTypes: [],
};
   

function rootReducer (state = initialState, action){
    switch(action.type){
        case "GET_RECIPES":
            return{
                ...state,
                recipes: action.payload,
                copyRecipes:action.payload
            };
        case "GET_DETAIL_BY_ID":
            return {
                ...state,
                recipeDetails: action.payload,
              };

        case "GET_DIET_TYPES": 
            return{
                ...state,
                dietTypes: action.payload
            }

        case "FILTER_BY_DIET":
            const copyRecipes = state.copyRecipes;
            const filteredByDietType = copyRecipes.filter((r) =>
              r.dietTypes?.some(
                (d) => d.toLowerCase() === action.payload.toLowerCase()
              )
            );
            return {
              ...state,
              recipes: filteredByDietType,
            }

        case "SORT_RECIPES":
            let sortedRecipes = action.payload === "atoz" ? 
                state.recipes.sort(function (a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return 1;
                    }
                    if(a.name.toLowerCase() < b.name.toLowerCase()){
                        return -1
                    }
                    return 0;
                }):
                state.recipes.sort(function (a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return -1;
                    }
                    if(a.name.toLowerCase() < b.name.toLowerCase()){
                        return 1
                    }
                    return 0;
                })
            return{
                ...state,
                recipes: sortedRecipes
            }
        
        case "SORT_HEALTHSCORE":
            let sortHealthscore = action.payload === "maxtomin" ? 
                state.recipes.sort(function (a, b){
                      if (a.healthScore - b.healthScore < 0) return 1;
                          else return -1;
              
                }):
                state.recipes.sort(function (a, b){
                     if (b.healthScore - a.healthScore < 0) return 1;
                        else return -1;
                })

            return{
            ...state,
            recipes: sortHealthscore
            }

        case "RECIPE_BY_NAME":
            return{
                ...state,
                recipes: action.payload
            }

        case "POST_RECIPES":
            return{
                ...state
            };

        

        default: {
            return state;
        }

    }
}

export default rootReducer