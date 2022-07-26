import React from "react"
import {Link} from "react-router-dom"
import './Landing.css';



export default function LandingPage (){
    return (
        <div className="landingpadre">
            <img className="imgfondo" src="https://thumbs.dreamstime.com/b/cocinero-de-la-mujer-joven-con-ropa-retra-que-cocina-sopa-fondo-retro-del-ejemplo-estilo-color-burbuja-discurso-para-el-texto-147102721.jpg" alt="" /> 
            <h1 className="title">Welcome to <br></br> Henry Food  </h1>
            <Link to= "/home"> 
                <button className="bttn" >start cooking!</button>
            </Link>

        </div>
    ) 
}