import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeByName } from '../actions';
import { Link } from 'react-router-dom';
import "./SearchBar.css"



export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange (e){
        e.preventDefault();
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        setName("") ///para que se limpie el borrador
        dispatch(getRecipeByName(name))
    }


    return(
        <div className='navBar'>

            <div className='container-link-create'>
                <Link className='link-create' to = "/post"> Create Recipe </Link> 
            </div>
            
           <div className='container-search'>
            <input className='buscar' type="text" placeholder='Search' value = {name} onChange={e => handleInputChange(e)}/>
            <button type= "submit" onClick={e=> handleSubmit(e)}> 
            <img className='lupa' src= "https://dibujando.net/files/fs/p/i/2020/294/Lupa_icono_450980.gif" alt="" />
            </button>
            </div>
 
        </div>
    )

}