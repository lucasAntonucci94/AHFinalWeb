import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

// species imports
import SpecieList from '../../../components/species/specieList'
import SpecieForm from '../../../components/species/specieForm'
import * as SpecieService from '../../../services/specieService'

function Index({}){

  const [onChange, setOnChange] = useState([])
  const [thisSpecie, setThisSpecie] = useState({
    id:'',
    name:'',
  })
  const [species, setSpecies] = useState([])
  const [races, setRaces] = useState([])
  const [message, setMessage] = useState(null)
  const [isValid, setIsValid] = useState(false)
    
     
  
  useEffect(function(){
    setOnChange(true)
    SpecieService.find()
    .then(data =>{
      setSpecies(data)
    })
  }, [])

  function handleClick(){
    setThisSpecie({})
    setMessage(null)
    setOnChange(!onChange)
  }
  function upsertSpecie(specie){
    if(specie == null || specie == undefined ||specie?.name == null || specie?.name == undefined|| specie?.name == '' ){
      setIsValid(false)
      setMessage('Los Campos del formulario son requeridos.')
    }else{
      if(specie.id == null || specie.id == undefined){
        SpecieService.create(specie)
          .then((response)=>{
            if(response.acknowledged == true && response.insertedId != null){
              setIsValid(true)
              setMessage('La especie fue creado satisfactoriamente.')
              return SpecieService.find()
            }else{
              setIsValid(false)
              setMessage('No fue posible crear la especie.')
            }
            return SpecieService.find()
          })
          .then(data =>{
              setSpecies(data)
              setOnChange(!onChange)
            })
      }else{

        SpecieService.update(specie)
        .then(response =>{
          console.log(response)

          if(response.success){
            setIsValid(response.success)
            setMessage(response.message)
            refreshGrid()
            setOnChange(!onChange)
          }else{
            setIsValid(response.success)
            setMessage(response.message)
          }

        })
      }
    }
  }
  // Primero retorna el specie que se selecciona en la grilla
  function toEdit(specie){
    setThisSpecie(specie)
    // muestro el form
    setOnChange(!onChange)
  }
 
  //Le pasamosa esta funcion al listado de speciees, para que al seleccionar eleminar uno, nos notifique.
  function toDelete(id){
    SpecieService.deleteOne(id)
    .then(data =>{
      console.log(data)
      if(data.success){
        setIsValid(true)
        setMessage('Especie eliminada exitosamente.')
        refreshGrid()
      }else{
        setIsValid(false)
        setMessage('Ocurrio un error al eliminar la especie.')
      }
    })
  }
 
  function refreshGrid(){
    SpecieService.find()
    .then(data =>{
      setSpecies(data)
    })
  }

    return (
      <main className="container-fluid"  style={{padding:'0px', margin:'0px', minHeight:'90vh'}}>
        
       {message &&
        <Alert className="text-center" variant={isValid ? 'success' : 'danger'}>{message}</Alert>
        }
        <div className="container p-5">
        {onChange && 
           <Link className="btn btn-secondary text-white" to="/admin/dashboard">
                  VOLVER
            </Link>
             }
            <h1 className="text-center my-3"> {onChange ? 'ABM ESPECIES' : 'FORMULARIO DE UN ESPECIE' }</h1>
            <button className={`btn btn-primary text-white ${!onChange && 'd-none' } font-weight-bold mx-5`} onClick={handleClick}> NUEVO</button>
            {onChange ?
              <SpecieList species={species} refreshGrid={refreshGrid} toEdit={toEdit} toDelete={toDelete} />
              :
              <SpecieForm onSubmit={upsertSpecie} specie={thisSpecie} races={races ?? []} species={species ?? []} buttonText={'ACEPTAR'} />
            }
            <button className={`btn w-100 btn-secondary ${ onChange && 'd-none' } text-white font-weight-bold`} onClick={handleClick}> VOLVER</button>
        </div>
      </main>
    )
}

export default Index