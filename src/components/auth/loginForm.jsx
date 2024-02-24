import { useState, useEffect } from "react"
import * as UserService from '../../services/userService'
import { send } from 'emailjs-com';
import { Link } from "react-router-dom"

function LoginForm({onSubmit, onClick}){

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(function(){
    // setEmail(user?.email)
  }, [])
    
    function handleSubmit(ev){
        ev.preventDefault()
        onSubmit(
          email,
          password,
      )
    }
    function handleEmail(ev){
      setEmail(ev.target.value)
    }
    function handlePassword(ev){
        setPassword(ev.target.value)
    }
    function handleClick(){
      onClick()
    }

    return (
        <form className="form border rounded p-4" style={{width: '750px', backgroundColor: 'rgba(0, 0, 0, 0.1)'}} onSubmit={handleSubmit}>
        <div className="form-group my-2">  
            <label className="form-label" htmlFor="email">
                <b>
                Email
                    </b>    
            </label>
            <input className="form-control" placeholder="ingrese su email" type="email" name="email" onChange={handleEmail} value={email} />
            {/* <p className="text-small text-danger">Verifique este campo</p> */}
        </div>
        <div className="form-group my-2">  
            <label className="form-label" htmlFor="password">
                <b>
                    Contraseña
                </b>   
            </label>
            <input className="form-control" type="password" placeholder="ingrese su contraseña" name="password" onChange={handlePassword} value={password}/>
            {/* <p className="text-small text-danger">Verifique este campo</p> */}
        </div>
        <button className="btn btn-primary w-100 mt-3 mx-auto" type="submit">
            <b>
                INGRESAR
            </b>
        </button>
        <div className="text-center pt-3">
            <button  className={`btn btn-sm btn-primary text-white font-weight-bold mx-5`} onClick={handleClick}>
                ¿Olvidaste tu contraseña?
            </button>
        </div>
    </form>
    )
}

export default LoginForm