import React from "react";
import "./paginado.css"

export default function Paginado ({RecipesPerPage, allRecipes,paginado}){
    const pageNumber = [];

    for(let i = 1; i<= Math.ceil(allRecipes/RecipesPerPage) ; i++ ){
        pageNumber.push(i)
    }


    return(
        <nav>
            <ul className="paginado">
                {
                    pageNumber && 
                    pageNumber.map(n => (
                        <div className="contenedor-num">
                            <li className="pageNumber" key={n}>
                                 <a onClick={()=> paginado(n)}>{n}</a>
                            </li>
                        </div>
                    ))}
            </ul> 
        </nav>
    )
}

