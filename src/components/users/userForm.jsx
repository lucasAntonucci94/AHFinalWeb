import { useState, useEffect } from "react"

function UserForm({onSubmit,onClick, user, buttonText}){

    const [idUser, setIdUser] = useState(null)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [isAdmin, setIsAdmin] = useState(null)

    const roles =[
        {
            label:"Administrador",
            option:true,
        },
        {
            label:"Usuario",
            option:false,
        }
    ]

  useEffect(function(){
    if(user != null || user != undefined )
    {
        setIdUser(user?._id)
        setPassword(user?.password)
        setEmail(user?.email)
        setFirstName(user?.firstName)
        setLastName(user?.lastName)
        setIsAdmin(user?.isAdmin)
    }
  }, [user])
    
    function handleSubmit(ev){
        ev.preventDefault()
        onSubmit({
            id: idUser,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            isAdmin: (isAdmin === 'true') ? true : false,         
        })
    }

    function handleEmail(ev){
        setEmail(ev.target.value)
    }
    function handlePassword(ev){
        setPassword(ev.target.value)
    }
    function handleFirstName(ev){
        setFirstName(ev.target.value)
    }
    function handleLastName(ev){
        setLastName(ev.target.value)
    }
    function handleIsAdmin(ev){
        setIsAdmin(ev.target.value)
    }
    function handleClick(){
        onClick()
    }
   
    return (
        <div>   
            <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">  
                <label className="form-label" htmlFor="email">Email</label>
                <input className="form-control" type="text" name="email" onChange={handleEmail} value={email} />
                {/* <p className="text-small text-danger">Verifique este campo</p> */}
            </div>
            <div className="form-group">  
                <label className="form-label" htmlFor="password">Contraseña</label>
                <input className="form-control" type="password" name="password" onChange={handlePassword} value={password} />
                {/* <p className="text-small text-danger">Verifique este campo</p> */}
            </div>
            <div className="form-group">  
                <label className="form-label" htmlFor="firstName">Nombre</label>
                <input className="form-control" type="text" name="firstName" onChange={handleFirstName} value={firstName}/>
                {/* <p className="text-small text-danger">Verifique este campo</p> */}
            </div>
            <div className="form-group">  
                <label className="form-label" htmlFor="lastName">Apellido</label>
                <input className="form-control" type="text" name="lastName" onChange={handleLastName} value={lastName}/>
                {/* <p className="text-small text-danger">Verifique este campo</p> */}
            </div>
            <div className="form-group">  
                <label className="form-label" htmlFor="isAdmin">Rol</label>
                <select className="form-control" name="isAdmin" value={isAdmin} onChange={handleIsAdmin}>
                    <option value="0">Seleccione una rol</option>
                    {roles.map((element,i) => (
                        <option key={i} value={element?.option}>{element?.label}</option>
                    ))}
                </select>
            </div>
            {/* <div className="form-group">  
                <label className="form-label" htmlFor="isAdmin">Rol</label>
                <input className="form-control" type="text" name="isAdmin" onChange={handleIsAdmin} value={isAdmin}/>
            </div> */}
            <div>

            <button className="btn btn-primary w-100 my-3" type="submit">{buttonText}</button>
            <button className="btn btn-secondary w-100 my-3" type="button" onClick={handleClick}>Cancelar</button>
            </div>
            </form>
        </div>
    )
}

export default UserForm