import React, { Fragment }  from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes,  dietfilter,recipesSort,healthScoreSort } from "../actions";
import {Link} from "react-router-dom"
import Card from "./Card";
import Paginado from "./Paginado"; 
import SearchBar from "./SearchBar";
import "./Home.css"

export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const [orden , setOrden] = useState("")
  const [CurrentPage, SetCurrentPage] = useState(1);
    const [RecipesPerPage, SetRecipesPerPage] = useState(9);
    const indexOfLastRecipe = CurrentPage * RecipesPerPage;  //9
     const indexOfFirstRecipe = indexOfLastRecipe - RecipesPerPage;  //0
    const CurrentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe) 

    const paginado = (pageNumber) =>{
        SetCurrentPage(pageNumber)
    }
 

    
    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);  
    
   
    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleDietTypeFilter(e) {
        e.preventDefault();
        dispatch(dietfilter(e.target.value));
        SetCurrentPage(1);
      }

    function handleSort(e){
        e.preventDefault();
        dispatch(recipesSort(e.target.value));
        SetCurrentPage(1);
        setOrden(e.target.value) ///para que haga modificacion en el renderizado,sino NO FUNCIONA
    }

    function handleSortHealthScore(e){
        e.preventDefault();
        dispatch(healthScoreSort(e.target.value));
        SetCurrentPage(1);
        setOrden(e.target.value) ///para que haga modificacion en el renderizado,sino NO FUNCIONA
    }
    


   return (
    <div class="homepadre">
        <SearchBar/>


        <div>
            
            <button className="btn-recargar" onClick={e => {handleClick (e);}}> 
                reload recipes
            </button>   

            <select className="select" onChange={e => handleSort(e)} >
                <option>Alphabetical</option>
                <option value="atoz"> A - Z </option>
                <option value="ztoa"> Z - A </option>
            </select>

            <select className="select" onChange={e => handleSortHealthScore(e)}>
                <option>Health Score</option>
                <option value="maxtomin"> Max-Min </option>
                <option value="mintomax"> MIn-Max </option>
            </select>

            <select className="select" onChange={e => handleDietTypeFilter(e)}>
                <option>Diet Type</option>
                <option value="Gluten Free">Gluten Free</option>
                <option value="Ketogenic">Ketogenic</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="lacto vegetarian">Lacto-Vegetarian</option>
                <option value="Ovo Vegetarian">Ovo-Vegetarian</option>
                <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option> 
                <option value="Vegan">Vegan</option>
                <option value="Pescatarian">Pescatarian</option>
                <option value="paleolithic">Paleo</option>
                <option value="Primal">Primal</option>
                <option value="Low FODMAP">Low FODMAP</option>
                <option value="whole 30">Whole30</option>
                <option value="dairy free">Dairy Free</option> 
            </select>
        </div>

       
        <div className="recipes_home">
            {CurrentRecipes?.map((e)=> {
                 return (
                    <fragment>
                        <Link className="link" to={"/home/" + e.id}>
                            <Card name={e.name} img={e.img}  dietTypes={e.dietTypes}  id={e.id} />
                        </Link>
                    </fragment>
                    )
                })
            }
        </div>


        <div>
            <Paginado RecipesPerPage={RecipesPerPage} 
                 allRecipes={allRecipes.length} 
                paginado={paginado}
            /> 
        </div>
     

    </div>
   )
}
