import React from "react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ProfileForm from '../../components/auth/profileForm'
import Alert from 'react-bootstrap/Alert';
import * as UserService from '../../services/userService'

function Index({}){
  const [authUser, setAuthUser] = useState({})
  const [onChange, setOnChange] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user != null || user != undefined){
      setAuthUser(user)
    }
    setOnChange(true)
  }, [])
  function handleClick(){
    setMessage(null)
    setOnChange(!onChange)
  }
  async function updateProfile(data){
    if(data == null || data == undefined ||data.email == null || data.email == undefined){
      setMessage('Los Campos del formulario son requeridos')
    }else{
      await UserService.updateProfile(data)
      .then((response)=>{
        if(response.matchedCount > 0){
          setMessage('Usuario actualizado satisfactoriamente.')
          setOnChange(!onChange)
          if(response?.upsertedId != null && response?.upsertedId != ''){
            data.id =  response?.upsertedId
            setAuthUser(data)
            localStorage.setItem('user', JSON.stringify(data))
          }
        }else{
          setMessage('No fue posible actualizar el usuario seleccionado.')
        }
      })
    }
  }
    return (
        <main className="container-fluid" style={{padding:'0px'}}>
          <div className="row  d-flex justify-content-center" style={{padding:'0px',margin:'0px',height: '90vh'}}>
            <div className="col-12 bg-dark pb-4 d-flex justify-content-center align-items-center"   style={{    backgroundPosition: 'center',backgroundSize: 'cover', overflow: 'hidden', backgroundImage:"url('images/green-cat.jpg')",height: '250px'}}>
                <div className="row w-100">
                  <div className="col-12 px-5">
                        <Link className="btn btn-warning text-center" to="/">
                          <b>
                            VOLVER
                          </b>
                        </Link>
                  </div>
                  <div className="col-12 text-center">
                    <h1 className=" text-white">Bienvenido {authUser.firstName}</h1>
                  </div>
                </div>
            </div>
            {onChange ?              
            <div className="col-12">
              {message && <Alert className="text-center" variant='success'>{message}</Alert>}
              <div className="row p-4 justify-content-center align-center-items">
                  <div className="col-4 d-flex justify-content-center align-items-center">
                      <dl>
                        <dt className="h5 mb-2">Apellido</dt>
                        <dd className="mb-4">{authUser.lastName}</dd>
                        <dt className="h5 mb-2">Nombre</dt>
                        <dd className="mb-4">{authUser.firstName}</dd>
                        <dt className="h5 mb-2">Email</dt>
                        <dd className="mb-4">{authUser.email}</dd>
                        <dd className="mb-4">
                    <button className="btn btn-primary w-100 my-3" type="button" onClick={handleClick}>Editar Perfil</button>
                          </dd>
                      </dl>
                  </div>
                  <div className="col-5">
                      <img 
                      src={authUser.image}
                      alt="image_profile"
                      style={{width:'50%'}}
                      />
                  </div>
              </div>
            </div>
            :
            <div className="col-6">
              <ProfileForm onSubmit={updateProfile}  user={authUser}  buttonText={'Aceptar'} onClick={handleClick}/>
            </div>
          }
          </div>
        </main>
    )
}

export default Index