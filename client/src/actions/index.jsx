import axios from "axios"

export const getRecipes = () => {
    return async function(dispatch){
      var recipes = await axios.get ("http://localhost:3001/recipes");
        return dispatch({type: "GET_RECIPES", payload:recipes.data})   
    } 
}



export const getRecipeByName = (name)=>{
  return async function(dispatch){
    try{
      let response = await axios.get(`http://localhost:3001/recipes?name=${name}`);
      return dispatch({
        type: "RECIPE_BY_NAME",
        payload: response.data
      })

    } catch{
      return alert("Recipe Not Fount")

    }
  }
}


export function postRecipes(payload){
  return async function(dispatch){
    try{
      let json = await axios.post("http://localhost:3001/recipes", payload);
      return dispatch({
        type:"POST_RECIPES",
        payload:json.data})

    }catch(error){
      console.log(error);
    }
  }
}



export function getDietTypes() {
  return async function(dispatch){
    try{
      var response = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: "GET_DIET_TYPES",
        payload: response.data.map((d) => d.name),
      });
    } catch(error) {
      console.log(error);
    }
  };
}

export function detailsID(payload){
  return async function(dispatch){
    try{
      var response = await axios.get(`http://localhost:3001/recipes/${payload}`)
      return  dispatch({
        type: "GET_DETAIL_BY_ID",
        payload: response.data
      })

    }catch(error){
      console.log(error);
    }
  }
}


export function dietfilter(payload){
  return {
    type: "FILTER_BY_DIET",
    payload
  }
}

export function recipesSort(payload){
  return {
    type: "SORT_RECIPES",
    payload
  }
}

export function healthScoreSort(payload){
  return {
    type: "SORT_HEALTHSCORE",
    payload
  }
}


