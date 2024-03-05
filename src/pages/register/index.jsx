import React from "react"
import { useState } from "react"
import * as AuthService from '../../services/authService'
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, FormControl, InputGroup } from "react-bootstrap";

function Index(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);

    let navigate = useNavigate()
   
    function handleEmail(ev){
        setEmail(ev.target.value)
        setIsValidEmail(validateEmail(ev.target.value))
    }
    function handlePassword(ev){
        setPassword(ev.target.value)
        setIsValidPassword(validatePassword(ev.target.value))
    }
    function handleConfirmPassword(ev) {
        setConfirmPassword(ev.target.value);
        setIsPasswordMatch(password === ev.target.value);
    }
    function handleSubmit(ev){
        ev.preventDefault()
        setError(null)
        setMessage(null)
        
        if (!isPasswordMatch) {
            setError("Las contraseñas no coinciden.");
            return;
        }
  
        AuthService.register({email, password})
        .then((response) => {
            setMessage("Se creo la nueva contrasena con exito")
            setTimeout(function(){
                navigate('/login', {replace:true})
            },2000)

        })
        .catch(err =>{
            setError(err.message)
        })
    }
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function validatePassword(password) {
        return password.length >= 6;
    }
    return(
        <> 
            <div className="bg-light py-5"  style={{    backgroundPosition: 'center',backgroundSize: 'cover', overflow: 'hidden', backgroundImage:"url('images/michidrstrange2.jpg')",minHeight: '90vh'}}>
                {message && <Alert className="text-center" variant='success'>{message}</Alert>}
                {error && <Alert className="text-center" variant='danger'>{error}</Alert>}
                    
                <div className="container p-5">
                    <div className="row  d-flex justify-content-center ">
                        <div className="col-10">
                        <h1 className="text-center py-4 text-white">REGISTRATE</h1>
                        </div>
                        <div className="col-10  d-flex justify-content-center ">
                            <Form className="form border rounded p-5" style={{ width: "750px", backgroundColor: "rgba(0, 0, 0, 0.3)" }} onSubmit={handleSubmit}>
                                <FormGroup className={isValidEmail ? "" : "has-error"}>
                                <label className="form-label text-white" htmlFor="email">
                                    <b>Email</b>
                                </label>
                                <InputGroup>
                                    <FormControl
                                    type="email"
                                    placeholder="ingrese su email"
                                    name="email"
                                    onChange={handleEmail}
                                    value={email}
                                    isInvalid={!isValidEmail}
                                    isValid={isValidEmail}
                                    />
                                    <FormControl.Feedback type="invalid">
                                    Por favor, ingrese un email válido.
                                    </FormControl.Feedback>
                                </InputGroup>
                                </FormGroup>
                                <FormGroup className={isValidPassword ? "my-2" : "my-2 has-error"}>
                                    <label className="form-label text-white" htmlFor="password">
                                        <b>Contraseña</b>
                                    </label>
                                    <InputGroup>
                                        <FormControl
                                        type="password"
                                        placeholder="ingrese su contraseña"
                                        name="password"
                                        onChange={handlePassword}
                                        value={password}
                                        isInvalid={!isValidPassword}
                                        isValid={isValidPassword}
                                        />
                                        <FormControl.Feedback type="invalid">
                                        La contraseña debe tener al menos 6 caracteres.
                                        </FormControl.Feedback>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className={isPasswordMatch ? "my-2" : "my-2 has-error"}>
                                    <label className="form-label text-white" htmlFor="confirmPassword">
                                        <b>Confirmar Contraseña</b>
                                    </label>
                                    <InputGroup>
                                    <FormControl
                                        type="password"
                                        placeholder="Confirme su contraseña"
                                        name="confirmPassword"
                                        onChange={handleConfirmPassword}
                                        value={confirmPassword}
                                        isInvalid={!isPasswordMatch}
                                        isValid={isPasswordMatch}
                                    />
                                    <FormControl.Feedback type="invalid">
                                        Las contraseñas no coinciden.
                                    </FormControl.Feedback>
                                    </InputGroup>
                                </FormGroup>
                                <button className="btn btn-primary w-100 mt-3 mx-auto" type="submit">INGRESAR</button>
                            </Form>
                        </div>
                    </div>   
                </div>
            </div>
        </>
    )
}

export default Index