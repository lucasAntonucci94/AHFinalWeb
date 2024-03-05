import { useState, useEffect, useParams } from "react"
import { Form, FormGroup, FormControl, InputGroup } from "react-bootstrap";

function ResetPasswordForm({onSubmit}){
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    
  useEffect(function(){

  }, [])
    
    function handleSubmit(ev){
        ev.preventDefault()
 
        if (!isPasswordMatch) {
            // setError("Las contraseñas no coinciden.");
            return;
        }

        onSubmit(
            password
        )
    }

    function handlePassword(ev){
        setPassword(ev.target.value)
        setIsValidPassword(validatePassword(ev.target.value))
    }
    function handleConfirmPassword(ev){
        setConfirmPassword(ev.target.value)
        setIsPasswordMatch(password === ev.target.value);
    }
    function validatePassword(password) {
        return password.length >= 6;
    }
    return (
        <Form className="form border rounded p-5 " style={{ width: "750px", backgroundColor: "rgba(0, 0, 0, 0.3)" }} onSubmit={handleSubmit}>
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
                    La contraseña debe tener al menos 6 caracteres.
                    </FormControl.Feedback>
                </InputGroup>
            </FormGroup>
            <FormGroup className={isPasswordMatch ? "my-1" : "my-1 has-error"}>
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
    )
}

export default ResetPasswordForm