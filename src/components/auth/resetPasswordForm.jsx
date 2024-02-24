import { useState, useEffect, useParams } from "react"

function ResetPasswordForm({onSubmit}){
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(function(){

  }, [])
    
    function handleSubmit(ev){
        ev.preventDefault()
        onSubmit(
            password
        )
    }

    function handlePassword(ev){
        setPassword(ev.target.value)
    }
    function handleConfirmPassword(ev){
        setConfirmPassword(ev.target.value)
    }
   
    return (
        <div>   
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">  
                    <label className="form-label" htmlFor="password">Contraseña</label>
                    <input className="form-control" type="password" name="password" onChange={handlePassword} value={password} />
                    {/* <p className="text-small text-danger">Verifique este campo</p> */}
                </div>
                <div className="form-group">  
                    <label className="form-label" htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <input className="form-control" type="password" name="confirmPassword" onChange={handleConfirmPassword} value={confirmPassword} />
                    {/* <p className="text-small text-danger">Verifique este campo</p> */}
                </div>
                <div>
                    <button className="btn btn-primary w-100 my-3" type="submit">Reestablecer</button>
                </div>
            </form>
        </div>
    )
}

export default ResetPasswordForm