import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as userService from '../../../services/userService'
import { Link } from "react-router-dom"

function View({}){
    const { id } = useParams()
    const [user, setUser]  = useState({})

    useEffect(function(){
        userService.findById(id)
        .then(data =>{
            setUser(data)
        } 
    )}, [])
 
    return (
    <main className="container-fluid" style={{padding:'0px'}}>
        <div className="row  d-flex justify-content-center" style={{padding:'0px',margin:'0px',height: '90vh'}}>
            <div className="col-12 bg-dark pb-4 d-flex justify-content-center align-items-center"   style={{    backgroundPosition: 'center',backgroundSize: 'cover', overflow: 'hidden', backgroundImage:"url('../../images/yellow-cat.jpg')",height: '250px'}}>
                <div className="row w-100">
                    <div className="col-12 px-5">
                            <Link className="btn btn-info text-center" to="/admin/users">
                            <b>
                                VOLVER
                            </b>
                            </Link>
                    </div>
                    <div className="col-12 text-center">
                        <h1 className=" text-white">{user?.lastName} {user?.firstName}</h1>
                    </div>
                </div>
            </div>
           <div className="col-6 d-flex justify-content-center align-items-center">
                <ul >
                    <li style={{fontSize:'25px', listStyleType:'none'}}>
                        <p >Email: <span>{user?.email ?? ''}</span></p>
                    </li>
                    <li style={{fontSize:'25px', listStyleType:'none'}}>
                        <p >Nombre: <span>{user?.firstName ?? ''}</span></p>
                    </li>
                    <li style={{fontSize:'25px', listStyleType:'none'}}>
                        <p >Apellido: <span>{user?.lastName ?? ''}</span></p>
                    </li>
                    <li style={{fontSize:'25px', listStyleType:'none'}}>
                        <p >Rol: <span>{user?.isAdmin ? 'Administrador' : 'Usuario' }</span></p>
                    </li>
                </ul>
            </div>
            <div className="col-6" style={{margin:'0px',padding:'0px'}}>
                <img 
                src={user.image}
                alt=""
                className=".img-fluid"
                style={{width: '50%'}}
                />
            </div>
        </div>
    </main>
    )
}

export default View