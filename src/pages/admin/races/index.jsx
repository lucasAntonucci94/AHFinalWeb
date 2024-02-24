import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

// races imports
import RaceList from '../../../components/races/raceList'
import RaceForm from '../../../components/races/raceForm'
import * as RaceService from '../../../services/raceService'
import * as SpecieService from '../../../services/specieService'

function Index({}){

  const [onChange, setOnChange] = useState([])
  const [species, setSpecies] = useState([])
  const [races, setRaces] = useState([])
  const [message, setMessage] = useState(null)
  const [isValid, setIsValid] = useState(false)
  const [formData, setFormData] = useState({
    id:'',
    name:'',
    id_specie:'',
  })

  useEffect(function(){
    setOnChange(true)
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
    setFormData({})
    setMessage(null)
    setOnChange(!onChange)
  }
  function upsertRace(race){

    if(race.name == null || race.name == undefined || race.name === '' || race.id_specie === '' || race.id_specie == undefined || race.id_specie == undefined ){
      setIsValid(false)
      setMessage('Los Campos del formulario son requeridos.')
    }else{
      if(race.id == null || race.id == undefined){
        RaceService.create(race)
          .then((response)=>{
            if(response.acknowledged == true && response.insertedId != null){
              setIsValid(true)
              setMessage('Race creado satisfactoriamente.')
              setOnChange(!onChange)
            }else{
              setIsValid(false)
              setMessage('No fue posible crear el race.')
            }
            refreshGrid()
          })
      }else{

        RaceService.update(race)
        .then(response =>{
          console.log(response)
          debugger

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
  // Primero retorna el race que se selecciona en la grilla
  function toEdit(race){

    setFormData(race)
    // muestro el form
    setOnChange(!onChange)
  }

  //Le pasamosa esta funcion al listado de racees, para que al seleccionar eleminar uno, nos notifique.
  function toDelete(id){
    debugger
    RaceService.deleteOne(id)
    .then(data =>{
      console.log(data)
      if(data.deletedCount > 0){
        setIsValid(true)
        setMessage('La raza fue eliminada exitosamente.')
        refreshGrid()
      }
    })
  }

  function refreshGrid(){
    RaceService.find()
    .then(data =>{
      setRaces(data)
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
            <h1 className="text-center my-3"> {onChange ? 'ABM RAZAS' : 'FORMULARIO DE RAZA' }</h1>
            <button className={`btn btn-primary text-white ${!onChange && 'd-none' } font-weight-bold mx-5`} onClick={handleClick}> NUEVO</button>
            {onChange ?
              <RaceList races={races ?? []}  species={species ?? []} refreshGrid={refreshGrid} toEdit={toEdit} toDelete={toDelete} />
              :
              <RaceForm onSubmit={upsertRace} race={formData} species={species ?? []} buttonText={'ACEPTAR'} />
            }
            <button className={`btn w-100 btn-secondary ${onChange && 'd-none' } text-white font-weight-bold`} onClick={handleClick}> VOLVER</button>

        </div>
      </main>
    )
}

export default Index