import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

// users imports
import UserList from '../../../components/users/userList'
import UserForm from '../../../components/users/userForm'
import * as UserService from '../../../services/userService'

function Index({}){

  const [onChange, setOnChange] = useState([])
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState(null)
  const [isValid, setIsValid] = useState(false)
  const [formData, setFormData] = useState({
    email:'',
    password:'',
    firstName:'',
    lastname:'',
    isAdmin: null
  })  
     
  
  useEffect(function(){
    setOnChange(true)
    UserService.find()
    .then(data =>{
      setUsers(data)
    })

  }, [])

  function handleClick(){
    setFormData({})
    setMessage(null)
    setOnChange(!onChange)
  }
  function upsertUser(user){
    if(user == null || user == undefined ||user.email == null || user.email == undefined || user.password == '' || user.password == null || user.password == undefined ||user.firstName == null || user.firstName == undefined || user.lastName == null || user.lastName == undefined ||user.isAdmin == null || user.isAdmin == undefined  ){
      setIsValid(false)
      setMessage('Los Campos del formulario son requeridos')
    }else{
      if(user.id == null || user.id == undefined){
        UserService.create(user)
        .then((response)=>{
          setIsValid(true)
          setMessage(response.msg)
          setOnChange(!onChange)
          refreshGrid()
        })
        .catch((err)=>{
          setIsValid(false)
          setMessage(err.message)
        })
      }else{
        UserService.update(user)
        .then((response)=>{
          console.log(response)
          if(response.matchedCount > 0){
            setIsValid(true)
            setMessage('Usuario actualizado satisfactoriamente.')
            refreshGrid()
          }else{
            setIsValid(false)
            setMessage('No fue posible actualizar el user seleccionado.')
          }
        })
        .then(data =>{
            setUsers(data)
            setOnChange(!onChange)
          })
      }
    }
  }
  // Primero retorna el user que se selecciona en la grilla
  function toEdit(user){
    setFormData(user)
    // muestro el form
    setOnChange(!onChange)
  }
 
  //Le pasamosa esta funcion al listado de useres, para que al seleccionar eleminar uno, nos notifique.
  function toDelete(id){
    UserService.deleteOne(id)
    .then(data =>{
      console.log(data)
      if(data.deletedCount > 0){
        setIsValid(true)
        setMessage('Usuario eliminado exitosamente.')
        refreshGrid()
      }
    })
  }
 
  function refreshGrid(){
    UserService.find()
    .then(data =>{
      setUsers(data)
    })
  }

  return (
    <main className="container-fluid"  style={{padding:'0px', margin:'0px'}}>
        
       {message &&
        <Alert className="text-center" variant={isValid ? 'success' : 'danger'}>{message}</Alert>
        }
        <div className="container p-5">
        {onChange && 
           <Link className="btn btn-secondary text-white" to="/admin/dashboard">
                  VOLVER
            </Link>
             }
            <h1 className="text-center my-3"> {onChange ? 'ABM USUARIOS' : 'FORMULARIO DE UN USUARIO' }</h1>
            <button className={`btn btn-primary text-white ${!onChange && 'd-none' } font-weight-bold mx-5`} onClick={handleClick}> NUEVO</button>
            {onChange ?
              <UserList users={users} refreshGrid={refreshGrid} toEdit={toEdit} toDelete={toDelete} />
              :
              <UserForm onSubmit={upsertUser} user={formData}  buttonText={'ACEPTAR'} onClick={handleClick} />
            }
            {/* <button className={`btn w-100 btn-secondary ${ onChange && 'd-none' } text-white font-weight-bold`} onClick={handleClick}> VOLVER</button> */}

        </div>
      </main>
    )
}

export default Index