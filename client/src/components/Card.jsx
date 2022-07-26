import React from "react";
import "./Card.css"


export default function Card({img, name, dietTypes }){
    return(
        <div className="card" >

          <h2 className="card-title"> <a >{name} </a> </h2>
          
         
            <img className="img-card" src={img} alt="image not found"/>
          

          <div className="dietas">
              {dietTypes?.map((e) => {
              return (
                  <li >
                     <span className="ult" key={e}>{e.toUpperCase()}</span>
                  </li>
                 );
              })}
          </div>
           
        </div>
    )
}