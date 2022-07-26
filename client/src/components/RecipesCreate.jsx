import React  from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams, useNavigate } from "react-router-dom"
import {postRecipes , getDietTypes } from "../actions"
import "./RecipeCreate.css"


function validate(input) {
    let errors = {}
    if(!input.name){
        errors.name= "Obligatory field"
    }
    if(!input.summary){
        errors.summary= "Obligatory field"
    }
    if(input.healthScore<=0 || input.healthScore>=101){
        errors.healthScore= "required field from 1 to 100"
    }
    return errors
}

export default function  CreateRecipe() {
    const dispatch = useDispatch();
    const dietTypes = useSelector((state)=> state.dietTypes);
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        dietTypes:[],
        img:"",
    })


    
    useEffect(()=>{
        dispatch(getDietTypes());
    },[dispatch])


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }

    function handleCheckBox(e){  
            if(e.target.checked){
                setInput({
                    ...input,
                    dietTypes: [...input.dietTypes,e.target.value],
                });

            }
        
      
    }   

    function handleSubmit(e) {
        e.preventDefault();        
        console.log(input)
        if((input.name==="") || (input.summary==="") || (input.healthScore<=0 || input.healthScore>=101)){
            alert("incomplete required fields")
        }else{
        dispatch(postRecipes(input))
        alert("Recipe created")
        setInput({
            name: "",
            summary: "",
            healthScore: "",
            steps: "",
            dietTypes:[],
            img:"",
        })
    }
    }
    return(
        <div className="crearPadre">
          {/*   
             <Link to= "/home">
                <button>
                    back
                </button>
            <Link/> */}

            <h1>Create your own Recipe!</h1>
            <form onSubmit = {(e)=> handleSubmit(e)}>


            <div className="izquierda">
                <div className="form_hijo">
                    <label className="nombres_form"> Recipe Name</label> <br />
                    <input className="input_create" type="text" value={input.name}
                      name= "name"  onChange={(e) => handleChange(e)}
                    />
                    {
                        errors.name && (
                            <p className="error">{errors.name}</p>
                        )
                    }

                </div> 


            
                <div className="form_hijo">
                    <label className="nombres_form"> Summary </label> <br />
                    <input className="input_create" type="text" name="summary" 
                    value={input.summary}  onChange={(e) => handleChange(e)}
                    />
                    { errors.summary && (
                            <p className="error">{errors.summary}</p>
                        )}
                </div>


                <div className="form_hijo">    
                    <label className="nombres_form">Health Score</label> <br />
                    <input className="input_create" type="number" name= "healthScore" 
                    value={input.healthScore}  onChange={(e) => handleChange(e)}
                    />
                    { errors.healthScore && (
                            <p className="error">{errors.healthScore}</p>
                        )}

                </div>

                <div className="form_hijo">
                    <label className="nombres_form">Steps</label> <br />
                    <input className="input_create" type="text" name= "steps" value={input.steps}  onChange={(e) => handleChange(e)} />
                </div> 


                <div className="form_hijo">
                    <label className="nombres_form" >Plate Image</label> <br />
                    <input className="input_create" type="url" name= "img" value={input.img}  onChange={(e) => handleChange(e)} />
                </div> 

                

              


            </div>

                <div className="derecha"> 
                    <label className="title_diets">Type Diets</label>
                    {
                        dietTypes.map((d)=>{
                            return(
                                <div className="form_hijo-diets" key={d}>
                                    <label className="nombres_diets">{d}</label>
                                    <input type="checkbox" value={d} name={d} onChange={(e) => handleCheckBox(e)}/>
                                </div>
                           
                            )
                        })                       
                    }
                </div>
                



                <div className="padre_btn"> 
                    {
                       ((input.name!="") && (input.summary!="") && (input.healthScore > 0 && input.healthScore<101))?
                        <button  className="btn_submit" type="submit">Create Recipe! </button>
                        : <button className="btn_submit" > incomplete required fields </button>
                    }
                </div>
                        
                
                        
               
               
            </form> 


        </div>
    )
    
}