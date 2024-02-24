import React from "react"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { propTypes } from "react-bootstrap/esm/Image"
import * as AuthService from '../../services/authService'
import Alert from 'react-bootstrap/Alert';
import { Link } from "react-router-dom"
import ResetPasswordForm from '../../components/auth/resetPasswordForm'

function Index(props){
    let navigate = useNavigate()
    const { email } = useParams()
    // debugger
    // const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    function handleSubmit(newPassword){
        debugger
     
        AuthService.resetPassword(email, newPassword)
        .then(({response}) => {
            setTimeout(function(){
                navigate('/login', {replace:true})
            },2000)
        })
        .catch(err => setError(err.message))
    }

    return(
        <>
            <div className="bg-light py-5"  style={{    backgroundPosition: 'center',backgroundSize: 'cover', overflow: 'hidden', backgroundImage:"url('images/perrito.jpg')",height: '90vh'}}>
            {message && <Alert className="text-center" variant='success'>{message}</Alert>}
            {error && <Alert className="text-center" variant='danger'>{error}</Alert>}
              
                <div className="container p-5">
                    <div className="row  d-flex justify-content-center ">
                        <div className="col-10">
                            <h1 className="text-center py-4">Ingrese una nueva contrasenia</h1>
                        </div>
                        <div className="col-12">
                            <ResetPasswordForm onSubmit={handleSubmit} />
                        </div>
                    </div>   
                </div>
            </div>
        </>
    )
}

export default Index