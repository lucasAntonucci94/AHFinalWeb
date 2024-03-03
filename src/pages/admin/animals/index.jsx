import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

// animals imports
import AnimalList from '../../../components/animals/animalList'
import AnimalForm from '../../../components/animals/animalForm'
import * as AnimalService from '../../../services/animalService'
import * as RaceService from '../../../services/raceService'
import * as SpecieService from '../../../services/specieService'

function Index({}){

  const [onChange, setOnChange] = useState([])
  const [animals, setAnimals] = useState([])
  const [thisAnimal, setThisAnimal] = useState({
    name:'',
    age:'',
    description:'',
    specie:'',
    race:'',
    image:null,
  })
  const [species, setSpecies] = useState([])
  const [races, setRaces] = useState([])
  const [message, setMessage] = useState(null)
  const [isValid, setIsValid] = useState(false)
    
  useEffect(function(){
    setOnChange(true)
    AnimalService.find()
    .then(data =>{
      setAnimals(data)
    })
    SpecieService.find()
    .then(data =>{
      setSpecies(data)
    })
    RaceService.find()
    .then(data =>{
      setRaces(data)
    })
  }, [])

  function handleClick(){
    setThisAnimal({})
    setMessage(null)
    setOnChange(!onChange)
  }
  
  function upsertAnimal(animal){
    if(animal === null || animal === undefined ||animal.name === null || animal.name === undefined ||animal.age === null || animal.age === undefined ||animal.description === null || animal.description === undefined ||animal.race === null || animal.race === undefined ||animal.specie === null || animal.specie === undefined || animal.name === '' || animal.age === '' || animal.race === '' || animal.specie === '' || animal.description === ''){
      setIsValid(false)
      setMessage('Los Campos del formulario son requeridos.')
    }else{
      if(animal.id === null || animal.id === undefined){
        AnimalService.create(animal)
          .then((response)=>{
            if(response.acknowledged === true && response.insertedId !== null){
              setIsValid(true)
              setMessage('Animal creado satisfactoriamente.')
              return AnimalService.find()
            }else{
              setIsValid(false)
              setMessage('No fue posible crear el animal.')
            }
            return AnimalService.find()
          })
          .then(data =>{
              setAnimals(data)
              setOnChange(!onChange)
            })
      }else{

        AnimalService.update(animal)
        .then(response =>{
          console.log(response)

          if(response.matchedCount > 0){
            setIsValid(true)
            setMessage('Animal actualizado satisfactoriamente.')
            return AnimalService.find()
          }else{
            setIsValid(false)
            setMessage('No fue posible actualizar el animal seleccionado.')
          }
        })
        .then(data =>{
            setAnimals(data)
            setOnChange(!onChange)
          })
      }
    }
  }
  // Primero retorna el animal que se selecciona en la grilla
  function toEdit(animal){
    
    setThisAnimal(animal)
    // muestro el form
    setOnChange(!onChange)
  }
 
  //Le pasamosa esta funcion al listado de animales, para que al seleccionar eleminar uno, nos notifique.
  function toDelete(id){
    AnimalService.deleteOne(id)
    .then(data =>{
      console.log(data)
      if(data.deletedCount > 0){
        setIsValid(true)
        setMessage('Animal eliminado exitosamente.')
        refreshGrid()
      }
    })
  }
 
  function refreshGrid(){
    AnimalService.find()
    .then(data =>{
      setAnimals(data)
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
            <h1 className="text-center my-3"> {onChange ? 'ABM ANIMALES' : 'FORMULARIO DE UN ANIMAL' }</h1>
            <button className={`btn btn-primary text-white ${!onChange && 'd-none' } font-weight-bold mx-5`} onClick={handleClick}> NUEVO</button>
            {onChange ?
              <AnimalList animals={animals} refreshGrid={refreshGrid} toEdit={toEdit} toDelete={toDelete} />
              :
              <AnimalForm onSubmit={upsertAnimal} animal={thisAnimal} races={races ?? []} species={species ?? []} buttonText={'ACEPTAR'} />
            }
            <button className={`btn w-100 btn-secondary ${onChange && 'd-none' } text-white font-weight-bold`} onClick={handleClick}> VOLVER</button>

        </div>
        </main>
 
    )
}

export default Index