import React from "react"
import {Link} from "react-router-dom";
import { useState, useEffect } from "react"

function Header({onLogout,hasLogin,isAdmin}){
    const [flagAuth, setFlagAuth] = useState(false)
    const [flagAdmin, setFlagAdmin] = useState(false)
    
    useEffect(()=>{
        if(hasLogin != undefined)
            if(hasLogin)
                setFlagAuth(true)
            else
                setFlagAuth(false)
    }, [hasLogin])

    useEffect(()=>{
        if(isAdmin != undefined)
            if(isAdmin)
                setFlagAdmin(true)
            else
                setFlagAdmin(false)
    }, [isAdmin])    

    function handleLogOut(){ 
        setFlagAuth(false)
        onLogout()
    }

    
    return(
        <>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid ">
                {/* <a class="navbar-brand" href="#"> 
                    <img src="" alt="icon" class="navbarImage">    
                </a> */}
                <div id="navbar">
                    <ul className="nav navbar-nav">
                        <li className="nav-item px-2">
                            <Link className="nav-link text-white " to="/">
                                <i className="fa-solid fa-house"></i>
                                <b className="px-2">Inicio</b> 
                            </Link>
                        </li>
                        { flagAuth &&
                        <>
                            <li className="nav-item px-2">
                                    <Link className="nav-link text-white" to="/animals">
                                        <i className="fa-solid fa-users "></i>
                                        <b className="px-2">Animales</b> 
                                    </Link>
                            </li>
                            {/* <li className="nav-item px-2">
                                <Link className="nav-link text-white" to="/explore">
                                    <i className="fa-solid fa-search "></i>
                                    <b className="px-2">Categorias</b> 
                                </Link>
                            </li> */}
                        </>
                        }
                    </ul>
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        { flagAuth ?
                        <>
                        
                            <li className="nav-item  px-2">
                                <Link className="nav-link text-white" to="/profile">
                                    <i className="fa-solid fa-user"></i>
                                    <b className="px-2">Perfil</b> 
                                </Link>
                            </li>    
                            {flagAdmin &&
                                <li className="nav-item  px-2">
                                    <Link className="nav-link text-white" to="/admin/dashboard">
                                        <i className="fa-solid fa-unlock"></i>
                                        <b className="px-2">Panel de Administrador</b> 
                                    </Link>
                                </li>                           
                            }
                            <li className="nav-item px-2">
                                <button
                                    type="button"
                                    className="btn btn-link nav-link"
                                    onClick={handleLogOut}
                                >
                                    <span className="text-white">
                                        <b className="px-1">Cerrar Sesión</b> 
                                    </span>
                                    <b className=" text-white">
                                         <i className="fa-solid fa-right-from-bracket px-2"></i>
                                    </b>
                                </button>
                            </li>
                        </>
                       :
                        <>   
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/login">
                                    <b>
                                        Iniciar Sesión
                                    </b>
                                </Link>
                            </li>
                            <li className="nav-item text-white">
                                <Link className="nav-link text-white" to="/register">
                                    <b>
                                        Registrarse
                                    </b>
                                </Link>
                            </li>
                        </>
                      }
                    </ul>		  
                </div>
            </div>
        </nav>
        </>
    )
}

export default Header