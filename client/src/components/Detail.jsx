import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsID} from "../actions/index";
import { useParams } from 'react-router-dom';
import "./Detail.css"


export default function Detail(props){
    const dispatch = useDispatch();
    const {id} = useParams()
   
    useEffect(()=>{
        dispatch(detailsID(id));
    },[dispatch])   

    

    const myDetail = useSelector(state=> state.recipeDetails) 

    return(
        <div className="padre_detail">


            <div className="container_name">
                <h1 className="name_detail">{myDetail.name}</h1>
            </div>

    
            <div className="container_img">
                <img className="img_detail" src={myDetail.img? 
                    myDetail.img :
                    "https://w7.pngwing.com/pngs/483/255/png-transparent-computer-icons-food-others.png"} 
                    alt="img not found" />
            </div>


            <div className="container_summary">
               <h2 className="summary_detail">Summary:</h2>
               <p className="summary_text">{myDetail.summary?.replace(/<[^>]*>/g, '')}</p>
            </div>


            <div className="container_score">
                <h2 className="score_detail"> Healt Score: </h2>
                <h3 className="score_text">{myDetail.healthScore? myDetail.healthScore: "no score"}</h3>
            </div>

            
            <div className="container_types">
                <h2 className="types_detail">Diet Types:</h2>
                    {
                        myDetail.dietTypes? myDetail.dietTypes.map(e => {
                            return(
                                <h3 key={e}>{e}</h3>
                            )
                        }) : myDetail.diets?.map(d =>{
                                return(
                                    <h3 key={d.name}>{d.name}</h3>
                                )
                            })}   
            </div>


            <div className="container_steps">
                <h2 className="steps_detail">Steps:</h2>
                <ul>{Array.isArray(myDetail.steps)?
                 myDetail.steps.map(e=>{
                    return(
                        <li className="steps_text" key={e.number}>{e.step}</li>
                    )
                }) :
                <li className="steps_text">{myDetail.steps}</li>
            }</ul>
            </div>
         

            
           
        </div>
    )
}
