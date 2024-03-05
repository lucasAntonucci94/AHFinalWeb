import { useState, useEffect } from "react"
import { Form, FormGroup, FormControl, InputGroup } from "react-bootstrap";

function LoginForm({onSubmit, onClick}){

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

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
      setIsValidEmail(validateEmail(ev.target.value))
    }
    function handlePassword(ev){
        setPassword(ev.target.value)
        setIsValidPassword(validatePassword(ev.target.value))
    }
    function handleClick(){
      onClick()
    }
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      }
    
      function validatePassword(password) {
        return password.length >= 6;
      }
    return (
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
          <FormGroup className={isValidPassword ? "my-1" : "my-1 has-error"}>
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
              La contraseña debe tener al menos 8 caracteres.
              </FormControl.Feedback>
          </InputGroup>
          </FormGroup>
          <button className="btn btn-primary w-100 mt-3 mx-auto" type="submit">INGRESAR</button>
          <div className="text-center pt-3">
              <button  className={`btn btn-sm btn-primary text-white font-weight-bold mx-5`} onClick={handleClick}>
                  ¿Olvidaste tu contraseña?
              </button>
          </div>
      </Form>
    )
}

export default LoginForm