import React from "react"
import { useState, useEffect } from "react"

// animals imports
import AnimalCardList from '../../components/animals/animalCardList'
import * as AnimalService from '../../services/animalService'

function Index({}){

  const [onChange, setOnChange] = useState([])
  const [animals, setAnimals] = useState([])
  useEffect(function(){
    setOnChange(true)
    findAnimals()
  }, [])

  function findAnimals(){
    AnimalService.find()
    .then(data =>{
      setAnimals(data)
    })
  }
    return (
        <div className="container-fluid" style={{padding:'0px', margin:'0px', minHeight:'90vh'}}>
            <div className="bg-primary d-flex align-items-center justify-content-center"  style={{    backgroundPosition: 'center',backgroundSize: 'cover', overflow: 'hidden', backgroundImage:"url('images/orange-cat.jpg')",height:'250px'}}>
              <h1 className="text-center text-white">LISTADO DE ANIMALES</h1>
            </div>
            <AnimalCardList animals={animals ?? []} refreshGrid={findAnimals} />             
        </div>
    )
}

export default Index