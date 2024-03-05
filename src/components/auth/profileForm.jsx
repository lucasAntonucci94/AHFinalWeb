import { useState, useEffect } from "react"
import StyledDropzone from '../common/StyledDropzone'
import { Form, FormGroup, FormControl, InputGroup } from "react-bootstrap";

function ProfileForm({onSubmit,onClick, user}){

    const [idUser, setIdUser] = useState(null)
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidFirstName, setIsValidFirstName] = useState(true);
    const [isValidLastName, setIsValidLastName] = useState(true);

    useEffect(function(){
        if(user !== null || user !== undefined )
        {
            setIdUser(user?._id)
            setEmail(user?.email)
            setFirstName(user?.firstName)
            setLastName(user?.lastName)
            setImage(user?.image)
            setPreview(user?.image)
            setIsAdmin(user?.isAdmin)
        }
    }, [user])
    
    async function handleSubmit(ev){
        ev.preventDefault()
        if(firstName.length < 3){
         return   
        }
        if(lastName.length < 3 ){
         return   
        }
        if(!validateEmail(email)){
         return   
        }

        onSubmit({
            id: idUser,
            email: email,
            firstName: firstName,
            lastName: lastName, 
            isAdmin: isAdmin, 
            image: image,
        })
    }

    function handleEmail(ev){
        setEmail(ev.target.value)
        setIsValidEmail(validateEmail(ev.target.value))
    }
    
    function handleFirstName(ev){
        setFirstName(ev.target.value)
        setIsValidFirstName(validateFirstName(ev.target.value))
    }
    
    function handleLastName(ev){
        setLastName(ev.target.value)
        setIsValidLastName(validateLastName(ev.target.value))
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
    return (
        <div>   
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
                    disabled
                    />
                    <FormControl.Feedback type="invalid">
                    Por favor, ingrese un email válido.
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
                <button className="btn btn-primary w-100 mt-3 mx-auto" type="submit">INGRESAR</button>
                <button className="btn btn-secondary w-100 mt-3 mx-auto" onClick={handleClick}>VOLVER</button>
            </Form>
        </div>
    )
}

export default ProfileForm