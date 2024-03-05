import { useState, useEffect } from "react"
import * as UserService from '../../services/userService'
import { send } from 'emailjs-com';
import { Form, FormGroup, FormControl, InputGroup } from "react-bootstrap";

function ForgetPasswordForm({onSubmit,onClick}){
  const serviceID = 'contact_service';
  const templateID = 'template_eium1gh';
  const userID = 'nttu7qY7UXAEALpcI';
  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(false);

  useEffect(function(){
  }, [])
    
    async function handleSubmit(ev){
      ev.preventDefault()
      if (!validateEmail(email)) {
        onSubmit({
          success:false,
          msg:'El mail no es válido, ingrese el formato correcto.',
        })
      }else{
        const user = await UserService.findByEmail(email)
        const params = {
          user_email: email,
          user_name: user.lastName+' '+user.firstName,
          subject: 'Petición para reinicio de contraseña',
          message: 'Si querés restablecer tu contraseña, haz click en el link de abajo. Y sigue los pasos.',
          linkRedirect: `http://localhost:3000/reset-password/${email}`,
        };
        if(email !== null)
          send(serviceID, templateID, params, userID)
            .then(() => {
              onSubmit({
                success:true,
                msg:'El mail fue enviado satisfactoriamente, verifique su casilla por favor.',
              })
            })
            .catch((error) => {
              onSubmit({
                success:true,
                msg:'Ocurrió un error al enviar el mail, vuelva intentarlo más tarde.',
                error:error,
              })
          });
      }
    }

    function handleEmail(ev){
        setEmail(ev.target.value)
        setIsValidEmail(validateEmail(ev.target.value))
    }
    function validateEmail(email) {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    }
    function handleClick(){
      onClick()
    }
    return (
        <div>   
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
              <button className="btn btn-primary w-100 mt-3 mx-auto" type="submit">Enviar Mail</button>
              <div className="text-center pt-3">
                  <button  className={`btn w-100 btn-secondary text-white font-weight-bold`} onClick={handleClick}>
                  VOLVER
                  </button>
              </div>
          </Form>
        </div>
    )
}

export default ForgetPasswordForm