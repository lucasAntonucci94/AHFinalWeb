import React from "react"
import { useState, useEffect } from "react"
import { propTypes } from "react-bootstrap/esm/Image"
import * as AuthService from '../../services/authService'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

function Index(props){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
   
    let navigate = useNavigate()
   
    function handleEmail(ev){
        setEmail(ev.target.value)
    }
    function handlePassword(ev){
        setPassword(ev.target.value)
    }
    function handleSubmit(ev){
        ev.preventDefault()
        setError(null)
        setMessage(null)
        AuthService.register({email, password})
        .then((response) => {
            console.log(response)
            setMessage("Se creo la nueva contrasena con exito")
            setTimeout(function(){
                navigate('/login', {replace:true})
            },2000)

        })
        .catch(err =>{
            setError(err.message)
        })
    }

    return(
        <> 
            <div className="bg-light py-5"  style={{    backgroundPosition: 'center',backgroundSize: 'cover', overflow: 'hidden', backgroundImage:"url('images/michidrstrange2.jpg')",height: '90vh'}}>
            {message && <Alert className="text-center" variant='success'>{message}</Alert>}
            {error && <Alert className="text-center" variant='danger'>{error}</Alert>}
                    
            <div className="container p-5">
                    <div className="row  d-flex justify-content-center ">
                        <div className="col-10">
                        <h1 className="text-center py-4 text-white">REGISTRATE</h1>
                        </div>
                        <div className="col-10  d-flex justify-content-center ">
                        <form className="form border rounded p-5" style={{width: '750px', backgroundColor: 'rgba(0, 0, 0, 0.3)'}} onSubmit={handleSubmit}>
                            <div className="form-group my-2">  
                                <label className="form-label text-white" htmlFor="email">
                                    <b>
                                        Email
                                    </b>
                                </label>
                                <input className="form-control" type="email" placeholder="ingrese su email" name="email" onChange={handleEmail} value={email} />
                                {/* <p className="text-small text-danger">Verifique este campo</p> */}
                            </div>
                            <div className="form-group my-2">  
                                <label className="form-label text-white" htmlFor="password">
                                    <b>Contraseña</b>
                                </label>
                                <input className="form-control" type="password" placeholder="ingrese su contraseña"  name="password" onChange={handlePassword} value={password}/>
                                {/* <p className="text-small text-danger">Verifique este campo</p> */}
                            </div>
                            <button className="btn btn-primary w-100 mt-3 mx-auto" type="submit">INGRESAR</button>
                        </form>
                        </div>
                    </div>   
                </div>
                
            </div>
        </>
    )
}

export default Index