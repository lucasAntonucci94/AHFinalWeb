import { useState, useEffect } from "react"
import StyledDropzone from '../common/StyledDropzone'
import { Form, FormGroup, FormControl, InputGroup, Button } from "react-bootstrap";

function UserForm({onSubmit,onClick, user = null, buttonText}){

    const [idUser, setIdUser] = useState(null)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [isAdmin, setIsAdmin] = useState(null)
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidFirstName, setIsValidFirstName] = useState(true);
    const [isValidLastName, setIsValidLastName] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);

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
    if(user._id !== null && user._id !== undefined)
    {
        setIdUser(user?._id)
        setPassword(user?.password)
        setEmail(user?.email)
        setFirstName(user?.firstName)
        setLastName(user?.lastName)
        setIsAdmin(user?.isAdmin)
        setImage(user?.image)
        setPreview(user?.image)
        setIsValidEmail(true)
        setIsValidFirstName(true)
        setIsValidLastName(true)
        setIsValidPassword(true)
    }else{
        setIsValidEmail(false)
        setIsValidFirstName(false)
        setIsValidLastName(false)
        setIsValidPassword(false)
    }
  }, [user])
    
    function handleSubmit(ev){
        ev.preventDefault()
        if(firstName.length < 3 || lastName.length < 3 || !validateEmail(email) || password.length < 6){
            return   
        }
      
        onSubmit({
            id: idUser,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            image: image,
            isAdmin: (isAdmin === 'true') ? true : false,         
        })
    }
    function handleEmail(ev){
        setEmail(ev.target.value)
        setIsValidEmail(validateEmail(ev.target.value))
    }
    function handlePassword(ev){
        setPassword(ev.target.value)
        setIsValidPassword(validatePassword(ev.target.value))
    }
    function handleFirstName(ev){
        setFirstName(ev.target.value)
        setIsValidFirstName(validateFirstName(ev.target.value))
    }
    function handleLastName(ev){
        setLastName(ev.target.value)
        setIsValidLastName(validateLastName(ev.target.value))
    }
    function handleIsAdmin(ev){
        setIsAdmin(ev.target.value)
        // setIsValidFirstName(validateFirstName(ev.target.value))
    }
    function handleClick(){
        onClick()
    }
    function handleOnDrop(base64){
        setImage(base64);
    }
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function validateFirstName(text) {
        return text.length >= 3
    }
    function validateLastName(text) {
        return text.length >= 3;
    }
    function validatePassword(password) {
        return password.length >= 6;
    }
        return (
        <div className=" d-flex justify-content-center align-items-center">   
            <Form className="form border rounded p-5 mt-3" style={{ width: "750px"}} onSubmit={handleSubmit}>
                <FormGroup className={isValidEmail ? "" : "has-error"}>
                    <label className="form-label" htmlFor="email">
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
                <FormGroup className={isValidPassword ? "" : "has-error"}>
                    <label className="form-label" htmlFor="password">
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
                        Por favor, ingrese un contraseña válida.
                    </FormControl.Feedback>
                </InputGroup>
                </FormGroup>
                <FormGroup className={isValidFirstName ? "my-1" : "my-1 has-error"}>
                    <label className="form-label" htmlFor="name">
                        <b>Nombre</b>
                    </label>
                    <InputGroup>
                        <FormControl
                        type="text"
                        placeholder="ingrese su nombre"
                        name="name"
                        onChange={handleFirstName}
                        value={firstName}
                        isInvalid={!isValidFirstName}
                        isValid={isValidFirstName}
                        />
                        <FormControl.Feedback type="invalid">
                            El nombre debe tener al menos 3 caracteres.
                        </FormControl.Feedback>
                    </InputGroup>
                </FormGroup>
                <FormGroup className={isValidLastName ? "my-1" : "my-1 has-error"}>
                    <label className="form-label" htmlFor="lastName">
                        <b>Apellido</b>
                    </label>
                    <InputGroup>
                    <FormControl
                        type="text"
                        placeholder="ingrese su apellido"
                        name="lastName"
                        onChange={handleLastName}
                        value={lastName}
                        isInvalid={!isValidLastName}
                        isValid={isValidLastName}
                    />
                    <FormControl.Feedback type="invalid">
                        El apellido debe tener al menos 3 caracteres.
                    </FormControl.Feedback>
                    </InputGroup>
                </FormGroup>
                <StyledDropzone onDrop={handleOnDrop} preview={preview} />
                {/* <button className="btn btn-primary w-100 mt-3 mx-auto" type="submit">INGRESAR</button>
                <button className="btn btn-secondary w-100 mt-3 mx-auto" onClick={handleClick}>VOLVER</button> */}
                <div className="d-flex justify-content-between">
                    <Button className="btn btn-secondary w-50 mt-2 mx-1" onClick={handleClick}>
                        Volver
                    </Button>
                    <Button className="btn btn-primary w-50 mt-2 mx-1" type="submit">
                        Aceptar
                    </Button>
                </div>   
            </Form>
        </div>
    )
}

export default UserForm