import { useState, useEffect } from "react"
import * as UserService from '../../services/userService'
import { send } from 'emailjs-com';

function ForgetPasswordForm({onSubmit,onClick}){
  const serviceID = 'contact_service';
  const templateID = 'template_eium1gh';
  const userID = 'nttu7qY7UXAEALpcI';
  const [email, setEmail] = useState('')

  useEffect(function(){
    // setEmail(user?.email)
  }, [])
    
    function handleSubmit(ev){
        ev.preventDefault()
        if (!validateEmail(email)) {
          onSubmit({
            success:true,
            msg:'EL mail no es valido, ingrese el formato correcto.',
          })
        }
        const params = {
          user_email: email,
          user_name: 'Maximo Cosseti',
          subject: 'Peticion para reinicio de contraseña',
          message: 'Si queres reestablecer tu contraseña, haz click en el link de abajo. Y sigue los pasos.',
          linkRedirect: `http://localhost:3000/reset-password/${email}`,
        };
        if(email != null)
        send(serviceID, templateID, params, userID)
            .then(() => {
              onSubmit({
                success:true,
                msg:'El mail fue enviado satisfactoriamente, verifique su casilla porfavor.',
              })
            })
            .catch((error) => {
              onSubmit({
                success:true,
                msg:'Ocurrio un error al enviar el mail, vuelva intentarlo mas tarde.',
                error:error,
              })
        });
    }

    function handleEmail(ev){
        setEmail(ev.target.value)
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
            <form className="form border rounded p-4" style={{width: '750px', backgroundColor: 'rgba(0, 0, 0, 0.1)'}} onSubmit={handleSubmit}>
            <div className="form-group">  
                <label className="form-label" htmlFor="email">Email</label>
                <input className="form-control" type="text" name="email" onChange={handleEmail} value={email} />
                {/* <p className="text-small text-danger">Verifique este campo</p> */}
            </div>
            <div>
              <button className="btn btn-primary w-100 my-3" type="submit">Enviar Mail</button>
              <button className={`btn w-100 btn-secondary text-white font-weight-bold`} onClick={handleClick}> VOLVER</button>

            </div>
            </form>
        </div>
    )
}

export default ForgetPasswordForm