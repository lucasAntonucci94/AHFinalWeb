import { useState, useEffect } from "react"
import StyledDropzone from '../common/StyledDropzone'
function ProfileForm({props,onSubmit,onClick, user, buttonText}){

    const [idUser, setIdUser] = useState(null)
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [file, setFile] = useState(null);

  useEffect(function(){
    if(user != null || user != undefined )
    {
        setIdUser(user?._id)
        setEmail(user?.email)
        setFirstName(user?.firstName)
        setLastName(user?.lastName)
    }
  }, [user])
    
    async function handleSubmit(ev){
        ev.preventDefault()


        var awda=file
        var adwdawd={
            id: idUser,
            email: email,
            firstName: firstName,
            lastName: lastName,
        }
        debugger

        onSubmit({
            id: idUser,
            email: email,
            firstName: firstName,
            lastName: lastName,
        })
        // if (file) {
        //     const formData = new FormData();
        //     formData.append('image', file);
        
        //     // Haz la petición HTTP para enviar la imagen al servidor
        //     const response = await fetch('/api/upload-profile-image', {
        //       method: 'POST',
        //       body: formData,
        //     });
        
        //     // Maneja la respuesta del servidor (éxito, error, etc.)
        //   }
    }
    function handleEmail(ev){
        setEmail(ev.target.value)
    }
    // }
    function handleFirstName(ev){
        setFirstName(ev.target.value)
    }
    function handleLastName(ev){
        setLastName(ev.target.value)
    }
    function handleClick(){
        onClick()
    }
    function handleOnDrop(files){
        const thisFile = files[0];
        setFile(thisFile);
        // Guarda el primer archivo seleccionado
    };
    return (
        <div>   
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">  
                    <label className="form-label" htmlFor="email">Email</label>
                    <input className="form-control" type="text" name="email" onChange={handleEmail} value={email} />
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
                <StyledDropzone onDrop={handleOnDrop} />
                <div>
                    <button className="btn btn-primary w-100 my-3" type="submit">{buttonText}</button>
                    <button className="btn btn-secondary w-100 my-3" type="button" onClick={handleClick}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default ProfileForm