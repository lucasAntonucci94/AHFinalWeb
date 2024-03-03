import React from "react"
import { useState, useEffect } from "react"
import * as AuthService from '../../services/authService'
import Alert from 'react-bootstrap/Alert';
import ForgetPasswordForm from '../../components/auth/forgetPasswordForm'
import LoginForm from '../../components/auth/loginForm'

function Index(props){
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [onChange, setOnChange] = useState([])

    useEffect(function(){
        setOnChange(true)
      }, [])
    
    async function handleLogin(email,password){
        await AuthService.login(email, password)
        .then(({user,token}) => {
            props.onLogin(user, token)
        })
        .catch(err => {
            setError(err.message)
            setTimeout(() => {
                setError("");
              }, 3000);
        })
    }
    function handleForgetPassword(response){
        if(response.success){
            setOnChange(!onChange)
            setMessage(response.msg)
            setTimeout(() => {
                setMessage("");
              }, 3000);
        }else{
            setError(response.msg)
            setTimeout(() => {
                setError("");
              }, 3000);
        }
    }
    function handleClick(){
        setMessage(null)
        setOnChange(!onChange)
    }
    return(
        <>
            <div className="bg-light py-5"  style={{    backgroundPosition: 'center',backgroundSize: 'cover', overflow: 'hidden', backgroundImage:"url('images/perrito.jpg')",minHeight: '90vh'}}>
            {message && <Alert className="text-center" variant='success'>{message}</Alert>}
            {error && <Alert className="text-center" variant='danger'>{error}</Alert>}
                <div className="container p-5">
                    <div className="row  d-flex justify-content-center ">
                        <div className="col-10">
                        {onChange ?
                            <h1 className="text-center py-4">INGRESE SUS CREDENCIALES</h1>
                            :
                            <h1 className="text-center py-4">INGRESE SU MAIL</h1>
                        }
                        </div>
                        <div className="col-10  d-flex justify-content-center ">
                        {onChange ?
                            <LoginForm  onSubmit={handleLogin}  onClick={handleClick} />
                        :
                            <ForgetPasswordForm onSubmit={handleForgetPassword} onClick={handleClick} />
                        }
                        </div>
                    </div>   
                </div>
            </div>
        </>
    )
}

export default Index